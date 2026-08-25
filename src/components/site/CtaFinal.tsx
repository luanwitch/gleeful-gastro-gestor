import { ArrowRight } from "lucide-react";
import { site, whatsappReady, whatsappUrl } from "@/config/site";
import { trackWhatsAppClick } from "@/lib/analytics";
import { MotionDiv } from "./shared";

const bookingHref = whatsappReady ? whatsappUrl(site.whatsappMessages.ctaFinal) : "#agendamento";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-cream/10 bg-earth-deep text-cream">
      {/* brilho radial contido + anel discreto */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[36rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-olive/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/[0.07]"
      />

      <MotionDiv className="relative mx-auto max-w-4xl px-5 py-32 text-center sm:px-8 sm:py-44">
        <p className="eyebrow eyebrow-light justify-center">Pronto quando você estiver</p>
        <h2 className="mx-auto mt-9 max-w-3xl font-display text-[clamp(2.6rem,6.5vw,4.6rem)] leading-[1.02] tracking-[-0.03em]">
          Dar o primeiro passo <em className="font-display text-mist italic">também faz parte</em>{" "}
          do processo.
        </h2>
        <p className="mx-auto mt-7 max-w-xl leading-relaxed text-cream/70">
          Não é preciso ter certeza para começar. Uma mensagem basta — sem compromisso, no seu tempo
          e com total sigilo.
        </p>
        <a
          href={bookingHref}
          className="btn btn-light group mt-12"
          {...(whatsappReady ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          onClick={() => {
            if (whatsappReady) trackWhatsAppClick("cta-final");
          }}
        >
          Agendar conversa inicial
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </MotionDiv>
    </section>
  );
}
