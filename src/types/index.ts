// Shared TypeScript types for the restaurant MVP

export type Money = string | number;

export interface Product {
  id: number;
  category: number | null;
  category_name?: string | null;
  name: string;
  price: Money;
  stock_quantity: number;
  min_stock: number;
  active: boolean;
  created_at: string;
}

export interface SaleItem {
  product: number;
  product_name?: string;
  quantity: number;
  unit_price?: Money;
  subtotal?: Money;
}

export type PaymentMethod = "pix" | "money" | "card";

export interface Sale {
  id: number;
  payment_method: PaymentMethod;
  total: Money;
  created_at: string;
  items: SaleItem[];
}

export type ExpenseCategory =
  | "food"
  | "rent"
  | "employee"
  | "water"
  | "energy"
  | "other";

export interface Expense {
  id: number;
  description: string;
  category: ExpenseCategory;
  amount: Money;
  expense_date: string;
  created_at: string;
}

export interface SalesPerDay {
  day: string;
  total: number;
}

export interface BestSeller {
  product__name: string;
  total_sold: number;
}

export interface DashboardSummary {
  low_stock_count: number;
  total_sales: number;
  total_revenue: number;
  total_expenses: number;
  net_profit: number;
  average_ticket: number;

  today_revenue: number;
  today_expenses: number;
  today_profit: number;

  month_revenue: number;
  month_expenses: number;
  month_profit: number;

  best_seller: {
  product__name: string;
  total_sold: number;
} | null;
  
}

export interface StockMovement {
    id: number;
    ingredient: number;
    ingredient_name: string;
    movement_type: "in" |  "out";
    quantity: string | number;
    notes: string;
    created_at: string;
}

export interface Ingredient {
  id: number;
  name: string;
  unit: string;
  current_stock: string;
  minimum_stock: string;
  cost_per_unit: string | number;
  active: boolean;
}

