import type { Metadata } from 'next';

import CinematicLanding from './landing/animation/CinematicLanding';
import CommercialSections from './landing/components/CommercialSections';
import LandingHeader from './landing/components/LandingHeader';
import HeaderScrollController from './landing/components/HeaderScrollController';
import ScrollToTopOnLoad from './landing/components/ScrollToTopOnLoad';
import { manrope, sora } from './landing/styles/fonts';

import './landing/styles/tokens.css';
import './landing/styles/landing-shell.css';
import './landing/styles/cinematic-scroll.css';
import './landing/styles/origin-scene.css';
import './landing/styles/symbol-scene.css';
import './landing/styles/conversation-scene.css';
import './landing/styles/automation-scene.css';
import './landing/styles/dashboard-scene.css';
import './landing/styles/white-label-scene.css';
import './landing/styles/commercial-sections.css';
import './landing/styles/commercial-lead-form.css';
import './landing/styles/final-polish.css';
import './landing/styles/hero-consolidated.css';
import './landing/styles/header-scroll-fade.css';
import './landing/styles/logo-animation-lab.css';
import './landing/styles/logo-focus-mode.css';
import './landing/styles/cinematic-runtime.css';
export const metadata: Metadata = {
  title: 'SYRUM — Toda a sua operação em um único fluxo.',
  description:
    'Centralize conversas, organize equipes e transforme processos em uma operação visível, conectada e inteligente.',
};

export default function Home() {
  return (
    <div
      className={`syrum-landing ${sora.variable} ${manrope.variable}`}
    >
      <LandingHeader />
      <HeaderScrollController />
      <ScrollToTopOnLoad />

      <main>
        <CinematicLanding />
        <CommercialSections />
      </main>
    </div>
  );
}
