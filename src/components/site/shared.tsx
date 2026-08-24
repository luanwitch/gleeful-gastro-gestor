import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { fadeUp } from "./motion";

type Tone = "cream" | "paper" | "mist" | "earth" | "deep";

const toneBg: Record<Tone, string> = {
  cream: "bg-cream",
  paper: "bg-paper",
  mist: "bg-mist",
  earth: "bg-earth text-cream",
  deep: "bg-earth-deep text-cream",
};

/**
 * Seção com fundo alternado — cria o ritmo editorial entre blocos.
 * `pad` permite variar a densidade de cada bloco (whitespace intencional).
 */
export function Section({
  id,
  children,
  tone = "paper",
  className = "",
  pad = "py-24 sm:py-32",
}: {
  id?: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
  pad?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 ${toneBg[tone]} ${className}`}>
      <div className={`mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 ${pad}`}>{children}</div>
    </section>
  );
}

/** Kicker/eyebrow editorial. Use `light` sobre fundos escuros. */
export function Kicker({ children, light }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{children}</p>;
}

/** Palavra/frase em destaque — serifada itálica. */
export function Accent({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <em className={`font-display italic ${light ? "text-mist" : "text-olive-deep"}`}>{children}</em>
  );
}

/** Título de seção — serifado. `lg` para seções de maior peso hierárquico. */
export function Title({
  children,
  center,
  light,
  size = "md",
  as: Tag = "h2",
}: {
  children: ReactNode;
  center?: boolean;
  light?: boolean;
  size?: "md" | "lg";
  as?: "h1" | "h2" | "h3";
}) {
  const scale =
    size === "lg" ? "text-[clamp(2.35rem,4.6vw,3.75rem)]" : "text-[clamp(1.95rem,3.4vw,2.9rem)]";
  return (
    <Tag
      className={`mt-6 font-display ${scale} leading-[1.06] tracking-[-0.025em] ${
        light ? "text-cream" : ""
      } ${center ? "mx-auto max-w-2xl text-center" : ""}`}
    >
      {children}
    </Tag>
  );
}

export function MotionDiv({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Marcador [PREENCHER] padronizado — nunca deixar dado fictício passar despercebido. */
export function Filler({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-destructive">{children}</strong>;
}
