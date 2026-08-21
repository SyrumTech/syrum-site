import type { HeroContent, NavLink } from '../types/landing';

export const navLinks: NavLink[] = [
  { label: 'Plataforma', href: '#plataforma' },
  { label: 'Recursos', href: '#recursos' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Segurança', href: '#seguranca' },
];

export const heroContent: HeroContent = {
  eyebrow: 'Operação conectada',
  title: 'Toda a sua operação em um único fluxo.',
  description:
    'Centralize conversas, organize equipes e transforme processos em uma operação visível, conectada e inteligente.',
  primaryCta: {
    label: 'Solicitar demonstração',
    href: '#demonstracao',
  },
  secondaryCta: {
    label: 'Conhecer a plataforma',
    href: '#plataforma',
  },
};
