import { useQuery } from "@tanstack/react-query";
import {
  getStockMovements,
  getProductStockMovements,
} from "@/services/api";

interface StockMovement {
  id: number;
  ingredient: number;
  ingredient_name: string;
  movement_type: "in" | "out";
  quantity: string | number;
  notes: string;
  created_at: string;
}

interface ProductStockMovement {
  id: number;
  product: number;
  product_name: string;
  movement_type: "in" | "out";
  quantity: string | number;
  notes: string;
  created_at: string;
}

export default function StockMovementsPage() {
  const { data = [], isLoading, isError } = useQuery<StockMovement[]>({
    queryKey: ["stock-movements"],
    queryFn: getStockMovements,
  });

  const {
  data: productMovements = [],
} = useQuery<ProductStockMovement[]>({
  queryKey: ["product-stock-movements"],
  queryFn: getProductStockMovements,
});

  return (
    <div>
      <h1 className="text-2xl font-bold">Histórico de Estoque</h1>
      <p className="text-sm text-muted-foreground">
        Acompanhe entradas e saídas de ingredientes
      </p>

      <div className="mt-6 rounded-xl border bg-white">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">Movimentações</h2>
        </div>

        <div className="p-4">
          {isLoading && <p>Carregando histórico...</p>}

          {isError && (
            <p className="rounded-md border border-red-200 bg-red-50 p-3 text-red-600">
              Erro ao carregar movimentações.
            </p>
          )}

          {!isLoading && !isError && data.length === 0 && (
            <p>Nenhuma movimentação encontrada.</p>
          )}

          {!isLoading && !isError && data.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="p-2">Data</th>
                    <th className="p-2">Ingrediente</th>
                    <th className="p-2">Tipo</th>
                    <th className="p-2">Quantidade</th>
                    <th className="p-2">Observação</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((movement) => (
                    <tr key={movement.id} className="border-b">
                      <td className="p-2">
                        {new Date(movement.created_at).toLocaleString("pt-BR")}
                      </td>
                      <td className="p-2">{movement.ingredient_name}</td>
                      <td className="p-2">
                        {movement.movement_type === "in" ? "Entrada" : "Saída"}
                      </td>
                      <td className="p-2">{movement.quantity}</td>
                      <td className="p-2">{movement.notes || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="mt-8">
  <h2 className="mb-4 text-lg font-semibold">
    Movimentações de Produtos
  </h2>
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b text-left">
          <th className="p-2">Data</th>
          <th className="p-2">Produto</th>
          <th className="p-2">Tipo</th>
          <th className="p-2">Quantidade</th>
          <th className="p-2">Observação</th>
        </tr>
      </thead>
            <tbody>
              {productMovements.map((movement) => (
                <tr key={movement.id} className="border-b">
                  <td className="p-2">
                    {new Date(movement.created_at).toLocaleString("pt-BR")}
                  </td>

                  <td className="p-2">
                    {movement.product_name}
                  </td>

                  <td className="p-2">
                    {movement.movement_type === "in"
                      ? "Entrada"
                      : "Saída"}
                  </td>

                  <td className="p-2">
                    {movement.quantity}
                  </td>

                  <td className="p-2">
                    {movement.notes || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}