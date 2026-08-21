# Escopo permanente deste repositório

Este repositório contém exclusivamente o site institucional da Syrum e a Pages Function necessária ao formulário comercial.

- Não adicionar código do CRM, API NestJS, Worker, banco, Redis, Docker, systemd ou Nginx.
- Manter links operacionais apontando para `https://app.syrum.com.br`.
- Manter o site compatível com exportação estática do Next.js para `out/`.
- Código dinâmico permitido deve usar Cloudflare Pages Functions em `functions/`.
- Nunca versionar tokens, credenciais, `.env` ou `.dev.vars`.
- Antes de concluir alterações, executar `npm run build` e `git diff --check`.
