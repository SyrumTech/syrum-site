export default function SymbolScene() {
  return (
    <section
      className="syrum-symbol-scene"
      aria-labelledby="syrum-symbol-scene-title"
      data-symbol-scene
    >
      <div className="syrum-symbol-scene-content">
        <p
          id="syrum-symbol-scene-title"
          className="syrum-symbol-scene-copy"
          data-symbol-copy
        >
          Tudo começa com uma conexão.
        </p>

        <div
          className="syrum-symbol-trajectory"
          data-symbol-trajectory
          aria-hidden="true"
        >
          <span
            className="syrum-symbol-trajectory-glow"
            data-symbol-trajectory-glow
          />

          <span
            className="syrum-symbol-trajectory-line"
            data-symbol-trajectory-line
          />

          <span
            className="syrum-symbol-trajectory-point"
            data-symbol-trajectory-point
          />
        </div>
      </div>
    </section>
  );
}
