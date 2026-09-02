import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import './globals.css';

const title = 'SYRUM — Toda a sua operação em um único fluxo.';
const description = 'Centralize conversas, organize equipes e transforme processos em uma operação visível, conectada e inteligente.';

export const metadata: Metadata = {
  metadataBase: new URL('https://syrum.com.br'),
  applicationName: 'Syrum',
  title,
  description,
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Syrum',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Syrum' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#020207',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
