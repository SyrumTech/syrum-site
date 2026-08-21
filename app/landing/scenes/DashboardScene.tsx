const metrics = [
  {
    label: 'Atendimentos',
    value: '1.284',
    variation: '+18%',
    tone: 'purple',
  },
  {
    label: 'Tempo médio',
    value: '2m 48s',
    variation: '-24%',
    tone: 'blue',
  },
  {
    label: 'Resolvidos',
    value: '94%',
    variation: '+7%',
    tone: 'green',
  },
];

const channels = [
  {
    name: 'WhatsApp',
    value: '68%',
  },
  {
    name: 'Instagram',
    value: '21%',
  },
  {
    name: 'Outros canais',
    value: '11%',
  },
];

const activity = [
  {
    title: 'Fila Comercial',
    description: '32 atendimentos ativos',
    status: 'Estável',
  },
  {
    title: 'Fila de Suporte',
    description: '18 atendimentos ativos',
    status: 'Alta demanda',
  },
  {
    title: 'Financeiro',
    description: '7 atendimentos ativos',
    status: 'Estável',
  },
];

export default function DashboardScene() {
  return (
    <section
      className="syrum-dashboard-scene"
      aria-labelledby="syrum-dashboard-title"
      data-dashboard-scene
    >
      <div className="syrum-dashboard-intro" data-dashboard-intro>
        <span className="syrum-dashboard-kicker">
          Visão operacional
        </span>

        <h2 id="syrum-dashboard-title">
          Tudo visível. Tudo sob controle.
        </h2>

        <p>
          Acompanhe canais, equipes, filas e resultados em uma visão única,
          atualizada conforme a operação acontece.
        </p>

        <div className="syrum-dashboard-summary" data-dashboard-summary>
          <span>
            <strong>47</strong>
            ativos agora
          </span>

          <span>
            <strong>12</strong>
            atendentes
          </span>

          <span>
            <strong>3</strong>
            canais
          </span>
        </div>
      </div>

      <div
        className="syrum-dashboard-preview"
        aria-label="Demonstração visual do dashboard operacional"
        data-dashboard-preview
      >
        <div className="syrum-dashboard-topbar">
          <div>
            <span>Visão geral</span>
            <strong>Operação em tempo real</strong>
          </div>

          <div className="syrum-dashboard-period">
            Últimos 30 dias
          </div>
        </div>

        <div className="syrum-dashboard-metrics">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className={`syrum-dashboard-metric syrum-dashboard-metric--${metric.tone}`}
              data-dashboard-metric
            >
              <span>{metric.label}</span>

              <div>
                <strong data-dashboard-number>{metric.value}</strong>
                <small>{metric.variation}</small>
              </div>

              <i aria-hidden="true" />
            </article>
          ))}
        </div>

        <div className="syrum-dashboard-main">
          <article
            className="syrum-dashboard-chart-card"
            data-dashboard-chart
          >
            <div className="syrum-dashboard-card-heading">
              <div>
                <span>Volume de atendimentos</span>
                <strong>Desempenho diário</strong>
              </div>

              <span className="syrum-dashboard-chart-total">
                1.284
              </span>
            </div>

            <div
              className="syrum-dashboard-chart"
              aria-label="Gráfico ilustrativo do volume de atendimentos"
            >
              <div className="syrum-dashboard-chart-grid" />

              <svg
                viewBox="0 0 600 210"
                role="img"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="syrum-chart-fill"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="rgb(115 87 255)"
                      stopOpacity="0.34"
                    />
                    <stop
                      offset="100%"
                      stopColor="rgb(54 140 255)"
                      stopOpacity="0"
                    />
                  </linearGradient>

                  <linearGradient
                    id="syrum-chart-line"
                    x1="0"
                    x2="1"
                    y1="0"
                    y2="0"
                  >
                    <stop
                      offset="0%"
                      stopColor="rgb(146 123 255)"
                    />
                    <stop
                      offset="100%"
                      stopColor="rgb(67 159 255)"
                    />
                  </linearGradient>
                </defs>

                <path
                  className="syrum-dashboard-chart-area"
                  data-chart-area
                  d="M0 188 C48 177 74 154 110 160 C151 168 171 113 219 124 C265 134 284 88 327 96 C372 105 392 54 434 68 C480 82 516 37 600 24 L600 210 L0 210 Z"
                  fill="url(#syrum-chart-fill)"
                />

                <path
                  className="syrum-dashboard-chart-line"
                  data-chart-line
                  d="M0 188 C48 177 74 154 110 160 C151 168 171 113 219 124 C265 134 284 88 327 96 C372 105 392 54 434 68 C480 82 516 37 600 24"
                  fill="none"
                  stroke="url(#syrum-chart-line)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>

              <div className="syrum-dashboard-chart-days">
                <span>Seg</span>
                <span>Ter</span>
                <span>Qua</span>
                <span>Qui</span>
                <span>Sex</span>
                <span>Sáb</span>
                <span>Dom</span>
              </div>
            </div>
          </article>

          <article
            className="syrum-dashboard-channels"
            data-dashboard-channels
          >
            <div className="syrum-dashboard-card-heading">
              <div>
                <span>Origem</span>
                <strong>Canais ativos</strong>
              </div>
            </div>

            <div className="syrum-dashboard-ring">
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  className="syrum-dashboard-ring-background"
                />

                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  className="syrum-dashboard-ring-progress"
                  data-dashboard-ring
                />
              </svg>

              <div>
                <strong>68%</strong>
                <span>WhatsApp</span>
              </div>
            </div>

            <div className="syrum-dashboard-channel-list">
              {channels.map((channel, index) => (
                <div key={channel.name} data-dashboard-channel>
                  <span>
                    <i className={`syrum-channel-dot syrum-channel-dot--${String(index + 1)}`} />
                    {channel.name}
                  </span>

                  <strong>{channel.value}</strong>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="syrum-dashboard-activity">
          {activity.map((item, index) => (
            <article key={item.title} data-dashboard-activity>
              <span className="syrum-dashboard-activity-index">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </div>

              <span
                className={`syrum-dashboard-activity-status${
                  index === 1
                    ? ' syrum-dashboard-activity-status--warning'
                    : ''
                }`}
              >
                {item.status}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
