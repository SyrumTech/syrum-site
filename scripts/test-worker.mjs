import assert from 'node:assert/strict';

import worker from '../worker/index.js';

const validLead = {
  name: 'Maria', company: 'Empresa', email: 'maria@example.com', phone: '48999999999',
  teamSize: '6-15', interest: 'crm', message: 'Quero conhecer.',
};

function request(path, body, method = 'POST') {
  return new Request(`https://syrum.com.br${path}`, {
    method,
    ...(body ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {}),
  });
}

const assetEnvironment = {
  ASSETS: { fetch: async () => new Response('<h1>Syrum</h1>', { headers: { 'Content-Type': 'text/html' } }) },
};
assert.equal((await worker.fetch(request('/', null, 'GET'), assetEnvironment)).status, 200);
assert.equal((await worker.fetch(request('/', null, 'GET'), assetEnvironment)).headers.get('X-Frame-Options'), 'DENY');
assert.equal((await worker.fetch(request('/api/unknown', null, 'GET'), assetEnvironment)).status, 404);
assert.equal((await worker.fetch(request('/api/leads', null, 'GET'), assetEnvironment)).status, 405);
assert.equal((await worker.fetch(request('/api/leads', { name: 'x' }), assetEnvironment)).status, 400);
assert.equal((await worker.fetch(request('/api/leads', validLead), assetEnvironment)).status, 503);

const originalFetch = globalThis.fetch;
let forwarded;
globalThis.fetch = async (_url, init) => {
  forwarded = init;
  return new Response(null, { status: 204 });
};
try {
  const response = await worker.fetch(request('/api/leads', validLead), {
    ...assetEnvironment,
    SYRUM_LEADS_API_URL: 'https://api.example.com/leads',
    SYRUM_LEADS_API_TOKEN: 'test-only-token',
  });
  assert.equal(response.status, 202);
  assert.equal(forwarded.headers.Authorization, 'Bearer test-only-token');
  assert.equal(JSON.parse(forwarded.body).email, validLead.email);
} finally {
  globalThis.fetch = originalFetch;
}

console.log('Worker e encaminhamento de leads validados.');
