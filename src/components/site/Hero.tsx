import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero-therapist.jpg";
import { reveal } from "./motion";

/** Fatos institucionais — apenas compromissos de conduta já afirmados no site. */
const meta = ["Online e presencial", "Sigilo profissional", "Sem compromisso"];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-cream">
      <div className="mx-auto max-w-7xl px-5 pt-32 sm:px-8 sm:pt-44 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Texto — escada tipográfica */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <motion.p initial="hidden" animate="show" variants={reveal} className="eyebrow">
              Psicoterapia • Online e presencial
            </motion.p>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={reveal}
              transition={{ delay: 0.08 }}
              className="mt-9 font-display text-[clamp(2.9rem,7.6vw,6rem)] leading-[0.99] font-normal tracking-[-0.03em]"
            >
              <span className="block">Um espaço</span>
              <span className="block">para você se escutar</span>
              <span className="block pt-1 pl-[7%] text-olive-deep italic">com mais calma.</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              variants={reveal}
              transition={{ delay: 0.16 }}
              className="mt-9 max-w-md text-[17px] leading-relaxed text-earth/70"
            >
              Atendimento psicológico para quem busca compreender a ansiedade, fortalecer a
              autoestima e viver relações mais leves — no seu tempo, no seu ritmo.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={reveal}
              transition={{ delay: 0.24 }}
              className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <a href="#agendamento" className="btn btn-primary group">
                Agendar conversa inicial
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a href="#sobre" className="link-line group">
                Conhecer meu trabalho
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.div>
          </div>

          {/* Composição fotográfica — objeto ancorado à direita */}
          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[24rem] self-end xl:-mr-12 lg:col-span-5 lg:mx-0 lg:max-w-none"
          >
            {/* eco do arco — contorno deslocado, sem preenchimento */}
            <div
              aria-hidden="true"
              className="absolute -top-5 -right-5 h-full w-full rounded-t-full rounded-b-[6px] border border-olive/35 sm:-top-6 sm:-right-6"
            />
            {/* marca de registro editorial */}
            <span
              aria-hidden="true"
              className="absolute -top-10 right-2 hidden font-display text-xl text-olive-deep/50 select-none sm:block"
            >
              +
            </span>

            <figure className="group relative overflow-hidden rounded-t-full rounded-b-[6px] shadow-xl shadow-earth/15 ring-1 ring-earth/10">
              {/* [PREENCHER FOTO: substituir src/assets/hero-therapist.jpg por retrato
                  editorial real da profissional — luz natural suave, foco rosto/ombros,
                  proporção 4/5, crop central. O layout já está preparado. */}
              <img
                src={heroImg}
                alt="Retrato da psicóloga em ambiente acolhedor"
                width={1400}
                height={1750}
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </figure>

            {/* nota de processo sobreposta — tratamento de etiqueta, não card */}
            <a
              href="#processo"
              className="group absolute -bottom-9 left-3 flex max-w-[15.5rem] items-start gap-3 rounded-[2px] bg-paper/95 p-4 pr-5 shadow-md shadow-earth/10 ring-1 ring-earth/10 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 sm:-left-10 sm:p-5"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-mist font-display text-sm text-olive-deep"
              >
                01
              </span>
              <span>
                <span className="block text-[10px] font-semibold tracking-[0.18em] text-olive-deep uppercase">
                  Primeiro passo
                </span>
                <span className="mt-1 block font-display text-[15px] leading-snug">
                  A conversa inicial é sem compromisso.
                </span>
              </span>
            </a>
          </motion.div>
        </div>

        {/* linha de base — meta editorial + convite ao scroll */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={reveal}
          transition={{ delay: 0.4 }}
          className="mt-28 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-earth/15 py-7 lg:mt-36"
        >
          <ul
            aria-label="Informações sobre o atendimento"
            className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[11px] font-semibold tracking-[0.18em] text-earth/55 uppercase"
          >
            {meta.map((item) => (
              <li key={item} className="flex items-center gap-7">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-olive/60" />
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#sobre"
            aria-label="Rolar para a próxima seção"
            className="group inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-earth/55 uppercase transition-colors duration-300 hover:text-earth"
          >
            Role para conhecer
            <ArrowDown
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
