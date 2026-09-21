/**
 * Configuração central da marca — ÚNICO lugar onde os dados da profissional
 * são definidos. Todos os campos marcados com [PREENCHER: ...] são placeholders
 * obrigatórios e precisam ser revisados com a cliente antes de ir ao ar.
 */

export const site = {
  name: "Fernanda Dahmer",

  title: "Psicóloga Clínica",
  tagline: "Psicoterapia com acolhimento",

  // [PREENCHER: CRP real — OBRIGATÓRIO por regulamentação do CRP. Não publicar sem este dado.]
  crp: "CRP 07/43730",

  logo: "/logo.png",

  contact: {
    whatsappNumber: "555499673897",
    whatsappGreeting: "Olá! Vim pelo site e gostaria de saber mais sobre os atendimentos.",

    email: "psicologa.fernandadahmer@gmail.com",

    address: "Rua Garibaldi, 554 — Caxias do Sul/RS",
    addressShort: "Caxias do Sul/RS",
    hours: "Seg a Sex, 8h às 19h",
  },

  whatsappMessages: {
    greeting: "Olá! Vim pelo site e gostaria de saber mais sobre os atendimentos.",
    scheduling:
      "Olá! Vim pelo site e gostaria de agendar um atendimento. Poderia me informar os horários disponíveis?",
    ctaFinal: "Olá! Vi o site da Fernanda e gostaria de conversar sobre um atendimento.",
    faq: "Olá! Tenho uma dúvida sobre o acompanhamento terapêutico.",
  },

  social: {
    instagramUser: "ferdescomplica",
    get instagramUrl() {
      return `https://www.instagram.com/ferdescomplica/`;
    },
  },

  // Domínio de produção — usado em canonical, sitemap e Open Graph.
  // [PREENCHER: domínio final, ex.: https://www.nome.com.br]
  url: "https://SEU-DOMINIO.com.br",

  seo: {
    get title() {
      return `${site.tagline} — ${site.name}`;
    },
    description:
      "Atendimento psicológico humanizado, online e presencial. Ansiedade, autoestima, relacionamentos e desenvolvimento pessoal. Agende sua conversa inicial.",
  },
} as const;

/**
 * Monta a URL do WhatsApp com mensagem opcional pré-preenchida.
 *
 * UTM-safe por construção: a URL é absoluta para wa.me e nunca herda query
 * strings nem hash da página atual — um usuário que chega via anúncio
 * (`/utm_source=instagram&...`) ou link com parâmetros sempre recebe o mesmo
 * href canônico com a mensagem intacta. A atribuição de campanha é feita pelo
 * evento "WhatsApp Click" (ver src/lib/analytics.ts), que envia os utm_* como
 * props do disparo em vez de tentar repassá-los ao wa.me (que os descarta).
 */
export function whatsappUrl(message?: string): string {
  const digits = site.contact.whatsappNumber.replace(/\D/g, "");
  const text = encodeURIComponent(message?.trim() || site.whatsappMessages.greeting);
  return `https://wa.me/${digits}?text=${text}`;
}

/**
 * Indica se um campo ainda está como placeholder. Cobre tanto os marcadores
 * explícitos ([PREENCHER: ...]) quanto os valores-sentinelas de configuração
 * (WhatsApp/domínio/Instagram fictícios) para que nunca vazem ao ar.
 */
const PLACEHOLDER_MARKERS = ["[PREENCHER", "SEUNUMERO", "SEU-DOMINIO", "handle.do.instagram"];

export function isPlaceholder(value: string): boolean {
  return PLACEHOLDER_MARKERS.some((marker) => value.includes(marker));
}

/**
 * Indica se o número de WhatsApp já foi configurado. Enquanto estiver como
 * placeholder, os CTAs diretos devem cair no formulário de agendamento (#)
 * em vez de abrir um link quebrado.
 */
export const whatsappReady = !isPlaceholder(site.contact.whatsappNumber);

/**
 * Depoimentos — relatos reais autorizados.
 */
export const testimonials = [
  {
    name: "M. S.",
    role: "Atendimento Online",
    text: "O processo com a Fernanda transformou a minha forma de lidar com a ansiedade e com a cobrança no trabalho. Seu acolhimento e clareza me deram ferramentas práticas que uso todos os dias.",
  },
  {
    name: "C. R.",
    role: "Atendimento Presencial",
    text: "Encontrei nas sessões um espaço seguro e sem julgamentos. A abordagem estruturada e a sensibilidade da Fernanda fizeram toda a diferença para o meu autoconhecimento e equilíbrio emocional.",
  },
  {
    name: "L. B.",
    role: "Atendimento Híbrido",
    text: "A escuta atenta e as explicações claras sobre o funcionamento das nossas emoções trouxeram uma leveza que eu não sentia há anos. Sou muito grata por todo o acompanhamento.",
  },
] as const;

/**
 * Credenciais — formação acadêmica, especializações e abordagem.
 */
export const credentials = {
  academic: [
    {
      degree: "Graduação em Psicologia",
      school: "Formação sólida voltada à prática clínica e escuta humanizada",
    },
    {
      degree: "Especialização em Terapia Cognitivo-Comportamental",
      school: "Aprofundamento em técnicas baseadas em evidências e regulação emocional",
    },
  ] as const,
  approachTitle: "Terapia Cognitivo-Comportamental (TCC)",
  approachText:
    "Abordagem estruturada, empática e colaborativa, que ajuda a identificar pensamentos e comportamentos para construir novas formas de lidar com desafios emocionais, promovendo autoconhecimento e autonomia.",
  extras: [
    "Manejo clínico de ansiedade, estresse e regulação emocional",
    "Desenvolvimento de autoestima, autocompaixão e relações saudáveis",
    "Atendimento ético e sigiloso registrado no Conselho Regional de Psicologia",
  ] as const,
};

/**
 * Convênios / planos de saúde aceitos — OPCIONAL.
 * Deixar `null` (ou array vazio) enquanto não houver confirmação da cliente:
 * nada é renderizado no site quando vazio, sem placeholder visível ao público.
 * Formato sugerido: nomes como a cliente os escreve — ex.: ["Unimed", "Bradesco Saúde"].
 */
export const healthInsurance: string[] | null = null;
