export default function HeroSymbol() {
  return (
    <div
      className="syrum-hero-symbol"
      aria-hidden="true"
    >
      <div className="syrum-hero-symbol-mark">
        <div className="syrum-logo-lab-glow" />

        <div className="syrum-logo-lab-depth">
          <img
            className="syrum-logo-lab-image syrum-logo-lab-image--back"
            src="/brand/syrum-symbol-transparent.png"
            alt=""
          />

          <img
            className="syrum-logo-lab-image syrum-logo-lab-image--front"
            src="/brand/syrum-symbol-transparent.png"
            alt=""
          />

          <div className="syrum-logo-lab-reflection" />
        </div>
      </div>
    </div>
  );
}
