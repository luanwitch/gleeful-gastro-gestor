import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { formatBRL } from "@/lib/format";

type SaleItem = {
  id: number;
  product: number;
  product_name: string;
  quantity: number;
  unit_price: string;
  subtotal: string;
};

type SaleReport = {
  id: number;
  payment_method: string;
  total: string;
  created_at: string;
  items: SaleItem[];
};

export function SalesReport() {
  const {
    data: sales = [],
    isLoading,
    isError,
    error,
  } = useQuery<SaleReport[]>({
    queryKey: ["sales-report"],
    queryFn: async () => {
      const response = await api.get("reports/sales/");
      return response.data;
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <p>Carregando relatório de vendas...</p>
      </div>
    );
  }

  if (isError) {
    console.error("Erro ao carregar relatório de vendas:", error);

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Relatório de Vendas</h1>

        <p className="mt-4 text-red-600 font-semibold">
          Erro ao carregar relatório de vendas.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Verifique se o backend está rodando e se o endpoint
          {" "}
          /api/reports/sales/
          {" "}
          está funcionando.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Relatório de Vendas</h1>
        <p className="text-muted-foreground">
          Histórico detalhado das vendas realizadas
        </p>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Data</th>
              <th className="p-3 text-left">Pagamento</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Itens</th>
            </tr>
          </thead>

          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-muted-foreground"
                >
                  Nenhuma venda encontrada.
                </td>
              </tr>
            ) : (
              sales.map((sale) => (
                <tr key={sale.id} className="border-t align-top">
                  <td className="p-3">
                    {new Date(sale.created_at).toLocaleString()}
                  </td>

                  <td className="p-3 uppercase">
                    {sale.payment_method}
                  </td>

                  <td className="p-3 font-semibold">
                    {formatBRL(Number(sale.total))}
                  </td>

                  <td className="p-3">
                    {sale.items.map((item) => (
                      <div key={item.id}>
                        {item.product_name} — {item.quantity}x{" "}
                        ({formatBRL(Number(item.subtotal))})
                      </div>
                    ))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}