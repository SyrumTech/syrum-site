import { Manrope, Poppins, Sora } from 'next/font/google';

/**
 * Fontes exclusivas da landing pública (Poppins / Manrope / Sora).
 *
 * As variáveis CSS geradas por essas instâncias (--font-poppins /
 * --font-manrope / --font-sora) só são aplicadas ao contêiner `.sy-site` em
 * app/page.tsx. Isso mantém a tipografia da landing isolada: /crm, /login e
 * /setup continuam usando Space Grotesk / DM Sans, definidos globalmente em
 * app/globals.css, sem qualquer alteração.
 */
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
});

export const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});
