const columns = [
  {
    title: 'Entrada',
    count: 8,
    tone: 'neutral',
  },
  {
    title: 'Em andamento',
    count: 3,
    tone: 'progress',
  },
  {
    title: 'Concluído',
    count: 14,
    tone: 'success',
  },
];

export default function AutomationScene() {
  return (
    <section
      className="syrum-automation-scene"
      aria-labelledby="syrum-automation-title"
      data-automation-scene
    >
      <div className="syrum-automation-intro" data-automation-intro>
        <span className="syrum-automation-kicker">
          Processos inteligentes
        </span>

        <h2 id="syrum-automation-title">
          A conversa vira ação.
        </h2>

        <p>
          Cada atendimento pode alimentar etapas, responsáveis e automações
          sem depender de controles paralelos.
        </p>

        <div className="syrum-automation-rules" data-automation-rules>
          <span data-automation-rule>Ao entrar na fila</span>
          <span data-automation-rule>Definir responsável</span>
          <span data-automation-rule>Atualizar etapa</span>
        </div>
      </div>

      <div
        className="syrum-kanban-preview"
        aria-label="Demonstração visual de automação e Kanban"
        data-kanban-preview
      >
        <div className="syrum-kanban-topbar">
          <div>
            <span className="syrum-kanban-eyebrow">Operação comercial</span>
            <strong>Fluxo de atendimentos</strong>
          </div>

          <span className="syrum-kanban-live">
            Sincronizado
          </span>
        </div>

        <div className="syrum-kanban-board" data-kanban-board>
          {columns.map((column) => (
            <div
              key={column.title}
              className={`syrum-kanban-column syrum-kanban-column--${column.tone}`}
            >
              <div className="syrum-kanban-column-header">
                <span>{column.title}</span>
                <small>{column.count}</small>
              </div>

              <div className="syrum-kanban-placeholder">
                <span />
                <span />
                <span />
              </div>

              <div className="syrum-kanban-placeholder syrum-kanban-placeholder--short">
                <span />
                <span />
              </div>
            </div>
          ))}

          <article
            className="syrum-kanban-active-card"
            data-kanban-card
          >
            <div className="syrum-kanban-card-head">
              <span className="syrum-kanban-card-avatar">MC</span>

              <div>
                <strong>Marina Costa</strong>
                <small>Suporte · WhatsApp</small>
              </div>

              <span className="syrum-kanban-card-channel">
                W
              </span>
            </div>

            <p>Recuperação de acesso ao sistema</p>

            <div className="syrum-kanban-card-meta">
              <span data-card-owner>
                <i />
                Lucas
              </span>

              <span data-card-time>
                agora
              </span>
            </div>

            <div
              className="syrum-kanban-card-progress"
              aria-hidden="true"
            >
              <span data-card-progress />
            </div>
          </article>

          <div
            className="syrum-automation-pulse"
            aria-hidden="true"
            data-automation-pulse
          >
            <span />
          </div>
        </div>

        <div className="syrum-kanban-footer">
          <div data-automation-event>
            <span className="syrum-event-icon">01</span>
            <p>
              <strong>Responsável definido</strong>
              <small>Lucas recebeu o atendimento</small>
            </p>
          </div>

          <div data-automation-event>
            <span className="syrum-event-icon">02</span>
            <p>
              <strong>Etapa atualizada</strong>
              <small>Movido para Em andamento</small>
            </p>
          </div>

          <div data-automation-event>
            <span className="syrum-event-icon">03</span>
            <p>
              <strong>Fluxo concluído</strong>
              <small>Atendimento finalizado</small>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
