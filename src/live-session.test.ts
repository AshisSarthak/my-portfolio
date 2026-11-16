import { afterEach, describe, expect, it, vi } from 'vitest'
import { onRequestPost } from '../functions/api/live-session'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Gemini Live session endpoint', () => {
  it('only accepts requests from the same origin', async () => {
    const request = new Request('https://portfolio.example/api/live-session', {
      method: 'POST',
      headers: { Origin: 'https://other.example' },
    })

    const response = await onRequestPost({ request, env: {} })

    expect(response.status).toBe(403)
  })

  it('reports missing provider configuration without exposing credentials', async () => {
    const request = new Request('https://portfolio.example/api/live-session', {
      method: 'POST',
      headers: { Origin: 'https://portfolio.example' },
    })

    const response = await onRequestPost({ request, env: {} })

    expect(response.status).toBe(503)
    expect(await response.json()).toEqual({ error: 'Realtime voice is not configured on this site yet.' })
  })

  it('returns a one-use, constrained session token without exposing the API key', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      Response.json({ name: 'auth_tokens/short-lived-token' }),
    )
    vi.stubGlobal('fetch', fetchMock)
    const request = new Request('https://portfolio.example/api/live-session', {
      method: 'POST',
      headers: { Origin: 'https://portfolio.example' },
    })

    const response = await onRequestPost({ request, env: { GEMINI_API_KEY: 'server-only-key' } })

    expect(response.status).toBe(200)
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    const responsePayload = await response.json()
    expect(responsePayload).toEqual({ token: 'auth_tokens/short-lived-token' })
    expect(fetchMock).toHaveBeenCalledWith(
      'https://generativelanguage.googleapis.com/v1beta/auth_tokens',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'x-goog-api-key': 'server-only-key' }),
      }),
    )
    const [, options] = fetchMock.mock.calls[0] as [string, RequestInit]
    const body = JSON.parse(String(options.body))
    expect(body.uses).toBe(1)
    expect(body.bidiGenerateContentSetup.model).toBe('models/gemini-3.8-live')
    expect(body.bidiGenerateContentSetup.generationConfig.responseModalities).toEqual(['AUDIO'])
    expect(body.bidiGenerateContentSetup.systemInstruction.parts[0].text).toContain('portfolio voice guide')
    expect(body.liveConnectConstraints).toBeUndefined()
    expect(JSON.stringify(responsePayload)).not.toContain('server-only-key')
  })

  it('returns a useful JSON error if Gemini returns an empty response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 200 })))
    const request = new Request('https://portfolio.example/api/live-session', {
      method: 'POST',
      headers: { Origin: 'https://portfolio.example' },
    })

    const response = await onRequestPost({ request, env: { GEMINI_API_KEY: 'server-only-key' } })

    expect(response.status).toBe(502)
    expect(await response.json()).toEqual({
      error: 'Gemini Live returned an empty token response. Please try again later.',
    })
  })

  it.each([
    [400, /rejected the Live session configuration/],
    [403, /denied the API request.*valid.*Gemini Live is enabled/],
    [429, /rate limit or quota reached/],
  ])('explains Gemini HTTP %i failures without returning credentials', async (status, errorMessage) => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        Response.json({ error: { message: 'Provider identified invalid session field.' } }, { status }),
      ),
    )
    const request = new Request('https://portfolio.example/api/live-session', {
      method: 'POST',
      headers: { Origin: 'https://portfolio.example' },
    })

    const response = await onRequestPost({ request, env: { GEMINI_API_KEY: 'server-only-key' } })
    const payload = await response.json() as { error: string }

    expect(response.status).toBe(502)
    expect(payload.error).toMatch(errorMessage)
    expect(payload.error).toContain('Provider identified invalid session field.')
    expect(JSON.stringify(payload)).not.toContain('server-only-key')
  })

  it('redacts credentials from Gemini error details', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        Response.json({ error: { message: 'Rejected key server-only-key and config.' } }, { status: 400 }),
      ),
    )
    const request = new Request('https://portfolio.example/api/live-session', {
      method: 'POST',
      headers: { Origin: 'https://portfolio.example' },
    })

    const response = await onRequestPost({ request, env: { GEMINI_API_KEY: 'server-only-key' } })
    const payload = await response.json() as { error: string }

    expect(payload.error).toContain('Rejected key [redacted] and config.')
    expect(JSON.stringify(payload)).not.toContain('server-only-key')
  })

  it('returns a useful JSON error if Gemini returns invalid JSON', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{', { status: 200 })))
    const request = new Request('https://portfolio.example/api/live-session', {
      method: 'POST',
      headers: { Origin: 'https://portfolio.example' },
    })

    const response = await onRequestPost({ request, env: { GEMINI_API_KEY: 'server-only-key' } })

    expect(response.status).toBe(502)
    expect(await response.json()).toEqual({
      error: 'Gemini Live returned an invalid token response. Please try again later.',
    })
  })
})
