import type { MetadataRoute } from 'next';

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL
    ?? 'http://localhost:3000'
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
