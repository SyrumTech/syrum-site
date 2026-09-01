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
 * viewport, com um atraso escalonado pelo índice em `data-reveal`.
 * `data-reveal-slide` marca variantes que entram deslizando da direita
 * (usado nos cards do carrossel de método/cases) em vez de subir com fade.
 */
export function useRevealOnScroll(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !('IntersectionObserver' in window)) return;

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
          const slide = el.hasAttribute('data-reveal-slide');
          const delay = step < 2 ? step * 150 : slide ? 420 + (step - 2) * 110 : 420 + (step - 2) * 70;
          el.style.transitionDelay = `${delay}ms`;
          el.classList.remove('sy-reveal-pending');
          el.classList.add('is-visible');
          io.unobserve(el);
        });
      },
      { threshold: 0, rootMargin: '0px 0px -6% 0px' },
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
