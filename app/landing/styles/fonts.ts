import { Manrope, Sora } from 'next/font/google';

/**
 * Fontes exclusivas da landing pública (Sora / Manrope).
 *
 * As variáveis CSS geradas por essas instâncias (--font-sora / --font-manrope)
 * só são aplicadas ao contêiner `.syrum-landing` em app/page.tsx. Isso mantém
 * a tipografia da landing isolada: /crm, /login e /setup continuam usando
 * Space Grotesk / DM Sans, definidos globalmente em app/globals.css, sem
 * qualquer alteração.
 */
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
