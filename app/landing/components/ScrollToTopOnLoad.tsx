'use client';

import { useEffect } from 'react';

export default function ScrollToTopOnLoad() {
  useEffect(() => {
    const previousScrollRestoration =
      window.history.scrollRestoration;

    window.history.scrollRestoration = 'manual';

    const returnToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    };

    // Executa imediatamente.
    returnToTop();

    // Executa novamente após o navegador e o React finalizarem
    // a restauração e a montagem da página.
    const firstFrame = window.requestAnimationFrame(() => {
      returnToTop();

      window.requestAnimationFrame(returnToTop);
    });

    const timeout = window.setTimeout(returnToTop, 150);

    window.addEventListener('pageshow', returnToTop);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.clearTimeout(timeout);
      window.removeEventListener('pageshow', returnToTop);
      window.history.scrollRestoration =
        previousScrollRestoration;
    };
  }, []);

  return null;
}
