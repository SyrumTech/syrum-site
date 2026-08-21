const departments = ['Comercial', 'Suporte', 'Financeiro'];

export default function ConversationScene() {
  return (
    <section
      className="syrum-conversation-scene"
      aria-labelledby="syrum-conversation-title"
      data-conversation-scene
    >
      <div className="syrum-conversation-intro" data-conversation-intro>
        <span className="syrum-conversation-kicker">
          Atendimento conectado
        </span>

        <h2 id="syrum-conversation-title">
          Cada conversa encontra o caminho certo.
        </h2>

        <p>
          O cliente entra por um único canal. A SYRUM identifica a necessidade,
          organiza a fila e direciona o atendimento para a equipe responsável.
        </p>
      </div>

      <div
        className="syrum-inbox-preview"
        aria-label="Demonstração visual da distribuição de atendimento"
        data-inbox-preview
      >
        <div className="syrum-inbox-topbar">
          <div className="syrum-inbox-contact">
            <span className="syrum-inbox-avatar" aria-hidden="true">
              MC
            </span>

            <div>
              <strong>Marina Costa</strong>
              <span>WhatsApp · agora</span>
            </div>
          </div>

          <span className="syrum-inbox-status">
            Em atendimento
          </span>
        </div>

        <div className="syrum-inbox-body">
          <div
            className="syrum-message syrum-message--customer"
            data-conversation-message
          >
            <span>Olá! Preciso de ajuda com meu acesso.</span>
            <small>19:42</small>
          </div>

          <div
            className="syrum-message syrum-message--system"
            data-conversation-message
          >
            <span>Entendi. Qual departamento pode ajudar você?</span>
          </div>

          <div
            className="syrum-department-selector"
            data-department-selector
          >
            {departments.map((department, index) => (
              <div
                key={department}
                className={`syrum-department-option${
                  index === 1 ? ' syrum-department-option--active' : ''
                }`}
                data-department-option
              >
                <span className="syrum-department-number">
                  {index + 1}
                </span>

                <span>{department}</span>

                {index === 1 ? (
                  <span
                    className="syrum-department-check"
                    aria-label="Selecionado"
                  >
                    ✓
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          <div
            className="syrum-routing-line"
            aria-hidden="true"
            data-routing-line
          >
            <span />
          </div>

          <div
            className="syrum-routing-result"
            data-routing-result
          >
            <div className="syrum-routing-icon" aria-hidden="true">
              S
            </div>

            <div className="syrum-routing-copy">
              <span>Atendimento encaminhado</span>
              <strong>Fila de Suporte</strong>
            </div>

            <span className="syrum-routing-badge">
              Automático
            </span>
          </div>

          <div
            className="syrum-message syrum-message--agent"
            data-agent-message
          >
            <span>
              Olá, Marina. Sou o Lucas, do suporte. Vou ajudar você.
            </span>
            <small>19:43</small>
          </div>
        </div>
      </div>
    </section>
  );
}
