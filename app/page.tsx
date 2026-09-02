import type { Metadata } from 'next';

import SyrumLanding from './landing/SyrumLanding';
import { manrope, poppins } from './landing/styles/fonts';
import './landing/syrum-landing.css';

export const metadata: Metadata = {
  title: 'SYRUM — Alinhamos toda a sua operação em um só fluxo',
  description: 'WhatsApp, clientes, equipe, automação e serviços trabalhando juntos em uma central operacional.',
};

export default function Home() {
  return <SyrumLanding className={`${poppins.variable} ${manrope.variable}`} />;
}
