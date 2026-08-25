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
    a: "[PREENCHER: duração da sessão e frequência recomendada — formato sugerido: “Sessões de 50 minutos, com frequência semanal, definida junto na conversa inicial.” A clínica costuma trabalhar com 50 min; confirmar o formato da profissional antes de publicar.]",
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
    a: "[PREENCHER: política de valores da profissional — formato sugerido: “Os valores são informados na conversa inicial, de forma transparente e sem surpresas”, seguido do valor da sessão/pacotes se a cliente autorizar publicar. Não inventar números.]",
  },
  {
    q: "Você atende adolescentes ou crianças?",
    a: "[PREENCHER: definir com a profissional se atende menores de idade. Se sim, informar faixa etária (ex.: adolescentes a partir de 14 anos) e como funciona a autorização/acompanhamento dos responsáveis. Se não atender, sugerir: “No momento, o atendimento é destinado a adultos.”]",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" tone="cream" className="border-t border-earth/10">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Kicker>06 · Dúvidas</Kicker>
            <Title>
              Perguntas <Accent>frequentes</Accent>
            </Title>
            <p className="mt-6 max-w-xs leading-relaxed text-earth/70">
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

        {/* lista editorial indexada */}
        <div className="lg:col-span-8">
          <div className="border-t border-earth/10">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-earth/10">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="group grid w-full grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-5 py-7 text-left sm:grid-cols-[3rem_1fr_auto] sm:gap-x-8"
                    >
                      <span
                        aria-hidden="true"
                        className={`font-display text-xs tabular-nums transition-colors duration-300 ${
                          isOpen
                            ? "text-olive-deep"
                            : "text-earth/40 group-hover:text-olive-deep/70"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-display text-[1.25rem] leading-snug tracking-[-0.01em] transition-colors duration-300 sm:text-[1.45rem] ${
                          isOpen ? "text-olive-deep" : "group-hover:text-earth/75"
                        }`}
                      >
                        {f.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`justify-self-end font-display text-[1.6rem] leading-none transition-transform duration-300 ${
                          isOpen
                            ? "rotate-45 text-olive-deep"
                            : "text-earth/35 group-hover:text-earth/60"
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
                        transition={{ duration: 0.32, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-[2.25rem_1fr] gap-x-5 pb-8 sm:grid-cols-[3rem_1fr] sm:gap-x-8">
                          <span aria-hidden="true" />
                          <p className="max-w-2xl text-[15px] leading-relaxed text-earth/70">
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
