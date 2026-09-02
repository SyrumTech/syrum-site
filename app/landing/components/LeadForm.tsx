'use client';

import { type SyntheticEvent, useState } from 'react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

type LeadResponse = {
  success?: boolean;
  message?: string;
};

function getTrackingParameters() {
  if (typeof window === 'undefined') return {};
  const search = new URLSearchParams(window.location.search);
  return {
    utmSource: search.get('utm_source') ?? '',
    utmMedium: search.get('utm_medium') ?? '',
    utmCampaign: search.get('utm_campaign') ?? '',
    utmContent: search.get('utm_content') ?? '',
    utmTerm: search.get('utm_term') ?? '',
    pageUrl: window.location.href,
  };
}

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

export default function LeadForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (getFormValue(formData, 'website')) return; // honeypot

    const payload = {
      name: getFormValue(formData, 'nome'),
      company: getFormValue(formData, 'empresa'),
      email: getFormValue(formData, 'email'),
      phone: getFormValue(formData, 'whatsapp'),
      teamSize: getFormValue(formData, 'equipe'),
      interest: getFormValue(formData, 'necessidade'),
      message: '',
      origin: 'site',
      ...getTrackingParameters(),
    };

    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as LeadResponse;
      if (!response.ok || !result.success) {
        throw new Error('lead_submit_failed');
      }
      setStatus('success');
      setMessage('Mensagem enviada com sucesso. Em breve entraremos em contato.');
      form.reset();
    } catch {
      setStatus('error');
      setMessage('Não foi possível enviar sua mensagem agora. Tente novamente em alguns instantes.');
    }
  }

  function submitForm(event: SyntheticEvent<HTMLFormElement>) {
    void handleSubmit(event);
  }

  const submitLabel = status === 'sending' ? 'enviando...' : 'enviar mensagem agora';

  return (
    <form className="sy-lead-form" onSubmit={submitForm}>
      <div className="sy-lead-form-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label><span>Nome completo*</span><input type="text" name="nome" autoComplete="name" minLength={2} maxLength={100} required /></label>
      <div className="sy-lead-form-grid">
        <label><span>E-mail*</span><input type="email" name="email" autoComplete="email" maxLength={160} required /></label>
        <label><span>WhatsApp*</span><input type="tel" name="whatsapp" autoComplete="tel" minLength={8} maxLength={30} required /></label>
      </div>
      <label><span>Nome da empresa*</span><input type="text" name="empresa" autoComplete="organization" minLength={2} maxLength={120} required /></label>
      <label><span>Tamanho da equipe*</span>
        <select name="equipe" required defaultValue="">
          <option value="" disabled>Selecione</option>
          <option value="1 a 5 pessoas">1 a 5 pessoas</option>
          <option value="6 a 20 pessoas">6 a 20 pessoas</option>
          <option value="21 a 50 pessoas">21 a 50 pessoas</option>
          <option value="Mais de 50">Mais de 50</option>
        </select>
      </label>
      <label><span>Principal necessidade*</span>
        <select name="necessidade" required defaultValue="">
          <option value="" disabled>Selecione</option>
          <option value="Centralizar o atendimento">Centralizar o atendimento</option>
          <option value="Organizar o funil de vendas">Organizar o funil de vendas</option>
          <option value="Gerenciar ordens de serviço">Gerenciar ordens de serviço</option>
          <option value="Automatizar processos">Automatizar processos</option>
          <option value="Relatórios e indicadores">Relatórios e indicadores</option>
          <option value="Ainda não sei">Ainda não sei</option>
        </select>
      </label>
      <button type="submit" disabled={status === 'sending'}>
        {submitLabel}
      </button>
      <p className={`sy-lead-form-status sy-lead-form-status--${status}`} role="status" aria-live="polite">
        {message || 'seus dados não são usados para envio de spam.'}
      </p>
    </form>
  );
}
