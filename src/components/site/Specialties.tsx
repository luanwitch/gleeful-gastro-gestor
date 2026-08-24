import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Accent, Kicker, MotionDiv, Section, Title } from "./shared";
import { listItem } from "./motion";

const areas = [
  {
    title: "Ansiedade",
    text: "Espaço para compreender os gatilhos, acalmar a mente e encontrar formas próprias de lidar com as exigências do dia a dia.",
  },
  {
    title: "Autoestima",
    text: "Um processo para ressignificar a autocrítica e construir uma relação mais gentil e realista com você mesmo(a).",
  },
  {
    title: "Relacionamentos",
    text: "Reflexão sobre vínculos, limites e comunicação — para viver conexões mais saudáveis, do círculo íntimo ao trabalho.",
  },
  {
    title: "Desenvolvimento pessoal",
    text: "Um convite a olhar para dentro com curiosidade: clarear valores, objetivos e caminhos com acompanhamento contínuo.",
  },
];

export function Specialties() {
  return (
    <Section id="atendimento" tone="cream" className="border-t border-earth/10">
      <div className="max-w-2xl">
        <Kicker>02 · Áreas de atendimento</Kicker>
        <Title>
          Quando a vida pede uma <Accent>pausa</Accent>
        </Title>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-earth/70">
          Temas centrais da vida emocional que podem ser explorados em terapia — sempre no seu ritmo
          e a partir da sua história.
        </p>
      </div>

      <MotionDiv className="mt-16 lg:mt-20">
        <ol className="divide-y divide-earth/10 border-y border-earth/10">
          {areas.map((area, i) => (
            <motion.li
              key={area.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={listItem}
              transition={{ delay: i * 0.07 }}
              className="group"
            >
              <div className="grid gap-3 px-1 py-10 transition-all duration-300 group-hover:bg-paper sm:grid-cols-[5rem_minmax(0,17rem)_1fr_auto] sm:items-baseline sm:gap-8 sm:px-4 sm:py-12 sm:group-hover:px-7">
                <span
                  aria-hidden="true"
                  className="font-display text-[2.1rem] leading-none tabular-nums text-olive/35 transition-colors duration-300 group-hover:text-olive-deep"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[clamp(1.65rem,2.4vw,2.15rem)] leading-tight tracking-[-0.015em] transition-colors duration-300 group-hover:text-olive-deep">
                  {area.title}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-earth/65">{area.text}</p>
                <span
                  aria-hidden="true"
                  className="hidden h-10 w-10 items-center justify-center self-center rounded-full border border-earth/15 text-earth/40 transition-all duration-300 group-hover:border-olive-deep group-hover:bg-olive-deep group-hover:text-cream sm:flex"
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </motion.li>
          ))}
        </ol>
      </MotionDiv>

      <p className="mt-8 text-sm text-earth/60">
        Não encontrou o tema que procura? A primeira conversa é o melhor lugar para perguntar.{" "}
        <a href="#agendamento" className="link-line ml-1">
          Fale comigo
        </a>
      </p>
    </Section>
  );
}
