import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site, whatsappReady, whatsappUrl } from "@/config/site";
import { trackWhatsAppClick } from "@/lib/analytics";

const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Atendimento", href: "#atendimento" },
  { label: "FAQ", href: "#faq" },
];

/** Enquanto o número real não for configurado, CTAs caem no formulário. */
const bookingHref = whatsappReady ? whatsappUrl(site.whatsappMessages.scheduling) : "#agendamento";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = openMenu ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [openMenu]);

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu]);

  return (
    <>
      <header
        style={{ backgroundColor: scrolled ? "#faf8f3" : "transparent" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border bg-paper/90 backdrop-blur-xl shadow-xs"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-500 sm:px-8 lg:px-12 ${
            scrolled ? "h-[3.75rem]" : "h-20"
          }`}
        >
          <a
            href="#inicio"
            aria-label={`${site.name} — voltar ao início`}
            className="group flex max-w-[55vw] items-center gap-3 sm:max-w-none"
          >
            <img
              src={site.logo || "/logo.png"}
              alt={site.name}
              className="h-9 w-auto max-h-10 object-contain"
            />
            <span className="truncate font-display text-lg tracking-tight sm:text-xl text-earth">
              {site.name}
            </span>
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-8 text-sm font-medium text-earth/75 lg:flex"
          >
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="relative py-1 transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:text-primary hover:after:origin-left hover:after:scale-x-100"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={bookingHref}
              style={{
                backgroundColor: "#3f4824",
                color: "#ffffff",
                borderColor: "#3f4824",
                boxShadow: "0 4px 14px 0 rgba(63, 72, 36, 0.35)",
              }}
              {...(whatsappReady ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => {
                if (whatsappReady) trackWhatsAppClick("header");
              }}
              className="group hidden items-center gap-2 rounded-full border border-primary bg-primary px-5 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-hover-soft hover:border-hover-soft md:inline-flex"
            >
              Agendar
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <button
              type="button"
              aria-label="Abrir menu"
              aria-expanded={openMenu}
              className="rounded-[4px] p-2 text-earth transition-colors hover:bg-cream lg:hidden"
              onClick={() => setOpenMenu(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {openMenu && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex flex-col bg-paper text-earth lg:hidden"
            style={{ backgroundColor: "#faf8f3", color: "#39372f" }}
          >
            <div className="flex h-20 items-center justify-between px-5 sm:px-8 border-b border-border">
              <a
                href="#inicio"
                onClick={() => setOpenMenu(false)}
                className="flex items-center gap-3"
              >
                <img
                  src={site.logo || "/logo.png"}
                  alt={site.name}
                  className="h-8 w-auto object-contain"
                />
                <span className="font-display text-lg tracking-tight text-earth">{site.name}</span>
              </a>
              <button
                type="button"
                autoFocus
                aria-label="Fechar menu"
                onClick={() => setOpenMenu(false)}
                className="rounded-[4px] p-2 text-earth transition-colors hover:bg-cream"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav
              aria-label="Menu móvel"
              className="flex flex-1 flex-col justify-center gap-1 px-6 sm:px-10"
            >
              {[...nav, { label: "Agendamento", href: "#agendamento" }].map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpenMenu(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                  className="group flex items-baseline gap-4 border-b border-border py-4"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-xs tabular-nums text-accent"
                    style={{ color: "#8a542f" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[1.7rem] leading-none text-earth transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-primary">
                    {n.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="px-6 pb-10 sm:px-10"
            >
              <a
                href={bookingHref}
                style={{
                  backgroundColor: "#3f4824",
                  color: "#ffffff",
                  borderColor: "#3f4824",
                  boxShadow: "0 6px 18px 0 rgba(63, 72, 36, 0.38)",
                }}
                {...(whatsappReady ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => {
                  if (whatsappReady) trackWhatsAppClick("header");
                  setOpenMenu(false);
                }}
                className="btn btn-primary w-full shadow-md"
              >
                Agendar conversa inicial
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
