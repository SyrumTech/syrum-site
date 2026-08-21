# Escopo permanente deste repositório

Este repositório contém exclusivamente o site institucional da Syrum e o Worker necessário ao formulário comercial e à entrega dos assets.

- Não adicionar código do CRM, API NestJS, Worker, banco, Redis, Docker, systemd ou Nginx.
- Manter links operacionais apontando para `https://app.syrum.com.br`.
- Manter o site compatível com exportação estática do Next.js para `out/`.
- Código dinâmico permitido deve usar o Cloudflare Worker em `worker/`.
- Nunca versionar tokens, credenciais, `.env` ou `.dev.vars`.
- Antes de concluir alterações, executar `npm run build` e `git diff --check`.
