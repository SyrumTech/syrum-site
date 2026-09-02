'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useRef } from 'react';
import Link from 'next/link';

import BrandMark from './components/BrandMark';
import CaseCarousel from './components/CaseCarousel';
import FeatureSwitcher from './components/FeatureSwitcher';
import LeadForm from './components/LeadForm';
import ScrollToTopOnLoad from './components/ScrollToTopOnLoad';
import { useHeaderScrolled, useRevealOnScroll, useSymbolTilt } from './hooks';

const whatsappHref = 'https://wa.me/5547991198047';

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="sy-icon" aria-hidden="true">
      {children}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="sy-icon sy-icon-arrow" aria-hidden="true">
      <path d="M5 12h13m-5-5 5 5-5 5" />
    </svg>
  );
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 32 32" className="sy-icon-solid" aria-hidden="true">
      <path d="M16.004 2.667C8.64 2.667 2.67 8.637 2.67 16c0 2.354.616 4.653 1.787 6.68L2.667 29.333l6.83-1.76A13.28 13.28 0 0 0 16.004 29.3C23.367 29.3 29.337 23.33 29.337 16S23.367 2.667 16.004 2.667Zm0 24.106c-1.98 0-3.923-.53-5.62-1.535l-.403-.24-4.053 1.045 1.08-3.95-.263-.42a10.99 10.99 0 0 1-1.687-5.873c0-6.09 4.956-11.045 11.05-11.045 6.09 0 11.045 4.955 11.045 11.045s-4.956 11.973-11.15 11.973Zm6.06-8.28c-.332-.166-1.962-.968-2.266-1.078-.303-.111-.524-.166-.745.167-.22.332-.855 1.077-1.048 1.298-.193.222-.386.25-.717.083-.332-.166-1.4-.516-2.667-1.646-.986-.879-1.652-1.964-1.845-2.296-.193-.333-.02-.512.145-.678.149-.148.332-.387.498-.58.166-.194.221-.333.332-.555.11-.222.055-.416-.028-.582-.083-.166-.745-1.797-1.021-2.46-.269-.646-.542-.558-.745-.568l-.635-.011c-.221 0-.58.083-.883.416-.304.332-1.159 1.133-1.159 2.764s1.187 3.206 1.352 3.428c.166.222 2.336 3.567 5.66 5.002.79.341 1.408.545 1.889.698.793.252 1.516.216 2.087.131.637-.095 1.962-.802 2.239-1.577.276-.775.276-1.44.193-1.578-.083-.139-.304-.222-.635-.388Z" />
    </svg>
  );
}

