import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

/**
 * Tipagem do ingrediente retornado pela API:
 * GET /api/ingredients/
 *
 * Esse type representa cada item da lista de ingredientes.
 */
type Ingredient = {
  id: number;
  name: string;
  unit: string;
  current_stock: string;
  minimum_stock: string;
  cost_per_unit: string | number;
  active: boolean;
};

/**
 * Tipagem da movimentação de estoque retornada pela API:
 * GET /api/stock-movements/
 *
 * movement_type:
 * - "in"  = entrada de estoque
 * - "out" = saída de estoque
 */
type StockMovement = {
  id: number;
  ingredient_name: string;
  movement_type: "in" | "out";
  quantity: string;
  notes: string;
  created_at: string;
};

export function Inventory() {
  /**
   * Consulta os ingredientes cadastrados.
   *
   * useQuery<Ingredient[]> informa ao TypeScript que essa query
   * retorna uma lista de ingredientes.
   */
  const { data: ingredients = [], isLoading } = useQuery<Ingredient[]>({
    queryKey: ["ingredients"],
    queryFn: async () => {
      const response = await api.get("/ingredients/");
      return response.data;
    },
  });

  /**
   * Consulta o histórico de movimentações do estoque.
   *
   * useQuery<StockMovement[]> informa ao TypeScript que essa query
   * retorna uma lista de movimentações.
   */
  const { data: movements = [] } = useQuery<StockMovement[]>({
    queryKey: ["stock-movements"],
    queryFn: async () => {
      const response = await api.get("/stock-movements/");
      return response.data;
    },
  });

  if (isLoading) {
    return <p>Carregando estoque...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Estoque</h1>
        <p className="text-muted-foreground">
          Controle de ingredientes e estoque mínimo
        </p>
      </div>

      {/* Tabela de ingredientes */}
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Ingrediente</th>
              <th className="p-3 text-left">Estoque atual</th>
              <th className="p-3 text-left">Estoque mínimo</th>
              <th className="p-3 text-left">Custo unitário</th>
              <th className="p-3 text-left">Status</th>
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
                      R$ {Number(ingredient.cost_per_unit).toFixed(2)} / {ingredient.unit}
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Tabela de movimentações */}
      <div>
        <h2 className="text-xl font-bold mb-4">Últimas movimentações</h2>

        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                //Colunas
                <th className="p-3 text-left">Data</th>
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-left">Ingrediente</th>
                <th className="p-3 text-left">Quantidade</th>
                <th className="p-3 text-left">Observação</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {movements.map((movement) => (
                <tr key={movement.id} className="border-t">
                  <td className="p-3">
                    {new Date(movement.created_at).toLocaleString()}
                  </td>

                  <td className="p-3">
                    {movement.movement_type === "in"
                      ? "⬆ Entrada"
                      : "⬇ Saída"}
                  </td>

                  <td className="p-3">{movement.ingredient_name}</td>

                  <td className="p-3">{movement.quantity}</td>

                  <td className="p-3">{movement.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}