import aboutImg from "@/assets/about-therapist.jpg";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { Accent, Filler, Kicker, MotionDiv, Section, Title } from "./shared";

export function About() {
  const addressReady = !site.contact.addressShort.includes("PREENCHER");

  return (
    <Section id="sobre" tone="mist" className="border-t border-earth/10" pad="py-28 sm:py-36">
      <div className="grid items-center gap-20 lg:grid-cols-12 lg:gap-14">
        {/* Fotografia como objeto editorial */}
        <MotionDiv className="relative mx-auto w-full max-w-[26rem] lg:col-span-5 lg:mx-0 lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -top-5 -left-5 h-full w-full rounded-[6px] border border-olive/30"
          />
          <figure>
            <img
              src={aboutImg}
              alt={`Retrato profissional de ${site.name}`}
              width={1000}
              height={1250}
              loading="lazy"
              decoding="async"
              className="relative aspect-[4/5] w-full rounded-[6px] object-cover shadow-lg shadow-earth/10 ring-1 ring-earth/10"
            />
            {/* marca de registro */}
            <span
              aria-hidden="true"
              className="absolute -bottom-9 right-0 font-display text-xl text-olive-deep/50 select-none"
            >
              +
            </span>

            {/* legenda editorial da foto */}
            <figcaption className="mt-8 flex items-center justify-between border-t border-earth/15 pt-4 text-[10.5px] font-semibold tracking-[0.2em] text-earth/50 uppercase">
              <span>Consultório</span>
              <span>
                {addressReady ? site.contact.addressShort : <Filler>[PREENCHER: cidade/UF]</Filler>}
              </span>
            </figcaption>
          </figure>
        </MotionDiv>

        {/* Texto editorial */}
        <MotionDiv delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <Kicker>01 · Sobre meu trabalho</Kicker>
          <Title size="lg">
            Um cuidado que começa pela <Accent>escuta</Accent>
          </Title>

          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-earth/75">
            Sou psicóloga clínica e acredito que a terapia é, antes de tudo, um espaço de escuta —
            sem julgamentos, com sigilo e no seu tempo.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-earth/70">
            Cada pessoa chega com uma história única. É a partir dela que construímos um processo de
            cuidado genuíno, respeitando o que você está pronto(a) a explorar.
          </p>

          {/* pull-quote editorial — no fluxo do texto, não sobre a foto */}
          <blockquote className="mt-10 border-l-2 border-olive-deep pl-6 sm:pl-7">
            <p className="font-display text-[1.3rem] leading-snug text-earth sm:text-[1.45rem]">
              &ldquo;Um espaço reservado só para você — sem pressa e sem julgamentos.&rdquo;
            </p>
          </blockquote>

          <a href="#formacao" className="link-line group mt-10">
            Conheça minha abordagem
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>

          {/* modalidades — definição editorial, sem caixa */}
          <div className="mt-12 grid gap-x-10 gap-y-3 border-t border-earth/15 pt-7 sm:grid-cols-[10rem_1fr]">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-earth/55 uppercase">
              Modalidades
            </p>
            <div>
              <p className="font-display text-lg leading-snug">Online e presencial</p>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-earth/65">
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
