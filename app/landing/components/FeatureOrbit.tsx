'use client';

import type { KeyboardEvent, ReactNode } from 'react';
import { useId, useState } from 'react';

type Feature = {
  label: string;
  title: string;
  description: string;
  icon: ReactNode;
};

const features: Feature[] = [
  {
    label: 'CRM',
    title: 'crm',
    description: 'todo o relacionamento com o cliente em um cadastro único, com histórico completo.',
    icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  },
  {
    label: 'clientes',
    title: 'gestão de clientes',
    description: 'segmentação, dados e movimentações organizados para cada empresa e contato.',
    icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  },
  {
    label: 'vendas',
    title: 'gestão de vendas',
    description: 'funil visual com etapas, responsáveis e acompanhamento de cada oportunidade.',
    icon: <><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" /><path d="M19 8h-3M19 8v3" /></>,
  },
  {
    label: 'atendimento',
    title: 'atendimento omnichannel',
    description: 'caixa de entrada compartilhada com filas por departamento e transferência entre atendentes.',
    icon: <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.9-.9L3 21l1.9-5.1A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5Z" />,
  },
  {
    label: 'whatsapp',
    title: 'whatsapp integrado',
    description: 'mensagens do whatsapp dentro da plataforma, ligadas ao cadastro do cliente.',
    icon: <><path d="M4 20l1.4-4.2A7.7 7.7 0 1 1 8.4 18.6L4 20Z" /><path d="M9.2 9.4c0 3 2.4 5.4 5.4 5.4" /></>,
  },
  {
    label: 'automação',
    title: 'automação de processos',
    description: 'gatilhos por evento, ações automáticas e fluxos adaptados ao seu negócio.',
    icon: <><circle cx="12" cy="12" r="3.1" /><path d="M12 2.6h0a1.7 1.7 0 0 1 1.7 1.7v.5c0 .5.3 1 .8 1.2.5.2 1 .1 1.4-.2l.4-.4a1.7 1.7 0 0 1 2.4 2.4l-.4.4c-.3.4-.4.9-.2 1.4.2.5.7.8 1.2.8h.5a1.7 1.7 0 0 1 0 3.4h-.5c-.5 0-1 .3-1.2.8-.2.5-.1 1 .2 1.4l.4.4a1.7 1.7 0 0 1-2.4 2.4l-.4-.4c-.4-.3-.9-.4-1.4-.2-.5.2-.8.7-.8 1.2v.5a1.7 1.7 0 0 1-3.4 0v-.5c0-.5-.3-1-.8-1.2-.5-.2-1-.1-1.4.2l-.4.4a1.7 1.7 0 0 1-2.4-2.4l.4-.4c.3-.4.4-.9.2-1.4-.2-.5-.7-.8-1.2-.8h-.5a1.7 1.7 0 0 1 0-3.4h.5c.5 0 1-.3 1.2-.8.2-.5.1-1-.2-1.4l-.4-.4a1.7 1.7 0 0 1 2.4-2.4l.4.4c.4.3.9.4 1.4.2.5-.2.8-.7.8-1.2v-.5A1.7 1.7 0 0 1 12 2.6Z" /></>,
  },
  {
    label: 'equipes',
    title: 'gestão de equipes',
    description: 'permissões, departamentos e distribuição de demanda por responsável.',
    icon: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  },
  {
    label: 'relatórios',
    title: 'relatórios e indicadores',
    description: 'volume, tempo de resposta, desempenho por canal e por equipe em tempo real.',
    icon: <><path d="M3 21h18" /><rect x="5" y="12" width="3.6" height="6" rx="1" /><rect x="10.2" y="8" width="3.6" height="10" rx="1" /><rect x="15.4" y="4" width="3.6" height="14" rx="1" /></>,
  },
];

const CENTER = 360;
const RADIUS = 240;
const NODE_R = 36;

function polar(index: number, total: number) {
  const angle = (-90 + index * (360 / total)) * (Math.PI / 180);
  return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) };
}

