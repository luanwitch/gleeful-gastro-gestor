import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, MessageCircle, X } from "lucide-react";
import { site, whatsappUrl } from "@/config/site";

const nav = [
  { label: "Sobre", href: "#sobre" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Formação", href: "#formacao" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border/70 bg-cream/85 shadow-sm backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a
            href="#top"
            className="flex items-center gap-2.5"
            aria-label={`${site.name} — voltar ao início`}
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
              <Heart className="h-4 w-4" fill="currentColor" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">{site.name}</span>
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex"
          >
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:inline-flex"
          >
            <MessageCircle className="h-4 w-4" /> Agendar conversa
          </a>

          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={openMenu}
            className="rounded-full p-2 hover:bg-muted md:hidden"
            onClick={() => setOpenMenu(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-cream md:hidden"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="font-display font-semibold">Menu</span>
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setOpenMenu(false)}
                className="rounded-full p-2 hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Menu móvel" className="flex flex-col gap-1 p-6 text-lg">
              {[...nav, { label: "Agendar", href: "#agendamento" }].map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpenMenu(false)}
                  className="border-b border-border/60 py-3"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 font-semibold text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" /> Conversar no WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