const methodSteps = [
  {
    title: 'centralizar',
    description: 'todos os canais e contatos em um só lugar, sem planilhas paralelas.',
    gradient: 'linear-gradient(140deg,#7B2BFF,#368cff)',
    glow: 'rgba(123,43,255,.45)',
    icon: <><circle cx="12" cy="12" r="7.5" /><circle cx="12" cy="12" r="3" /><path d="M12 1.4v2.6M12 20v2.6M1.4 12h2.6M20 12h2.6" /><path d="m5.6 5.6 1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" /></>,
  },
  {
    title: 'organizar',
    description: 'departamentos, filas e responsáveis definidos para cada tipo de demanda.',
    gradient: 'linear-gradient(140deg,#6a3aff,#3a91ff)',
    glow: 'rgba(106,58,255,.45)',
    icon: <><rect x="3" y="4" width="5.4" height="16" rx="1.3" /><rect x="9.3" y="4" width="5.4" height="10" rx="1.3" /><rect x="15.6" y="4" width="5.4" height="13" rx="1.3" /><path d="M4.6 8.2h2.2M4.6 11h2.2M10.9 8.2h2.2M17.2 8.2h2.2M17.2 11h2.2" /></>,
  },
  {
    title: 'automatizar',
    description: 'gatilhos e ações que eliminam a tarefa manual e mantêm o processo rodando.',
    gradient: 'linear-gradient(140deg,#5b4bff,#3ba0ff)',
    glow: 'rgba(91,75,255,.45)',
    icon: <><path d="M12 2.6a1.7 1.7 0 0 1 1.7 1.7v.5c0 .5.3 1 .8 1.2.5.2 1 .1 1.4-.2l.4-.4a1.7 1.7 0 0 1 2.4 2.4l-.4.4c-.3.4-.4.9-.2 1.4.2.5.7.8 1.2.8h.5a1.7 1.7 0 0 1 0 3.4h-.5c-.5 0-1 .3-1.2.8-.2.5-.1 1 .2 1.4l.4.4a1.7 1.7 0 0 1-2.4 2.4l-.4-.4c-.4-.3-.9-.4-1.4-.2-.5.2-.8.7-.8 1.2v.5a1.7 1.7 0 0 1-3.4 0v-.5c0-.5-.3-1-.8-1.2-.5-.2-1-.1-1.4.2l-.4.4a1.7 1.7 0 0 1-2.4-2.4l.4-.4c.3-.4.4-.9.2-1.4-.2-.5-.7-.8-1.2-.8h-.5a1.7 1.7 0 0 1 0-3.4h.5c.5 0 1-.3 1.2-.8.2-.5.1-1-.2-1.4l-.4-.4a1.7 1.7 0 0 1 2.4-2.4l.4.4c.4.3.9.4 1.4.2.5-.2.8-.7.8-1.2v-.5A1.7 1.7 0 0 1 12 2.6Z" /><path d="M11.4 9.3 9.3 12.4h1.9l-.6 2.7L13 12.1h-1.8l.2-2.8Z" /></>,
  },
  {
    title: 'converter',
    description: 'funil comercial acompanhado etapa a etapa, do primeiro contato ao fechamento.',
    gradient: 'linear-gradient(140deg,#4a5cff,#2fb5ff)',
    glow: 'rgba(74,92,255,.45)',
    icon: <><path d="M3 4h18l-7 8v7l-4 2v-9L3 4Z" /><circle cx="9" cy="4" r=".9" fill="currentColor" stroke="none" /><circle cx="12" cy="4" r=".9" fill="currentColor" stroke="none" /><circle cx="15" cy="4" r=".9" fill="currentColor" stroke="none" /></>,
  },
  {
    title: 'analisar',
    description: 'indicadores em tempo real para decidir com dado, não com achismo.',
    gradient: 'linear-gradient(140deg,#3a6dff,#2ED9FF)',
    glow: 'rgba(46,217,255,.45)',
    icon: <><path d="M3 21h18" /><rect x="5" y="14" width="3.2" height="4" rx="1" /><rect x="10.4" y="10" width="3.2" height="8" rx="1" /><rect x="15.8" y="6" width="3.2" height="12" rx="1" /><path d="M5 9.2 9 6l3.4 2.6L18 4" /><path d="M14.6 4h3.4v3.4" /></>,
  },
];

const contactPoints = [
  {
    label: 'WhatsApp',
    value: '(47) 99119-8047',
    href: whatsappHref,
    icon: <><path d="M3.2 20.8 4.4 17A8.5 8.5 0 1 1 7.6 20l-4.4.8Z" /><path d="M8.9 8.2c0 3.3 2.7 6 6 6" /></>,
  },
  {
    label: 'E-mail',
    value: 'contato.syrum@gmail.com',
    href: 'mailto:contato.syrum@gmail.com',
    icon: <><rect x="2.5" y="5" width="19" height="14" rx="2.5" /><path d="m3.4 7 8.6 6 8.6-6" /></>,
  },
  {
    label: 'Onde estamos',
    value: 'Grande Florianópolis — SC',
    href: 'https://www.google.com/maps/search/?api=1&query=Grande+Florian%C3%B3polis+SC',
    icon: <><path d="M12 21.2s7-5.9 7-11.2a7 7 0 1 0-14 0c0 5.3 7 11.2 7 11.2Z" /><circle cx="12" cy="9.8" r="2.6" /></>,
  },
  {
    label: 'Instagram',
    value: 'sistema_syrum',
    href: 'https://www.instagram.com/sistemas_syrum',
    icon: <><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle cx="17.1" cy="6.9" r="1.05" fill="currentColor" stroke="none" /></>,
  },
];

const footerPlatformLinks = ['crm', 'atendimento omnichannel', 'whatsapp integrado', 'automação de processos', 'relatórios e indicadores'];

const clientLogos = [
  <img key="conrat" src="/landing/clients/conrat-tecnologia.png" loading="lazy" decoding="async" alt="Conrat Tecnologia" />,
  <div key="nortex" className="sy-marquee-wordmark">
    <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 26V6l22 20V6" /></svg>
    <span>Nortex</span>
  </div>,
  <div key="vellum" className="sy-marquee-wordmark sy-marquee-wordmark-upper">
    <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 8h24M8 16h16M12 24h8" /></svg>
    <span>Vellum</span>
  </div>,
];

