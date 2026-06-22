import { createFileRoute } from '@tanstack/react-router'
import StockMovementsPage from '@/pages/stock-movements'

export const Route = createFileRoute('/stock-movements')({
  component:  StockMovementsPage,
})

