import HeroActions from '../components/HeroActions';
import ScrollIndicator from '../components/ScrollIndicator';

export default function OriginScene() {
  return (
    <section
      className="syrum-origin-scene"
      data-scene="origin"
      aria-labelledby="syrum-origin-title"
    >
      <div className="syrum-origin-shell">
        <div
          className="syrum-origin-copy"
          data-origin-content
        >
          <h1
            id="syrum-origin-title"
            className="syrum-origin-title"
            data-origin-title
          >
            <span className="syrum-origin-title-line">
              Um único fluxo.
            </span>

            <span className="syrum-origin-title-line syrum-origin-title-line--sub">
              Toda a sua{' '}
              <span className="syrum-origin-emphasis">
                operação.
              </span>
            </span>
          </h1>

          <div
            className="syrum-origin-symbol-space"
            aria-hidden="true"
          />

          <p
            className="syrum-origin-description"
            data-origin-description
          >
            Conecte atendimento, equipe e processos em uma
            operação mais clara, integrada e inteligente.
          </p>

          <div
            className="syrum-origin-actions"
            data-origin-actions
          >
            <HeroActions
              primary={{
                label: 'Solicitar demonstração',
                href: '#apresentacao',
              }}
              secondary={{
                label: 'Conhecer a plataforma',
                href: '#syrum-beneficios',
              }}
            />
          </div>
        </div>

        <div className="syrum-origin-scroll">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}
