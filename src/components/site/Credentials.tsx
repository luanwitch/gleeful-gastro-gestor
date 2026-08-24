import { GraduationCap, Leaf, ScrollText } from "lucide-react";
import { credentials, isPlaceholder, site } from "@/config/site";
import { Accent, Kicker, MotionDiv, Section, Title } from "./shared";

/**
 * Seção de credenciais — reforça autoridade com formação, especializações
 * e abordagem terapêutica. Todos os dados vêm de src/config/site.ts.
 */
export function Credentials() {
  const crpHidden = isPlaceholder(site.crp);
  return (
    <Section id="formacao" tone="sand">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div className="md:sticky md:top-28">
          <Kicker>Formação &amp; abordagem</Kicker>
          <Title>
            Trajetória e <Accent>método</Accent> de trabalho
          </Title>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            A base do meu trabalho combina formação acadêmica sólida e uma escuta atenta à
            singularidade de cada pessoa.
          </p>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <span className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Leaf className="h-4 w-4" /> Abordagem terapêutica
            </span>
            <p className="mt-2 font-display text-xl">{credentials.approachTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {credentials.approachText}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <ol className="space-y-4">
            {credentials.academic.map((a) => (
              <MotionDiv key={a.degree}>
                <li className="flex gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-olive-soft text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display font-semibold">{a.degree}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{a.school}</p>
                  </div>
                </li>
              </MotionDiv>
            ))}
          </ol>

          <MotionDiv delay={0.1}>
            <ul className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
              <li aria-hidden="true" className="sr-only">
                Formações complementares
              </li>
              <li className="mb-3 flex items-center gap-2 font-display font-semibold">
                <ScrollText className="h-4 w-4 text-primary" /> Formações complementares
              </li>
              {credentials.extras.map((e) => (
                <li
                  key={e}
                  className="flex items-start gap-2.5 py-1.5 text-sm text-muted-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60"
                  />
                  {e}
                </li>
              ))}
            </ul>
          </MotionDiv>

          <p className="text-sm text-muted-foreground">
            Registro profissional:{" "}
            {crpHidden ? (
              <strong className="font-semibold text-destructive">
                [PREENCHER: CRP — obrigatório antes de publicar]
              </strong>
            ) : (
              <strong className="font-semibold">{site.crp}</strong>
            )}
          </p>
        </div>
      </div>
    </Section>
  );
}
