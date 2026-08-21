import CommercialLeadForm from './CommercialLeadForm';

const benefits = [
  {
    number: '01',
    title: 'Operação centralizada',
    description:
      'Conversas, contatos, equipes, filas e processos reunidos em uma única plataforma.',
  },
  {
    number: '02',
    title: 'Atendimento organizado',
    description:
      'Distribua cada contato para o departamento e o responsável corretos.',
  },
  {
    number: '03',
    title: 'Processos automatizados',
    description:
      'Transforme ações repetitivas em fluxos claros, previsíveis e escaláveis.',
  },
];

const features = [
  {
    eyebrow: 'Atendimento',
    title: 'Caixa de entrada compartilhada',
    description:
      'Centralize conversas e permita que a equipe trabalhe no mesmo ambiente sem perder contexto.',
    items: [
      'Filas por departamento',
      'Transferência entre atendentes',
      'Histórico completo do contato',
    ],
  },
  {
    eyebrow: 'Automação',
    title: 'Fluxos que acompanham a operação',
    description:
      'Crie regras para organizar atendimentos, atualizar etapas e definir responsáveis.',
    items: [
      'Gatilhos por evento',
      'Ações automáticas',
      'Processos personalizados',
    ],
  },
  {
    eyebrow: 'Gestão',
    title: 'Indicadores em tempo real',
    description:
      'Acompanhe volume, desempenho, tempo de atendimento e distribuição entre equipes.',
    items: [
      'Métricas operacionais',
      'Visão por canal',
      'Acompanhamento de filas',
    ],
  },
  {
    eyebrow: 'Relacionamento',
    title: 'Contatos com contexto',
    description:
      'Mantenha dados, conversas, observações e movimentações ligados ao mesmo cliente.',
    items: [
      'Cadastro centralizado',
      'Histórico de interações',
      'Segmentação e organização',
    ],
  },
];

const implementationSteps = [
  {
    step: '01',
    title: 'Mapeamento',
    description:
      'Entendemos a estrutura da empresa, os departamentos e o fluxo atual.',
  },
  {
    step: '02',
    title: 'Configuração',
    description:
      'Preparamos usuários, filas, permissões, canais e identidade visual.',
  },
  {
    step: '03',
    title: 'Implantação',
    description:
      'A equipe começa a operar com acompanhamento e ajustes do processo.',
  },
];

