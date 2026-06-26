import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { api } from "@/services/api";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Loading, ErrorBox, EmptyState } from "@/components/States";
import { formatDate } from "@/lib/format";
import { IMaskInput } from "react-imask";

type Supplier = {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  document: string | null;
  active: boolean;
  notes: string | null;
  created_at: string;
};

export const Route = createFileRoute("/fornecedores")({
  component: FornecedoresPage,
});

function FornecedoresPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");
  const [notes, setNotes] = useState("");
  const [active, setActive] = useState(true);

  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    try {
      setLoading(true);
      const { data } = await api.get<Supplier[] | { results: Supplier[] }>(
        "suppliers/"
      );
      setSuppliers(Array.isArray(data) ? data : data.results ?? []);
    } catch {
      setError("Erro ao carregar fornecedores.");
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
    setEditingSupplier(null);
  }

  function handleEdit(Supplier: Supplier) {
    setEditingSupplier(Supplier);
    setName(Supplier.name);
    setPhone(Supplier.phone ?? "");
    setEmail(Supplier.email ?? "");
    setDocument(Supplier.document ?? "");
    setNotes(Supplier.notes ?? "");
    setActive(Supplier.active);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    if (!name.trim()) {
    toast.error("Informe o nome do fornecedor.");
    setSubmitting(false);
    return;
  }

  const phoneDigits = phone.replace(/\D/g, "");

  if (phoneDigits.length < 10) {
    toast.error("Informe um telefone válido.");
    setSubmitting(false);
    return;
  }

    const payload = {
      name,
      phone,
      email,
      document,
      notes,
      active,
    };

    try {
      if (editingSupplier) {
        await api.put(`suppliers/${editingSupplier.id}/`, payload);
        toast.success("Fornecedor atualizado com sucesso!");
      } else {
        await api.post("suppliers/", payload);
        toast.success("Fornecedor cadastrado com sucesso!");
      }

      resetForm();
      await load();
    } catch {
      toast.error("Erro ao salvar fornecedor.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Deseja excluir este fornecedor?")) return;

    try {
      await api.delete(`suppliers/${id}/`);
      toast.success("Fornecedor excluído com sucesso!");
      await load();
    } catch {
      toast.error("Erro ao excluir fornecedor.");
    }
  }

  return (
    <div>
      <PageHeader
        title="Fornecedores"
        description="Cadastre e gerencie os fornecedores do restaurante"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 lg:col-span-1 h-fit">
          <h2 className="text-lg font-semibold mb-4">
            {editingSupplier ? "Editar fornecedor" : "Novo Fornecedor"}
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
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm resize-none"
              placeholder="Observações"
            />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
              Fornecedor ativo
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              {submitting
                ? "Salvando..."
                : editingSupplier
                  ? "Atualizar fornecedor"
                  : "Cadastrar fornecedor"}
            </button>

            {editingSupplier && (
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
            <h2 className="text-lg font-semibold">Fornecedores cadastrados</h2>
          </div>

          {loading ? (
            <Loading />
          ) : error ? (
            <div className="p-5">
              <ErrorBox message={error} />
            </div>
          ) : suppliers.length === 0 ? (
            <EmptyState message="Nenhum fornecedor cadastrado." />
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
                  {suppliers.map((supplier) => (
                    <tr key={supplier.id} className="border-t">
                      <td className="px-5 py-3 font-medium">
                        {supplier.name}
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {supplier.phone ?? "—"}
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {supplier.email ?? "—"}
                      </td>
                      <td className="px-5 py-3">
                        {supplier.active ? "Ativo" : "Inativo"}
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {formatDate(supplier.created_at)}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(supplier)}
                            className="rounded-lg border px-3 py-1 hover:bg-muted"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => handleDelete(supplier.id)}
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