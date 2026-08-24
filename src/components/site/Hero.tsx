import { motion } from "framer-motion";
import { CalendarHeart, Monitor, ShieldCheck, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-therapist.jpg";
import { site } from "@/config/site";
import { Accent } from "./shared";
import { fadeUp } from "./motion";

export function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sand via-background to-background" />
      <div className="absolute -top-8 -left-32 -z-10 h-80 w-80 rounded-full bg-olive-soft blur-3xl opacity-70" />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-olive/40 bg-card px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" /> {site.tagline}
          </span>
          <h1 className="mt-6 font-display text-[2.6rem] leading-[1.08] sm:text-5xl md:text-6xl">
            Um espaço seguro para cuidar de você, com <Accent>acolhimento</Accent> e{" "}
            <Accent>presença</Accent>.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Atendimento psicológico humanizado para ansiedade, autoestima, relacionamentos e
            desenvolvimento pessoal — online e presencial.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#agendamento"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:shadow-primary/35"
            >
              <CalendarHeart className="h-4 w-4" /> Agendar conversa inicial
            </a>
            <a
              href="#sobre"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold transition hover:bg-secondary/50"
            >
              Conheça meu trabalho
            </a>
          </div>
          <div className="mt-9 flex items-center gap-6 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" /> Sigilo profissional
            </span>
            <span className="flex items-center gap-1.5">
              <Monitor className="h-4 w-4 text-primary" /> Online &amp; presencial
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md md:max-w-none"
        >
          <div className="overflow-hidden rounded-t-[10rem] rounded-b-3xl shadow-2xl shadow-earth/20 ring-1 ring-earth/10">
            {/* [PREENCHER FOTO: substituir src/assets/hero-therapist.jpg por retrato
                editorial real da profissional — pose profissional, luz natural suave.
                Proporção 4/5 (retrato), foco no rosto/ombros, crop central. */}
            <img
              src={heroImg}
              alt="Retrato da psicóloga em ambiente acolhedor"
              width={1400}
              height={1750}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3.5 shadow-xl sm:flex">
            <p className="text-xs font-medium text-muted-foreground">
              Atendimento online e presencial
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
