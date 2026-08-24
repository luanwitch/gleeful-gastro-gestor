import { ArrowRight } from "lucide-react";
import { Accent, Kicker, MotionDiv, Section, Title } from "./shared";

const steps = [
  {
    number: "01",
    title: "Primeiro contato",
    text: "Você me escreve pelo formulário ou pelo WhatsApp, contando em poucas linhas o que procura. Eu respondo pessoalmente, o mais breve possível.",
  },
  {
    number: "02",
    title: "Conversa inicial",
    text: "Conversamos — online ou presencialmente — para nos conhecermos, alinhar expectativas e esclarecer dúvidas sobre o processo. Sem compromisso.",
  },
  {
    number: "03",
    title: "Acompanhamento",
    text: "Se fizer sentido para você, definimos juntos dia, horário e frequência das sessões. O ritmo do processo é sempre respeitado.",
  },
];

export function HowItWorks() {
  return (
    <Section id="processo" tone="earth">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Kicker light>03 · O processo</Kicker>
            <Title light>
              Como podemos <Accent light>começar</Accent>
            </Title>
            <p className="mt-7 max-w-sm leading-relaxed text-cream/70">
              Começar terapia pode gerar dúvidas — e tudo bem. Este é o caminho simples entre o
              primeiro contato e o início do acompanhamento.
            </p>
            <a href="#agendamento" className="link-line link-line-light group mt-9">
              Dar o primeiro passo
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        <MotionDiv delay={0.1} className="lg:col-span-7">
          <ol className="divide-y divide-cream/12 border-y border-cream/15">
            {steps.map((step) => (
              <li
                key={step.number}
                className="group grid gap-4 py-10 transition-colors duration-300 sm:grid-cols-[6.5rem_1fr] sm:gap-8 sm:py-12"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-[3.25rem] leading-none tabular-nums text-cream/20 transition-all duration-500 group-hover:translate-x-1 group-hover:text-mist/70 sm:text-[4rem]"
                >
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-[1.35rem] text-cream sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-cream/65">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-7 text-sm text-cream/55 italic">
            Não há pressão nem compromisso em qualquer etapa — você decide no seu tempo.
          </p>
        </MotionDiv>
      </div>
    </Section>
  );
}
