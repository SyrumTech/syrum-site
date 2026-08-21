import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://syrum.com.br'),
  applicationName: 'Syrum',
  title: 'SYRUM — Toda a sua operação em um único fluxo.',
  description: 'Centralize conversas, organize equipes e transforme processos em uma operação visível, conectada e inteligente.',
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.ico' },
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
