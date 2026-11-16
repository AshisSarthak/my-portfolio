interface Environment {
  GEMINI_API_KEY?: string
}

interface PagesFunctionContext {
  request: Request
  env: Environment
}

const model = 'models/gemini-3.8-live'
const systemInstruction = `You are the portfolio voice guide for Ashis Sarthak Singh, a Principal Engineer and UI Architect in Hyderabad. Answer questions about his experience using only these facts: he led frontend delivery of a Sberbank banking module with a team of four to five engineers using React, TypeScript, GraphQL, and modular architecture; at GlobalLogic he helped shape a data-heavy dashboard monorepo for Apple Technologies; at ADIA he introduced AI-assisted workflows and the portfolio reports a 90% delivery-speed improvement. Do not invent details, metrics, dates, or client information. If a fact is not available, say so. Keep answers concise and conversational.`

async function getProviderError(response: Response, apiKey: string) {
  let detail = ''
  try {
    const body: unknown = await response.json()
    if (
      typeof body === 'object'
      && body !== null
      && 'error' in body
      && typeof body.error === 'object'
      && body.error !== null
      && 'message' in body.error
      && typeof body.error.message === 'string'
    ) {
      detail = body.error.message
        .replaceAll(apiKey, '[redacted]')
        .replace(/[\r\n\t]+/g, ' ')
        .slice(0, 300)
    }
  } catch {
    // Keep the status-based guidance if Gemini doesn't return JSON.
  }

  const suffix = detail ? ` Details: ${detail}` : ''
  const status = response.status
  if (status === 400) {
    return `Gemini rejected the Live session configuration (HTTP 400). Check model availability and the session settings.${suffix}`
  }
  if (status === 401 || status === 403) {
    return `Gemini denied the API request (HTTP ${status}). Check that the API key is valid and Gemini Live is enabled for its project.${suffix}`
  }
  if (status === 429) {
    return `Gemini rate limit or quota reached (HTTP 429). Check the project quota and try again later.${suffix}`
  }
  return `Gemini could not start the Live session (HTTP ${status}). Check the API key, model access, and provider status.${suffix}`
}

export async function onRequestPost({ request, env }: PagesFunctionContext) {
  const origin = request.headers.get('Origin')
  if (!origin || origin !== new URL(request.url).origin) {
    return Response.json({ error: 'Request origin is not allowed.' }, { status: 403 })
  }

  if (!env.GEMINI_API_KEY) {
    return Response.json({ error: 'Realtime voice is not configured on this site yet.' }, { status: 503 })
  }

  const now = Date.now()
  let tokenResponse: Response
  try {
    tokenResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/auth_tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        uses: 1,
        expireTime: new Date(now + 5 * 60 * 1000).toISOString(),
        newSessionExpireTime: new Date(now + 60 * 1000).toISOString(),
        bidiGenerateContentSetup: {
          model,
          generationConfig: {
            responseModalities: ['AUDIO'],
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
        },
      }),
    })
  } catch {
    return Response.json(
      { error: 'Could not reach Gemini Live. Please try again later.' },
      { status: 502 },
    )
  }

  if (!tokenResponse.ok) {
    return Response.json(
      { error: await getProviderError(tokenResponse, env.GEMINI_API_KEY) },
      { status: 502 },
    )
  }

  let payload: unknown
  try {
    const responseText = await tokenResponse.text()
    if (!responseText) {
      return Response.json(
        { error: 'Gemini Live returned an empty token response. Please try again later.' },
        { status: 502 },
      )
    }
    payload = JSON.parse(responseText) as unknown
  } catch {
    return Response.json(
      { error: 'Gemini Live returned an invalid token response. Please try again later.' },
      { status: 502 },
    )
  }
  if (
    typeof payload !== 'object'
    || payload === null
    || !('name' in payload)
    || typeof payload.name !== 'string'
  ) {
    return Response.json({ error: 'Realtime voice returned an invalid session token.' }, { status: 502 })
  }

  return Response.json(
    { token: payload.name },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
