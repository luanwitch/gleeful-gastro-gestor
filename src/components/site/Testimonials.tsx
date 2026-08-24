import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { isPlaceholder, testimonials } from "@/config/site";
import { Accent, Kicker, Section, Title } from "./shared";

function initials(name: string): string {
  if (isPlaceholder(name)) return "";
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || testimonials.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const t = testimonials[index];
  const avatarLetters = initials(t.name);

  return (
    <Section id="depoimentos">
      <div className="mx-auto max-w-2xl text-center">
        <Kicker>Depoimentos</Kicker>
        <Title center>
          Palavras de quem <Accent>confiou</Accent> no processo
        </Title>
        <p className="mt-4 text-sm text-muted-foreground">
          Depoimentos publicados com autorização. Por sigilo ético, identidades preservadas.
        </p>
      </div>

      <div
        className="relative mx-auto mt-12 max-w-2xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div
          aria-live="polite"
          className="min-h-[260px] overflow-hidden rounded-3xl bg-gradient-to-br from-olive-soft/70 to-sand p-8 shadow-lg ring-1 ring-earth/5 sm:p-12"
        >
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              {avatarLetters ? (
                <span
                  aria-hidden="true"
                  className="grid h-14 w-14 place-items-center rounded-full bg-primary font-display text-lg font-semibold text-primary-foreground"
                >
                  {avatarLetters}
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  className="grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary"
                >
                  <Quote className="h-6 w-6" />
                </span>
              )}
              <div className="mt-5 flex justify-center gap-1 text-primary" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" fill="currentColor" />
                ))}
              </div>
              <blockquote className="mt-5 font-display text-xl leading-relaxed sm:text-2xl">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-6 text-sm font-medium text-muted-foreground">
                {isPlaceholder(t.name) ? "[PREENCHER: iniciais da paciente]" : <>— {t.name}</>}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((item, i) => (
            <button
              key={i}
              type="button"
              aria-current={i === index ? "true" : undefined}
              aria-label={`Mostrar depoimento ${i + 1} de ${testimonials.length}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-7 bg-primary" : "w-2.5 bg-border hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
