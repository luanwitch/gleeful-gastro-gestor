// Shared TypeScript types for the restaurant MVP

export interface Product {
  id: number;
  category: number | null;
  category_name?: string | null;
  name: string;
  price: string | number;
  active: boolean;
  created_at: string;
}

export interface SaleItem {
  product: number;
  product_name?: string;
  quantity: number;
  unit_price?: string | number;
  subtotal?: string | number;
}

export type PaymentMethod = "pix" | "money" | "card";

export interface Sale {
  id: number;
  payment_method: PaymentMethod;
  total: string | number;
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
  amount: string | number;
  expense_date: string;
  created_at: string;
}

export interface DashboardSummary {
  total_sales: number;
  total_revenue: number;
  total_expenses: number;
  net_profit: number;
  average_ticket: number;
  best_seller: {
    product__name: string;
    total_sold: number;
  } | null;
}

export interface SalesPerDay {
  day: string;
  total: number;
}

export interface DashboardSummary {
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