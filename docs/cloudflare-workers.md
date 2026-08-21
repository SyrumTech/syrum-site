# Publicação no Cloudflare Workers Builds

## Arquitetura final

```text
SyrumTech/syrum-site ── Workers Builds + Static Assets ── syrum.com.br
                                                        www → syrum.com.br

SyrumTech/sistema-syrum ── VPS ── app.syrum.com.br
                                 └─ api.syrum.com.br
```

O Worker serve os arquivos estáticos exportados em `out/`. Apenas `/api/leads` executa lógica dinâmica. A landing não depende da VPS.

## Configuração exata do build

Na tela **Set up your application**, informe:

| Campo | Valor |
| --- | --- |
| Project name | `syrum-site` |
| Production branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Non-production deploy command | `npx wrangler versions upload` |
| Root directory | `/` |
| Access | desativado para produção pública |

O arquivo `wrangler.jsonc` contém os dados que o deploy exige:

- `main`: entrypoint do Worker;
- `assets.directory`: diretório `out` criado pelo Next.js;
- `assets.binding`: acesso do Worker aos arquivos estáticos;
- `assets.run_worker_first`: aplicação dos headers e roteamento da API.

## Variáveis de runtime

Depois do primeiro deploy, abra **Settings → Variables & Secrets**. Essas são variáveis de runtime, não Build variables:

| Nome | Tipo | Obrigatório | Finalidade |
| --- | --- | --- | --- |
| `SYRUM_LEADS_API_URL` | texto | sim para formulário | Endpoint HTTPS receptor |
| `SYRUM_LEADS_API_TOKEN` | secret | conforme endpoint | Autorização do encaminhamento |

`NEXT_PUBLIC_SITE_URL=https://syrum.com.br` pode ser configurada como Build variable, embora o código use esse domínio como fallback seguro.

Sem `SYRUM_LEADS_API_URL`, o formulário retorna indisponibilidade em vez de simular um envio bem-sucedido.

## Validação antes do domínio

Use a URL `*.workers.dev` criada pela Cloudflare e valide:

- carregamento da página, SVGs e animações;
- links para `https://app.syrum.com.br/login`;
- `robots.txt` e `sitemap.xml`;
- envio controlado do formulário;
- retorno `405` para `GET /api/leads`;
- headers de segurança;
- ausência de segredos no navegador.

## Domínios

O custom domain `syrum.com.br` é declarado em `wrangler.jsonc`. Cada deploy mantém essa associação de forma versionada. Para `www.syrum.com.br`, crie um redirecionamento 301 para o domínio principal preservando caminho e query string.

## Cutover seguro

1. Publicar e validar o domínio `workers.dev`.
2. Associar `syrum.com.br` ao Worker.
3. Validar DNS, TLS, página, formulário e dispositivos.
4. Confirmar que `app.syrum.com.br` e `api.syrum.com.br` continuam na VPS.
5. Somente então retirar da VPS o serviço e a rota Nginx exclusivos da landing.

## Rollback

Se o domínio falhar antes da remoção da landing antiga, restaure a rota/DNS anterior. Uma versão anterior do Worker também pode ser promovida em **Deployments**. Não altere os domínios do CRM durante o rollback do site.
