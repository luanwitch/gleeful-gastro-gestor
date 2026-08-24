import { CalendarCheck2, MessageSquareText, Sparkles, Video } from "lucide-react";
import { Accent, Kicker, MotionDiv, Section, Title } from "./shared";

const steps = [
  {
    icon: MessageSquareText,
    title: "Primeiro contato",
    text: "Preencha o formulário ou chame no WhatsApp contando, em poucas palavras, o que você busca.",
  },
  {
    icon: CalendarCheck2,
    title: "Conversa inicial",
    text: "Alinhamos expectativas, dúvidas sobre o processo e o melhor dia e horário para você.",
  },
  {
    icon: Video,
    title: "Sessões regulares",
    text: "Encontros semanais ou quinzenais, online ou presenciais, conforme sua rotina.",
  },
  {
    icon: Sparkles,
    title: "Seu processo",
    text: "No seu ritmo, construímos juntos o cuidado com a sua saúde emocional.",
  },
];

export function HowItWorks() {
  return (
    <Section id="como-funciona" tone="sand">
      <div className="mx-auto max-w-2xl text-center">
        <Kicker>Como funciona</Kicker>
        <Title center>
          Simples do primeiro contato à <Accent>sessão</Accent>
        </Title>
      </div>
      <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <MotionDiv key={s.title} delay={i * 0.08}>
            <li className="relative h-full rounded-2xl bg-card p-6 shadow-sm ring-1 ring-earth/5">
              <span
                aria-hidden="true"
                className="absolute -top-3 left-6 rounded-full bg-primary px-2.5 py-0.5 font-display text-xs font-semibold text-primary-foreground"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-olive-soft text-primary">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          </MotionDiv>
        ))}
      </ol>
    </Section>
  );
}
