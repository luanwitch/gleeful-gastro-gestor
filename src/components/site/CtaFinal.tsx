import { ArrowRight } from "lucide-react";
import { site, whatsappReady, whatsappUrl } from "@/config/site";
import { trackWhatsAppClick } from "@/lib/analytics";
import { MotionDiv } from "./shared";

const bookingHref = whatsappReady ? whatsappUrl(site.whatsappMessages.ctaFinal) : "#agendamento";

export function FinalCta() {
  return (
    <section
      style={{ backgroundColor: "#faf8f3" }}
      className="relative overflow-hidden border-t border-border bg-paper text-earth"
    >
      {/* Brilho suave e sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[32rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-cream blur-3xl opacity-70"
      />

      <MotionDiv className="relative mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 sm:py-36">
        <p className="eyebrow justify-center" style={{ color: "#8a542f" }}>
          Pronto quando você estiver
        </p>
        <h2
          style={{ color: "#39372f" }}
          className="mx-auto mt-8 max-w-3xl font-display text-[clamp(2.4rem,5.8vw,4.2rem)] leading-[1.04] tracking-[-0.03em] text-earth"
        >
          Dar o primeiro passo{" "}
          <em
            className="font-display text-accent italic font-semibold"
            style={{ color: "#8a542f", fontWeight: 600 }}
          >
            também faz parte
          </em>{" "}
          do processo.
        </h2>
        <p
          style={{ color: "#39372f" }}
          className="mx-auto mt-6 max-w-xl leading-relaxed text-earth/80"
        >
          Não é preciso ter certeza para começar. Uma mensagem basta — sem compromisso, no seu tempo
          e com total sigilo.
        </p>
        <a
          href={bookingHref}
          style={{
            backgroundColor: "#3f4824",
            color: "#ffffff",
            borderColor: "#3f4824",
            boxShadow: "0 6px 20px 0 rgba(63, 72, 36, 0.4)",
          }}
          className="btn btn-primary group mt-10 shadow-md"
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
