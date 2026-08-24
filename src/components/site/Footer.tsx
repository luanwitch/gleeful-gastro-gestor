import { ArrowUp, Instagram, Mail, MessageCircle, Monitor } from "lucide-react";
import { isPlaceholder, site, whatsappReady, whatsappUrl } from "@/config/site";
import { Filler } from "./shared";

const footerNav = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Atendimento", href: "#atendimento" },
  { label: "FAQ", href: "#faq" },
  { label: "Agendamento", href: "#agendamento" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const emailOk = !isPlaceholder(site.contact.email);
  const addressOk = !isPlaceholder(site.contact.address);
  const instagramOk = !isPlaceholder(site.social.instagramUser);
  const crpOk = !isPlaceholder(site.crp);

  return (
    <footer className="border-t border-cream/10 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-8 sm:px-8 sm:pt-24 lg:px-12">
        {/* Assinatura — wordmark oversized + tagline + volta ao topo */}
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div className="max-w-3xl">
            <p className="flex flex-wrap items-baseline gap-x-4 font-display text-[clamp(2.2rem,7vw,6rem)] leading-[1.02] tracking-[-0.03em] text-cream">
              <span className="min-w-0 break-words">{site.name}</span>
              <span
                aria-hidden="true"
                className="h-[0.13em] w-[0.13em] shrink-0 rounded-full bg-olive"
              />
            </p>
            <p className="mt-4 font-display text-lg italic tracking-normal text-mist/80 sm:text-xl">
              {site.tagline}
            </p>
          </div>
          <a
            href="#inicio"
            className="group inline-flex items-center gap-3 pb-2 text-[11px] font-semibold tracking-[0.2em] text-cream/55 uppercase transition-colors duration-300 hover:text-cream"
          >
            Voltar ao topo
            <ArrowUp
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/60">
          Psicóloga clínica — atendimento online e presencial, com foco em acolhimento e cuidado
          integral.
        </p>

        <div className="my-14 h-px w-full bg-cream/10" aria-hidden="true" />

        {/* Colunas — divisão arquitetural */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-0">
          {/* Navegação */}
          <nav aria-label="Navegação do rodapé" className="lg:col-span-3 lg:pr-10">
            <h2 className="text-[11px] font-semibold tracking-[0.22em] text-cream/45 uppercase">
              Navegação
            </h2>
            <ul className="mt-6 space-y-3 text-sm">
              {footerNav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-cream/70 underline-offset-4 transition-colors hover:text-cream hover:underline"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <nav
            aria-label="Contato"
            className="lg:col-span-3 lg:border-l lg:border-cream/10 lg:px-10"
          >
            <h2 className="text-[11px] font-semibold tracking-[0.22em] text-cream/45 uppercase">
              Contato
            </h2>
            <ul className="mt-6 space-y-3.5 text-sm">
              <li>
                {whatsappReady ? (
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-cream/70 transition-colors hover:text-cream"
                  >
                    <MessageCircle aria-hidden="true" className="h-4 w-4 text-mist" />
                    WhatsApp
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2.5">
                    <MessageCircle aria-hidden="true" className="h-4 w-4 text-mist" />
                    <Filler>[PREENCHER: WhatsApp]</Filler>
                  </span>
                )}
              </li>
              <li>
                {emailOk ? (
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="inline-flex items-center gap-2.5 break-all text-cream/70 transition-colors hover:text-cream"
                  >
                    <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-mist" />
                    {site.contact.email}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2.5">
                    <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-mist" />
                    <Filler>[PREENCHER: e-mail]</Filler>
                  </span>
                )}
              </li>
              <li>
                {instagramOk ? (
                  <a
                    href={site.social.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-cream/70 transition-colors hover:text-cream"
                  >
                    <Instagram aria-hidden="true" className="h-4 w-4 text-mist" />@
                    {site.social.instagramUser}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2.5">
                    <Instagram aria-hidden="true" className="h-4 w-4 text-mist" />
                    <Filler>[PREENCHER: Instagram]</Filler>
                  </span>
                )}
              </li>
            </ul>
          </nav>

          {/* Atendimento */}
          <div className="lg:col-span-3 lg:border-l lg:border-cream/10 lg:px-10">
            <h2 className="text-[11px] font-semibold tracking-[0.22em] text-cream/45 uppercase">
              Atendimento
            </h2>
            <ul className="mt-6 space-y-3.5 text-sm text-cream/70">
              <li className="flex items-start gap-2.5">
                <Monitor aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-mist" />
                Online e presencial
              </li>
              <li className="max-w-[18rem]">
                {addressOk ? (
                  site.contact.address
                ) : (
                  <Filler>[PREENCHER: endereço do consultório]</Filler>
                )}
              </li>
              <li className="text-xs text-cream/55">{site.contact.hours}</li>
            </ul>
          </div>

          {/* Registro */}
          <div className="lg:col-span-3 lg:border-l lg:border-cream/10 lg:pl-10">
            <h2 className="text-[11px] font-semibold tracking-[0.22em] text-cream/45 uppercase">
              Registro
            </h2>
            <p className="mt-6 font-display text-xl">
              {crpOk ? site.crp : <Filler>[PREENCHER: CRP]</Filler>}
            </p>
            <p className="mt-3 max-w-[15rem] text-xs leading-relaxed text-cream/50">
              Por regulamentação do Conselho Regional de Psicologia, o CRP deve estar visível no
              site antes da publicação.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-cream/10 pt-7 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} — Todos os direitos reservados.
          </p>
          <p>Este site tem caráter informativo e não substitui acompanhamento psicológico.</p>
        </div>
      </div>
    </footer>
  );
}
