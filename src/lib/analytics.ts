/**
 * Rastreamento de conversões — camada fina sobre Plausible e GA4.
 *
 * Eventos definidos para este site:
 * - "Agendamento"     → formulário de agendamento enviado com sucesso
 * - "WhatsApp Click"  → clique em qualquer CTA direto de WhatsApp
 *   (prop `location`: hero | faq | floating | header | footer | cta-final | form-outros-canais)
 *
 * Onde ver os números:
 * - Plausible  → painel em https://plausible.io/<dominio> → aba "Goals"/"Events"
 * - GA4        → Admin > Events (marcar como conversão) ou Relatórios > Envolvimento > Eventos
 *
 * Ambos os disparos são best-effort: se nenhuma ferramenta estiver ativa,
 * nada quebra (e no dev logamos no console para facilitar a verificação).
 */

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type LeadLocation =
  | "hero"
  | "faq"
  | "floating"
  | "header"
  | "footer"
  | "cta-final"
  | "outros-canais";

/** Extrai utm_* da URL atual, para atribuir cliques a campanhas de tráfego pago. */
function currentUtmProps(): Record<string, string> {
  const props: Record<string, string> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
      const value = params.get(key);
      if (value) props[key] = value.slice(0, 100);
    }
  } catch {
    // URL indisponível (ex.: SSR) — segue sem UTMs.
  }
  return props;
}

/** Dispara um evento customizado em todas as ferramentas de analytics ativas. */
export function trackEvent(event: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;

  window.plausible?.(event, props ? { props } : undefined);

  if (typeof window.gtag === "function") {
    window.gtag("event", event, props ?? {});
  }

  if (import.meta.env.DEV && !window.plausible && !window.gtag) {
    console.info(`[analytics] ${event}`, props ?? {});
  }
}

/** Lead: formulário de agendamento enviado com sucesso. */
export function trackScheduleSubmit(props: Record<string, string>) {
  trackEvent("Agendamento", props);
}

/** Clique em CTA direto de WhatsApp, com UTMs da sessão quando houver. */
export function trackWhatsAppClick(location: LeadLocation) {
  trackEvent("WhatsApp Click", { location, ...currentUtmProps() });
}
