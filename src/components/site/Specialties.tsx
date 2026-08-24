import { Brain, Heart, Monitor, Sparkles, Sun, User, Users, Waves } from "lucide-react";
import { Accent, Kicker, MotionDiv, Section, Title } from "./shared";

const specialties = [
  {
    icon: Waves,
    title: "Ansiedade",
    text: "Espaço para compreender os gatilhos e encontrar formas próprias de lidar com ela no dia a dia.",
  },
  {
    icon: Heart,
    title: "Autoestima",
    text: "Um processo para ressignificar a autocrítica e fortalecer a relação com você mesmo.",
  },
  {
    icon: Users,
    title: "Relacionamentos",
    text: "Reflexão sobre vínculos, limites e comunicação — do namoro à vida familiar.",
  },
  {
    icon: Sparkles,
    title: "Autoconhecimento",
    text: "Um convite a olhar para dentro com curiosidade e ampliar a consciência sobre si.",
  },
  {
    icon: Brain,
    title: "Estresse e esgotamento",
    text: "Aprender a reconhecer sinais e construir uma rotina mais sustentável.",
  },
  {
    icon: Sun,
    title: "Desenvolvimento pessoal",
    text: "Clarear valores, objetivos e caminhos — com acompanhamento contínuo.",
  },
  {
    icon: User,
    title: "Terapia individual",
    text: "Sessões individuais, com escuta personalizada ao seu momento de vida.",
  },
  {
    icon: Monitor,
    title: "Terapia online",
    text: "Atendimento por videochamada, com o mesmo cuidado, ética e sigilo.",
  },
];

export function Specialties() {
  return (
    <Section id="especialidades" tone="soft">
      <div className="mx-auto max-w-2xl text-center">
        <Kicker>Especialidades</Kicker>
        <Title center>
          Como posso te <Accent>acompanhar</Accent>
        </Title>
        <p className="mt-4 text-muted-foreground">
          Temas centrais da vida emocional que podem ser explorados em terapia.
        </p>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {specialties.map((s, i) => (
          <MotionDiv key={s.title} delay={i * 0.05}>
            <article className="group h-full rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-olive-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </article>
          </MotionDiv>
        ))}
      </div>
    </Section>
  );
}
