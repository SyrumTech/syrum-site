# Captação de leads com Google Apps Script (custo zero)

O formulário de contato (`app/landing/components/LeadForm.tsx`) já envia os dados para
`POST /api/leads`, que é tratado pelo Worker do site (`worker/leads.js`). O Worker valida
o payload no servidor e o repassa para o endereço configurado na variável de ambiente
`SYRUM_LEADS_API_URL` — **sem esse endereço configurado, o Worker responde
"indisponível" e nada é enviado.**

Este guia configura esse endereço para ser um Google Apps Script gratuito, que grava
cada lead em uma planilha do Google Sheets e te avisa por e-mail.

```
SITE (LeadForm.tsx)
   ↓ POST /api/leads  (mesmo domínio, sem CORS)
WORKER (worker/leads.js)
   ↓ POST server-to-server, com SYRUM_LEADS_API_URL
GOOGLE APPS SCRIPT
   ↓
GOOGLE SHEETS + GMAIL
```

> **Por que não existe uma variável `NEXT_PUBLIC_LEAD_ENDPOINT` no frontend?**
> O site já tem uma arquitetura pronta para isso — o Worker. O navegador do visitante
> nunca fala diretamente com o Google Apps Script; ele só fala com `/api/leads`, que é o
> próprio domínio do site. Isso evita qualquer problema de CORS (o Worker faz a chamada
> de servidor para servidor, onde CORS não existe) e mantém a URL do Apps Script fora do
> JavaScript público do site — mais simples e mais seguro do que expor o endereço no
> bundle do navegador. Quando o CRM da Syrum tiver uma API própria para leads, basta
> trocar o valor de `SYRUM_LEADS_API_URL` no Cloudflare — nenhum código do site muda.

## 1. Criar a planilha no Google Sheets

