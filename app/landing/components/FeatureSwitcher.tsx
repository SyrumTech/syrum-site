'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useState } from 'react';

type Feature = {
  title: string;
  description: string;
  items: string[];
  icon: ReactNode;
};

const features: Feature[] = [
  {
    title: 'crm',
    description: 'todo o relacionamento com o cliente em um cadastro único, com histórico completo.',
    items: ['Cadastro único por cliente', 'Histórico completo de interações', 'Dados centralizados e acessíveis à equipe'],
    icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  },
  {
    title: 'gestão de clientes',
    description: 'segmentação, dados e movimentações organizados para cada empresa e contato.',
    items: ['Cadastro centralizado', 'Histórico de interações', 'Segmentação e organização'],
    icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  },
  {
    title: 'gestão de vendas',
    description: 'funil visual com etapas, responsáveis e acompanhamento de cada oportunidade.',
    items: ['Funil visual por etapas', 'Responsável definido por oportunidade', 'Acompanhamento em tempo real'],
    icon: <><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" /><path d="M19 8h-3M19 8v3" /></>,
  },
  {
    title: 'atendimento omnichannel',
    description: 'caixa de entrada compartilhada com filas por departamento e transferência entre atendentes.',
    items: ['Filas por departamento', 'Transferência entre atendentes', 'Histórico completo do contato'],
    icon: <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.9-.9L3 21l1.9-5.1A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5Z" />,
  },
  {
    title: 'whatsapp integrado',
    description: 'mensagens do whatsapp dentro da plataforma, ligadas ao cadastro do cliente.',
    items: ['Mensagens direto na plataforma', 'Conversas ligadas ao cadastro', 'Histórico unificado por contato'],
    icon: <><path d="M4 20l1.4-4.2A7.7 7.7 0 1 1 8.4 18.6L4 20Z" /><path d="M9.2 9.4c0 3 2.4 5.4 5.4 5.4" /></>,
  },
  {
    title: 'automação de processos',
    description: 'gatilhos por evento, ações automáticas e fluxos adaptados ao seu negócio.',
    items: ['Gatilhos por evento', 'Ações automáticas', 'Processos personalizados'],
    icon: <><circle cx="12" cy="12" r="3.1" /><path d="M12 2.6h0a1.7 1.7 0 0 1 1.7 1.7v.5c0 .5.3 1 .8 1.2.5.2 1 .1 1.4-.2l.4-.4a1.7 1.7 0 0 1 2.4 2.4l-.4.4c-.3.4-.4.9-.2 1.4.2.5.7.8 1.2.8h.5a1.7 1.7 0 0 1 0 3.4h-.5c-.5 0-1 .3-1.2.8-.2.5-.1 1 .2 1.4l.4.4a1.7 1.7 0 0 1-2.4 2.4l-.4-.4c-.4-.3-.9-.4-1.4-.2-.5.2-.8.7-.8 1.2v.5a1.7 1.7 0 0 1-3.4 0v-.5c0-.5-.3-1-.8-1.2-.5-.2-1-.1-1.4.2l-.4.4a1.7 1.7 0 0 1-2.4-2.4l.4-.4c.3-.4.4-.9.2-1.4-.2-.5-.7-.8-1.2-.8h-.5a1.7 1.7 0 0 1 0-3.4h.5c.5 0 1-.3 1.2-.8.2-.5.1-1-.2-1.4l-.4-.4a1.7 1.7 0 0 1 2.4-2.4l.4.4c.4.3.9.4 1.4.2.5-.2.8-.7.8-1.2v-.5A1.7 1.7 0 0 1 12 2.6Z" /></>,
  },
  {
    title: 'gestão de equipes',
    description: 'permissões, departamentos e distribuição de demanda por responsável.',
    items: ['Permissões por perfil', 'Departamentos organizados', 'Distribuição de demanda por responsável'],
    icon: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  },
  {
    title: 'relatórios e indicadores',
    description: 'volume, tempo de resposta, desempenho por canal e por equipe em tempo real.',
    items: ['Métricas operacionais', 'Visão por canal', 'Acompanhamento de filas'],
    icon: <><path d="M3 21h18" /><rect x="5" y="12" width="3.6" height="6" rx="1" /><rect x="10.2" y="8" width="3.6" height="10" rx="1" /><rect x="15.4" y="4" width="3.6" height="14" rx="1" /></>,
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="sy-switcher-check" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export default function FeatureSwitcher() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const activeFeature = features[active];

  function select(index: number) {
    if (index === active) return;
    setDirection(index > active ? 'down' : 'up');
    setActive(index);
  }

  return (
    <div className="sy-switcher">
      <ul className="sy-switcher-list" style={{ '--sy-switcher-active': active } as CSSProperties}>
        <li className="sy-switcher-indicator" aria-hidden="true" />
        {features.map((feature, index) => (
          <li key={feature.title}>
            <button
              type="button"
              className={index === active ? 'is-active' : ''}
              onClick={() => select(index)}
              onMouseEnter={() => select(index)}
              onFocus={() => select(index)}
              aria-pressed={index === active}
            >
              <span className="sy-switcher-icon">
                <svg viewBox="0 0 24 24" className="sy-icon" aria-hidden="true">{feature.icon}</svg>
              </span>
              <span className="sy-switcher-label">{feature.title}</span>
              <svg viewBox="0 0 24 24" className="sy-icon sy-switcher-chevron" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </li>
        ))}
      </ul>

      <div key={active} className={`sy-switcher-panel sy-switcher-panel--${direction}`}>
        <svg viewBox="0 0 24 24" className="sy-switcher-ghost-icon" aria-hidden="true">{activeFeature.icon}</svg>
        <div className="sy-switcher-panel-icon">
          <svg viewBox="0 0 24 24" className="sy-icon" aria-hidden="true">{activeFeature.icon}</svg>
        </div>
        <h3>{activeFeature.title}</h3>
        <p>{activeFeature.description}</p>
        <ul className="sy-switcher-items">
          {activeFeature.items.map((item, i) => (
            <li key={item} style={{ animationDelay: `${190 + i * 70}ms` }}>
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <a href="#contato">saiba mais →</a>
      </div>
    </div>
  );
}
