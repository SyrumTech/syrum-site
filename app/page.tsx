import type { Metadata } from 'next';

import SyrumLanding from './landing/v2/SyrumLanding';
import { manrope, sora } from './landing/styles/fonts';
import './landing/v2/syrum-landing.css';
import './landing/styles/commercial-lead-form.css';
export const metadata: Metadata = {
  title: 'SYRUM — A central operacional da sua empresa',
  description: 'WhatsApp, clientes, equipe, automação e serviços trabalhando juntos em uma central operacional.',
};

export default function Home() {
  return <SyrumLanding className={`${sora.variable} ${manrope.variable}`} />;
}
