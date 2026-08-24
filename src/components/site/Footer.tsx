import { Heart, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { isPlaceholder, site, whatsappUrl } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  const emailOk = !isPlaceholder(site.contact.email);
  const addressOk = !isPlaceholder(site.contact.address);
  const instagramOk = !isPlaceholder(site.social.instagramUser);
  const crpOk = !isPlaceholder(site.crp);

  return (
    <footer className="border-t border-border/70 bg-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
              <Heart className="h-4 w-4" fill="currentColor" />
            </span>
            <span className="font-display text-lg font-semibold">{site.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Psicóloga clínica — CRP{" "}
            {crpOk ? site.crp : <strong className="text-destructive">[PREENCHER: CRP]</strong>}.
            Atendimento online e presencial, com foco em acolhimento e cuidado integral.
          </p>
        </div>

        <nav aria-label="Contato">
          <h2 className="text-sm font-bold uppercase tracking-wider">Contato</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4 text-primary" />
                WhatsApp
              </a>
            </li>
            <li>
              {emailOk ? (
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  {site.contact.email}
                </a>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  [PREENCHER: e-mail]
                </span>
              )}
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                {addressOk ? site.contact.address : "[PREENCHER: endereço do consultório]"}
                <br />
                <span className="text-xs">{site.contact.hours}</span>
              </span>
            </li>
          </ul>
        </nav>

        <nav aria-label="Redes sociais">
          <h2 className="text-sm font-bold uppercase tracking-wider">Redes</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              {instagramOk ? (
                <a
                  href={site.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Instagram className="h-4 w-4 text-primary" />@{site.social.instagramUser}
                </a>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-primary" />
                  [PREENCHER: Instagram]
                </span>
              )}
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-border/70 py-5">
        <p className="px-4 text-center text-xs leading-relaxed text-muted-foreground">
          © {year} {site.name} • Todos os direitos reservados • Este site tem caráter informativo e
          não substitui acompanhamento psicológico.
        </p>
      </div>
    </footer>
  );
}
