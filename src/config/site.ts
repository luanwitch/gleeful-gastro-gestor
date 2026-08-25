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

  contact: {
    whatsappNumber: "55 54 9967-3897",
    whatsappGreeting: "Olá! Vim pelo site e gostaria de agendar uma conversa inicial.",
    
    email: "[PREENCHER: email@profissional.com]",
  
    address: "Rua Garibaldi, 554  — Caxias do sul/RS]",
    addressShort: "Caxias do sul/RS",
    hours: "Seg a Sex, 8h às 19h",
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
 * Por sigilo ético, usar apenas iniciais ou primeiro nome.]
 *
 * ⚠️ ATENÇÃO — Resolução CFP nº 04/2020 (art. 3º) e o Código de Ética Profissional
 * do Psicólogo proíbem promessa de resultado em publicidade. Os depoimentos devem
 * descrever a EXPERIÊNCIA do atendimento (acolhimento, escuta, pontualidade),
 * nunca "cura", solução garantida ou resultado terapêutico assegurado. Revisar cada
 * texto com esse critério antes de publicar — e manter autorização por escrito.
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

/**
 * Convênios / planos de saúde aceitos — OPCIONAL.
 * Deixar `null` (ou array vazio) enquanto não houver confirmação da cliente:
 * nada é renderizado no site quando vazio, sem placeholder visível ao público.
 * Formato sugerido: nomes como a cliente os escreve — ex.: ["Unimed", "Bradesco Saúde"].
 */
export const healthInsurance: string[] | null = null;
