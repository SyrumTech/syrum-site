# Syrum Site

Site institucional da Syrum. Este repositório é independente do CRM e foi preparado para publicação pelo Cloudflare Workers Builds com Static Assets.

- Site: `https://syrum.com.br`
- CRM: `https://app.syrum.com.br`
- API do CRM: `https://api.syrum.com.br`

O site é exportado como arquivos estáticos para `out/`. O Worker entrega esses assets e executa `POST /api/leads`. Nenhum processo deste repositório precisa rodar na VPS do CRM.

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

O build precisa produzir `out/index.html`. `npm run deploy:dry-run` valida o Worker, o entrypoint e o diretório de assets sem publicar.

## Cloudflare Workers Builds

Ao importar `SyrumTech/syrum-site` em **Workers & Pages → Create application → Continue with GitHub**, use:

| Campo | Valor |
| --- | --- |
| Branch de produção | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Preview deploy command | `npx wrangler versions upload` |
| Root directory | `/` |

Configure no Worker, em **Settings → Variables and Secrets**:

- `NEXT_PUBLIC_SITE_URL=https://syrum.com.br`
- `SYRUM_LEADS_API_URL`: endpoint HTTPS que recebe os leads.
- `SYRUM_LEADS_API_TOKEN`: secret criptografado, somente se o endpoint exigir autenticação.

O token nunca deve ser criado como variável pública nem incluído no Git.

O roteiro completo de publicação, domínio, rollback e validação está em [docs/cloudflare-workers.md](docs/cloudflare-workers.md).

## Limites do repositório

Este projeto contém somente a landing page e sua função de leads. Não devem ser adicionados aqui CRM, autenticação, inbox, API NestJS, banco, Redis, worker, Docker ou configurações da VPS.
