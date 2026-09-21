import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { Accent, Kicker, MotionDiv, Section, Title } from "./shared";

const officePhotos = [
  {
    src: "/consultorio/sala-2.jpg",
    alt: "Consultório — Sofá e poltrona de atendimento",
  },
  {
    src: "/consultorio/cha.jpg",
    alt: "Consultório — Cantinho do chá e café",
  },
  {
    src: "/consultorio/detalhes.jpg",
    alt: "Consultório — Mesa de apoio e detalhes de acolhimento",
  },
  {
    src: "/consultorio/estante.jpg",
    alt: "Consultório — Ambiente com estante de livros",
  },
];

export function About() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const addressReady = !site.contact.addressShort.includes("PREENCHER");

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev === officePhotos.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <Section id="sobre" tone="cream" className="border-t border-border" pad="py-28 sm:py-36">
      <div className="grid items-center gap-20 lg:grid-cols-12 lg:gap-14">
        {/* Fotografia como objeto editorial com slider automático */}
        <MotionDiv className="relative mx-auto w-full max-w-[26rem] lg:col-span-5 lg:mx-0 lg:max-w-none">
          <div
            aria-hidden="true"
            style={{ borderColor: "#a38e79" }}
            className="absolute -top-5 -left-5 h-full w-full rounded-[8px] border"
          />
          <figure
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              style={{
                backgroundColor: "#faf8f3",
                borderColor: "#a38e79",
                borderWidth: "1px",
                boxShadow: "0 10px 30px -5px rgba(57, 55, 47, 0.14)",
              }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[8px] bg-paper shadow-lg ring-2 ring-[#a38e79]/30"
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={currentPhoto}
                  src={officePhotos[currentPhoto].src}
                  alt={officePhotos[currentPhoto].alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover select-none"
                />
              </AnimatePresence>

              {/* Mini-pontos discretos de paginação */}
              <div className="absolute inset-x-0 bottom-3 flex items-center justify-center px-3 z-10">
                <div
                  style={{
                    backgroundColor: "#faf8f3",
                    borderColor: "#a38e79",
                    borderWidth: "1px",
                  }}
                  className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 shadow-sm backdrop-blur-xs"
                  role="tablist"
                  aria-label="Fotos do consultório"
                >
                  {officePhotos.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentPhoto(i)}
                      role="tab"
                      aria-selected={i === currentPhoto}
                      aria-label={`Ver foto ${i + 1} de ${officePhotos.length}`}
                      style={{
                        backgroundColor: i === currentPhoto ? "#3f4824" : "rgba(57, 55, 47, 0.3)",
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === currentPhoto ? "w-4 bg-primary" : "w-1.5 hover:bg-earth/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Marca de registro editorial em terracota vibrante (#8a542f) */}
            <span
              aria-hidden="true"
              style={{ color: "#8a542f", fontWeight: 700 }}
              className="absolute -bottom-9 right-0 font-display text-2xl font-bold select-none"
            >
              +
            </span>

            {/* Legenda editorial da foto */}
            <figcaption className="mt-8 flex items-center justify-between border-t border-border pt-4 text-[10.5px] font-semibold tracking-[0.2em] text-earth/60 uppercase">
              <span>Consultório</span>
              <span>{site.contact.addressShort}</span>
            </figcaption>
          </figure>
        </MotionDiv>

        {/* Texto editorial */}
        <MotionDiv delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <Kicker>01 · Sobre meu trabalho</Kicker>
          <Title size="lg">
            Um cuidado que começa pela <Accent>escuta</Accent>
          </Title>

          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-earth/80">
            Sou psicóloga clínica e acredito que a terapia é, antes de tudo, um espaço de escuta —
            sem julgamentos, com sigilo e no seu tempo.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-earth/75">
            Cada pessoa chega com uma história única. É a partir dela que construímos um processo de
            cuidado genuíno, respeitando o que você está pronto(a) a explorar.
          </p>

          {/* Pull-quote editorial com borda terracota bem marcada */}
          <blockquote
            style={{ borderLeftColor: "#8a542f", borderLeftWidth: "3px" }}
            className="mt-10 border-l pl-6 sm:pl-7"
          >
            <p className="font-display text-[1.3rem] leading-snug text-earth sm:text-[1.45rem]">
              &ldquo;Um espaço reservado só para você — sem pressa e sem julgamentos.&rdquo;
            </p>
          </blockquote>

          <a href="#formacao" style={{ color: "#3f4824" }} className="link-line group mt-10">
            Conheça minha abordagem
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>

          {/* Modalidades */}
          <div className="mt-12 grid gap-x-10 gap-y-3 border-t border-border pt-7 sm:grid-cols-[10rem_1fr]">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-earth/60 uppercase">
              Modalidades
            </p>
            <div>
              <p className="font-display text-lg leading-snug text-earth">Online e presencial</p>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-earth/70">
                Sessões por videochamada ou no consultório
                {addressReady ? `, em ${site.contact.addressShort}` : ""} — no formato que fizer
                mais sentido para a sua rotina.
              </p>
            </div>
          </div>
        </MotionDiv>
      </div>
    </Section>
  );
}
