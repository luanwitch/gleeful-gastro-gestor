/**
 * Gera public/og-image.jpg (1200×630) com a identidade da marca.
 * Uso: node scripts/generate-og-image.mjs
 * [PREENCHER: substituir por imagem real da profissional quando disponível —
 * recomenda-se foto editorial 1200×630 com o mesmo layout de cores.]
 */
import sharp from "sharp";

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#EDE9E1"/>
  <circle cx="1050" cy="80" r="260" fill="#E7EADF"/>
  <path d="M 840 630 L 840 380 A 160 160 0 0 1 1160 380 L 1160 630 Z" fill="#7A8B6F"/>
  <text x="90" y="250" font-family="Georgia, 'Times New Roman', serif" font-size="88" font-style="italic" fill="#5C6B51">Psicoterapia</text>
  <text x="90" y="350" font-family="Georgia, 'Times New Roman', serif" font-size="88" fill="#3B3327">com acolhimento</text>
  <text x="90" y="440" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#6A6355">[PREENCHER: Nome da Psicóloga] · Psicóloga Clínica</text>
  <rect x="90" y="490" width="120" height="5" rx="2.5" fill="#7A8B6F"/>
</svg>`;

sharp(Buffer.from(svg))
  .jpeg({ quality: 85 })
  .toFile("public/og-image.jpg")
  .then((info) => console.log(`og-image.jpg gerada (${info.size} bytes)`))
  .catch((err) => {
    console.error("Falha ao gerar og-image:", err.message);
    process.exit(1);
  });
