import aboutImg from "@/assets/about-therapist.jpg";
import { isPlaceholder, site } from "@/config/site";
import { Accent, Kicker, MotionDiv, Section, Title } from "./shared";

/**
 * Estatísticas exibidas na seção Sobre — são afirmações públicas e precisam
 * ser confirmadas com a cliente antes de publicar.
 */
const stats = [
  { number: "[PREENCHER]", label: "anos de experiência clínica" },
  { number: "[PREENCHER]", label: "pessoas atendidas" },
];

export function About() {
  return (
    <Section id="sobre">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <MotionDiv>
          <div className="relative mx-auto max-w-md md:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -top-4 -right-4 h-full w-full rounded-t-[9rem] rounded-b-3xl border border-primary/30"
            />
            {/* [PREENCHER FOTO: substituir src/assets/about-therapist.jpg por retrato
                real da profissional no consultório. Proporção 4/5, crop central,
                ambiente com elementos da identidade (plantas, tons neutros). */}
            <img
              src={aboutImg}
              alt={`Retrato profissional de ${site.name} no consultório`}
              width={1000}
              height={1250}
              loading="lazy"
              decoding="async"
              className="relative aspect-[4/5] w-full rounded-t-[9rem] rounded-b-3xl object-cover shadow-xl ring-1 ring-earth/10"
            />
          </div>
        </MotionDiv>

        <MotionDiv delay={0.1}>
          <Kicker>Sobre mim</Kicker>
          <Title>
            Prazer, sou{" "}
            {isPlaceholder(site.name) ? (
              <Accent>[nome da profissional]</Accent>
            ) : (
              site.name.split(" ")[0]
            )}
          </Title>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Sou psicóloga clínica e acredito que a terapia é, antes de tudo, um espaço de escuta —
            sem julgamentos, com sigilo e no seu tempo. Meu compromisso é caminhar com você na
            compreensão das suas emoções e na construção de uma vida com mais leveza.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Cada pessoa chega com uma história única. É a partir dela que construímos juntas(os) um
            processo de cuidado genuíno.
          </p>

          <dl className="mt-8 grid max-w-md grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <dd className="font-display text-2xl font-semibold text-primary">{s.number}</dd>
                <dt className="mt-1 text-xs text-muted-foreground">{s.label}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-muted-foreground/80">
            [PREENCHER: confirmar números públicos com a profissional antes de publicar]
          </p>
        </MotionDiv>
      </div>
    </Section>
  );
}
