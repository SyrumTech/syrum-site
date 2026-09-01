'use client';

import { useEffect, useRef, useState } from 'react';

type Case = {
  image: string;
  alt: string;
  tag: string;
  title: string;
};

const cases: Case[] = [
  {
    image: '/landing/case-atendimento.jpg',
    alt: 'CRM Syrum — inbox de atendimento',
    tag: 'atendimento',
    title: 'Centralize conversas, acompanhe cada cliente e dê à sua equipe uma visão completa de cada interação.',
  },
  {
    image: '/landing/case-ordem-servico.jpg',
    alt: 'CRM Syrum — central de ordens de serviço',
    tag: 'ordem de serviço',
    title: 'Crie, acompanhe e gerencie ordens de serviço sem perder prazos, informações ou histórico.',
  },
  {
    image: '/landing/case-automacao.jpg',
    alt: 'CRM Syrum — editor de automações',
    tag: 'automação',
    title: 'Automatize processos e atendimentos enquanto sua equipe cuida do que realmente importa.',
  },
];

// Cases reais repetidos 3x para permitir o efeito de arrasto infinito;
// o índice começa no conjunto do meio (4 = segunda cópia do case 1).
const track = [...cases, ...cases, ...cases];
const START_INDEX = 4;

export default function CaseCarousel() {
  const [index, setIndex] = useState(START_INDEX);
  const [animated, setAnimated] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const jumpRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const dragRef = useRef<{ x: number; moved: boolean } | null>(null);

  function step(dir: number) {
    setAnimated(true);
    setIndex((current) => current + dir);
  }

  function startAutoplay() {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => step(-1), 4500);
  }

  useEffect(() => {
    if (index >= 3 && index <= 5) return;
    clearTimeout(jumpRef.current);
    jumpRef.current = setTimeout(() => {
      setAnimated(false);
      setIndex(3 + (((index % 3) + 3) % 3));
    }, 720);
    return () => clearTimeout(jumpRef.current);
  }, [index]);

  useEffect(() => {
    startAutoplay();
    return () => {
      clearInterval(timerRef.current);
      clearTimeout(jumpRef.current);
    };
  }, []);

  const cardWidth = 'min(62vw,760px)';
  const gap = 'clamp(16px,2vw,32px)';

  return (
    <div
      className="sy-case-track-wrap"
      onPointerDown={(e) => {
        clearInterval(timerRef.current);
        dragRef.current = { x: e.clientX, moved: false };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const drag = dragRef.current;
        if (!drag || drag.moved) return;
        const dx = e.clientX - drag.x;
        if (Math.abs(dx) < 60) return;
        drag.moved = true;
        step(dx > 0 ? -1 : 1);
      }}
      onPointerUp={() => {
        dragRef.current = null;
        startAutoplay();
      }}
      onPointerCancel={() => {
        dragRef.current = null;
        startAutoplay();
      }}
    >
      <div
        className="sy-case-track"
        style={{
          gap,
          transform: `translateX(calc(${START_INDEX - index} * (${cardWidth} + ${gap})))`,
          transition: animated ? 'transform 700ms cubic-bezier(.22,1,.36,1)' : 'none',
        }}
      >
        {track.map((item, i) => (
          <article key={i} className={`sy-case-card${i === index ? ' is-active' : ''}`} style={{ width: cardWidth }}>
            <img src={item.image} alt={item.alt} loading="lazy" decoding="async" draggable={false} />
            <div>
              <span>{item.tag}</span>
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
