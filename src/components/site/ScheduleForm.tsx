import { useState } from "react";
import { CalendarHeart, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { whatsappUrl } from "@/config/site";
import { Accent, Kicker, MotionDiv, Section, Title } from "./shared";

const modalidades = ["Online", "Presencial"] as const;
const periodos = ["Manhã", "Tarde", "Noite", "Sem preferência"] as const;

export function ScheduleForm() {
  const [nome, setNome] = useState("");
  const [modalidade, setModalidade] = useState<string>("Online");
  const [periodo, setPeriodo] = useState<string>("Sem preferência");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) {
      setErro("Por favor, informe seu nome.");
      return;
    }
    setErro("");
    const linhas = [
      `Olá! Vim pelo site e gostaria de agendar uma conversa inicial.`,
      ``,
      `Nome: ${nome.trim()}`,
      `Modalidade: ${modalidade}`,
      `Melhor período: ${periodo}`,
    ];
    if (mensagem.trim()) {
      linhas.push(`Mensagem: ${mensagem.trim()}`);
    }
    window.open(whatsappUrl(linhas.join("\n")), "_blank", "noopener,noreferrer");
    toast.success("Abrindo o WhatsApp com seus dados…");
  }

  const inputClass =
    "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm placeholder:text-muted-foreground/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  return (
    <Section id="agendamento">
      <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center">
        <MotionDiv>
          <Kicker>Agendamento</Kicker>
          <Title>
            Dê o primeiro passo — é <Accent>simples</Accent>
          </Title>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
            Preencha ao lado e sua mensagem chega pronta no meu WhatsApp. Sem compromisso: é uma
            conversa inicial para nos conhecermos e tirar suas dúvidas.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            {[
              "Retorno pessoal o mais breve possível",
              "Conversa inicial sem compromisso",
              "Sigilo garantido desde o primeiro contato",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                />
                {item}
              </li>
            ))}
          </ul>
        </MotionDiv>

        <MotionDiv delay={0.1}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-earth/10 sm:p-8"
          >
            <div>
              <label htmlFor="ag-nome" className="mb-1.5 block text-sm font-semibold">
                Seu nome{" "}
                <span aria-hidden="true" className="text-destructive">
                  *
                </span>
              </label>
              <input
                id="ag-nome"
                name="nome"
                type="text"
                autoComplete="name"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Como você gostaria de ser chamado(a)"
                aria-invalid={!!erro}
                aria-describedby={erro ? "ag-nome-erro" : undefined}
                className={inputClass}
              />
              {erro && (
                <p
                  id="ag-nome-erro"
                  role="alert"
                  className="mt-1.5 text-xs font-medium text-destructive"
                >
                  {erro}
                </p>
              )}
            </div>

            <fieldset className="mt-5">
              <legend className="mb-1.5 text-sm font-semibold">Modalidade</legend>
              <div className="flex gap-2">
                {modalidades.map((m) => (
                  <label
                    key={m}
                    className={`flex-1 cursor-pointer rounded-xl border px-4 py-2.5 text-center text-sm font-medium transition has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground ${
                      modalidade === m ? "" : "border-border bg-background hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="modalidade"
                      value={m}
                      checked={modalidade === m}
                      onChange={() => setModalidade(m)}
                      className="sr-only"
                    />
                    {m}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-5">
              <legend className="mb-1.5 text-sm font-semibold">Melhor período</legend>
              <div className="flex flex-wrap gap-2">
                {periodos.map((p) => (
                  <label
                    key={p}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground ${
                      periodo === p ? "" : "border-border bg-background hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="periodo"
                      value={p}
                      checked={periodo === p}
                      onChange={() => setPeriodo(p)}
                      className="sr-only"
                    />
                    {p}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-5">
              <label htmlFor="ag-msg" className="mb-1.5 block text-sm font-semibold">
                Mensagem <span className="font-normal text-muted-foreground">(opcional)</span>
              </label>
              <textarea
                id="ag-msg"
                name="mensagem"
                rows={3}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Conte em poucas palavras o que você busca (não é obrigatório)"
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:shadow-primary/35"
            >
              <CalendarHeart className="h-4 w-4" />
              Enviar pelo WhatsApp
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Ao enviar, o WhatsApp abrirá com sua mensagem já preenchida.
            </p>
          </form>
        </MotionDiv>
      </div>
    </Section>
  );
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-[#4c5840] to-earth" />
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl leading-tight text-cream sm:text-4xl md:text-5xl"
        >
          Cuidar da mente também é um ato de <em className="italic">coragem</em>.
        </motion.h2>
        <p className="mx-auto mt-5 max-w-xl text-cream/85">
          Comece hoje a sua jornada de autoconhecimento. Estou aqui para caminhar com você.
        </p>
        <a
          href="#agendamento"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-base font-semibold text-earth shadow-xl transition hover:-translate-y-0.5 hover:bg-white"
        >
          <MessageCircle className="h-5 w-5" /> Agendar conversa inicial
        </a>
      </div>
    </section>
  );
}
