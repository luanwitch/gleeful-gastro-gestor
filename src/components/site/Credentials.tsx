import { credentials, isPlaceholder, site } from "@/config/site";
import { Accent, Filler, Kicker, MotionDiv, Section, Title } from "./shared";

/**
 * Seção de credenciais — autoridade sem cara de currículo.
 * Todos os dados vêm de src/config/site.ts; placeholders ficam explícitos.
 */
export function Credentials() {
  const crpHidden = isPlaceholder(site.crp);

  const [graduacao, especializacao] = credentials.academic;

  return (
    <Section id="formacao" tone="paper">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Kicker>04 · Formação &amp; experiência</Kicker>
            <Title>
              Base técnica, <Accent>escuta humana</Accent>
            </Title>
            <p className="mt-7 max-w-md leading-relaxed text-earth/70">
              A base do meu trabalho combina formação acadêmica sólida e uma escuta atenta à
              singularidade de cada pessoa que chega até aqui.
            </p>

            {/* abordagem — bloco tipográfico com hairline, sem caixa */}
            <div className="mt-10 border-t border-earth/15 pt-7">
              <p className="flex items-baseline gap-3 text-[11px] font-semibold tracking-[0.22em] text-earth/55 uppercase">
                Abordagem terapêutica
              </p>
              <p
                className={`mt-4 font-display text-xl leading-snug ${isPlaceholder(credentials.approachTitle) ? "text-destructive" : ""}`}
              >
                {credentials.approachTitle}
              </p>
              <p className="mt-2.5 max-w-md text-sm leading-relaxed text-earth/65">
                {credentials.approachText}
              </p>
            </div>
          </div>
        </div>

        <MotionDiv delay={0.1} className="lg:col-span-7">
          <dl className="divide-y divide-earth/10 border-y border-earth/10">
            <div className="grid gap-2 py-8 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="text-[11px] font-semibold tracking-[0.2em] text-earth/50 uppercase sm:pt-1.5">
                Graduação
              </dt>
              <dd>
                <p
                  className={`font-display text-lg ${
                    graduacao.degree.includes("PREENCHER") ? "text-destructive" : ""
                  }`}
                >
                  {graduacao.degree}
                </p>
                <p className="mt-1 text-sm text-earth/60">{graduacao.school}</p>
              </dd>
            </div>

            <div className="grid gap-2 py-8 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="text-[11px] font-semibold tracking-[0.2em] text-earth/50 uppercase sm:pt-1.5">
                Especialização
              </dt>
              <dd>
                <p
                  className={`font-display text-lg ${
                    especializacao.degree.includes("PREENCHER") ? "text-destructive" : ""
                  }`}
                >
                  {especializacao.degree}
                </p>
                <p className="mt-1 text-sm text-earth/60">{especializacao.school}</p>
              </dd>
            </div>

            <div className="grid gap-2 py-8 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="text-[11px] font-semibold tracking-[0.2em] text-earth/50 uppercase sm:pt-1.5">
                Formações complementares
              </dt>
              <dd>
                <ul className="space-y-2">
                  {credentials.extras.map((e) => (
                    <li
                      key={e}
                      className="flex items-start gap-3 text-sm leading-relaxed text-earth/70"
                    >
                      <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-olive" />
                      {e}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>

            <div className="grid gap-2 py-8 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="text-[11px] font-semibold tracking-[0.2em] text-earth/50 uppercase sm:pt-1.5">
                Registro profissional
              </dt>
              <dd className="font-display text-lg">
                {crpHidden ? (
                  <Filler>[PREENCHER: CRP — obrigatório antes de publicar]</Filler>
                ) : (
                  site.crp
                )}
              </dd>
            </div>
          </dl>

          <p className="mt-7 max-w-lg text-xs leading-relaxed text-earth/50">
            Os campos acima estão marcados para revisão com a profissional antes da publicação.
          </p>
        </MotionDiv>
      </div>
    </Section>
  );
}
