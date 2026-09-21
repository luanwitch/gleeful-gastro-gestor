import { MotionDiv } from "./shared";

/**
 * Posicionamento / proposta — momento de respiro entre o Hero e o Sobre.
 * Puramente tipográfico: afirmação grande + três pilares institucionais.
 */
const pilares = [
  {
    numero: "01",
    titulo: "Escuta sem julgamentos",
    texto: "Um espaço onde o que você traz é recebido com atenção genuína, curiosidade e respeito.",
  },
  {
    numero: "02",
    titulo: "Sigilo profissional",
    texto: "Tudo o que se passa em sessão é protegido pelo sigilo ético que rege a psicologia.",
  },
  {
    numero: "03",
    titulo: "Online e presencial",
    texto:
      "Sessões por videochamada ou no consultório — no formato que fizer mais sentido para a sua rotina.",
  },
];

export function Statement() {
  return (
    <section
      aria-label="Proposta de atendimento"
      style={{ backgroundColor: "#faf8f3" }}
      className="border-t border-border bg-paper text-earth"
    >
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
        <MotionDiv>
          <p
            style={{ color: "#39372f" }}
            className="max-w-4xl font-display text-[clamp(1.85rem,4vw,3.2rem)] leading-[1.18] tracking-[-0.02em] text-balance text-earth"
          >
            Acredito que toda pessoa merece um espaço seguro para se escutar —{" "}
            <em className="text-accent italic" style={{ color: "#8a542f" }}>
              sem pressa, sem rótulos
            </em>
            , no seu próprio ritmo.
          </p>
        </MotionDiv>

        <MotionDiv delay={0.12}>
          <dl className="mt-20 grid border-t border-border pt-0 sm:grid-cols-3 lg:mt-24">
            {pilares.map((p, i) => (
              <div
                key={p.numero}
                className={`py-10 sm:px-9 ${i > 0 ? "border-t border-border sm:border-t-0 sm:border-l" : ""} ${i === 0 ? "sm:pl-0" : ""} ${i === pilares.length - 1 ? "sm:pr-0" : ""}`}
              >
                <dt>
                  <span
                    aria-hidden="true"
                    style={{ color: "#8a542f" }}
                    className="block font-display text-xs tabular-nums text-accent font-semibold"
                  >
                    {p.numero}
                  </span>
                  <span className="mt-3 block font-display text-lg leading-snug text-earth font-medium">
                    {p.titulo}
                  </span>
                </dt>
                <dd className="mt-2.5 max-w-xs text-sm leading-relaxed text-earth/70">{p.texto}</dd>
              </div>
            ))}
          </dl>
        </MotionDiv>
      </div>
    </section>
  );
}
