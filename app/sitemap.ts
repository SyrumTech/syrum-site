import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL
    ?? 'https://syrum.com.br'
  ).replace(/\/$/, '');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
