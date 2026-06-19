import { Inventory } from '@/pages/Inventory'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/inventory')({
  component: Inventory,
})

