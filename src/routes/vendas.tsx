import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { api } from "@/services/api";
import type { PaymentMethod, Product, Sale } from "@/types";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Loading, ErrorBox, EmptyState } from "@/components/States";
import { formatBRL, formatDateTime } from "@/lib/format";
import { toast } from "sonner"

export const Route = createFileRoute("/vendas")({
  component: SalesPage,
});

const PAYMENTS: { value: PaymentMethod; label: string }[] = [
  { value: "pix", label: "PIX" },
  { value: "money", label: "Dinheiro" },
  { value: "card", label: "Cartão" },
];

function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [payment, setPayment] = useState<PaymentMethod>("pix");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      const [s, p] = await Promise.all([
        api.get<Sale[] | { results: Sale[] }>("sales/"),
        api.get<Product[] | { results: Product[] }>("products/"),
      ]);
      const salesData = Array.isArray(s.data) ? s.data : s.data.results ?? [];
      const productsData = Array.isArray(p.data)
        ? p.data
        : p.data.results ?? [];
      setSales(salesData);
      setProducts(productsData);
      const activeProducts = productsData.filter((p) => p.active);
      if (!productId && activeProducts.length) {
        setProductId(String(activeProducts[0].id));
      }

    } catch {
      setError("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!productId) {
      setFormError("Selecione um produto.");
      return;
    }
    setSubmitting(true);
    try {
  await api.post("sales/", {
    payment_method: payment,
    items: [{ product: Number(productId), quantity }],
  });

  toast.success("Venda registrada com sucesso!");

  setQuantity(1);
  setPayment("pix");
  await load();
} catch (err: any) {
  console.error("Erro ao registrar venda:", err?.response?.data);

  const message =
    err?.response?.data?.error ||
    err?.response?.data?.detail ||
    "Não foi possível registrar a venda.";

  toast.error(message);
 } finally {
  setSubmitting(false);
 }
}

  return (
    <div>
      <PageHeader
        title="Vendas"
        description="Registre vendas e acompanhe o histórico"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 lg:col-span-1 h-fit">
          <h2 className="text-lg font-semibold mb-4">Nova venda</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Produto</label>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Selecione...</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {formatBRL(p.price)} {p.active ? "" : "(Inativo)"}
                      </option>
                    ))}
              </select>
            </div>
            <div>
                <label className="text-sm font-medium">Quantidade</label>
                <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Subtotal:{" "}
                  <span className="font-semibold text-foreground">
                    {formatBRL(
                     Number(
                        products.find((p) => p.id === Number(productId))?.price ?? 0
                      ) * quantity
                    )}
                  </span>
                </p>
            </div>
            <div>
              <label className="text-sm font-medium">Forma de pagamento</label>
              <select
                value={payment}
                onChange={(e) => setPayment(e.target.value as PaymentMethod)}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {PAYMENTS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
            {formError && <ErrorBox message={formError} />}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 transition"
            >
              {submitting ? "Registrando..." : "Registrar venda"}
            </button>
          </form>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden">
          <div className="px-5 py-4 border-b">
            <h2 className="text-lg font-semibold">Histórico</h2>
          </div>
          {loading ? (
            <Loading />
          ) : error ? (
            <div className="p-5">
              <ErrorBox message={error} />
            </div>
          ) : sales.length === 0 ? (
            <EmptyState message="Nenhuma venda registrada." />
          ) : (
            <div className="divide-y">
              {sales.map((sale) => (
                <div key={sale.id} className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">Venda #{sale.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(sale.created_at)} ·{" "}
                        {PAYMENTS.find((p) => p.value === sale.payment_method)
                          ?.label ?? sale.payment_method}
                      </p>
                    </div>
                    <p className="font-semibold text-emerald-600">
                      {formatBRL(sale.total)}
                    </p>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-0.5 mt-2">
                    {sale.items?.map((it, i) => (
                      <li key={i}>
                        {it.quantity}× {it.product_name ?? `Produto ${it.product}`}{" "}
                        {it.subtotal != null && `— ${formatBRL(it.subtotal)}`}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
