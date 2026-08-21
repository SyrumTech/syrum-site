/**
 * Indicação discreta de continuidade ao final da primeira dobra. Puramente
 * decorativa (aria-hidden): a trilha e o ponto animado usam só CSS, com
 * prefers-reduced-motion respeitado em landing-shell.css.
 */
export default function ScrollIndicator() {
  return (
    <div className="syrum-scroll-indicator" aria-hidden="true">
      <span className="syrum-scroll-indicator-track">
        <span className="syrum-scroll-indicator-dot" />
      </span>
      <span className="syrum-scroll-indicator-label">Role para explorar</span>
    </div>
  );
}
