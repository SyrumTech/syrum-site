# Syrum Site

Site institucional da Syrum. Este repositório é independente do CRM e foi preparado para publicação no Cloudflare Pages.

- Site: `https://syrum.com.br`
- CRM: `https://app.syrum.com.br`
- API do CRM: `https://api.syrum.com.br`

O site é exportado como arquivos estáticos para `out/`. A única parte dinâmica é `POST /api/leads`, executada na rede da Cloudflare por uma Pages Function. Nenhum processo deste repositório precisa rodar na VPS do CRM.

## Desenvolvimento

Requisitos: Node.js 22 ou superior e npm 10 ou superior.

```bash
npm ci
npm run dev
```

O servidor de desenvolvimento abre em `http://localhost:3200`.

## Validação

```bash
npm run check:functions
npm run build
```

O build precisa produzir `out/index.html`, `out/_headers` e `out/_routes.json`.

## Cloudflare Pages

Ao importar `SyrumTech/syrum-site` no Cloudflare Pages, use:

| Campo | Valor |
| --- | --- |
| Branch de produção | `main` |
| Framework preset | `Next.js (Static HTML Export)` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | `/` |
| Node.js | `22` |

Configure no Pages, em **Settings → Variables and Secrets**:

- `NEXT_PUBLIC_SITE_URL=https://syrum.com.br`
- `SYRUM_LEADS_API_URL`: endpoint HTTPS que recebe os leads.
- `SYRUM_LEADS_API_TOKEN`: secret criptografado, somente se o endpoint exigir autenticação.

O token nunca deve ser criado como variável pública nem incluído no Git.

O roteiro completo de publicação, domínio, rollback e validação está em [docs/cloudflare-pages.md](docs/cloudflare-pages.md).

## Limites do repositório

Este projeto contém somente a landing page e sua função de leads. Não devem ser adicionados aqui CRM, autenticação, inbox, API NestJS, banco, Redis, worker, Docker ou configurações da VPS.
