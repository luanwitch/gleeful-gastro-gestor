import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { api } from "@/services/api";
import type { Product } from "@/types";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Loading, ErrorBox, EmptyState } from "@/components/States";
import { formatBRL, formatDate } from "@/lib/format";
import { getMe } from "@/services/user";

export const Route = createFileRoute("/produtos")({
  component: ProductsPage,
});

//Estados: 
function ProductsPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("0");
  const [minStock, setMinStock] = useState("5");
  const [active, setActive] = useState(true);
  const [usesRecipe, setUsesRecipe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [stockProduct, setStockProduct] = useState<Product | null>(null);
  const [stockAmount, setStockAmount] = useState("")
  const [addingStock, setAddingStock] = useState(false);


  useEffect(() => {
    async function checkPermission() {
      try {
        const user = await getMe();

        if (!user.is_staff && !user.is_superuser) {
          navigate({ to: "/" });
        }
      } catch {
        navigate({ to: "/login" });
      }
    }

    checkPermission();
  }, [navigate]);

  async function load(searchTerm = search) {
    try {
      setLoading(true);
      setError(null);

      const params = searchTerm ? { search: searchTerm } : undefined;

      const { data } = await api.get<Product[] | { results: Product[] }>(
        "products/",
        { params }
      );

      setProducts(Array.isArray(data) ? data : data.results ?? []);
    } catch {
      setError("Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      load(search);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);


  //Reset Form: 
  function resetForm() {
    setName("");
    setPrice("");
    setStockQuantity("0");
    setMinStock("5");
    setActive(true);
    setUsesRecipe(false);
    setEditingProduct(null);
    setFormError(null);
  }

  function handleEdit(product: Product) {
    setEditingProduct(product);
    setName(product.name);
    setPrice(String(product.price));
    setStockQuantity(String(product.stock_quantity));
    setMinStock(String(product.min_stock));
    setActive(product.active);
    setUsesRecipe(product.uses_recipe);
    setFormError(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    const payload = {
      name,
      price,
      stock_quantity: Number(stockQuantity),
      min_stock: Number(minStock),
      active,
      uses_recipe: usesRecipe,
      category: null,
    };

    try {
      if (editingProduct) {
        await api.put(`products/${editingProduct.id}/`, payload);
      } else {
        await api.post("products/", payload);
      }

      resetForm();
      await load();
    } catch {
      setFormError(
        editingProduct
          ? "Não foi possível atualizar o produto."
          : "Não foi possível cadastrar o produto."
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleProduct(product: Product) {
    try {
      await api.patch(`products/${product.id}/`, {
        active: !product.active,
      });

      await load();
    } catch {
      alert("Não foi possível atualizar o produto.");
    }
  }

  async function handleAddStock() {
  if (!stockProduct) return;

  const quantity = Number(stockAmount);

  if (!quantity || quantity <= 0) {
    alert("Informe uma quantidade válida.");
    return;
  }

  try {
    setAddingStock(true);

    await api.post(`products/${stockProduct.id}/add_stock/`, {
      quantity,
    });

    setStockProduct(null);
    setStockAmount("");
    await load();
  } catch {
    alert("Não foi possível adicionar estoque.");
  } finally {
    setAddingStock(false);
  }
}

  return (
    <div>
      <PageHeader
        title="Produtos"
        description="Cadastre e gerencie os itens do cardápio"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 lg:col-span-1 h-fit">
          <h2 className="text-lg font-semibold mb-4">
            {editingProduct ? "Editar produto" : "Novo produto"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nome</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
                placeholder="Ex: Prato feito"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Preço (R$)</label>
              <input
                required
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
                placeholder="25.00"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Estoque Atual</label>
              <input
                type="number"
                min="0"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Estoque Mínimo</label>
              <input
                type="number"
                min="0"
                value={minStock}
                onChange={(e) => setMinStock(e.target.value)}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
              />
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="h-4 w-4 rounded"
              />
              Produto ativo
            </label>
            
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={usesRecipe}
                onChange={(e) => setUsesRecipe(e.target.checked)}
                className="h-4 w-4 rounded"
              />
              Utiliza receita
            </label>

            {formError && <ErrorBox message={formError} />}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              {submitting
                ? "Salvando..."
                : editingProduct
                  ? "Atualizar produto"
                  : "Cadastrar produto"}
            </button>

            {editingProduct && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Cancelar edição
              </button>
            )}
          </form>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden">
          <div className="px-5 py-4 border-b space-y-3">
            <h2 className="text-lg font-semibold">Cadastrados</h2>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar produto..."
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
            />
          </div>

          {loading ? (
            <Loading />
          ) : error ? (
            <div className="p-5">
              <ErrorBox message={error} />
            </div>
          ) : products.length === 0 ? (
            <EmptyState message="Nenhum produto cadastrado." />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[1200px] w-full text-sm">
                <thead className="bg-muted/50 text-left text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 font-medium">Nome</th>
                    <th className="px-5 py-3 font-medium">Categoria</th>
                    <th className="px-5 py-3 font-medium">Preço</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Criado em</th>
                    <th className="px-5 py-3 font-medium text-right">Ações</th>
                    <th className="px-5 py-3 font-medium">Estoque</th>
                    <th className="px-5 py-3 font-medium">Mínimo</th>
                    <th className="px-5 py-3 font-medium">Situação</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className="px-5 py-3 font-medium">{p.name}</td>

                      <td className="px-5 py-3 text-muted-foreground">
                        {p.category_name ?? "—"}
                      </td>

                      <td className="px-5 py-3">{formatBRL(p.price)}</td>

                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                            p.active
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {p.active ? "Ativo" : "Inativo"}
                        </span>
                      </td>

                      <td className="px-5 py-3 text-muted-foreground">
                        {formatDate(p.created_at)}
                      </td>

                      <td className="px-5 py-3">
                        <div className="flex justify-end gap-2">
                        <button
                            onClick={() => handleEdit(p)}
                            className="rounded-lg border px-3 py-1 hover:bg-muted"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => setStockProduct(p)}
                            className="rounded-lg bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                          >
                            + Estoque
                          </button>
                          <button
                            onClick={() => toggleProduct(p)}
                            className={`rounded-lg px-3 py-1 text-white ${
                              p.active
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-emerald-500 hover:bg-emerald-600"
                            }`}
                          >
                            {p.active ? "Inativar" : "Ativar"}
                          </button>
                        </div>

                      </td>

                      <td className="px-5 py-3 font-medium">
                        {p.stock_quantity}
                      </td>

                      <td className="px-5 py-3">{p.min_stock}</td>

                      <td className="px-5 py-3">
                        {p.stock_quantity <= p.min_stock ? (
                          <span className="text-red-600 font-semibold">
                            🔴 Estoque baixo
                          </span>
                        ) : (
                          <span className="text-green-600 font-semibold">
                            ✅ OK
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
      {stockProduct && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-full max-w-md rounded-xl bg-background p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">
        Adicionar estoque
      </h2>

      <p className="text-sm text-muted-foreground mb-2">
        Produto: <strong>{stockProduct.name}</strong>
      </p>

      <p className="text-sm text-muted-foreground mb-4">
        Estoque atual: <strong>{stockProduct.stock_quantity}</strong>
      </p>

      <input
        type="number"
        min="1"
        value={stockAmount}
        onChange={(e) => setStockAmount(e.target.value)}
        placeholder="Quantidade"
        className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
      />

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={() => {
            setStockProduct(null);
            setStockAmount("");
          }}
          className="rounded-lg border px-4 py-2 text-sm"
        >
          Cancelar
        </button>

        <button
          onClick={handleAddStock}
          disabled={addingStock}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {addingStock ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  </div>
)}
</div>
  );
}