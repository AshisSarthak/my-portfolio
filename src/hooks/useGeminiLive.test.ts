import { describe, expect, it } from 'vitest'
import { parseLiveServerMessage } from './useGeminiLive'

describe('parseLiveServerMessage', () => {
  const setupComplete = JSON.stringify({ setupComplete: {} })

  it('parses JSON text frames', async () => {
    await expect(parseLiveServerMessage(setupComplete)).resolves.toEqual({ setupComplete: {} })
  })

  it('parses binary JSON frames', async () => {
    const frame = new TextEncoder().encode(setupComplete)

    await expect(parseLiveServerMessage(frame.buffer)).resolves.toEqual({ setupComplete: {} })
  })

  it('parses Blob JSON frames', async () => {
    await expect(parseLiveServerMessage(new Blob([setupComplete]))).resolves.toEqual({ setupComplete: {} })
  })

  it('reports malformed frames without echoing their contents', async () => {
    await expect(parseLiveServerMessage('private-content{')).rejects.toThrow(
      'Gemini Live returned a non-JSON WebSocket frame.',
    )
  })
})
