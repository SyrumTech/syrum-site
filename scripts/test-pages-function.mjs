import assert from 'node:assert/strict';

import { onRequest, onRequestPost } from '../functions/api/leads.js';

const validLead = {
  name: 'Maria', company: 'Empresa', email: 'maria@example.com', phone: '48999999999',
  teamSize: '6-15', interest: 'crm', message: 'Quero conhecer.',
};

function context(body, env = {}) {
  return {
    request: new Request('https://syrum.com.br/api/leads', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    }),
    env,
  };
}

assert.equal((await onRequest()).status, 405);
assert.equal((await onRequestPost(context({ name: 'x' }))).status, 400);
assert.equal((await onRequestPost(context(validLead))).status, 503);

const originalFetch = globalThis.fetch;
let forwarded;
globalThis.fetch = async (_url, init) => {
  forwarded = init;
  return new Response(null, { status: 204 });
};
try {
  const response = await onRequestPost(context(validLead, {
    SYRUM_LEADS_API_URL: 'https://api.example.com/leads',
    SYRUM_LEADS_API_TOKEN: 'test-only-token',
  }));
  assert.equal(response.status, 202);
  assert.equal(forwarded.headers.Authorization, 'Bearer test-only-token');
  assert.equal(JSON.parse(forwarded.body).email, validLead.email);
} finally {
  globalThis.fetch = originalFetch;
}

console.log('Pages Function de leads validada.');
