import {
  NextResponse,
  type NextRequest,
} from 'next/server';

type LeadPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  teamSize?: unknown;
  interest?: unknown;
  message?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  utmContent?: unknown;
  utmTerm?: unknown;
  pageUrl?: unknown;
};

type ValidatedLead = {
  name: string;
  company: string;
  email: string;
  phone: string;
  teamSize: string;
  interest: string;
  message: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  pageUrl: string;
  submittedAt: string;
};

function normalizeText(
  value: unknown,
  maxLength: number,
) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateLead(
  payload: LeadPayload,
): ValidatedLead | null {
  const lead: ValidatedLead = {
    name: normalizeText(payload.name, 100),
    company: normalizeText(payload.company, 120),
    email: normalizeText(payload.email, 160)
      .toLowerCase(),
    phone: normalizeText(payload.phone, 30),
    teamSize: normalizeText(payload.teamSize, 30),
    interest: normalizeText(payload.interest, 60),
    message: normalizeText(payload.message, 1500),
    utmSource: normalizeText(payload.utmSource, 100),
    utmMedium: normalizeText(payload.utmMedium, 100),
    utmCampaign: normalizeText(
      payload.utmCampaign,
      150,
    ),
    utmContent: normalizeText(payload.utmContent, 150),
    utmTerm: normalizeText(payload.utmTerm, 150),
    pageUrl: normalizeText(payload.pageUrl, 500),
    submittedAt: new Date().toISOString(),
  };

  if (
    lead.name.length < 2
    || lead.company.length < 2
    || lead.phone.length < 8
    || !lead.teamSize
    || !lead.interest
    || !isValidEmail(lead.email)
  ) {
    return null;
  }

  return lead;
}

async function forwardLead(
  lead: ValidatedLead,
) {
  const endpoint =
    process.env.SYRUM_LEADS_API_URL?.trim();

  if (!endpoint) {
    console.info(
      '[SYRUM lead - modo desenvolvimento]',
      lead,
    );

    return {
      forwarded: false,
      developmentMode: true,
    };
  }

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.SYRUM_LEADS_API_TOKEN
          ? {
              Authorization:
                `Bearer ${process.env.SYRUM_LEADS_API_TOKEN}`,
            }
          : {}),
      },
      body: JSON.stringify(lead),
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `Backend retornou HTTP ${String(response.status)}`,
      );
    }

    return {
      forwarded: true,
      developmentMode: false,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(
  request: NextRequest,
) {
  try {
    const contentType =
      request.headers.get('content-type') ?? '';

    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Formato de requisição inválido.',
        },
        {
          status: 415,
        },
      );
    }

    const payload =
      (await request.json()) as LeadPayload;

    const lead = validateLead(payload);

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Revise os campos obrigatórios e tente novamente.',
        },
        {
          status: 400,
        },
      );
    }

    const forwarding = await forwardLead(lead);

    return NextResponse.json(
      {
        success: true,
        forwarded: forwarding.forwarded,
        message:
          'Solicitação recebida. Entraremos em contato.',
      },
      {
        status: 202,
      },
    );
  } catch (error) {
    console.error(
      '[SYRUM leads API]',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          'Não foi possível registrar a solicitação agora.',
      },
      {
        status: 500,
      },
    );
  }
}