const faq = [
  {
    question: 'A SYRUM pode ser personalizada com a minha marca?',
    answer:
      'Sim. A estrutura white label permite adaptar nome, logotipo, cores e identidade da plataforma para cada operação.',
  },
  {
    question: 'É possível criar departamentos e filas diferentes?',
    answer:
      'Sim. A operação pode ser organizada por departamentos, equipes, responsáveis e regras de distribuição.',
  },
  {
    question: 'A plataforma trabalha com WhatsApp?',
    answer:
      'A SYRUM foi projetada para centralizar canais de atendimento, incluindo integrações com WhatsApp conforme a modalidade configurada para a empresa.',
  },
  {
    question: 'Posso acompanhar o desempenho da equipe?',
    answer:
      'Sim. O dashboard reúne indicadores de atendimento, filas, canais e desempenho operacional.',
  },
  {
    question: 'A SYRUM serve para empresas de diferentes segmentos?',
    answer:
      'Sim. Filas, departamentos, campos, etapas e automações podem ser adaptados ao processo de cada negócio.',
  },
  {
    question: 'Como funciona a implantação?',
    answer:
      'A implantação começa pelo mapeamento da operação, segue para configuração e termina com a entrada assistida da equipe.',
  },
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M5 12.5 9.2 17 19 7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M14 7l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function CommercialSections() {
  return (
    <main
      className="syrum-commercial"
      id="syrum-beneficios"
    >
      <section className="syrum-commercial-intro">
        <div className="syrum-commercial-container">
          <div className="syrum-section-heading">
            <span>Uma operação conectada</span>

            <h2>
              Menos ferramentas dispersas.
              <br />
              Mais clareza para crescer.
            </h2>

            <p>
              A SYRUM conecta atendimento, gestão e automação para que cada
              pessoa da equipe saiba o que fazer, quando fazer e onde encontrar
              as informações necessárias.
            </p>
          </div>

          <div className="syrum-benefit-grid">
            {benefits.map((benefit) => (
              <article key={benefit.number}>
                <span>{benefit.number}</span>

                <h3>{benefit.title}</h3>

                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="syrum-feature-section"
        id="funcionalidades"
      >
        <div className="syrum-commercial-container">
          <div className="syrum-section-heading syrum-section-heading--split">
            <div>
              <span>Recursos essenciais</span>

              <h2>
                Tudo o que sua equipe precisa para operar.
              </h2>
            </div>

            <p>
              Uma base única para organizar contatos, conversas, responsáveis,
              processos e resultados.
            </p>
          </div>

          <div className="syrum-feature-grid">
            {features.map((feature) => (
              <article key={feature.title}>
                <div className="syrum-feature-number">
                  {feature.eyebrow}
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

                <ul>
                  {feature.items.map((item) => (
                    <li key={item}>
                      <span>
                        <CheckIcon />
                      </span>

                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="syrum-channel-section"
        id="canais"
      >
        <div className="syrum-commercial-container syrum-channel-layout">
          <div className="syrum-channel-copy">
            <span className="syrum-commercial-kicker">
              Atendimento conectado
            </span>

            <h2>
              O cliente conversa.
              <br />
              A SYRUM organiza.
            </h2>

            <p>
              As mensagens chegam, são identificadas e seguem para a equipe
              responsável sem depender de controles manuais espalhados.
            </p>

            <div className="syrum-channel-points">
              <span>
                <CheckIcon />
                Distribuição por departamento
              </span>

              <span>
                <CheckIcon />
                Histórico centralizado
              </span>

              <span>
                <CheckIcon />
                Visão compartilhada pela equipe
              </span>
            </div>
          </div>

          <div
            className="syrum-channel-visual"
            aria-label="Representação de canais conectados à SYRUM"
          >
            <div className="syrum-channel-center">
              <span>S</span>
              <strong>SYRUM</strong>
            </div>

            <div className="syrum-channel-node syrum-channel-node--whatsapp">
              <span>W</span>

              <div>
                <strong>WhatsApp</strong>
                <small>Atendimento ativo</small>
              </div>
            </div>

            <div className="syrum-channel-node syrum-channel-node--instagram">
              <span>I</span>

              <div>
                <strong>Instagram</strong>
                <small>Mensagens conectadas</small>
              </div>
            </div>

            <div className="syrum-channel-node syrum-channel-node--web">
              <span>Web</span>

              <div>
                <strong>Formulários</strong>
                <small>Novos contatos</small>
              </div>
            </div>

            <div className="syrum-channel-node syrum-channel-node--team">
              <span>12</span>

              <div>
                <strong>Equipe</strong>
                <small>Atendentes online</small>
              </div>
            </div>

            <span className="syrum-channel-line syrum-channel-line--one" />
            <span className="syrum-channel-line syrum-channel-line--two" />
            <span className="syrum-channel-line syrum-channel-line--three" />
            <span className="syrum-channel-line syrum-channel-line--four" />
          </div>
        </div>
      </section>

      <section
        className="syrum-automation-section"
        id="automacoes"
      >
        <div className="syrum-commercial-container syrum-automation-layout">
          <div className="syrum-automation-commercial-visual">
            <div className="syrum-flow-card syrum-flow-card--trigger">
              <span>Quando</span>
              <strong>Novo atendimento recebido</strong>
              <small>Fila de entrada</small>
            </div>

            <span className="syrum-flow-connector" />

            <div className="syrum-flow-card syrum-flow-card--condition">
              <span>Se</span>
              <strong>Departamento = Suporte</strong>
              <small>Condição identificada</small>
            </div>

            <span className="syrum-flow-connector" />

            <div className="syrum-flow-card syrum-flow-card--action">
              <span>Então</span>
              <strong>Direcionar para equipe técnica</strong>
              <small>Ação executada automaticamente</small>
            </div>
          </div>

          <div className="syrum-automation-commercial-copy">
            <span className="syrum-commercial-kicker">
              Automação operacional
            </span>

            <h2>
              O processo continua mesmo quando ninguém está olhando.
            </h2>

            <p>
              Configure gatilhos e ações para distribuir demandas, atualizar
              etapas e manter o fluxo organizado.
            </p>

            <ul>
              <li>
                <CheckIcon />
                Regras baseadas em eventos
              </li>

              <li>
                <CheckIcon />
                Atualização automática de etapas
              </li>

              <li>
                <CheckIcon />
                Definição de responsáveis
              </li>

              <li>
                <CheckIcon />
                Fluxos adaptados ao negócio
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        className="syrum-white-label-commercial"
        id="white-label"
      >
        <div className="syrum-commercial-container">
          <div className="syrum-white-label-card">
            <div>
              <span className="syrum-commercial-kicker">
                Plataforma white label
              </span>

              <h2>
                A tecnologia da SYRUM com a identidade da sua empresa.
              </h2>

              <p>
                Personalize a experiência para entregar uma plataforma
                consistente com sua marca, sua equipe e sua operação.
              </p>

              <a href="#apresentacao">
                Conhecer possibilidades
                <ArrowIcon />
              </a>
            </div>

            <div className="syrum-white-label-samples">
              <article className="syrum-brand-sample syrum-brand-sample--one">
                <span>N</span>

                <div>
                  <strong>NOVA</strong>
                  <small>Operação comercial</small>
                </div>
              </article>

              <article className="syrum-brand-sample syrum-brand-sample--two">
                <span>A</span>

                <div>
                  <strong>ATLAS</strong>
                  <small>Central de atendimento</small>
                </div>
              </article>

              <article className="syrum-brand-sample syrum-brand-sample--three">
                <span>V</span>

                <div>
                  <strong>VÉRTICE</strong>
                  <small>Gestão de relacionamento</small>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section
        className="syrum-implementation-section"
        id="implantacao"
      >
        <div className="syrum-commercial-container">
          <div className="syrum-section-heading syrum-section-heading--center">
            <span>Implantação orientada</span>

            <h2>
              Da estrutura atual para uma operação organizada.
            </h2>

            <p>
              A implantação acompanha a realidade da empresa, sem exigir que
              todo o processo seja alterado de uma só vez.
            </p>
          </div>

          <div className="syrum-implementation-grid">
            {implementationSteps.map((item) => (
              <article key={item.step}>
                <span>{item.step}</span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <div className="syrum-security-strip">
            <div>
              <span>Estrutura preparada</span>
              <strong>Controle de acesso e permissões</strong>
            </div>

            <div>
              <span>Operação organizada</span>
              <strong>Histórico e rastreabilidade</strong>
            </div>

            <div>
              <span>Crescimento sustentável</span>
              <strong>Arquitetura preparada para evolução</strong>
            </div>
          </div>
        </div>
      </section>

      <section
        className="syrum-faq-section"
        id="duvidas"
      >
        <div className="syrum-commercial-container syrum-faq-layout">
          <div className="syrum-faq-heading">
            <span className="syrum-commercial-kicker">
              Perguntas frequentes
            </span>

            <h2>
              O que você precisa saber antes de começar.
            </h2>

            <p>
              A plataforma é configurada de acordo com a estrutura e o momento
              de cada empresa.
            </p>
          </div>

          <div className="syrum-faq-list">
            {faq.map((item) => (
              <details key={item.question}>
                <summary>
                  <span>{item.question}</span>
                  <i aria-hidden="true" />
                </summary>

                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>


      <section
        className="syrum-lead-section"
        id="apresentacao"
      >
        <div className="syrum-commercial-container syrum-lead-layout">
          <div className="syrum-lead-copy">
            <span className="syrum-commercial-kicker">
              Fale com a SYRUM
            </span>

            <h2>
              Sua operação pode começar por aqui.
            </h2>

            <p>
              Apresente seu cenário para planejarmos uma
              demonstração direcionada à realidade da sua equipe.
            </p>

            <div className="syrum-lead-contact-options">
              <a href="mailto:contato@syrum.com.br">
                <span>E-mail comercial</span>
                <small>contato@syrum.com.br</small>
              </a>

              <a href="https://app.syrum.com.br/login">
                <span>Já possui acesso?</span>
                <small>Entrar na plataforma</small>
              </a>
            </div>
          </div>

          <CommercialLeadForm />
        </div>
      </section>

      <section
        className="syrum-final-cta"
        id="contato"
      >
        <div className="syrum-commercial-container">
          <div className="syrum-final-cta-card">
            <div className="syrum-final-cta-glow" />

            <span>Transforme sua operação</span>

            <h2>
              Sua equipe pronta para trabalhar em um único fluxo.
            </h2>

            <p>
              Conheça uma plataforma construída para organizar atendimento,
              processos e crescimento.
            </p>

            <div>
              <a href="https://app.syrum.com.br/login">
                Acessar plataforma
                <ArrowIcon />
              </a>

              <a href="#apresentacao">
                Falar com a SYRUM
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="syrum-commercial-footer">
        <div className="syrum-commercial-container">
          <div className="syrum-footer-brand">
            <span>S</span>

            <div>
              <strong>SYRUM</strong>
              <small>
                Toda a sua operação em um único fluxo.
              </small>
            </div>
          </div>

          <nav aria-label="Navegação do rodapé">
            <a href="#funcionalidades">Funcionalidades</a>
            <a href="#canais">Canais</a>
            <a href="#automacoes">Automações</a>
            <a href="#white-label">White label</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>

          <span className="syrum-footer-copy">
            © 2026 SYRUM
          </span>
        </div>
      </footer>
    </main>
  );
}
