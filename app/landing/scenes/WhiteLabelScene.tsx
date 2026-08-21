const palette = [
  {
    label: 'Violeta',
    className: 'syrum-brand-color--violet',
  },
  {
    label: 'Azul',
    className: 'syrum-brand-color--blue',
  },
  {
    label: 'Ciano',
    className: 'syrum-brand-color--cyan',
  },
  {
    label: 'Verde',
    className: 'syrum-brand-color--green',
  },
];

const customizationItems = [
  {
    title: 'Sua identidade',
    description: 'Logo, nome e domínio personalizados',
  },
  {
    title: 'Sua experiência',
    description: 'Cores e interface alinhadas à sua marca',
  },
  {
    title: 'Sua operação',
    description: 'Equipes, filas e processos próprios',
  },
];

export default function WhiteLabelScene() {
  return (
    <section
      className="syrum-white-label-scene"
      aria-labelledby="syrum-white-label-title"
      data-white-label-scene
    >
      <div
        className="syrum-white-label-content"
        data-white-label-content
      >
        <span className="syrum-white-label-kicker">
          White label
        </span>

        <h2 id="syrum-white-label-title">
          Sua marca. Sua operação.
        </h2>

        <p>
          A estrutura da SYRUM se adapta à identidade da sua empresa sem perder
          desempenho, organização ou controle.
        </p>

        <div className="syrum-white-label-features">
          {customizationItems.map((item) => (
            <article
              key={item.title}
              data-white-label-feature
            >
              <span aria-hidden="true" />

              <div>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div
        className="syrum-brand-studio"
        aria-label="Demonstração visual da personalização white label"
        data-brand-studio
      >
        <div className="syrum-brand-studio-topbar">
          <div>
            <span>Personalização</span>
            <strong>Identidade da plataforma</strong>
          </div>

          <span className="syrum-brand-studio-saved">
            Alterações salvas
          </span>
        </div>

        <div className="syrum-brand-studio-body">
          <aside className="syrum-brand-controls">
            <div
              className="syrum-brand-control-card"
              data-brand-panel
            >
              <span className="syrum-brand-control-label">
                Nome da plataforma
              </span>

              <div className="syrum-brand-input">
                NOVA
              </div>
            </div>

            <div
              className="syrum-brand-control-card"
              data-brand-panel
            >
              <span className="syrum-brand-control-label">
                Cor principal
              </span>

              <div className="syrum-brand-palette">
                {palette.map((color, index) => (
                  <button
                    key={color.label}
                    type="button"
                    className={`syrum-brand-color ${color.className}${
                      index === 1
                        ? ' syrum-brand-color--active'
                        : ''
                    }`}
                    aria-label={color.label}
                    data-brand-color
                  />
                ))}
              </div>
            </div>

            <div
              className="syrum-brand-control-card"
              data-brand-panel
            >
              <span className="syrum-brand-control-label">
                Domínio personalizado
              </span>

              <div className="syrum-brand-domain">
                app.nova.com.br
              </div>
            </div>

            <div
              className="syrum-brand-control-card"
              data-brand-panel
            >
              <span className="syrum-brand-control-label">
                Experiência
              </span>

              <div className="syrum-brand-toggle-row">
                <span>Tema escuro</span>

                <span className="syrum-brand-toggle">
                  <i />
                </span>
              </div>
            </div>
          </aside>

          <div
            className="syrum-brand-preview"
            data-brand-preview
          >
            <div className="syrum-brand-preview-glow" />

            <div className="syrum-brand-preview-shell">
              <aside>
                <div
                  className="syrum-brand-preview-logo"
                  data-brand-logo
                >
                  <span>N</span>
                  <strong>NOVA</strong>
                </div>

                <nav aria-label="Navegação ilustrativa">
                  <span className="syrum-brand-nav-active">
                    <i />
                    Visão geral
                  </span>

                  <span>
                    <i />
                    Conversas
                  </span>

                  <span>
                    <i />
                    Contatos
                  </span>

                  <span>
                    <i />
                    Automações
                  </span>
                </nav>

                <div className="syrum-brand-preview-user">
                  <span>GS</span>

                  <div>
                    <strong>Gabriel</strong>
                    <small>Administrador</small>
                  </div>
                </div>
              </aside>

              <main>
                <header>
                  <div>
                    <span>Visão geral</span>
                    <strong>Boa noite, Gabriel.</strong>
                  </div>

                  <span className="syrum-brand-live">
                    Online
                  </span>
                </header>

                <div className="syrum-brand-preview-metrics">
                  <article data-brand-metric>
                    <span>Atendimentos</span>
                    <strong>1.284</strong>
                    <i />
                  </article>

                  <article data-brand-metric>
                    <span>Em andamento</span>
                    <strong>47</strong>
                    <i />
                  </article>

                  <article data-brand-metric>
                    <span>Resolvidos</span>
                    <strong>94%</strong>
                    <i />
                  </article>
                </div>

                <div className="syrum-brand-preview-chart">
                  <div>
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <svg
                    viewBox="0 0 480 170"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      data-brand-chart
                      d="M0 145 C48 136 70 112 112 119 C153 126 171 82 218 91 C264 100 281 61 323 69 C366 78 394 34 480 22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>

      <div
        className="syrum-cinematic-outro"
        data-cinematic-outro
      >
        <span className="syrum-outro-kicker">
          A operação começa aqui
        </span>

        <h2>
          Uma plataforma. Todo o seu fluxo.
        </h2>

        <p>
          Atendimento, automação, gestão e inteligência reunidos em uma
          experiência construída para crescer com a sua empresa.
        </p>

        <div
          className="syrum-outro-actions"
          data-outro-actions
        >
          <a href="https://app.syrum.com.br/login">
            Acessar plataforma
          </a>

          <a href="#syrum-beneficios">
            Conhecer a SYRUM
          </a>
        </div>
      </div>
    </section>
  );
}
