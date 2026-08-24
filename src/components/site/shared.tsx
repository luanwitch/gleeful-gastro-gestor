import { fadeUp } from "./motion";
import type { ReactNode } from "react";

export function Section({
  id,
  children,
  tone,
}: {
  id?: string;
  children: ReactNode;
  tone?: "soft" | "sand";
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-20 sm:py-28 ${
        tone === "soft"
          ? "bg-gradient-to-b from-olive-soft/40 to-background"
          : tone === "sand"
            ? "bg-sand"
            : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">
      {children}
    </span>
  );
}

/** Palavra em destaque editorial — serifada itálica, estilo dos posts da marca. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-display font-medium text-primary italic">{children}</em>;
}

export function Title({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <h2
      className={`mt-4 font-display text-3xl leading-[1.15] sm:text-4xl md:text-[2.75rem] ${
        center ? "mx-auto max-w-2xl text-center" : ""
      }`}
    >
      {children}
    </h2>
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
