import { handleLeadRequest } from './leads.js';

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/leads') return handleLeadRequest(request, env);
    if (url.pathname.startsWith('/api/'))
      return new Response('Not Found', { status: 404, headers: securityHeaders });

    const asset = await env.ASSETS.fetch(request);
    const response = new Response(asset.body, asset);
    for (const [name, value] of Object.entries(securityHeaders)) response.headers.set(name, value);
    return response;
  },
};
