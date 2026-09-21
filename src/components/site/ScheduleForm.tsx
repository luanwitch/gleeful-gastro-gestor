import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { isPlaceholder, site, whatsappReady, whatsappUrl } from "@/config/site";
import { trackScheduleSubmit, trackWhatsAppClick } from "@/lib/analytics";
import { Accent, Filler, Kicker, MotionDiv, Section } from "./shared";

const modalidades = ["Online", "Presencial"] as const;
const periodos = ["Manhã", "Tarde", "Noite", "Sem preferência"] as const;

export function ScheduleForm() {
  const [nome, setNome] = useState("");
  const [modalidade, setModalidade] = useState<string>("Online");
  const [periodo, setPeriodo] = useState<string>("Sem preferência");
  const [mensagem, setMensagem] = useState("");
  const [consentimento, setConsentimento] = useState(false);
  const [erro, setErro] = useState("");

  const emailOk = !isPlaceholder(site.contact.email);

  /** Corpo comum da mensagem — usada no WhatsApp e no fallback de e-mail. */
  function montarMensagem(): string {
    const linhas = [
      site.whatsappMessages.scheduling,
      "",
      `Nome: ${nome.trim()}`,
      `Modalidade: ${modalidade}`,
      `Melhor período: ${periodo}`,
    ];
    if (mensagem.trim()) {
      linhas.push(`Mensagem: ${mensagem.trim()}`);
    }
    return linhas.join("\n");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) {
      setErro("Por favor, informe seu nome.");
      return;
    }
    if (!consentimento) {
      setErro("Para continuar, é preciso concordar com a Política de Privacidade.");
      return;
    }
    setErro("");
    const mensagemPronta = montarMensagem();

    if (whatsappReady) {
      window.open(whatsappUrl(mensagemPronta), "_blank", "noopener,noreferrer");
      toast.success("Abrindo o WhatsApp com seus dados…");
    } else if (emailOk) {
      const subject = encodeURIComponent("Agendamento pelo site");
      const body = encodeURIComponent(mensagemPronta);
      window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
      toast.success("Abrindo seu aplicativo de e-mail com os dados preenchidos…");
    } else {
      toast.error(
        "O número de WhatsApp ainda não foi configurado — preencha em src/config/site.ts.",
      );
      return;
    }

    trackScheduleSubmit({
      modalidade,
      periodo,
      canal: whatsappReady ? "whatsapp" : "email",
    });
  }

  return (
    <Section id="agendamento" tone="cream" className="border-t border-border" pad="py-28 sm:py-36">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-14">
        {/* Pitch de conversão */}
        <div className="lg:col-span-5">
          <Kicker>07 · Agendamento</Kicker>
          <h2 className="mt-6 font-display text-[clamp(2.35rem,4.6vw,3.75rem)] leading-[1.05] tracking-[-0.025em] text-earth">
            Vamos <Accent>conversar?</Accent>
          </h2>
          <p className="mt-7 max-w-md leading-relaxed text-earth/80">
            Preencha o formulário e sua mensagem chega pronta no meu WhatsApp. Sem compromisso: é
            uma conversa inicial para nos conhecermos e tirar suas dúvidas.
          </p>

          <ul className="mt-9 space-y-3.5 text-sm text-earth/85">
            {[
              "Retorno pessoal o mais breve possível",
              "Conversa inicial sem compromisso",
              "Sigilo garantido desde o primeiro contato",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3.5">
                <span
                  aria-hidden="true"
                  style={{ backgroundColor: "#8a542f" }}
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-11 space-y-3 border-t border-border pt-8 text-sm">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-earth/60 uppercase">
              Outros canais
            </p>
            {whatsappReady ? (
              <a
                href={whatsappUrl(site.whatsappMessages.scheduling)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("outros-canais")}
                className="block text-earth/85 underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                WhatsApp — atendimento direto
              </a>
            ) : (
              <p className="text-earth/85">
                WhatsApp: <Filler>[PREENCHER: WhatsApp]</Filler>
              </p>
            )}
            {emailOk ? (
              <a
                href={`mailto:${site.contact.email}`}
                className="block break-all text-earth/85 underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                {site.contact.email}
              </a>
            ) : (
              <p className="text-earth/85">
                E-mail: <Filler>[PREENCHER: e-mail profissional]</Filler>
              </p>
            )}
          </div>
        </div>

        {/* Formulário em card destacado (#faf8f3) com borda delicada (#d8cdbd) */}
        <MotionDiv delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              backgroundColor: "#faf8f3",
              borderColor: "#a38e79",
              borderWidth: "1px",
              boxShadow: "0 12px 36px -6px rgba(57, 55, 47, 0.12)",
            }}
            className="rounded-2xl border bg-paper p-6 text-earth shadow-md sm:p-10"
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
                className="field-input resize-none"
              />
            </div>

            {/* Consentimento LGPD */}
            <div className="mt-8">
              <label htmlFor="ag-consentimento" className="flex cursor-pointer items-start gap-3">
                <input
                  id="ag-consentimento"
                  name="consentimento"
                  type="checkbox"
                  required
                  checked={consentimento}
                  onChange={(e) => setConsentimento(e.target.checked)}
                  aria-describedby={erro && !consentimento ? "ag-nome-erro" : undefined}
                  className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-primary"
                />
                <span className="text-xs leading-relaxed text-earth/75">
                  Li e concordo com a{" "}
                  <Link
                    to="/privacidade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-earth underline underline-offset-2 hover:text-primary"
                  >
                    Política de Privacidade
                  </Link>{" "}
                  e autorizo o uso dos dados acima apenas para retorno deste contato.
                </span>
              </label>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#3f4824",
                color: "#ffffff",
                borderColor: "#3f4824",
                boxShadow: "0 6px 18px 0 rgba(63, 72, 36, 0.38)",
              }}
              className="btn btn-primary group mt-9 w-full shadow-md"
            >
              {whatsappReady ? "Enviar pelo WhatsApp" : emailOk ? "Enviar por e-mail" : "Enviar"}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <p className="mt-4 text-center text-xs text-earth/60">
              {whatsappReady
                ? "Ao enviar, o WhatsApp abrirá com sua mensagem já preenchida."
                : emailOk
                  ? "Ao enviar, seu aplicativo de e-mail abrirá com a mensagem pronta."
                  : "Envio temporariamente indisponível — configuração pendente."}
            </p>
          </form>
        </MotionDiv>
      </div>
    </Section>
  );
}
