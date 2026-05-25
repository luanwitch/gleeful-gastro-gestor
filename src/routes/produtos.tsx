import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { api } from "@/services/api";
import type { Product } from "@/types";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Loading, ErrorBox, EmptyState } from "@/components/States";
import { formatBRL, formatDate } from "@/lib/format";

export const Route = createFileRoute("/produtos")({
  component: ProductsPage,
});

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [active, setActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      const { data } = await api.get<Product[] | { results: Product[] }>(
        "products/",
      );
      setProducts(Array.isArray(data) ? data : data.results ?? []);
    } catch {
      setError("Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      await api.post("products/", {
        name,
        price,
        active,
        category: null,
      });
      setName("");
      setPrice("");
      setActive(true);
      await load();
    } catch {
      setFormError("Não foi possível cadastrar o produto.");
    } finally {
      setSubmitting(false);
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
          <h2 className="text-lg font-semibold mb-4">Novo produto</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nome</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="25.00"
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
            {formError && <ErrorBox message={formError} />}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 transition"
            >
              {submitting ? "Salvando..." : "Cadastrar produto"}
            </button>
          </form>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden">
          <div className="px-5 py-4 border-b">
            <h2 className="text-lg font-semibold">Cadastrados</h2>
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
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 font-medium">Nome</th>
                    <th className="px-5 py-3 font-medium">Categoria</th>
                    <th className="px-5 py-3 font-medium">Preço</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Criado em</th>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
