# Checklist de conteúdo — [PREENCHER] antes de publicar

Todos os campos abaixo estão marcados no código com `[PREENCHER: ...]` ou
centralizados em **`src/config/site.ts`**. Nada entra no ar com dado fictício.

**Proteções automáticas**: enquanto os dados não forem preenchidos, o site
detecta os placeholders (inclusive valores-sentinelas como `55SEUNUMERO`,
`SEU-DOMINIO` e `handle.do.instagram`) e:
- omite esses campos do schema.org (JSON-LD);
- troca CTAs diretos de WhatsApp pelo formulário de agendamento;
- esconde o botão flutuante de WhatsApp e exibe marcadores `[PREENCHER]`
  no rodapé em vez de links quebrados.

## Dados obrigatórios (`src/config/site.ts`)

| Campo                                        | Onde aparece                                | Status                                                                             |
| -------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------- |
| Nome da profissional                         | Header, Hero, Sobre, rodapé, SEO            | `[PREENCHER: Nome da Psicóloga]`                                                   |
| CRP                                          | Seção Formação, rodapé, schema.org          | `[PREENCHER: CRP 00/00000]` — **obrigatório por regulamentação; não publicar sem** |
| WhatsApp (formato internacional, só dígitos) | Todos os CTAs, formulário                   | `55SEUNUMERO`                                                                      |
| E-mail                                       | Rodapé, schema.org                          | `[PREENCHER: email@profissional.com]`                                              |
| Endereço do consultório                      | Rodapé, schema.org                          | `[PREENCHER: Endereço — Cidade/UF]`                                                |
| Horários de atendimento                      | Rodapé                                      | `[PREENCHER: dias e horários]`                                                     |
| @ do Instagram                               | Rodapé (o link só é gerado com handle real) | `handle.do.instagram`                                                              |
| Domínio de produção                          | Canonical/OG/sitemap/robots                 | `https://SEU-DOMINIO.com.br`                                                       |

## Conteúdo a revisar com a cliente

- [ ] **Valor da consulta** (FAQ item 5) — política de valores/pacotes
- [ ] **Formação acadêmica** — graus, instituições e anos (`credentials.academic`)
- [ ] **Abordagem terapêutica** — título + parágrafo descritivo (`credentials.approach*`)
- [ ] **Formações complementares** — lista `credentials.extras`
- [ ] **Depoimentos reais autorizados** — mínimo 3, usando iniciais por sigilo (`testimonials`)
- [ ] **Fotos reais** (ver seção abaixo)
- [ ] Textos de especialidades/benefícios — tom institucional revisado

## Fotos

| Arquivo                          | Proporção   | Instrução                                                                                                                     |
| -------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `src/assets/hero-therapist.jpg`  | 4:5 retrato | Retrato editorial da profissional, luz natural suave, foco rosto/ombros, crop central. Substituir mantendo o nome do arquivo. |
| `src/assets/about-therapist.jpg` | 4:5 retrato | Foto no consultório com elementos da identidade (plantas, tons neutros).                                                      |
| `public/og-image.jpg`            | 1200×630    | Placeholder gerado com as cores da marca. Ideal: foto real no mesmo formato.                                                  |

## Analytics (opcional)

Defina as variáveis no `.env` para ativar:

```
VITE_PLAUSIBLE_DOMAIN=seudominio.com.br   # Plausible
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX       # Google Analytics 4
```

## Domínio

Após definir o domínio, atualizar em um único lugar (`site.url`) e nos arquivos
estáticos `public/robots.txt` e `public/sitemap.xml`.
