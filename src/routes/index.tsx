import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
import type { DashboardSummary, SalesPerDay } from "@/types";
import { Card, StatCard } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Loading, ErrorBox } from "@/components/States";
import { formatBRL, formatDate } from "@/lib/format";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [perDay, setPerDay] = useState<SalesPerDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const [s, p] = await Promise.all([
          api.get<DashboardSummary>("dashboard/summary/"),
          api.get<SalesPerDay[]>("dashboard/sales-per-day/"),
        ]);
        if (!cancelled) {
          setSummary(s.data);
          setPerDay(p.data);
        }
      } catch (e) {
        if (!cancelled) setError("Não foi possível carregar o dashboard.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorBox message={error} />;
  if (!summary) return null;

  const chartData = perDay.map((d) => ({
    ...d,
    day: formatDate(d.day),
  }));

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Visão geral do desempenho do restaurante"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
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
