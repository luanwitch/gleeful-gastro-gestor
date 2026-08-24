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
 * Carrossel editorial de depoimentos — um relato por vez, tipografia grande,
 * controles discretos e anúncio acessível das trocas (aria-live).
 * Suporta 3–5 depoimentos definidos em src/config/site.ts.
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
    <Section id="depoimentos" tone="mist" className="border-t border-earth/10">
      <div className="max-w-2xl">
        <Kicker>05 · Depoimentos</Kicker>
        <Title>
          Experiências em <Accent>primeira pessoa</Accent>
        </Title>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-earth/60">
          Espaço reservado para relatos reais, publicados somente com autorização expressa. Por
          sigilo ético, as identidades são sempre preservadas.
        </p>
      </div>

      <MotionDiv className="mt-16">
        {/* palco do depoimento */}
        <div className="relative mx-auto max-w-3xl">
          <span
            aria-hidden="true"
            className="absolute -top-14 left-0 font-display text-[7rem] leading-none text-olive/40 select-none sm:-top-20 sm:text-[9rem]"
          >
            &ldquo;
          </span>

          <div aria-live="polite" className="relative min-h-[16rem] sm:min-h-[13rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="pt-10 sm:pt-12"
              >
                <blockquote
                  className={`font-display text-[clamp(1.55rem,3vw,2.3rem)] leading-[1.45] tracking-[-0.015em] ${
                    placeholderText ? "text-destructive/85 italic" : "text-earth/90"
                  }`}
                >
                  {current.text}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-earth/10 pt-7">
                  <span
                    aria-hidden="true"
                    className={`grid h-12 w-12 place-items-center rounded-full font-display text-sm ${
                      letters
                        ? "bg-olive-deep text-cream"
                        : "bg-paper text-olive-deep ring-1 ring-earth/15"
                    }`}
                  >
                    {letters || <Quote className="h-4 w-4" strokeWidth={1.5} />}
                  </span>
                  <span>
                    <span
                      className={`block text-sm font-semibold ${
                        isPlaceholder(current.name) ? "text-destructive" : ""
                      }`}
                    >
                      {isPlaceholder(current.name)
                        ? "[PREENCHER: iniciais da paciente]"
                        : current.name}
                    </span>
                    {current.role ? (
                      <span className="mt-0.5 block text-xs text-earth/55">{current.role}</span>
                    ) : null}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        {/* controles discretos — contador editorial + setas */}
        <div
          className="mt-12 flex items-center justify-center gap-6"
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
            className="grid h-11 w-11 place-items-center rounded-full border border-earth/20 text-earth/60 transition-all duration-300 hover:border-olive-deep hover:bg-olive-deep hover:text-cream focus-visible:border-olive-deep"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          <p
            aria-hidden="true"
            className="font-display text-sm tabular-nums tracking-[0.2em] text-earth/50"
          >
            {String(index + 1).padStart(2, "0")}
            <span className="mx-1.5 text-earth/30">/</span>
            {String(total).padStart(2, "0")}
          </p>

          <button
            type="button"
            onClick={next}
            aria-label="Próximo depoimento"
            className="grid h-11 w-11 place-items-center rounded-full border border-earth/20 text-earth/60 transition-all duration-300 hover:border-olive-deep hover:bg-olive-deep hover:text-cream focus-visible:border-olive-deep"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </MotionDiv>

      <p className="mx-auto mt-14 max-w-xl text-center text-xs leading-relaxed text-earth/50">
        Estrutura preparada para 3–5 depoimentos. Substituir os marcadores em{" "}
        <code className="rounded bg-paper px-1.5 py-0.5">src/config/site.ts</code> antes de
        publicar.
      </p>
    </Section>
  );
}
