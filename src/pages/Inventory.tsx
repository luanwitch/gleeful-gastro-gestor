import { useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { toast } from "sonner";

type Ingredient = {
  id: number;
  name: string;
  unit: string;
  current_stock: string;
  minimum_stock: string;
  cost_per_unit: string | number;
  active: boolean;
};

type StockMovement = {
  id: number;
  ingredient_name: string;
  movement_type: "in" | "out";
  quantity: string;
  notes: string;
  created_at: string;
};

export function Inventory() {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("kg");
  const [currentStock, setCurrentStock] = useState("0");
  const [minimumStock, setMinimumStock] = useState("0");
  const [costPerUnit, setCostPerUnit] = useState("0");
  const [saving, setSaving] = useState(false);

  const {
    data: ingredients = [],
    isLoading,
    refetch: refetchIngredients,
  } = useQuery<Ingredient[]>({
    queryKey: ["ingredients"],
    queryFn: async () => {
      const response = await api.get("/ingredients/");
      return response.data;
    },
  });

  const {
    data: movements = [],
    refetch: refetchMovements,
  } = useQuery<StockMovement[]>({
    queryKey: ["stock-movements"],
    queryFn: async () => {
      const response = await api.get("/stock-movements/");
      return response.data;
    },
  });

  async function handleCreateIngredient(e: FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Informe o nome do ingrediente.");
      return;
    }

    try {
      setSaving(true);

      await api.post("/ingredients/", {
        name,
        unit,
        current_stock: currentStock,
        minimum_stock: minimumStock,
        cost_per_unit: costPerUnit,
        active: true,
      });

      toast.success("Ingrediente cadastrado com sucesso!");

      setName("");
      setUnit("kg");
      setCurrentStock("0");
      setMinimumStock("0");
      setCostPerUnit("0");

      await refetchIngredients();
      await refetchMovements();
    } catch (error: any) {
      console.error(error?.response?.data);
      toast.error("Não foi possível cadastrar o ingrediente.");
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) {
    return <p>Carregando estoque...</p>;
  }

  async function handleDeleteIngredient(id: number) {
  const confirmed = confirm("Deseja realmente excluir este ingrediente?");

  if (!confirmed) return;

  try {
    await api.delete(`/ingredients/${id}/`);

    toast.success("Ingrediente excluído com sucesso!");

    await refetchIngredients();
    await refetchMovements();
  } catch (error: any) {
    console.error(error?.response?.data);

    toast.error(
      error?.response?.data?.detail ||
        "Não foi possível excluir este ingrediente."
    );
  }
}

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Estoque</h1>
        <p className="text-muted-foreground">
          Controle de ingredientes e estoque mínimo
        </p>
      </div>

      <div className="rounded-lg border bg-white p-5">
        <h2 className="text-lg font-semibold mb-4">Novo ingrediente</h2>

        <form
          onSubmit={handleCreateIngredient}
          className="grid grid-cols-1 md:grid-cols-6 gap-3"
        >
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Nome</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: carne"
              className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
            />
          </div>



          <div>
            <label className="text-sm font-medium">Unidade</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
            >
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="l">l</option>
              <option value="ml">ml</option>
              <option value="un">un</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Estoque</label>
            <input
              type="number"
              step="0.001"
              min="0"
              value={currentStock}
              onChange={(e) => setCurrentStock(e.target.value)}
              className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Mínimo</label>
            <input
              type="number"
              step="0.001"
              min="0"
              value={minimumStock}
              onChange={(e) => setMinimumStock(e.target.value)}
              className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Custo unit.</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={costPerUnit}
              onChange={(e) => setCostPerUnit(e.target.value)}
              className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="md:col-span-6">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              {saving ? "Salvando..." : "Cadastrar ingrediente"}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-lg border overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Ingrediente</th>
              <th className="p-3 text-left">Estoque atual</th>
              <th className="p-3 text-left">Estoque mínimo</th>
              <th className="p-3 text-left">Custo unitário</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Ações</th>
            </tr>
          </thead>

          <tbody>
            {ingredients.map((ingredient) => {
              const current = Number(ingredient.current_stock);
              const minimum = Number(ingredient.minimum_stock);
              const isLowStock = current <= minimum;

              return (
                <tr key={ingredient.id} className="border-t">
                  <td className="p-3 font-medium">{ingredient.name}</td>

                  <td className="p-3">
                    {ingredient.current_stock} {ingredient.unit}
                  </td>

                  <td className="p-3">
                    {ingredient.minimum_stock} {ingredient.unit}
                  </td>

                  <td className="p-3">
                    R$ {Number(ingredient.cost_per_unit).toFixed(2)} /{" "}
                    {ingredient.unit}
                  </td>

                  <td className="p-3">
                    {isLowStock ? (
                      <span className="text-red-600 font-semibold">
                        ⚠️ Estoque baixo
                      </span>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        ✅ OK
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => handleDeleteIngredient(ingredient.id)}
                      className="rounded-lg bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"
                    >
                      🗑️ Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Últimas movimentações</h2>

        <div className="rounded-lg border overflow-hidden bg-white">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Data</th>
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-left">Ingrediente</th>
                <th className="p-3 text-left">Quantidade</th>
                <th className="p-3 text-left">Observação</th>
              </tr>
            </thead>

            <tbody>
              {movements.map((movement) => (
                <tr key={movement.id} className="border-t">
                  <td className="p-3">
                    {new Date(movement.created_at).toLocaleString("pt-BR")}
                  </td>

                  <td className="p-3">
                    {movement.movement_type === "in" ? (
                      <span className="font-semibold text-green-600">
                        🟢 Entrada
                      </span>
                    ) : (
                      <span className="font-semibold text-red-600">
                        🔴 Saída
                      </span>
                    )}
                  </td>

                  <td className="p-3">{movement.ingredient_name}</td>
                  <td className="p-3">{movement.quantity}</td>
                  <td className="p-3">{movement.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}