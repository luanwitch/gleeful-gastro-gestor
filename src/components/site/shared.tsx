import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { fadeUp } from "./motion";

type Tone = "cream" | "paper" | "mist" | "earth" | "deep";

const toneBg: Record<Tone, string> = {
  cream: "bg-cream text-earth",
  paper: "bg-paper text-earth",
  mist: "bg-cream text-earth",
  earth: "bg-cream text-earth",
  deep: "bg-paper text-earth",
};

/**
 * Seção com fundo alternado — cria o ritmo editorial acolhedor entre blocos.
 * Alterna suavemente entre #faf8f3 (paper) e #f3efe7 (cream).
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
    <section
      id={id}
      style={{ backgroundColor: tone === "cream" ? "#ede3d4" : "#faf8f3" }}
      className={`scroll-mt-24 ${toneBg[tone]} ${className}`}
    >
      <div className={`mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 ${pad}`}>{children}</div>
    </section>
  );
}

/** Kicker/eyebrow editorial com terracota acolhedor (#8a542f). */
export function Kicker({ children }: { children: ReactNode; light?: boolean }) {
  return (
    <p className="eyebrow font-bold" style={{ color: "#8a542f", fontWeight: 700 }}>
      {children}
    </p>
  );
}

/** Palavra/frase em destaque — serifada itálica em terracota vibrante (#8a542f) e encorpada. */
export function Accent({ children }: { children: ReactNode; light?: boolean }) {
  return (
    <em
      className="font-display italic font-semibold text-accent"
      style={{ color: "#8a542f", fontWeight: 600 }}
    >
      {children}
    </em>
  );
}

/** Título de seção — serifado com tipografia escura sofisticada (#39372f). */
export function Title({
  children,
  center,
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
      style={{ color: "#39372f" }}
      className={`mt-6 font-display ${scale} leading-[1.06] tracking-[-0.025em] text-earth ${
        center ? "mx-auto max-w-2xl text-center" : ""
      }`}
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
