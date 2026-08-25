# AGENTS.md

## Stack

- TanStack Start + Nitro + Cloudflare

## Preview / validação local

O preview oficial de desenvolvimento/validação local é via **Wrangler**.

### Fluxo correto

1. Após alterações relevantes, executar:

   ```
   npm run build
   ```

2. Confirmar que `.output/server/wrangler.json` foi gerado.
3. Encerrar processos antigos que estejam ocupando a porta 8787 antes de iniciar o Wrangler.
4. Iniciar o preview com EXATAMENTE:

   ```
   npx wrangler dev -c ".output/server/wrangler.json" --port 8787
   ```

5. Validar `http://127.0.0.1:8787/` e esperar **HTTP 200**.

### Regras

- NUNCA usar `vite preview`, `npm run preview` ou `localhost:4173`. O `vite preview` causa HTTP 500 porque tenta carregar `dist/server/server.js`, mas o build gera o servidor em `.output/server/`.
- Se o Wrangler falhar, parar e investigar o erro em vez de trocar para `vite preview`.
- Não repetir tentativas de preview indefinidamente.
- Não alterar a configuração de deploy apenas para fazer o preview funcionar.
