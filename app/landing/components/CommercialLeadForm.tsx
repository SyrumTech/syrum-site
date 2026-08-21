'use client';

import {
  type SyntheticEvent,
  useMemo,
  useState,
} from 'react';

type FormStatus =
  | 'idle'
  | 'sending'
  | 'success'
  | 'error';

type LeadResponse = {
  success?: boolean;
  message?: string;
};

function getTrackingParameters() {
  if (typeof window === 'undefined') {
    return {};
  }

  const search = new URLSearchParams(
    window.location.search,
  );

  return {
    utmSource: search.get('utm_source') ?? '',
    utmMedium: search.get('utm_medium') ?? '',
    utmCampaign: search.get('utm_campaign') ?? '',
    utmContent: search.get('utm_content') ?? '',
    utmTerm: search.get('utm_term') ?? '',
    pageUrl: window.location.href,
  };
}

function getFormValue(
  formData: FormData,
  key: string,
) {
  const value = formData.get(key);

  return typeof value === 'string'
    ? value.trim()
    : '';
}

export default function CommercialLeadForm() {
  const [status, setStatus] =
    useState<FormStatus>('idle');

  const [message, setMessage] = useState('');

  const buttonLabel = useMemo(() => {
    if (status === 'sending') {
      return 'Enviando...';
    }

    if (status === 'success') {
      return 'Solicitação enviada';
    }

    return 'Solicitar apresentação';
  }, [status]);

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const honeypot = getFormValue(formData, 'website');

    if (honeypot) {
      return;
    }

    const payload = {
      name: getFormValue(formData, 'name'),
      company: getFormValue(formData, 'company'),
      email: getFormValue(formData, 'email'),
      phone: getFormValue(formData, 'phone'),
      teamSize: getFormValue(formData, 'teamSize'),
      interest: getFormValue(formData, 'interest'),
      message: getFormValue(formData, 'message'),
      ...getTrackingParameters(),
    };

    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result =
        (await response.json()) as LeadResponse;

      if (!response.ok || !result.success) {
        throw new Error(
          result.message
          ?? 'Não foi possível enviar a solicitação.',
        );
      }

      setStatus('success');
      setMessage(
        result.message
        ?? 'Recebemos sua solicitação.',
      );

      form.reset();
    } catch (error) {
      setStatus('error');

      setMessage(
        error instanceof Error
          ? error.message
          : 'Não foi possível enviar a solicitação.',
      );
    }
  }

  function submitForm(
    event: SyntheticEvent<HTMLFormElement>,
  ) {
    void handleSubmit(event);
  }

  return (
    <form
      className="syrum-lead-form"
      onSubmit={submitForm}
    >
      <div className="syrum-lead-form-heading">
        <span>Solicite uma apresentação</span>

        <h3>
          Vamos entender a sua operação.
        </h3>

        <p>
          Conte um pouco sobre a empresa e entraremos em
          contato para apresentar a estrutura da SYRUM.
        </p>
      </div>

      <div
        className="syrum-lead-form-honeypot"
        aria-hidden="true"
      >
        <label htmlFor="website">
          Website
        </label>

        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="syrum-lead-form-grid">
        <label>
          <span>Seu nome</span>

          <input
            name="name"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={100}
            required
            placeholder="Como podemos chamar você?"
          />
        </label>

        <label>
          <span>Empresa</span>

          <input
            name="company"
            type="text"
            autoComplete="organization"
            minLength={2}
            maxLength={120}
            required
            placeholder="Nome da empresa"
          />
        </label>

        <label>
          <span>E-mail profissional</span>

          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={160}
            required
            placeholder="voce@empresa.com.br"
          />
        </label>

        <label>
          <span>WhatsApp ou telefone</span>

          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            minLength={8}
            maxLength={30}
            required
            placeholder="(48) 99999-9999"
          />
        </label>

        <label>
          <span>Tamanho da equipe</span>

          <select
            name="teamSize"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Selecione
            </option>

            <option value="1-5">
              1 a 5 pessoas
            </option>

            <option value="6-15">
              6 a 15 pessoas
            </option>

            <option value="16-50">
              16 a 50 pessoas
            </option>

            <option value="51+">
              Mais de 50 pessoas
            </option>
          </select>
        </label>

        <label>
          <span>Principal interesse</span>

          <select
            name="interest"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Selecione
            </option>

            <option value="whatsapp">
              Atendimento e WhatsApp
            </option>

            <option value="automation">
              Automações
            </option>

            <option value="crm">
              CRM e gestão
            </option>

            <option value="white-label">
              Plataforma white label
            </option>

            <option value="complete">
              Operação completa
            </option>
          </select>
        </label>

        <label className="syrum-lead-form-message">
          <span>Conte sobre sua operação</span>

          <textarea
            name="message"
            rows={5}
            maxLength={1500}
            placeholder="Como sua equipe atende os clientes atualmente?"
          />
        </label>
      </div>

      <label className="syrum-lead-form-consent">
        <input
          type="checkbox"
          name="consent"
          required
        />

        <span>
          Autorizo o contato da equipe da SYRUM sobre esta
          solicitação.
        </span>
      </label>

      <div className="syrum-lead-form-footer">
        <button
          type="submit"
          disabled={
            status === 'sending'
            || status === 'success'
          }
        >
          {buttonLabel}

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
        </button>

        <p
          className={`syrum-lead-form-status syrum-lead-form-status--${status}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      </div>
    </form>
  );
}
