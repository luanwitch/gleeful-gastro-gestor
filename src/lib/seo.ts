import { isPlaceholder, site } from "@/config/site";

/**
 * Monta o JSON-LD (schema.org) da profissional.
 * Campos ainda marcados como [PREENCHER: ...] são omitidos para nunca
 * irem ao ar com dado fictício.
 */
export function buildPsychologistSchema() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Psychologist",
    name: site.name,
    description: site.seo.description,
    priceRange: "$$",
  };

  if (!isPlaceholder(site.url)) {
    data.url = site.url;
  }
  if (!isPlaceholder(site.crp)) {
    data.identifier = site.crp;
  }

  const contactPoint: Record<string, unknown> = {
    "@type": "ContactPoint",
    contactType: "scheduling",
    availableLanguage: "Portuguese",
  };
  if (!isPlaceholder(site.contact.whatsappNumber)) {
    contactPoint.telephone = `+${site.contact.whatsappNumber}`;
    data.telephone = `+${site.contact.whatsappNumber}`;
  }
  if (!isPlaceholder(site.contact.email)) {
    contactPoint.email = site.contact.email;
    data.email = site.contact.email;
  }
  data.contactPoint = contactPoint;

  if (!isPlaceholder(site.contact.address)) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: site.contact.address,
      addressCountry: "BR",
    };
  }

  if (!isPlaceholder(site.social.instagramUser)) {
    data.sameAs = [site.social.instagramUrl];
  }

  return data;
}