export default function FeatureOrbit() {
  const [active, setActive] = useState(0);
  const gradientId = useId();
  const activeFeature = features[active];

  function select(index: number) {
    setActive(index);
  }

  function onNodeKeyDown(event: KeyboardEvent<SVGGElement>, index: number) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      select(index);
    }
  }

  return (
    <div className="sy-orbit-wrap">
      <div className="sy-orbit-diagram">
        <svg viewBox={`0 0 ${CENTER * 2} ${CENTER * 2}`} className="sy-orbit-svg" role="img" aria-label="Recursos da plataforma Syrum conectados a um núcleo central">
          <defs>
            <linearGradient id={`${gradientId}-line`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7B2BFF" />
              <stop offset="1" stopColor="#2ED9FF" />
            </linearGradient>
            <radialGradient id={`${gradientId}-hub`} cx="35%" cy="30%" r="75%">
              <stop offset="0" stopColor="#3d3f72" />
              <stop offset="1" stopColor="#0d0f16" />
            </radialGradient>
          </defs>

          <circle cx={CENTER} cy={CENTER} r="82" className="sy-orbit-hub-ring" stroke={`url(#${gradientId}-line)`} />

          {features.map((feature, index) => {
            const { x, y } = polar(index, features.length);
            return (
              <line
                key={`line-${feature.title}`}
                x1={CENTER}
                y1={CENTER}
                x2={x}
                y2={y}
                className={`sy-orbit-line${index === active ? ' is-active' : ''}`}
                stroke={`url(#${gradientId}-line)`}
                style={{ animationDelay: `${index * -0.3}s` }}
              />
            );
          })}

          <circle cx={CENTER} cy={CENTER} r="70" fill={`url(#${gradientId}-hub)`} />
          <image href="/brand/svg/syrum-symbol-landing-gradient.svg" x={CENTER - 38} y={CENTER - 35.5} width="76" height="71" />

          {features.map((feature, index) => {
            const { x, y } = polar(index, features.length);
            const labelBelow = y >= CENTER;
            return (
              <g key={feature.title} transform={`translate(${x} ${y})`}>
                <g
                  className={`sy-orbit-node${index === active ? ' is-active' : ''}`}
                  style={{ animationDelay: `${index * 0.4}s` }}
                  tabIndex={0}
                  role="button"
                  aria-label={feature.title}
                  aria-pressed={index === active}
                  onMouseEnter={() => select(index)}
                  onFocus={() => select(index)}
                  onClick={() => select(index)}
                  onKeyDown={(event) => onNodeKeyDown(event, index)}
                >
                  <circle r={NODE_R} className="sy-orbit-node-circle" />
                  <svg x={-12} y={-12} width={24} height={24} viewBox="0 0 24 24" className="sy-orbit-node-icon">{feature.icon}</svg>
                  <text className="sy-orbit-node-label" y={labelBelow ? NODE_R + 20 : -(NODE_R + 10)}>{feature.label}</text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      <div key={active} className="sy-orbit-detail">
        <div className="sy-card-icon sy-card-icon-brand">
          <svg viewBox="0 0 24 24" className="sy-icon" aria-hidden="true">{activeFeature.icon}</svg>
        </div>
        <h3>{activeFeature.title}</h3>
        <p>{activeFeature.description}</p>
        <a href="#contato">saiba mais →</a>
      </div>

      <ul className="sy-orbit-list">
        {features.map((feature, index) => (
          <li key={feature.title}>
            <button type="button" className={index === active ? 'is-active' : ''} onClick={() => select(index)} aria-expanded={index === active}>
              <span className="sy-card-icon sy-card-icon-brand sy-orbit-list-icon">
                <svg viewBox="0 0 24 24" className="sy-icon" aria-hidden="true">{feature.icon}</svg>
              </span>
              <span className="sy-orbit-list-text">
                <strong>{feature.title}</strong>
                {index === active && <em>{feature.description}</em>}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
