import { ArrowUp, Instagram, Mail, MessageCircle, Monitor } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { isPlaceholder, site, whatsappReady, whatsappUrl } from "@/config/site";
import { trackWhatsAppClick } from "@/lib/analytics";
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
    <footer
      style={{ backgroundColor: "#faf8f3", color: "#39372f", borderColor: "#d8cdbd" }}
      className="border-t border-border bg-paper text-earth"
    >
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-8 sm:px-8 sm:pt-24 lg:px-12">
        {/* Assinatura — wordmark oversized + tagline + volta ao topo */}
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div className="max-w-3xl">
            <a href="#inicio" aria-label="Voltar ao início" className="mb-6 inline-block">
              <img
                src={site.logo || "/logo.png"}
                alt={site.name}
                className="h-12 w-auto max-h-14 object-contain"
              />
            </a>
            <p
              style={{ color: "#39372f" }}
              className="flex flex-wrap items-baseline gap-x-4 font-display text-[clamp(2.2rem,7vw,6rem)] leading-[1.02] tracking-[-0.03em] text-earth"
            >
              <span className="min-w-0 break-words">{site.name}</span>
              <span
                aria-hidden="true"
                style={{ backgroundColor: "#8a542f" }}
                className="h-[0.13em] w-[0.13em] shrink-0 rounded-full bg-accent"
              />
            </p>
            <p
              style={{ color: "#8a542f" }}
              className="mt-4 font-display text-lg italic tracking-normal text-accent sm:text-xl"
            >
              {site.tagline}
            </p>
          </div>
          <a
            href="#inicio"
            className="group inline-flex items-center gap-3 pb-2 text-[11px] font-semibold tracking-[0.2em] text-earth/65 uppercase transition-colors duration-300 hover:text-primary"
          >
            Voltar ao topo
            <ArrowUp
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-earth/70">
          Psicóloga clínica — atendimento online e presencial, com foco em acolhimento e cuidado
          integral.
        </p>

        <div className="my-14 h-px w-full bg-border" aria-hidden="true" />

        {/* Colunas — divisão arquitetural */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-0">
          {/* Navegação */}
          <nav aria-label="Navegação do rodapé" className="lg:col-span-3 lg:pr-10">
            <h2 className="text-[11px] font-semibold tracking-[0.22em] text-earth/55 uppercase">
              Navegação
            </h2>
            <ul className="mt-6 space-y-3 text-sm">
              {footerNav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-earth/75 underline-offset-4 transition-colors hover:text-primary hover:underline"
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
            className="lg:col-span-3 lg:border-l lg:border-border lg:px-10"
          >
            <h2 className="text-[11px] font-semibold tracking-[0.22em] text-earth/55 uppercase">
              Contato
            </h2>
            <ul className="mt-6 space-y-3.5 text-sm">
              <li>
                {whatsappReady ? (
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("footer")}
                    className="inline-flex items-center gap-2.5 text-earth/80 transition-colors hover:text-primary"
                  >
                    <MessageCircle aria-hidden="true" className="h-4 w-4 text-accent" />
                    WhatsApp
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2.5 text-earth/60">
                    <MessageCircle aria-hidden="true" className="h-4 w-4 text-accent" />
                    <Filler>[PREENCHER: WhatsApp]</Filler>
                  </span>
                )}
              </li>
              <li>
                {emailOk ? (
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="inline-flex items-center gap-2.5 break-all text-earth/80 transition-colors hover:text-primary"
                  >
                    <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                    {site.contact.email}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2.5 text-earth/60">
                    <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
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
                    className="inline-flex items-center gap-2.5 text-earth/80 transition-colors hover:text-primary"
                  >
                    <Instagram aria-hidden="true" className="h-4 w-4 text-accent" />@
                    {site.social.instagramUser}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2.5 text-earth/60">
                    <Instagram aria-hidden="true" className="h-4 w-4 text-accent" />
                    <Filler>[PREENCHER: Instagram]</Filler>
                  </span>
                )}
              </li>
            </ul>
          </nav>

          {/* Atendimento */}
          <div className="lg:col-span-3 lg:border-l lg:border-border lg:px-10">
            <h2 className="text-[11px] font-semibold tracking-[0.22em] text-earth/55 uppercase">
              Atendimento
            </h2>
            <ul className="mt-6 space-y-3.5 text-sm text-earth/80">
              <li className="flex items-start gap-2.5">
                <Monitor aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                Online e presencial
              </li>
              <li className="max-w-[18rem]">
                {addressOk ? (
                  site.contact.address
                ) : (
                  <Filler>[PREENCHER: endereço do consultório]</Filler>
                )}
              </li>
              <li className="text-xs text-earth/60">{site.contact.hours}</li>
            </ul>
          </div>

          {/* Registro */}
          <div className="lg:col-span-3 lg:border-l lg:border-border lg:pl-10">
            <h2 className="text-[11px] font-semibold tracking-[0.22em] text-earth/55 uppercase">
              Registro
            </h2>
            <p className="mt-6 font-display text-xl text-primary font-semibold">
              {crpOk ? site.crp : <Filler>[PREENCHER: CRP]</Filler>}
            </p>
            <p className="mt-3 max-w-[15rem] text-xs leading-relaxed text-earth/60">
              Por regulamentação do Conselho Regional de Psicologia, o CRP deve estar visível no
              site antes da publicação.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-7 text-xs text-earth/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} — Todos os direitos reservados.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link to="/privacidade" className="transition-colors hover:text-primary">
              Política de Privacidade
            </Link>
            <span aria-hidden="true" className="hidden sm:inline text-border">
              ·
            </span>
            <span className="text-xs">
              Este site tem caráter informativo e não substitui acompanhamento psicológico.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
