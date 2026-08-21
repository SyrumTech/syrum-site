'use client';

import { useEffect } from 'react';

const HEADER_TRANSITION_MS = 650;
const TOP_THRESHOLD = 6;
const MIN_WHEEL_DELTA = 4;

export default function HeaderScrollController() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(
      '[data-syrum-header]',
    );

    if (!header) {
      return;
    }

    const root = document.documentElement;

    root.classList.add('syrum-hero--intro');
    root.classList.remove('syrum-hero--scrolled');

    let headerHidden = false;
    let transitionLocked = false;
    let hasLeftTop = false;
    let touchStartY: number | null = null;

    const activateScrolledState = () => {
      if (headerHidden || transitionLocked) {
        return;
      }

      transitionLocked = true;
      headerHidden = true;

      header.classList.add('syrum-header--hidden');

      root.classList.remove('syrum-hero--intro');
      root.classList.add('syrum-hero--scrolled');

      window.setTimeout(() => {
        transitionLocked = false;
      }, HEADER_TRANSITION_MS);
    };

    const restoreInitialState = () => {
      if (!headerHidden) {
        return;
      }

      headerHidden = false;
      transitionLocked = false;

      header.classList.remove('syrum-header--hidden');

      root.classList.remove('syrum-hero--scrolled');
      root.classList.add('syrum-hero--intro');
    };

    const handleWheel = (event: WheelEvent) => {
      const scrollingDown =
        event.deltaY > MIN_WHEEL_DELTA;

      /*
       * O primeiro scroll é utilizado somente para:
       * - esconder o header;
       * - diminuir a logo;
       * - revelar o título.
       */
      if (
        scrollingDown
        && !headerHidden
        && window.scrollY <= TOP_THRESHOLD
      ) {
        event.preventDefault();
        event.stopPropagation();

        activateScrolledState();
        return;
      }

      if (transitionLocked) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY =
        event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchStartY === null) {
        return;
      }

      const currentY =
        event.touches[0]?.clientY;

      if (currentY === undefined) {
        return;
      }

      const movement =
        touchStartY - currentY;

      const swipingUp = movement > 8;

      if (
        swipingUp
        && !headerHidden
        && window.scrollY <= TOP_THRESHOLD
      ) {
        event.preventDefault();
        event.stopPropagation();

        activateScrolledState();
        touchStartY = currentY;
        return;
      }

      if (transitionLocked) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handleTouchEnd = () => {
      touchStartY = null;
    };

    const handleScroll = () => {
      /*
       * Registra que a landing realmente avançou.
       * O primeiro scroll fica reservado à transição
       * visual e não conta como saída do topo.
       */
      if (window.scrollY > TOP_THRESHOLD) {
        hasLeftTop = true;

        /*
         * A classe controla somente a composição inicial.
         * Ao avançar na timeline, o GSAP volta a controlar
         * livremente tamanho e posição do símbolo.
         */
        root.classList.remove(
          'syrum-hero--scrolled',
        );

        root.classList.remove(
          'syrum-hero--intro',
        );
      }

      /*
       * Só restaura depois que a página saiu do topo
       * e posteriormente voltou completamente.
       */
      if (
        hasLeftTop
        && window.scrollY <= TOP_THRESHOLD
        && headerHidden
        && !transitionLocked
      ) {
        hasLeftTop = false;
        restoreInitialState();
      }
    };

    window.addEventListener(
      'wheel',
      handleWheel,
      {
        passive: false,
        capture: true,
      },
    );

    window.addEventListener(
      'touchstart',
      handleTouchStart,
      {
        passive: true,
      },
    );

    window.addEventListener(
      'touchmove',
      handleTouchMove,
      {
        passive: false,
        capture: true,
      },
    );

    window.addEventListener(
      'touchend',
      handleTouchEnd,
      {
        passive: true,
      },
    );

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      root.classList.remove('syrum-hero--intro');
      root.classList.remove('syrum-hero--scrolled');
      header.classList.remove('syrum-header--hidden');

      window.removeEventListener(
        'wheel',
        handleWheel,
        true,
      );

      window.removeEventListener(
        'touchstart',
        handleTouchStart,
      );

      window.removeEventListener(
        'touchmove',
        handleTouchMove,
        true,
      );

      window.removeEventListener(
        'touchend',
        handleTouchEnd,
      );

      window.removeEventListener(
        'scroll',
        handleScroll,
      );
    };
  }, []);

  return null;
}
