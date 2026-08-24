import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/config/site";
import { Accent, Kicker, Section, Title } from "./shared";

const faqs = [
  {
    q: "Como funciona a terapia?",
    a: "A terapia é um processo colaborativo. Em encontros regulares, conversamos sobre o que você traz — pensamentos, emoções, histórias e relações — buscando mais compreensão e formas de viver com mais leveza. Não existe fórmula pronta: o processo respeita o seu ritmo.",
  },
  {
    q: "Quanto tempo dura uma sessão?",
    a: "As sessões duram em média 50 minutos, geralmente com frequência semanal. A periodicidade pode ser ajustada juntos conforme a sua rotina e as suas necessidades.",
  },
  {
    q: "Você atende online?",
    a: "Sim! O atendimento online é feito por videochamada, com a mesma ética, cuidado e sigilo do atendimento presencial. Basta um espaço tranquilo e uma conexão com internet.",
  },
  {
    q: "Como faço para agendar?",
    a: "É simples: preencha o formulário aqui do site ou mande uma mensagem no WhatsApp. Vou responder o quanto antes para combinarmos o melhor dia e horário.",
  },
  {
    q: "Qual o valor da consulta?",
    a: "[PREENCHER: política de valores da profissional — ex.: valor da sessão avulsa, pacotes mensais e reajustes. Sugestão: informar que os valores são detalhados na conversa inicial.]",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" tone="soft">
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <Kicker>Dúvidas</Kicker>
          <Title>
            Perguntas <Accent>frequentes</Accent>
          </Title>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Não encontrou sua dúvida? Me chame no WhatsApp — respondo pessoalmente.
          </p>
          <a
            href={whatsappUrl("Olá! Tenho uma dúvida sobre o acompanhamento terapêutico.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            <MessageCircle className="h-4 w-4" /> Tirar dúvidas
          </a>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium"
                  >
                    <span>{f.q}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
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
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
