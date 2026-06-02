import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { api } from "@/services/api";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Loading, ErrorBox, EmptyState } from "@/components/States";
import { formatDate } from "@/lib/format";
import { IMaskInput } from "react-imask";

type Customer = {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  document: string | null;
  active: boolean;
  notes: string | null;
  created_at: string;
};

export const Route = createFileRoute("/clientes")({
  component: ClientesPage,
});

function ClientesPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");
  const [notes, setNotes] = useState("");
  const [active, setActive] = useState(true);

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    try {
      setLoading(true);
      const { data } = await api.get<Customer[] | { results: Customer[] }>(
        "customers/"
      );
      setCustomers(Array.isArray(data) ? data : data.results ?? []);
    } catch {
      setError("Erro ao carregar clientes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function resetForm() {
    setName("");
    setPhone("");
    setEmail("");
    setDocument("");
    setNotes("");
    setActive(true);
    setEditingCustomer(null);
  }

  function handleEdit(customer: Customer) {
    setEditingCustomer(customer);
    setName(customer.name);
    setPhone(customer.phone ?? "");
    setEmail(customer.email ?? "");
    setDocument(customer.document ?? "");
    setNotes(customer.notes ?? "");
    setActive(customer.active);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      name,
      phone,
      email,
      document,
      notes,
      active,
    };

    try {
      if (editingCustomer) {
        await api.put(`customers/${editingCustomer.id}/`, payload);
        toast.success("Cliente atualizado com sucesso!");
      } else {
        await api.post("customers/", payload);
        toast.success("Cliente cadastrado com sucesso!");
      }

      resetForm();
      await load();
    } catch {
      toast.error("Erro ao salvar cliente.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Deseja excluir este cliente?")) return;

    try {
      await api.delete(`customers/${id}/`);
      toast.success("Cliente excluído com sucesso!");
      await load();
    } catch {
      toast.error("Erro ao excluir cliente.");
    }
  }

  return (
    <div>
      <PageHeader
        title="Clientes"
        description="Cadastre e gerencie os clientes do restaurante"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 lg:col-span-1 h-fit">
          <h2 className="text-lg font-semibold mb-4">
            {editingCustomer ? "Editar cliente" : "Novo cliente"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
              placeholder="Nome"
            />

            <IMaskInput
            mask="(00) 00000-0000"
            value={phone}
            onAccept={(value) => setPhone(String(value))}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
            placeholder="Telefone"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
              placeholder="Email"
            />

            <IMaskInput
            mask="000.000.000-00"
            value={document}
            onAccept={(value) => setDocument(String(value))}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
            placeholder="CPF"
            />

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
              placeholder="Observações"
            />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
              Cliente ativo
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              {submitting
                ? "Salvando..."
                : editingCustomer
                  ? "Atualizar cliente"
                  : "Cadastrar cliente"}
            </button>

            {editingCustomer && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full rounded-lg border px-4 py-2 text-sm font-medium"
              >
                Cancelar edição
              </button>
            )}
          </form>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden">
          <div className="px-5 py-4 border-b">
            <h2 className="text-lg font-semibold">Clientes cadastrados</h2>
          </div>

          {loading ? (
            <Loading />
          ) : error ? (
            <div className="p-5">
              <ErrorBox message={error} />
            </div>
          ) : customers.length === 0 ? (
            <EmptyState message="Nenhum cliente cadastrado." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3">Nome</th>
                    <th className="px-5 py-3">Telefone</th>
                    <th className="px-5 py-3">Email</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Criado em</th>
                    <th className="px-5 py-3 text-right">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-t">
                      <td className="px-5 py-3 font-medium">
                        {customer.name}
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {customer.phone ?? "—"}
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {customer.email ?? "—"}
                      </td>
                      <td className="px-5 py-3">
                        {customer.active ? "Ativo" : "Inativo"}
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {formatDate(customer.created_at)}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(customer)}
                            className="rounded-lg border px-3 py-1 hover:bg-muted"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => handleDelete(customer.id)}
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