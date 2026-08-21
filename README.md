# Syrum Site

Landing page institucional da Syrum, publicada em `https://syrum.com.br`.

O CRM permanece separado em `https://app.syrum.com.br`.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Produção

```bash
npm ci
npm run build
npm start
```

A aplicação usa a porta `3200` por padrão. Configure o encaminhamento de leads com `SYRUM_LEADS_API_URL` e, quando necessário, `SYRUM_LEADS_API_TOKEN`.
