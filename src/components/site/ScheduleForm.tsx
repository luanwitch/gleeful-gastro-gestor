import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { isPlaceholder, whatsappReady, whatsappUrl, site } from "@/config/site";
import { Accent, Filler, Kicker, MotionDiv, Section } from "./shared";

const modalidades = ["Online", "Presencial"] as const;
const periodos = ["Manhã", "Tarde", "Noite", "Sem preferência"] as const;

export function ScheduleForm() {
  const [nome, setNome] = useState("");
  const [modalidade, setModalidade] = useState<string>("Online");
  const [periodo, setPeriodo] = useState<string>("Sem preferência");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const emailOk = !isPlaceholder(site.contact.email);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) {
      setErro("Por favor, informe seu nome.");
      return;
    }
    if (!whatsappReady) {
      toast.error(
        "O número de WhatsApp ainda não foi configurado — preencha em src/config/site.ts.",
      );
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

  return (
    <Section id="agendamento" tone="deep" pad="py-28 sm:py-36">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-14">
        {/* Pitch de conversão — direto no fundo escuro */}
        <div className="lg:col-span-5">
          <Kicker light>07 · Agendamento</Kicker>
          <h2 className="mt-6 font-display text-[clamp(2.35rem,4.6vw,3.75rem)] leading-[1.05] tracking-[-0.025em]">
            Vamos <Accent light>conversar?</Accent>
          </h2>
          <p className="mt-7 max-w-md leading-relaxed text-cream/75">
            Preencha o formulário e sua mensagem chega pronta no meu WhatsApp. Sem compromisso: é
            uma conversa inicial para nos conhecermos e tirar suas dúvidas.
          </p>

          <ul className="mt-9 space-y-3.5 text-sm text-cream/80">
            {[
              "Retorno pessoal o mais breve possível",
              "Conversa inicial sem compromisso",
              "Sigilo garantido desde o primeiro contato",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3.5">
                <span aria-hidden="true" className="mt-2 h-px w-5 shrink-0 bg-mist/60" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-11 space-y-3 border-t border-cream/15 pt-8 text-sm">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-cream/55 uppercase">
              Outros canais
            </p>
            {whatsappReady ? (
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-cream/85 underline-offset-4 transition-colors hover:text-cream hover:underline"
              >
                WhatsApp — atendimento direto
              </a>
            ) : (
              <p className="text-cream/85">
                WhatsApp: <Filler>[PREENCHER: WhatsApp]</Filler>
              </p>
            )}
            {emailOk ? (
              <a
                href={`mailto:${site.contact.email}`}
                className="block break-all text-cream/85 underline-offset-4 transition-colors hover:text-cream hover:underline"
              >
                {site.contact.email}
              </a>
            ) : (
              <p className="text-cream/85">
                E-mail: <Filler>[PREENCHER: e-mail profissional]</Filler>
              </p>
            )}
          </div>
        </div>

        {/* Formulário — único objeto elevado da banda */}
        <MotionDiv delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-[6px] bg-paper p-6 text-earth shadow-2xl shadow-black/30 sm:p-10"
          >
            <div>
              <label htmlFor="ag-nome" className="field-label">
                Seu nome <span aria-hidden="true">*</span>
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
                className="field-input"
              />
              {erro && (
                <p
                  id="ag-nome-erro"
                  role="alert"
                  className="mt-2 text-xs font-medium text-destructive"
                >
                  {erro}
                </p>
              )}
            </div>

            <fieldset className="mt-8">
              <legend className="field-label">Modalidade</legend>
              <div className="grid grid-cols-2 gap-2">
                {modalidades.map((m) => (
                  <label
                    key={m}
                    className={`chip text-center ${modalidade === m ? "chip-selected" : ""}`}
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

            <fieldset className="mt-8">
              <legend className="field-label">Melhor horário</legend>
              <div className="flex flex-wrap gap-2">
                {periodos.map((p) => (
                  <label key={p} className={`chip ${periodo === p ? "chip-selected" : ""}`}>
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

            <div className="mt-8">
              <label htmlFor="ag-msg" className="field-label">
                Mensagem <span className="normal-case tracking-normal">(opcional)</span>
              </label>
              <textarea
                id="ag-msg"
                name="mensagem"
                rows={3}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Conte em poucas palavras o que você busca"
                className={`${"field-input"} resize-none`}
              />
            </div>

            <button type="submit" className="btn btn-primary group mt-9 w-full">
              Enviar pelo WhatsApp
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <p className="mt-4 text-center text-xs text-earth/55">
              Ao enviar, o WhatsApp abrirá com sua mensagem já preenchida.
            </p>
          </form>
        </MotionDiv>
      </div>
    </Section>
  );
}
