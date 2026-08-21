# Publicação no Cloudflare Pages

## Arquitetura final

```text
SyrumTech/syrum-site ── Cloudflare Pages ── syrum.com.br
                                           www.syrum.com.br → syrum.com.br

SyrumTech/sistema-syrum ── VPS ── app.syrum.com.br
                                 └─ api.syrum.com.br
```

Uma indisponibilidade da VPS pode retirar CRM e API do ar, mas não deve retirar o site institucional.

## 1. Criar o projeto

No painel Cloudflare:

1. Abra **Workers & Pages**.
2. Selecione **Create application → Pages → Import an existing Git repository**.
3. Escolha `SyrumTech/syrum-site`.
4. Selecione a branch `main`.
5. Use o preset **Next.js (Static HTML Export)**.
6. Configure o comando `npm run build` e diretório de saída `out`.
7. Não configure comando de start: o Pages serve o conteúdo estático.

O arquivo `wrangler.jsonc` documenta o nome do projeto, o diretório de saída e a data de compatibilidade da Pages Function.

## 2. Variáveis e secrets

Em **Settings → Variables and Secrets**, configure separadamente produção e preview:

| Nome | Tipo | Obrigatório | Finalidade |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | texto | sim | URL canônica do site |
| `SYRUM_LEADS_API_URL` | texto | sim para formulário | Endpoint HTTPS receptor |
| `SYRUM_LEADS_API_TOKEN` | secret | conforme endpoint | Autorização do encaminhamento |

Sem `SYRUM_LEADS_API_URL`, o formulário retorna indisponibilidade e não simula sucesso. Isso evita perder contatos silenciosamente.

## 3. Validar o domínio temporário

Antes de alterar DNS, valide a URL `*.pages.dev`:

- carregamento da página e dos SVGs;
- animações desktop e mobile;
- links para `https://app.syrum.com.br/login`;
- `robots.txt` e `sitemap.xml`;
- envio real e controlado do formulário;
- resposta `405` para métodos não permitidos em `/api/leads`;
- headers de segurança;
- ausência de segredos nos arquivos e respostas do navegador.

## 4. Domínio principal

Depois da validação do preview:

1. Adicione `syrum.com.br` como custom domain do projeto Pages.
2. Confirme o certificado TLS e a resolução DNS.
3. Adicione `www.syrum.com.br` à zona.
4. Configure um **Bulk Redirect 301** de `www.syrum.com.br` para `https://syrum.com.br`, preservando query string, subpath e sufixo do caminho.

O redirecionamento entre hosts não deve ser colocado em `_redirects`, pois o Pages não suporta redirects de domínio nesse arquivo.

## 5. Cutover seguro

Não remova a landing antiga da VPS antes de concluir todos os testes:

1. Publicar e validar `*.pages.dev`.
2. Conectar `syrum.com.br` ao Pages.
3. Validar DNS, TLS, página, formulário e dispositivos.
4. Confirmar que `app.syrum.com.br` e `api.syrum.com.br` continuam na VPS.
5. Monitorar a primeira publicação.
6. Somente então retirar da VPS o serviço e a rota Nginx exclusivos da landing.

## 6. Rollback

Se o cutover falhar antes da remoção da landing antiga, restaure o registro/rota anterior de `syrum.com.br`. No Pages, uma versão anterior também pode ser promovida pela área de deployments. Não altere `app.syrum.com.br` nem `api.syrum.com.br` durante o rollback do site.

## 7. Critério de conclusão

- `syrum.com.br` e `www.syrum.com.br` funcionam sem a VPS;
- CRM permanece exclusivamente em `app.syrum.com.br`;
- API permanece exclusivamente em `api.syrum.com.br`;
- push no site não reinicia CRM/API/Worker;
- deploy do CRM não reconstrói o site;
- nenhum secret está versionado.
