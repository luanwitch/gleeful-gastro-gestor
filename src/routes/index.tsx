import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { isAuthenticated } from "@/services/auth";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { api } from "@/services/api";
import type { DashboardSummary, SalesPerDay, Ingredient } from "@/types";
import { Card, StatCard } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Loading, ErrorBox } from "@/components/States";
import { formatBRL, formatDate } from "@/lib/format";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [perDay, setPerDay] = useState<SalesPerDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState("month");
  const [lowstock, setLowStock] = useState<Ingredient[]>([])

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: "/login" });
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [s, p, lowstock] = await Promise.all([
          api.get<DashboardSummary>(`dashboard/summary/?period=${period}`),
          api.get<SalesPerDay[]>(`dashboard/sales-per-day/?period=${period}`),
          api.get<Ingredient[]>("ingredients/low_stock/"),
        ]);

        if (!cancelled) {
          setSummary(s.data);
          setPerDay(p.data);
          setLowStock(lowstock.data);
        }
      } catch (e) {
        if (!cancelled) {
          setError("Não foi possível carregar o dashboard.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [navigate, period]);

  async function handleExportPDF() {
    const response = await api.get("reports/dashboard/");
    const report = response.data;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Relatório Restaurante MVP", 14, 20);

    doc.setFontSize(11);
    doc.text(`Gerado em: ${new Date().toLocaleString()}`, 14, 28);

    doc.setFontSize(14);
    doc.text("Resumo Financeiro", 14, 42);

    autoTable(doc, {
      startY: 48,
      head: [["Indicador", "Valor"]],
      body: [
        ["Faturamento total", formatBRL(report.summary.total_revenue)],
        ["Despesas totais", formatBRL(report.summary.total_expenses)],
        ["Lucro líquido", formatBRL(report.summary.net_profit)],
        ["Total de vendas", String(report.summary.total_sales)],
        ["Ticket médio", formatBRL(report.summary.average_ticket)],
        [
          "Mais vendido",
          report.summary.best_seller
            ? `${report.summary.best_seller.product__name} (${report.summary.best_seller.total_sold} unidades)`
            : "—",
        ],
      ],
    });

    const afterSummaryY = (doc as any).lastAutoTable.finalY + 14;

    doc.text("Estoque", 14, afterSummaryY);

    autoTable(doc, {
      startY: afterSummaryY + 6,
      head: [["Ingrediente", "Atual", "Mínimo", "Status"]],
      body: report.ingredients.map((ingredient: any) => [
        ingredient.name,
        `${ingredient.current_stock} ${ingredient.unit}`,
        `${ingredient.minimum_stock} ${ingredient.unit}`,
        ingredient.status === "low_stock" ? "Estoque baixo" : "OK",
      ]),
    });

    const afterStockY = (doc as any).lastAutoTable.finalY + 14;

    doc.text("Movimentações recentes", 14, afterStockY);

    autoTable(doc, {
      startY: afterStockY + 6,
      head: [["Data", "Tipo", "Ingrediente", "Quantidade", "Observação"]],
      body: report.movements.map((movement: any) => [
        new Date(movement.created_at).toLocaleString(),
        movement.movement_type === "in" ? "Entrada" : "Saída",
        movement.ingredient_name,
        movement.quantity,
        movement.notes,
      ]),
    });

    doc.save("relatorio-restaurante.pdf");
  }

  if (loading) return <Loading />;
  if (error) return <ErrorBox message={error} />;
  if (!summary) return null;

  const chartData = perDay.map((d) => ({
    ...d,
    day: formatDate(d.day),
  }));

  return (
    <div className="pb-20 md:pb-0">
      <PageHeader
        title="Dashboard"
        description="Visão geral do desempenho do restaurante"
      />

      <div className="mb-4">
        <button
          onClick={handleExportPDF}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Exportar PDF
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { label: "Hoje", value: "today" },
          { label: "7 dias", value: "7days" },
          { label: "30 dias", value: "30days" },
          { label: "Mês atual", value: "month" },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setPeriod(item.value)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              period === item.value
                ? "bg-primary text-primary-foreground"
                : "border bg-background hover:bg-muted"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
       <StatCard
          label="⚠️ Estoque baixo"
          value={summary?.low_stock_count ?? 0}
          hint={
            lowstock.length > 0
              ? lowstock
                  .slice(0, 3)
                  .map((item) => item.name)
                  .join(", ")
              : "Produtos/ingredientes precisam de reposição"
          }
          accent={lowstock.length > 0 ? "danger" : "success"}
        />

        <StatCard
          label="Faturamento total"
          value={formatBRL(summary.total_revenue)}
          accent="success"
        />

        <StatCard
          label="Despesas totais"
          value={formatBRL(summary.total_expenses)}
          accent="danger"
        />

        <StatCard
          label="Lucro líquido"
          value={formatBRL(summary.net_profit)}
          accent={summary.net_profit >= 0 ? "success" : "danger"}
        />

        <StatCard
          label="Faturamento hoje"
          value={formatBRL(summary.today_revenue)}
          accent="success"
        />

        <StatCard
          label="Lucro hoje"
          value={formatBRL(summary.today_profit)}
          accent={summary.today_profit >= 0 ? "success" : "danger"}
        />

        <StatCard
          label="Faturamento do mês"
          value={formatBRL(summary.month_revenue)}
          accent="primary"
        />

        <StatCard
          label="Lucro do mês"
          value={formatBRL(summary.month_profit)}
          accent={summary.month_profit >= 0 ? "success" : "danger"}
        />

        <StatCard
          label="Total de vendas"
          value={summary.total_sales}
          accent="primary"
        />

        <StatCard
          label="Ticket médio"
          value={formatBRL(summary.average_ticket)}
          accent="primary"
        />

        <StatCard
          label="Mais vendido"
          value={summary.best_seller?.product__name ?? "—"}
          hint={
            summary.best_seller
              ? `${summary.best_seller.total_sold} unidades`
              : undefined
          }
          accent="muted"
        />
      </div>

      <Card className="mt-6 p-5">
        <h2 className="text-lg font-semibold mb-4">Vendas por dia</h2>

        {chartData.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            Sem vendas registradas ainda.
          </p>
        ) : (
          <div className="h-56 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />

                <XAxis dataKey="day" fontSize={12} />

                <YAxis fontSize={12} />

                <Tooltip
                  formatter={(v) => formatBRL(Number(v))}
                  labelStyle={{ color: "#111" }}
                />

                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="oklch(0.55 0.18 250)"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </div>
  );
}