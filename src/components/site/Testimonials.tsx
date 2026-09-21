import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { isPlaceholder, testimonials } from "@/config/site";
import { Accent, Kicker, MotionDiv, Section, Title } from "./shared";

function initials(name: string): string {
  if (isPlaceholder(name)) return "";
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Carrossel editorial de depoimentos — cartões com contraste acolhedor (#f3efe7),
 * borda delicada (#d8cdbd) e aspas em terracota (#8a542f).
 */
export function Testimonials() {
  const total = testimonials.length;
  const [index, setIndex] = useState(0);

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  const current = testimonials[index];
  const placeholderText = isPlaceholder(current.text);
  const letters = initials(current.name);

  return (
    <Section id="depoimentos" tone="cream" className="border-t border-border">
      <div className="max-w-2xl">
        <Kicker>05 · Depoimentos</Kicker>
        <Title>
          Experiências em <Accent>primeira pessoa</Accent>
        </Title>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-earth/80">
          Espaço reservado para relatos reais, publicados somente com autorização expressa. Por
          sigilo ético, as identidades são sempre preservadas.
        </p>
      </div>

      <MotionDiv className="mt-16 pt-6 sm:mt-20">
        {/* Card em destaque com fundo suave e borda marcada em #a38e79 */}
        <div
          style={{ backgroundColor: "#faf8f3", borderColor: "#a38e79", borderWidth: "1.5px" }}
          className="relative mx-auto max-w-3xl rounded-2xl border bg-paper p-8 sm:p-12 shadow-md"
        >
          {/* Aspas decorativas em tom terracota vibrante (#8a542f) com font-weight encorpado */}
          <span
            aria-hidden="true"
            style={{ color: "#8a542f", fontWeight: 700, opacity: 1 }}
            className="absolute top-4 left-6 font-display text-[5rem] font-bold leading-none select-none sm:top-6 sm:left-8 sm:text-[6rem]"
          >
            &ldquo;
          </span>

          <div aria-live="polite" className="relative min-h-[14rem] sm:min-h-[12rem] pt-8 sm:pt-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote
                  style={{ color: placeholderText ? undefined : "#39372f" }}
                  className={`font-display text-[clamp(1.35rem,2.6vw,1.95rem)] leading-[1.5] tracking-[-0.015em] ${
                    placeholderText ? "text-destructive/85 italic" : "text-earth"
                  }`}
                >
                  {current.text}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                  <span
                    aria-hidden="true"
                    style={{ backgroundColor: "#3f4824", color: "#ffffff" }}
                    className="grid h-12 w-12 place-items-center rounded-full bg-primary font-display text-sm font-semibold text-white shadow-xs"
                  >
                    {letters || <Quote className="h-4 w-4" strokeWidth={1.5} />}
                  </span>
                  <span>
                    <span
                      style={{ color: "#39372f" }}
                      className="block text-sm font-semibold text-earth"
                    >
                      {current.name}
                    </span>
                    {current.role ? (
                      <span className="mt-0.5 block text-xs text-earth/60">{current.role}</span>
                    ) : null}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        {/* Controles — contador editorial + setas */}
        <div
          className="mt-10 flex items-center justify-center gap-6"
          role="group"
          aria-label="Navegar entre depoimentos"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              prev();
            }
            if (e.key === "ArrowRight") {
              e.preventDefault();
              next();
            }
          }}
        >
          <button
            type="button"
            onClick={prev}
            aria-label="Depoimento anterior"
            style={{ backgroundColor: "#f3efe7", borderColor: "#d8cdbd", color: "#39372f" }}
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-cream text-earth transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white focus-visible:border-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          <p
            aria-hidden="true"
            className="font-display text-sm tabular-nums tracking-[0.2em] text-earth/60 font-medium"
          >
            {String(index + 1).padStart(2, "0")}
            <span className="mx-1.5 text-border">/</span>
            {String(total).padStart(2, "0")}
          </p>

          <button
            type="button"
            onClick={next}
            aria-label="Próximo depoimento"
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-cream text-earth transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white focus-visible:border-primary"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </MotionDiv>
    </Section>
  );
}