export default function SyrumLanding({ className }: { className: string }) {
  const scrolled = useHeaderScrolled();
  const symbolTilt = useSymbolTilt();
  const mainRef = useRef<HTMLDivElement>(null);
  useRevealOnScroll(mainRef);

  return (
    <div className={`sy-site ${className}`}>
      <ScrollToTopOnLoad />
      <header className={`sy-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="sy-header-inner">
          <a href="#topo" aria-label="Syrum, início">
            <BrandMark />
          </a>
          <nav data-syrum-nav="true">
            <a href="#plataforma">plataforma</a>
            <a href="#metodo">método</a>
            <a href="#recursos">recursos</a>
            <a href="#cases">cases</a>
            <a href="#contato">contato</a>
          </nav>
          <div className="sy-header-actions">
            <Link href="https://app.syrum.com.br/login">entrar</Link>
            <a className="sy-button" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <WhatsAppGlyph />
              Fale Conosco
            </a>
          </div>
        </div>
      </header>

      <main ref={mainRef}>
        <section id="topo" className="sy-hero">
          <div className="sy-hero-bg">
            <img src="/landing/hero-bg-1.jpg" alt="" className="sy-hero-bg-img sy-ken-0" />
            <img src="/landing/hero-bg-2.jpg" alt="" className="sy-hero-bg-img sy-ken-1" loading="lazy" decoding="async" fetchPriority="low" />
            <img src="/landing/hero-bg-3.jpg" alt="" className="sy-hero-bg-img sy-ken-2" loading="lazy" decoding="async" fetchPriority="low" />
            <img src="/landing/hero-bg-4.jpg" alt="" className="sy-hero-bg-img sy-ken-3" loading="lazy" decoding="async" fetchPriority="low" />
          </div>
          <div className="sy-hero-scrim-a" />
          <div className="sy-hero-scrim-b" />
          <div className="sy-hero-scrim-c" />
          <div data-hero-content="true" className="sy-hero-content">
            <div className="sy-hero-copy">
              <p className="sy-hero-kicker">Plataforma de Gestão Operacional</p>
              <h1>
                Alinhamos toda sua<span className="sy-gradient-text">&nbsp;operação</span>
                <br />em só&nbsp;<span className="sy-gradient-text">fluxo</span>.
              </h1>
              <p className="sy-hero-lead">Tudo o que sua empresa precisa para organizar, automatizar e acompanhar sua operação em um só lugar.</p>
              <div className="sy-hero-actions">
                <a className="sy-button sy-button-large" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <WhatsAppGlyph />
                  Quero organizar minha operação
                </a>
              </div>
            </div>
            <div className="sy-hero-symbol-stage">
              <div className="sy-hero-symbol" style={{ transform: symbolTilt.transform }} onMouseMove={symbolTilt.onMouseMove} onMouseLeave={symbolTilt.onMouseLeave}>
                <BrandMark variant="hero-symbol" />
              </div>
            </div>
          </div>
        </section>

        <section id="metodo" className="sy-section sy-section-method">
          <div className="sy-section-glow sy-glow-violet" />
          <div className="sy-section-inner">
            <h2 data-reveal="0" className="sy-reveal sy-h2-center">método de fluxo&nbsp;<span className="sy-gradient-text">syrum</span></h2>
            <p data-reveal="1" className="sy-reveal sy-lead-center">5 etapas que transformam uma operação dispersa em um fluxo previsível de atendimento e vendas.</p>
            <div className="sy-card-grid sy-card-grid-method">
              {methodSteps.map((step, index) => (
                <article key={step.title} data-reveal={index + 2} className="sy-reveal sy-card sy-card-method" style={{ '--sy-method-glow': step.glow } as CSSProperties}>
                  <div className="sy-card-icon" style={{ background: step.gradient, boxShadow: `0 0 30px ${step.glow}` }}>
                    <Icon>{step.icon}</Icon>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="plataforma" className="sy-section">
          <div className="sy-section-glow sy-glow-blue" />
          <div className="sy-section-inner">
            <div className="sy-section-heading">
              <h2 data-reveal="0" className="sy-reveal">tudo o que sua equipe precisa para <span className="sy-gradient-text">operar</span></h2>
              <p data-reveal="1" className="sy-reveal sy-lead-center">uma base única para contatos, conversas, responsáveis, processos e resultados.</p>
            </div>
            <div id="recursos" data-reveal="2" className="sy-reveal">
              <FeatureSwitcher />
            </div>
          </div>
        </section>

        <section className="sy-section sy-section-clients">
          <div className="sy-section-inner">
            <h2 data-reveal="0" className="sy-reveal sy-h2-center sy-h2-small">empresas que já operam com a syrum</h2>
          </div>
          <div className="sy-marquee-mask">
            <div className="sy-marquee-track">
              {Array.from({ length: 8 }, () => clientLogos).flat().map((client, index) => (
                <div className="sy-marquee-item" key={index}>{client}</div>
              ))}
            </div>
          </div>
        </section>

        <section id="cases" className="sy-section sy-section-cases">
          <div className="sy-section-inner">
            <h2 data-reveal="0" className="sy-reveal">sua operação em outro nível</h2>
            <p data-reveal="1" className="sy-reveal sy-lead">uma plataforma criada para conectar pessoas, processos e informações em um só lugar.</p>
          </div>
          <div data-reveal="2" className="sy-reveal">
            <CaseCarousel />
          </div>
        </section>

        <section id="contato" className="sy-section sy-section-contact">
          <div className="sy-section-glow sy-glow-contact" />
          <div className="sy-contact-grid">
            <div>
              <h2>vamos organizar a sua <span className="sy-gradient-text">operação</span>?</h2>
              <p className="sy-lead">conte o cenário atual da sua empresa e montamos uma demonstração direcionada à sua realidade.</p>
              <div className="sy-contact-points">
                {contactPoints.map((point) => (
                  <a key={point.label} href={point.href} target="_blank" rel="noopener noreferrer">
                    <Icon>{point.icon}</Icon>
                    <span>
                      <strong>{point.label}</strong>
                      <em>{point.value}</em>
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>

      <footer className="sy-footer">
        <div className="sy-footer-grid">
          <div>
            <BrandMark />
            <p>toda a sua operação em um único fluxo.</p>
            <div className="sy-social-row">
              <a href="https://www.linkedin.com/in/gabriel-schmitt-/" aria-label="LinkedIn" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" className="sy-icon-solid" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.2 1.46-2.2 2.97V21h-4V9Z" /></svg>
              </a>
              <a href={whatsappHref} aria-label="WhatsApp" title="WhatsApp" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" className="sy-icon-solid" aria-hidden="true"><path d="M12 2.2A9.7 9.7 0 0 0 3.6 16.7L2.4 21.6l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.6a7.9 7.9 0 0 1-4.02-1.1l-.29-.17-2.96.78.79-2.88-.19-.3A7.9 7.9 0 1 1 12 19.8Zm4.4-6a10 10 0 0 1-1.65-.78c-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06a6.5 6.5 0 0 1-1.9-1.18 7.2 7.2 0 0 1-1.34-1.66c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46a.88.88 0 0 0-.64.3c-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" /></svg>
              </a>
              <a href="https://www.instagram.com/sistemas_syrum" aria-label="Instagram" title="Instagram" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" className="sy-icon-solid" aria-hidden="true"><path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.51.01-4.75.07-.9.04-1.38.19-1.7.31-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.27.8-.31 1.7-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.4.9.19 1.38.31 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.8.27 1.7.31 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c.9-.04 1.38-.19 1.7-.31.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.27-.8.31-1.7.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.04-.9-.19-1.38-.31-1.7a2.9 2.9 0 0 0-.69-1.06 2.9 2.9 0 0 0-1.06-.69c-.32-.12-.8-.27-1.7-.31-1.24-.06-1.61-.07-4.75-.07Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-3.2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" /></svg>
              </a>
              <a href="#topo" aria-label="Facebook (em breve)" title="Facebook (em breve)">
                <svg viewBox="0 0 24 24" className="sy-icon-solid" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.54-1.5H16.7V3.63c-.28-.04-1.25-.12-2.38-.12-2.35 0-3.96 1.44-3.96 4.07V9.9H7.65V13h2.71v8h3.14Z" /></svg>
              </a>
            </div>
          </div>
          <div>
            <h4>plataforma</h4>
            <div className="sy-footer-links">
              {footerPlatformLinks.map((link) => <a key={link} href="#recursos">{link}</a>)}
            </div>
          </div>
          <div>
            <h4>navegação</h4>
            <div className="sy-footer-links">
              <a href="#metodo">método syrum flow</a>
              <a href="#cases">cases</a>
              <a href="#contato">contato</a>
            </div>
          </div>
          <div>
            <h4>contato</h4>
            <div className="sy-footer-links">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">(47) 99119-8047</a>
              <a href="mailto:contato.syrum@gmail.com" target="_blank" rel="noopener noreferrer">contato.syrum@gmail.com</a>
              <span>grande florianópolis — sc</span>
              <Link href="https://app.syrum.com.br/login">acessar a plataforma</Link>
            </div>
          </div>
        </div>
        <div className="sy-footer-bottom">
          <span>© {new Date().getFullYear()} syrum. todos os direitos reservados.</span>
          <span>syrum.com.br</span>
        </div>
      </footer>
    </div>
  );
}
