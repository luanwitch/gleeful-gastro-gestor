import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Heart,
  Brain,
  Users,
  Sparkles,
  Waves,
  Sun,
  User,
  Monitor,
  ShieldCheck,
  Lock,
  Clock,
  CalendarCheck,
  MessageCircle,
  HeartHandshake,
  MessageSquare,
  CalendarClock,
  CheckCircle2,
  Compass,
  Star,
  ChevronDown,
  ArrowUp,
  Instagram,
  Mail,
  MapPin,
  Menu,
  X,
  Phone,
} from "lucide-react";
import heroImg from "@/assets/hero-therapist.jpg";
import aboutImg from "@/assets/about-therapist.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

// Central WhatsApp helper — troque o número conforme necessário
const WHATSAPP_URL =
  "https://wa.me/55SEUNUMERO?text=" +
  encodeURIComponent("Olá! Gostaria de agendar uma consulta.");

const nav = [
  { label: "Sobre", href: "#sobre" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
];

const specialties = [
  { icon: Waves, title: "Ansiedade", text: "Ferramentas para acalmar a mente e recuperar o equilíbrio no dia a dia." },
  { icon: Heart, title: "Depressão", text: "Um caminho de acolhimento para reencontrar sentido e leveza." },
  { icon: Sparkles, title: "Autoconhecimento", text: "Conheça suas emoções e amplie a consciência sobre si." },
  { icon: Users, title: "Relacionamentos", text: "Construa vínculos mais saudáveis e comunicação verdadeira." },
  { icon: Brain, title: "Estresse", text: "Aprenda a lidar com pressões e proteger sua saúde mental." },
  { icon: Sun, title: "Desenvolvimento pessoal", text: "Descubra seu potencial e viva com mais propósito." },
  { icon: User, title: "Terapia individual", text: "Sessões personalizadas focadas nas suas necessidades." },
  { icon: Monitor, title: "Terapia online", text: "Atendimento por vídeo com a mesma qualidade e sigilo." },
];

const benefits = [
  { icon: HeartHandshake, title: "Atendimento humanizado" },
  { icon: ShieldCheck, title: "Ambiente seguro" },
  { icon: Lock, title: "Sigilo profissional" },
  { icon: Monitor, title: "Online e presencial" },
  { icon: Clock, title: "Horários flexíveis" },
  { icon: CalendarCheck, title: "Fácil agendamento" },
];

const steps = [
  { icon: MessageSquare, title: "Entre em contato", text: "Envie uma mensagem pelo WhatsApp para tirar dúvidas." },
  { icon: CalendarClock, title: "Escolha o horário", text: "Selecionamos juntos o melhor dia e horário para você." },
  { icon: CheckCircle2, title: "Confirme o agendamento", text: "Você recebe a confirmação e as instruções da sessão." },
  { icon: Compass, title: "Inicie sua jornada", text: "Começamos o processo terapêutico com acolhimento." },
];

const testimonials = [
  { name: "Mariana S.", text: "Voltei a ter qualidade de vida depois das sessões." },
  { name: "Rafael T.", text: "Excelente profissional, muito acolhedora." },
  { name: "Camila O.", text: "As consultas mudaram minha forma de enxergar a vida." },
  { name: "Beatriz L.", text: "Encontrei um espaço seguro para me conhecer de verdade." },
];

const faqs = [
  {
    q: "Como funciona a terapia?",
    a: "A terapia é um processo colaborativo onde, em sessões regulares, exploramos pensamentos, emoções e comportamentos para promover autoconhecimento e mudanças positivas.",
  },
  { q: "Quanto tempo dura uma sessão?", a: "As sessões duram em média 50 minutos, com frequência semanal na maioria dos casos." },
  { q: "Vocês atendem online?", a: "Sim. Atendo online por videochamada, com a mesma qualidade e sigilo do atendimento presencial." },
  { q: "Como faço para agendar?", a: "Basta clicar em qualquer botão do WhatsApp neste site e enviar uma mensagem. Retorno o mais breve possível." },
  { q: "Qual o valor da consulta?", a: "O valor é informado no primeiro contato pelo WhatsApp. Trabalho com valores acessíveis e opções de pacotes." },
];

// Animações reutilizáveis
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [testimonial, setTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTestimonial((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-dvh bg-background text-foreground overflow-x-hidden">
      {/* Header fixo */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/85 backdrop-blur-md border-b shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-sage/20 text-sage">
              <Heart className="h-4 w-4" fill="currentColor" />
            </span>
            <span>Ana Martins</span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-foreground transition-colors">
                {n.label}
              </a>
            ))}
          </nav>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <MessageCircle className="h-4 w-4" /> Agendar
          </a>

          <button
            aria-label="Abrir menu"
            className="md:hidden rounded-full p-2 hover:bg-muted"
            onClick={() => setOpenMenu(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background md:hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="font-display font-bold">Menu</span>
              <button aria-label="Fechar menu" onClick={() => setOpenMenu(false)} className="rounded-full p-2 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-4 text-lg">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpenMenu(false)} className="py-2 border-b border-border/60">
                  {n.label}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex justify-center items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-foreground font-medium"
              >
                <MessageCircle className="h-4 w-4" /> Agendar pelo WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="top">
        {/* HERO */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24">
          {/* Fundo suave */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sage-soft/50 via-background to-background" />
          <div className="absolute -z-10 top-24 -left-32 h-72 w-72 rounded-full bg-sky-soft blur-3xl opacity-60" />
          <div className="absolute -z-10 top-40 -right-24 h-80 w-80 rounded-full bg-beige blur-3xl opacity-70" />

          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center">
            <motion.div initial="hidden" animate="show" variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-white/70 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Psicoterapia com acolhimento
              </span>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
                Cuide da sua saúde emocional com{" "}
                <span className="text-primary">acolhimento</span> e{" "}
                <span className="text-primary">profissionalismo</span>.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Atendimento humanizado para ajudar você a superar desafios emocionais, fortalecer sua autoestima
                e encontrar mais equilíbrio para viver melhor.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:-translate-y-0.5 hover:shadow-primary/30 transition"
                >
                  <MessageCircle className="h-4 w-4" /> Agendar pelo WhatsApp
                </a>
                <a
                  href="#sobre"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-6 py-3 text-sm font-semibold hover:bg-white transition"
                >
                  Conheça meu trabalho
                </a>
              </div>

              <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-sage" /> Sigilo garantido</div>
                <div className="flex items-center gap-1.5"><Monitor className="h-4 w-4 text-sage" /> Online & presencial</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-sage/20 ring-1 ring-black/5">
                <img
                  src={heroImg}
                  alt="Terapeuta em sessão acolhedora com paciente em ambiente moderno"
                  width={1400}
                  height={1400}
                  className="h-full w-full object-cover aspect-[5/6]"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 hidden sm:flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 shadow-xl ring-1 ring-black/5">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-sage/15 text-sage">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold">+500 atendimentos</p>
                  <p className="text-xs text-muted-foreground">com escuta atenta</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SOBRE */}
        <Section id="sobre">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
              <div className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
                <img src={aboutImg} alt="Retrato profissional da terapeuta Ana Martins" width={1000} height={1200} loading="lazy" className="h-full w-full object-cover aspect-[4/5]" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
              <SectionKicker>Sobre mim</SectionKicker>
              <SectionTitle>Um espaço seguro para você se reencontrar</SectionTitle>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Sou Ana Martins, psicóloga clínica com anos de experiência em atendimento humanizado. Meu compromisso é
                oferecer um espaço seguro para que você possa compreender suas emoções, desenvolver novas perspectivas e
                conquistar uma vida com mais qualidade.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Acredito que cada pessoa carrega uma história única — e é a partir dela que construímos, juntas, um
                caminho de cuidado, escuta e transformação.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-4 max-w-md">
                <MiniStat number="+8" label="anos de prática" />
                <MiniStat number="500+" label="atendimentos" />
              </div>
            </motion.div>
          </div>
        </Section>

        {/* ESPECIALIDADES */}
        <Section id="especialidades" tone="soft">
          <div className="text-center max-w-2xl mx-auto">
            <SectionKicker center>Especialidades</SectionKicker>
            <SectionTitle center>Como posso te ajudar</SectionTitle>
            <p className="mt-4 text-muted-foreground">
              Atendimento clínico com foco em temas centrais da saúde emocional contemporânea.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {specialties.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-2xl border border-border/60 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-sage-soft text-primary group-hover:bg-sage group-hover:text-primary-foreground transition-colors">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* BENEFÍCIOS */}
        <Section id="beneficios">
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <SectionKicker>Benefícios</SectionKicker>
              <SectionTitle>Cuidado em cada detalhe do atendimento</SectionTitle>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Do primeiro contato à sessão, tudo é pensado para que você se sinta acolhido e confortável.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex items-center gap-4 rounded-2xl border border-border/60 bg-gradient-to-br from-white to-sage-soft/30 p-4 shadow-sm"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sage/20 text-primary">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <p className="font-medium">{b.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* COMO FUNCIONA */}
        <Section id="como-funciona" tone="soft">
          <div className="text-center max-w-2xl mx-auto">
            <SectionKicker center>Como funciona</SectionKicker>
            <SectionTitle center>Simples do primeiro contato à sessão</SectionTitle>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
              >
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-soft text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* DEPOIMENTOS */}
        <Section id="depoimentos">
          <div className="text-center max-w-2xl mx-auto">
            <SectionKicker center>Depoimentos</SectionKicker>
            <SectionTitle center>Histórias de quem confiou no processo</SectionTitle>
          </div>
          <div className="relative mt-12 max-w-2xl mx-auto">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-sage-soft/60 to-beige/60 p-8 sm:p-12 shadow-lg ring-1 ring-black/5 min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={testimonial}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex justify-center gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4" fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="mt-5 text-center font-display text-xl sm:text-2xl leading-relaxed">
                    “{testimonials[testimonial].text}”
                  </blockquote>
                  <figcaption className="mt-6 text-center text-sm font-medium text-muted-foreground">
                    — {testimonials[testimonial].name}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Depoimento ${i + 1}`}
                  onClick={() => setTestimonial(i)}
                  className={`h-2.5 rounded-full transition-all ${i === testimonial ? "w-7 bg-primary" : "w-2.5 bg-border"}`}
                />
              ))}
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" tone="soft">
          <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
            <div>
              <SectionKicker>Dúvidas</SectionKicker>
              <SectionTitle>Perguntas frequentes</SectionTitle>
              <p className="mt-4 text-muted-foreground">
                Se sua dúvida não estiver aqui, é só chamar no WhatsApp que respondo pessoalmente.
              </p>
            </div>
            <div className="space-y-3">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={f.q} className="rounded-2xl border border-border/60 bg-white shadow-sm overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium"
                    >
                      <span>{f.q}</span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>

        {/* CTA FINAL */}
        <section className="relative py-20 sm:py-28">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-primary to-sage" />
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center text-primary-foreground">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl sm:text-5xl font-bold"
            >
              Pronto para começar sua transformação?
            </motion.h2>
            <p className="mt-5 text-primary-foreground/85 text-lg">
              Entre em contato agora mesmo e agende sua primeira consulta.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-primary shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition"
            >
              <MessageCircle className="h-5 w-5" /> Conversar no WhatsApp
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-sage/20 text-sage">
                <Heart className="h-4 w-4" fill="currentColor" />
              </span>
              Ana Martins
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm">
              Psicóloga clínica — CRP 00/00000. Atendimento online e presencial com foco em acolhimento
              e cuidado integral.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Contato</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> WhatsApp</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> contato@anamartins.com</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Rua Exemplo, 123 — Sua Cidade</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Redes</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="inline-flex items-center gap-2 hover:text-foreground">
                  <Instagram className="h-4 w-4 text-primary" /> @anamartins.psi
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
                  <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ana Martins • Todos os direitos reservados
        </div>
      </footer>

      {/* Botão flutuante do WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-xl shadow-whatsapp/40 hover:scale-110 transition-transform"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-whatsapp animate-ping opacity-30" />
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* Voltar ao topo */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            aria-label="Voltar ao topo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-white text-primary shadow-lg ring-1 ring-black/5 hover:-translate-y-0.5 transition"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- Helpers de UI ----------

function Section({
  id,
  children,
  tone,
}: {
  id?: string;
  children: React.ReactNode;
  tone?: "soft";
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-20 sm:py-24 ${
        tone === "soft" ? "bg-gradient-to-b from-sage-soft/30 to-background" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

function SectionKicker({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-sage/30 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary ${
        center ? "" : ""
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-sage" /> {children}
    </span>
  );
}

function SectionTitle({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <h2 className={`mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight ${center ? "text-center" : ""}`}>
      {children}
    </h2>
  );
}

function MiniStat({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-white p-4 shadow-sm">
      <p className="font-display text-2xl font-bold text-primary">{number}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
