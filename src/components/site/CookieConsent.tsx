import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

const STORAGE_KEY = "cookie-consent";

/**
 * Banner de consentimento de cookies (LGPD) — exibido SOMENTE quando o GA4
 * está configurado (VITE_GA_MEASUREMENT_ID). O Plausible é cookieless e
 * dispensa consentimento.
 *
 * "Recusar" impede o carregamento do gtag (ver script em __root.tsx);
 * a escolha fica em localStorage e pode ser revista limpando os dados do site.
 */
export function CookieConsent() {
  const gaEnabled = !!import.meta.env.VITE_GA_MEASUREMENT_ID;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!gaEnabled) return;
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage bloqueado — não insistir no banner.
    }
  }, [gaEnabled]);

  function decide(choice: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // sem persistência — a escolha vale só para esta sessão de página.
    }
    if (choice === "accepted") {
      window.dispatchEvent(new Event("cookie-consent-accepted"));
    }
    setVisible(false);
  }

  if (!gaEnabled || !visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-label="Aviso de cookies"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl rounded-[6px] bg-paper p-5 shadow-2xl shadow-black/25 ring-1 ring-earth/15 sm:inset-x-6 sm:p-6"
      >
        <p className="text-sm leading-relaxed text-earth">
          Usamos cookies de medição de audiência para entender como o site é usado e melhorá-lo.
          Você pode aceitar ou continuar sem eles.{" "}
          <Link to="/privacidade" className="font-semibold underline underline-offset-2">
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="btn btn-primary px-6 py-2.5 text-xs"
          >
            Aceitar cookies
          </button>
          <button
            type="button"
            onClick={() => decide("declined")}
            className="btn border border-earth/25 bg-transparent px-6 py-2.5 text-xs text-earth hover:bg-earth/5"
          >
            Continuar sem cookies
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
