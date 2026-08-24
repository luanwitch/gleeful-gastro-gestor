import { Clock, HeartHandshake, Lock, Monitor, ShieldCheck } from "lucide-react";
import { MotionDiv, Section } from "./shared";

const benefits = [
  { icon: HeartHandshake, label: "Atendimento humanizado" },
  { icon: ShieldCheck, label: "Espaço seguro e sem julgamentos" },
  { icon: Lock, label: "Sigilo profissional" },
  { icon: Monitor, label: "Online e presencial" },
  { icon: Clock, label: "Horários flexíveis" },
];

export function Benefits() {
  return (
    <Section id="beneficios">
      <MotionDiv>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {benefits.map((b) => (
            <li
              key={b.label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 py-6 text-center shadow-sm"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-olive-soft text-primary">
                <b.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium">{b.label}</span>
            </li>
          ))}
        </ul>
      </MotionDiv>
    </Section>
  );
}
