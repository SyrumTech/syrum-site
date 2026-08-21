import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL
    ?? 'https://syrum.com.br'
  ).replace(/\/$/, '');
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/crm/',
          '/login',
          '/setup',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
