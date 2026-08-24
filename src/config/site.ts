/**
 * Configuração central da marca — ÚNICO lugar onde os dados da profissional
 * são definidos. Todos os campos marcados com [PREENCHER: ...] são placeholders
 * obrigatórios e precisam ser revisados com a cliente antes de ir ao ar.
 */

export const site = {
  // [PREENCHER: nome completo e como assina profissionalmente]
  name: "[PREENCHER: Nome da Psicóloga]",
  // [PREENCHER: título curto usado no header e compartilhamentos]
  title: "Psicóloga Clínica",
  tagline: "Psicoterapia com acolhimento",

  // [PREENCHER: CRP real — OBRIGATÓRIO por regulamentação do CRP. Não publicar sem este dado.]
  crp: "[PREENCHER: CRP 00/00000]",

  contact: {
    // [PREENCHER: número real no formato internacional, só dígitos — ex.: 5511999998888]
    whatsappNumber: "55SEUNUMERO",
    whatsappGreeting: "Olá! Vim pelo site e gostaria de agendar uma conversa inicial.",
    // [PREENCHER: e-mail profissional de contato]
    email: "[PREENCHER: email@profissional.com]",
    // [PREENCHER: endereço do consultório completo — rua, número, bairro, cidade/UF]
    address: "[PREENCHER: Endereço do consultório — Cidade/UF]",
    addressShort: "[PREENCHER: Cidade/UF]",
    // [PREENCHER: horários de atendimento, ex.: "Seg a Sex, 8h às 19h"]
    hours: "[PREENCHER: dias e horários de atendimento]",
  },

  social: {
    // [PREENCHER: usuário real do Instagram, sem @]
    instagramUser: "handle.do.instagram",
    get instagramUrl() {
      return `https://instagram.com/${this.instagramUser}`;
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

/** Monta a URL do WhatsApp com mensagem opcional pré-preenchida. */
export function whatsappUrl(message?: string): string {
  const text = encodeURIComponent(message?.trim() || site.contact.whatsappGreeting);
  return `https://wa.me/${site.contact.whatsappNumber}?text=${text}`;
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
 * Depoimentos — espaço para 3–5 relatos.
 * [PREENCHER: substituir pelos depoimentos reais autorizados pelas pacientes.
 * Por sigilo ético, usar apenas iniciais ou primeiro nome. Nada de promessa
 * de resultado terapêutico — relatos de experiência pessoal.]
 */
export const testimonials = [
  {
    name: "[PREENCHER: Iniciais]",
    role: "",
    text: "[PREENCHER: depoimento 1 — texto autorizado pela paciente]",
  },
  {
    name: "[PREENCHER: Iniciais]",
    role: "",
    text: "[PREENCHER: depoimento 2]",
  },
  {
    name: "[PREENCHER: Iniciais]",
    role: "",
    text: "[PREENCHER: depoimento 3]",
  },
] as const;

/**
 * Credenciais — formação acadêmica, especializações e abordagem.
 * [PREENCHER: todos os itens abaixo precisam de confirmação da cliente
 * (instituições, anos, tipo de abordagem — ex.: TCC, fenomenologia etc.).]
 */
export const credentials = {
  academic: [
    {
      degree: "[PREENCHER: Graduação — Psicologia]",
      school: "[PREENCHER: Instituição] · [PREENCHER: ano de conclusão]",
    },
    {
      degree: "[PREENCHER: Pós-graduação / especialização]",
      school: "[PREENCHER: Instituição] · [PREENCHER: ano]",
    },
  ] as const,
  approachTitle: "[PREENCHER: Abordagem terapêutica — ex.: TCC]",
  approachText:
    "[PREENCHER: parágrafo curto descrevendo a abordagem e como ela orienta as sessões — revisar com a cliente antes de publicar.]",
  extras: [
    "[PREENCHER: especialização ou formação complementar 1]",
    "[PREENCHER: formação complementar 2]",
    "[PREENCHER: membro de associação profissional, se houver]",
  ] as const,
};
