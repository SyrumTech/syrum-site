const maximumPayloadBytes = 16_384;

function json(payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function normalizeText(value, maximumLength) {
  return typeof value === 'string' ? value.trim().slice(0, maximumLength) : '';
}

function validateLead(payload) {
  if (!payload || Array.isArray(payload) || typeof payload !== 'object') return null;
  const lead = {
    name: normalizeText(payload.name, 100),
    company: normalizeText(payload.company, 120),
    email: normalizeText(payload.email, 160).toLowerCase(),
    phone: normalizeText(payload.phone, 30),
    teamSize: normalizeText(payload.teamSize, 30),
    interest: normalizeText(payload.interest, 60),
    message: normalizeText(payload.message, 1500),
    utmSource: normalizeText(payload.utmSource, 100),
    utmMedium: normalizeText(payload.utmMedium, 100),
    utmCampaign: normalizeText(payload.utmCampaign, 150),
    utmContent: normalizeText(payload.utmContent, 150),
    utmTerm: normalizeText(payload.utmTerm, 150),
    pageUrl: normalizeText(payload.pageUrl, 500),
    submittedAt: new Date().toISOString(),
  };
  if (lead.name.length < 2 || lead.company.length < 2 || lead.phone.length < 8
    || !lead.teamSize || !lead.interest || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return null;
  return lead;
}

export async function handleLeadRequest(request, env) {
  if (request.method !== 'POST')
    return json({ success: false, message: 'Método não permitido.' }, 405);
  const contentType = request.headers.get('content-type') ?? '';
  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (!contentType.toLowerCase().includes('application/json'))
    return json({ success: false, message: 'Formato de requisição inválido.' }, 415);
  if (Number.isFinite(contentLength) && contentLength > maximumPayloadBytes)
    return json({ success: false, message: 'Solicitação muito grande.' }, 413);

  let payload;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > maximumPayloadBytes)
      return json({ success: false, message: 'Solicitação muito grande.' }, 413);
    payload = JSON.parse(raw);
  } catch {
    return json({ success: false, message: 'JSON inválido.' }, 400);
  }

  const lead = validateLead(payload);
  if (!lead)
    return json({ success: false, message: 'Revise os campos obrigatórios e tente novamente.' }, 400);

  const endpoint = env.SYRUM_LEADS_API_URL?.trim();
  if (!endpoint)
    return json({ success: false, message: 'Canal comercial temporariamente indisponível.' }, 503);

  let endpointUrl;
  try {
    endpointUrl = new URL(endpoint);
  } catch {
    return json({ success: false, message: 'Canal comercial temporariamente indisponível.' }, 503);
  }
  if (endpointUrl.protocol !== 'https:')
    return json({ success: false, message: 'Canal comercial temporariamente indisponível.' }, 503);

  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(env.SYRUM_LEADS_API_TOKEN ? { Authorization: `Bearer ${env.SYRUM_LEADS_API_TOKEN}` } : {}),
      },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) throw new Error(`Lead endpoint returned ${response.status}`);
    return json({ success: true, message: 'Solicitação recebida. Entraremos em contato.' }, 202);
  } catch (error) {
    console.error('[syrum-site leads]', error instanceof Error ? error.message : 'forwarding failed');
    return json({ success: false, message: 'Não foi possível registrar a solicitação agora.' }, 502);
  }
}
