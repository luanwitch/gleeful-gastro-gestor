import { createFileRoute } from '@tanstack/react-router'
import { SalesReport } from "@/pages/SalesReport";

/**Rota criada do React */
export const Route = createFileRoute('/reports/sales')({
  component: SalesReport,
})

