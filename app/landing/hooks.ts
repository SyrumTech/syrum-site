import { useEffect, useState, type MouseEvent, type RefObject } from 'react';

export function useHeaderScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * Revela elementos com `data-reveal` dentro do container assim que entram na
 * viewport, com um atraso escalonado pelo índice em `data-reveal` — o mesmo
 * índice usado para o layout (0 = título, 1 = subtítulo, 2+ = itens de grid
 * em ordem de leitura), então o cascateamento sempre acompanha a ordem
 * visual da seção. `rootMargin` levemente negativo faz o gatilho dsparar
 * ainda com o elemento perto do rodapé da tela, para a animação acompanhar
 * o scroll em vez de ficar sempre um passo atrás dele.
 */
export function useRevealOnScroll(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elements = Array.from(container.querySelectorAll<HTMLElement>('[data-reveal]'));
    const hidden = elements.filter((el) => el.getBoundingClientRect().top > window.innerHeight);
    hidden.forEach((el) => el.classList.add('sy-reveal-pending'));
    if (!hidden.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const step = Number.parseInt(el.getAttribute('data-reveal') ?? '0', 10) || 0;
          const delay = step < 2 ? step * 120 : 320 + (step - 2) * 60;
          el.style.transitionDelay = `${delay}ms`;
          el.classList.remove('sy-reveal-pending');
          el.classList.add('is-visible');
          io.unobserve(el);
          // O delay é só para a entrada por scroll — sem isso, um hover logo
          // depois de revelar herdaria o mesmo atraso (ex.: hover parece
          // "travado" por até ~600ms nos últimos cards da grade).
          el.addEventListener('transitionend', () => { el.style.transitionDelay = ''; }, { once: true });
        });
      },
      { threshold: 0, rootMargin: '0px 0px -2% 0px' },
    );
    hidden.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [containerRef]);
}

export function useSymbolTilt() {
  const [tilt, setTilt] = useState(0);

  return {
    transform: `perspective(900px) rotateY(${tilt * 16}deg) rotateZ(${tilt * 4}deg)`,
    onMouseMove(event: MouseEvent<HTMLElement>) {
      const rect = event.currentTarget.getBoundingClientRect();
      const next = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
      setTilt(next);
    },
    onMouseLeave() {
      setTilt(0);
    },
  };
}
