import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, whatsappReady, whatsappUrl } from "@/config/site";
import { trackWhatsAppClick } from "@/lib/analytics";
import { Accent, Kicker, Section, Title } from "./shared";

const faqs = [
  {
    q: "Como funciona a terapia?",
    a: "A terapia é um processo colaborativo. Em encontros regulares, conversamos sobre o que você traz — pensamentos, emoções, histórias e relações — buscando mais compreensão e formas de viver com mais leveza. Não existe fórmula pronta: o processo respeita o seu ritmo.",
  },
  {
    q: "Quanto tempo dura uma sessão?",
    a: "Sessões com duração média de 50 minutos, com frequência geralmente semanal, ajustada conforme a necessidade clínica.",
  },
  {
    q: "O atendimento pode ser online?",
    a: "Sim. O atendimento online é feito por videochamada, com a mesma ética, cuidado e sigilo do presencial. Basta um espaço tranquilo e conexão com internet.",
  },
  {
    q: "Como faço para agendar?",
    a: "É simples: preencha o formulário na seção de agendamento ou envie uma mensagem direta. Vou responder pessoalmente para combinarmos o melhor dia e horário.",
  },
  {
    q: "Qual o valor da consulta?",
    a: "Valores e pacotes disponíveis diretamente com a terapeuta no momento do contacto ou agendamento.",
  },
  {
    q: "Você atende adolescentes ou crianças?",
    a: "O atendimento clínico é voltado para adultos e adolescentes (a partir de 14 anos, com alinhamento e autorização dos responsáveis), garantindo um espaço acolhedor e confidencial para cada etapa de desenvolvimento.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" tone="cream" className="border-t border-border">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Kicker>06 · Dúvidas</Kicker>
            <Title>
              Perguntas <Accent>frequentes</Accent>
            </Title>
            <p className="mt-6 max-w-xs leading-relaxed text-earth/75">
              Não encontrou o que procurava? Me chame — respondo pessoalmente.
            </p>
            <a
              href={whatsappReady ? whatsappUrl(site.whatsappMessages.faq) : "#agendamento"}
              {...(whatsappReady ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => {
                if (whatsappReady) trackWhatsAppClick("faq");
              }}
              className="link-line group mt-8"
            >
              Tirar dúvidas
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>

        {/* Lista de cards/acordeões com contraste real e bordas marcadas em #a38e79 */}
        <div className="lg:col-span-8">
          <div className="space-y-3.5">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  style={{
                    backgroundColor: isOpen ? "#ffffff" : "#faf8f3",
                    borderColor: isOpen ? "#3f4824" : "#a38e79",
                    borderWidth: "1.5px",
                  }}
                  className="rounded-xl border transition-all duration-300 p-5 sm:p-6 shadow-sm"
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="group flex w-full items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        <span
                          aria-hidden="true"
                          style={{ color: "#8a542f", fontWeight: 700 }}
                          className="font-display text-sm font-bold tabular-nums"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          style={{ color: isOpen ? "#3f4824" : "#39372f", fontWeight: isOpen ? 600 : 500 }}
                          className="font-display text-[1.12rem] leading-snug tracking-[-0.01em] transition-colors duration-300 sm:text-[1.28rem]"
                        >
                          {f.q}
                        </span>
                      </div>
                      <span
                        aria-hidden="true"
                        style={{ color: isOpen ? "#8a542f" : "#8a542f" }}
                        className={`shrink-0 font-display text-2xl leading-none transition-transform duration-300 ${
                          isOpen ? "rotate-45 text-accent" : "text-earth/40 group-hover:text-accent"
                        }`}
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-button-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border/70">
                          <p
                            style={{ color: "#39372f" }}
                            className="pt-4 text-sm leading-relaxed text-earth/80 sm:pt-5 sm:pl-10"
                          >
                            {f.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
