import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { api } from "@/services/api";
import type { Expense, ExpenseCategory } from "@/types";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Loading, ErrorBox, EmptyState } from "@/components/States";
import { formatBRL, formatDate } from "@/lib/format";
import { getMe } from "@/services/user";

export const Route = createFileRoute("/despesas")({
  component: ExpensesPage,
});

const CATEGORIES: { value: ExpenseCategory; label: string }[] = [
  { value: "food", label: "Alimentos" },
  { value: "rent", label: "Aluguel" },
  { value: "employee", label: "Funcionários" },
  { value: "water", label: "Água" },
  { value: "energy", label: "Energia" },
  { value: "other", label: "Outros" },
];

function ExpensesPage() {
  const navigate = useNavigate();

useEffect(() => {
  async function checkPermission() {
    try {
      const user = await getMe();

      if (!user.is_staff && !user.is_superuser) {
        navigate({ to: "/" });
      }
    } catch {
      navigate({ to: "/login" });
    }
  }

  checkPermission();
}, [navigate]);

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("food");
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  async function load() {
    try {
      setLoading(true);

      const { data } = await api.get<Expense[] | { results: Expense[] }>(
        "expenses/"
      );

      setExpenses(Array.isArray(data) ? data : data.results ?? []);
    } catch {
      setError("Erro ao carregar despesas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function resetForm() {
    setDescription("");
    setAmount("");
    setCategory("food");
    setExpenseDate(new Date().toISOString().slice(0, 10));
    setEditingExpense(null);
    setFormError(null);
  }

  function handleEdit(expense: Expense) {
    setEditingExpense(expense);
    setDescription(expense.description);
    setCategory(expense.category);
    setAmount(String(expense.amount));
    setExpenseDate(expense.expense_date);
    setFormError(null);
  }

  async function handleDelete(id: number) {
    if (!confirm("Deseja excluir esta despesa?")) return;

    try {
      await api.delete(`expenses/${id}/`);
      await load();
    } catch {
      alert("Não foi possível excluir a despesa.");
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    const payload = {
      description,
      category,
      amount,
      expense_date: expenseDate,
    };

    try {
      if (editingExpense) {
        await api.put(`expenses/${editingExpense.id}/`, payload);
      } else {
        await api.post("expenses/", payload);
      }

      resetForm();
      await load();
    } catch {
      setFormError(
        editingExpense
          ? "Não foi possível atualizar a despesa."
          : "Não foi possível cadastrar a despesa."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Despesas"
        description="Registre todos os custos operacionais"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 lg:col-span-1 h-fit">
          <h2 className="text-lg font-semibold mb-4">
            {editingExpense ? "Editar despesa" : "Nova despesa"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Descrição</label>
              <input
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ex: Compra de arroz"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Valor (R$)</label>
              <input
                required
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="120.00"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Data</label>
              <input
                required
                type="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {formError && <ErrorBox message={formError} />}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 transition"
            >
              {submitting
                ? "Salvando..."
                : editingExpense
                  ? "Atualizar despesa"
                  : "Cadastrar despesa"}
            </button>

            {editingExpense && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition"
              >
                Cancelar edição
              </button>
            )}
          </form>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden">
          <div className="px-5 py-4 border-b">
            <h2 className="text-lg font-semibold">Cadastradas</h2>
          </div>

          {loading ? (
            <Loading />
          ) : error ? (
            <div className="p-5">
              <ErrorBox message={error} />
            </div>
          ) : expenses.length === 0 ? (
            <EmptyState message="Nenhuma despesa cadastrada." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 font-medium">Descrição</th>
                    <th className="px-5 py-3 font-medium">Categoria</th>
                    <th className="px-5 py-3 font-medium">Valor</th>
                    <th className="px-5 py-3 font-medium">Data</th>
                    <th className="px-5 py-3 font-medium text-right">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {expenses.map((ex) => (
                    <tr key={ex.id} className="border-t">
                      <td className="px-5 py-3 font-medium">
                        {ex.description}
                      </td>

                      <td className="px-5 py-3 text-muted-foreground">
                        {CATEGORIES.find((c) => c.value === ex.category)
                          ?.label ?? ex.category}
                      </td>

                      <td className="px-5 py-3 text-red-600">
                        {formatBRL(ex.amount)}
                      </td>

                      <td className="px-5 py-3 text-muted-foreground">
                        {formatDate(ex.expense_date)}
                      </td>

                      <td className="px-5 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(ex)}
                            className="rounded-lg border px-3 py-1 hover:bg-muted"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => handleDelete(ex.id)}
                            className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}