import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";

import appCss from "../styles.css?url";
import { CookieConsent } from "@/components/site/CookieConsent";
import { isPlaceholder, site } from "@/config/site";
import { buildPsychologistSchema } from "@/lib/seo";
import { Toaster } from "sonner";

const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

const seoTitle = `${site.tagline} — ${site.name}`;
const canonicalUrl = !site.url.includes("SEU-DOMINIO") ? site.url : undefined;

// LGPD/CFP: enquanto o CRP não for confirmado, o site NÃO é publicável.
// Bloqueia indexação em todas as rotas até os dados obrigatórios serem preenchidos.
const publishable = !isPlaceholder(site.crp);

// og:image absoluto — scrapers de Instagram/WhatsApp/Twitter exigem URL completa.
const ogImageUrl = canonicalUrl
  ? `${canonicalUrl.replace(/\/$/, "")}/og-image.jpg`
  : "/og-image.jpg";

/**
 * GA4 só inicializa após consentimento explícito de cookies (LGPD).
 * O banner (src/components/site/CookieConsent.tsx) grava a escolha em
 * localStorage["cookie-consent"] e dispara o evento que carrega o gtag.
 */
const gaConsentScript = gaMeasurementId
  ? `(function(){var k='cookie-consent';
function init(){if(window.__gaInit)return;window.__gaInit=true;
var s=document.createElement('script');s.async=true;
s.src='https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}';
document.head.appendChild(s);
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)}
window.gtag=gtag;gtag('js',new Date());gtag('config','${gaMeasurementId}');}
try{if(localStorage.getItem(k)==='accepted')init()}catch(e){}
window.addEventListener('cookie-consent-accepted',init);})();`
  : null;

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-semibold text-foreground">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">Página não encontrada.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Algo deu errado</h1>
        <button
          type="button"
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: seoTitle },
      { name: "description", content: site.seo.description },
      // Bloqueio de indexação enquanto o CRP (obrigatório) não for preenchido.
      ...(publishable ? [] : [{ name: "robots", content: "noindex, nofollow" }]),
      ...(canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : []),
      { property: "og:title", content: seoTitle },
      { property: "og:description", content: site.seo.description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      ...(canonicalUrl ? [{ property: "og:url", content: canonicalUrl }] : []),
      { property: "og:image", content: ogImageUrl },
      ...(canonicalUrl ? [{ property: "og:image:url", content: ogImageUrl }] : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seoTitle },
      { name: "twitter:description", content: site.seo.description },
      { name: "theme-color", content: "#ede9e1" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=Manrope:wght@400;500;600;700;800&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(buildPsychologistSchema()),
      },
      ...(plausibleDomain
        ? [
            {
              defer: true,
              "data-domain": plausibleDomain,
              src: "https://plausible.io/js/script.js",
            },
          ]
        : []),
      ...(gaMeasurementId
        ? [
            // GA4 é cookie-based → carregado somente após consentimento (CookieConsent).
            { children: gaConsentScript ?? "" },
          ]
        : []),
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-earth focus:shadow-lg focus:ring-1 focus:ring-earth/15"
        >
          Pular para o conteúdo principal
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <Outlet />
        <Toaster richColors position="top-right" />
        <CookieConsent />
      </MotionConfig>
    </QueryClientProvider>
  );
}