1. Acesse [sheets.google.com](https://sheets.google.com) com a conta Google que vai
   administrar os leads.
2. Crie uma planilha em branco e renomeie para, por exemplo, **"Syrum — Leads"**.
3. Renomeie a primeira aba (embaixo, onde diz "Página1") para **`Leads`**.
4. Não precisa criar o cabeçalho manualmente — o script cria a primeira linha
   automaticamente no primeiro lead recebido, se a aba estiver vazia.

## 2. Abrir o editor de Apps Script

1. Na planilha, vá em **Extensões → Apps Script**.
2. Um editor abrirá em uma nova aba, com um arquivo `Código.gs` vazio.
3. Apague todo o conteúdo padrão (`function myFunction() {}`).

## 3. Colar o código completo

Copie o código abaixo **por inteiro** e cole no arquivo `Código.gs`:

```javascript
/**
 * Syrum — recebimento de leads do site (syrum.com.br) via Cloudflare Worker.
 * Grava cada lead na aba "Leads" e envia uma notificação por e-mail.
 */

// E-mail que recebe a notificação de cada novo lead.
var NOTIFICATION_EMAIL = 'coloque-seu-email@gmail.com';

// Nome da aba onde os leads são gravados.
var SHEET_NAME = 'Leads';

var SHEET_HEADERS = [
  'Timestamp', 'Nome', 'E-mail', 'WhatsApp', 'Empresa', 'Tamanho da equipe',
  'Necessidade', 'Origem', 'Página', 'UTM Source', 'UTM Medium', 'UTM Campaign',
  'UTM Content', 'UTM Term',
];

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents;
    if (!raw) return jsonResponse({ success: false });

    var data = JSON.parse(raw);

    // Honeypot: campo invisível que só um robô preencheria.
    // Descarta silenciosamente, sem gravar nada e sem erro.
    if (data.website) return jsonResponse({ success: true });

    var lead = {
      name: sanitize(data.name, 100),
      email: sanitize(data.email, 160).toLowerCase(),
      phone: sanitize(data.phone, 30),
      company: sanitize(data.company, 120),
      teamSize: sanitize(data.teamSize, 30),
      interest: sanitize(data.interest, 60),
      origin: sanitize(data.origin, 30) || 'site',
      pageUrl: sanitize(data.pageUrl, 500),
      utmSource: sanitize(data.utmSource, 100),
      utmMedium: sanitize(data.utmMedium, 100),
      utmCampaign: sanitize(data.utmCampaign, 150),
      utmContent: sanitize(data.utmContent, 150),
      utmTerm: sanitize(data.utmTerm, 150),
      submittedAt: sanitize(data.submittedAt, 40),
    };

    if (!isValidLead(lead)) return jsonResponse({ success: false });

    appendLeadRow(lead);
    sendNotificationEmail(lead);

    return jsonResponse({ success: true });
  } catch (error) {
    Logger.log('Erro ao processar lead: ' + error);
    return jsonResponse({ success: false });
  }
}

function doGet() {
  return jsonResponse({ status: 'ok' });
}

function isValidLead(lead) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (
    lead.name.length >= 2 &&
    emailPattern.test(lead.email) &&
    lead.phone.length >= 8 &&
    lead.company.length >= 2 &&
    !!lead.teamSize &&
    !!lead.interest
  );
}

// Remove tags/HTML, quebras de linha internas e limita o tamanho de cada campo.
function sanitize(value, maxLength) {
  if (typeof value !== 'string') return '';
  var clean = value
    .replace(/<[^>]*>/g, '')
    .replace(/[\r\n]+/g, ' ')
    .trim();
  return clean.slice(0, maxLength);
}

function getSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(SHEET_HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function appendLeadRow(lead) {
  var timestamp = lead.submittedAt ? new Date(lead.submittedAt) : new Date();
  getSheet().appendRow([
    timestamp,
    lead.name,
    lead.email,
    lead.phone,
    lead.company,
    lead.teamSize,
    lead.interest,
    lead.origin,
    lead.pageUrl,
    lead.utmSource,
    lead.utmMedium,
    lead.utmCampaign,
    lead.utmContent,
    lead.utmTerm,
  ]);
}

function sendNotificationEmail(lead) {
  if (!NOTIFICATION_EMAIL || NOTIFICATION_EMAIL.indexOf('@') === -1) return;

  var body = [
    'Novo lead recebido pelo site da Syrum.',
    '',
    'Nome: ' + lead.name,
    'E-mail: ' + lead.email,
    'WhatsApp: ' + lead.phone,
    'Empresa: ' + lead.company,
    'Tamanho da equipe: ' + lead.teamSize,
    'Principal necessidade: ' + lead.interest,
    '',
    'Origem: ' + lead.origin,
    'Página: ' + lead.pageUrl,
    'UTM Source: ' + lead.utmSource,
    'UTM Medium: ' + lead.utmMedium,
    'UTM Campaign: ' + lead.utmCampaign,
    'UTM Content: ' + lead.utmContent,
    'UTM Term: ' + lead.utmTerm,
    '',
    'Data/hora: ' + new Date().toLocaleString('pt-BR'),
  ].join('\n');

  MailApp.sendEmail(NOTIFICATION_EMAIL, '🚀 Novo lead — Syrum', body);
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 4. Configurar o e-mail de notificação

No topo do script, troque:

```javascript
var NOTIFICATION_EMAIL = 'coloque-seu-email@gmail.com';
```

pelo e-mail que deve receber o aviso de cada novo lead. Esse endereço fica só dentro do
Apps Script — **nunca é exposto no site**.

Salve o arquivo (ícone de disquete ou `Ctrl+S`).

## 5. Publicar como Web App

1. No editor do Apps Script, clique em **Implantar → Nova implantação** (Deploy → New
   deployment).
2. Clique no ícone de engrenagem ao lado de "Selecionar tipo" e escolha **App da Web**
   (Web app).
3. Preencha:
   - **Descrição**: `syrum-leads` (ou qualquer nome).
   - **Executar como (Execute as)**: **Eu (seu e-mail)** — é essencial ser "Eu", e não
     "usuário que acessa o app", porque o Worker chama o script sem estar logado no
     Google.
   - **Quem pode acessar (Who has access)**: **Qualquer pessoa** (Anyone). *Não* escolha
     "Qualquer pessoa com uma Conta do Google" — isso exigiria login do Google na
     chamada, e o Worker não tem como fazer login.
4. Clique em **Implantar** (Deploy).
5. O Google vai pedir para autorizar o script a acessar sua planilha e enviar e-mail
   (`Gmail` e `Sheets`). Autorize com a mesma conta dona da planilha. Pode aparecer um
   aviso "App não verificado" — é normal para scripts pessoais; clique em **Avançado →
   Acessar (nome do projeto), não seguro** para prosseguir. É o seu próprio script, então
   é seguro continuar.
6. Copie a **URL do app da Web** (Web app URL) exibida — termina em `/exec`. É esse
   endereço que vai para o Cloudflare no próximo passo.

> Sempre que você editar o código do script depois, use **Implantar → Gerenciar
> implantações → editar (ícone de lápis) → Nova versão → Implantar** para que a alteração
> valha para a URL já publicada. Criar uma implantação totalmente nova geraria uma URL
> diferente, exigindo atualizar o Cloudflare de novo.

## 6. Configurar a URL no Cloudflare (Worker)

A URL do Apps Script **não vai no código do site nem no `.env` do Next.js** — ela é uma
variável de runtime do Worker, exatamente como o projeto já prevê:

1. No painel da Cloudflare, abra **Workers & Pages → `syrum-site` → Settings →
   Variables and Secrets**.
2. Adicione (ou edite) a variável:
   - **Nome**: `SYRUM_LEADS_API_URL`
   - **Valor**: a URL `.../exec` copiada no passo anterior.
   - Pode ficar como variável de texto normal (não precisa ser secret), já que não é uma
     credencial — é só o destino do webhook.
3. **Deixe `SYRUM_LEADS_API_TOKEN` vazio/não configurada.** O Google Apps Script, quando
   publicado como "Qualquer pessoa", não processa o cabeçalho `Authorization` de forma
   confiável (o próprio Google pode interceptar esse cabeçalho para tentar autenticação
   OAuth e quebrar a chamada). A segurança aqui vem da própria URL do Apps Script ser
   longa e não estar em nenhum lugar público — ela nunca chega ao navegador do
   visitante, só existe dentro do Worker.
4. Salve. A Cloudflare já reaplica a variável nas próximas execuções do Worker (não
   precisa gerar um novo deploy do código para variáveis simples, mas se quiser garantir,
   rode um novo deploy).

Referência completa dessas variáveis: [docs/cloudflare-workers.md](docs/cloudflare-workers.md).

## 7. Deploy do site

Se você só mudou a variável de ambiente no Cloudflare, nenhum novo deploy de código é
necessário. Se você também atualizou o código do repositório (por exemplo os arquivos
alterados nesta tarefa), publique normalmente:

```bash
npm run build
npx wrangler deploy
```

(O fluxo automático via Cloudflare Workers Builds, se estiver ativo, faz isso sozinho a
cada push na branch de produção.)

## 8. Testar de verdade

1. Abra `https://syrum.com.br` (ou a URL `*.workers.dev` de teste) e vá até a seção de
   contato.
2. Preencha o formulário com dados de teste e clique em **ENVIAR MENSAGEM AGORA**.
3. O botão deve mudar para **ENVIANDO...**, e em seguida aparecer:
   *"Mensagem enviada com sucesso. Em breve entraremos em contato."*
4. Confira:
   - Uma nova linha na aba `Leads` da planilha.
   - Um e-mail com o assunto **"🚀 Novo lead — Syrum"** na caixa configurada.
5. Teste também um envio com `?utm_source=instagram&utm_medium=social&utm_campaign=lancamento`
   na URL da página e confira se essas três colunas chegam preenchidas na planilha.
6. Para conferir que o endpoint do Apps Script responde, você pode abrir a URL `.../exec`
   direto no navegador (GET) — deve devolver `{"status":"ok"}`.

Se algo falhar, o formulário mostra apenas:
*"Não foi possível enviar sua mensagem agora. Tente novamente em alguns instantes."*
— o detalhe técnico fica só nos logs do Worker (Cloudflare) e do Apps Script (menu
**Execuções**, no editor do Apps Script), nunca exposto ao visitante.
