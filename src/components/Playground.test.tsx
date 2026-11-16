import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getVoiceCommand } from '../voiceCommands'
import { Playground } from './Playground'

const voiceMock = vi.hoisted(() => ({
  onUserTranscript: undefined as ((text: string) => void) | undefined,
  start: vi.fn(),
  stop: vi.fn(),
}))

vi.mock('../hooks/useGeminiLive', () => ({
  useGeminiLive: (options: { onUserTranscript: (text: string) => void }) => {
    voiceMock.onUserTranscript = options.onUserTranscript
    return {
      state: 'idle',
      audioLevel: 0,
      error: '',
      start: voiceMock.start,
      stop: voiceMock.stop,
    }
  },
}))

function VoiceModeHarness() {
  const [voiceModeOpen, setVoiceModeOpen] = useState(true)

  return (
    <Playground
      onThemeChange={vi.fn()}
      voiceModeOpen={voiceModeOpen}
      onVoiceClose={() => setVoiceModeOpen(false)}
    />
  )
}

describe('voice UI commands', () => {
  beforeEach(() => {
    voiceMock.onUserTranscript = undefined
    voiceMock.start.mockClear()
    voiceMock.stop.mockClear()
  })

  it('recognizes requests to close the voice window or session', () => {
    expect(getVoiceCommand('Close the window')).toBe('close')
    expect(getVoiceCommand('End this voice session')).toBe('close')
  })

  it('closes the voice window and ends the session when asked', () => {
    render(<VoiceModeHarness />)

    expect(screen.getByRole('dialog', { name: 'Voice mode' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start voice session' })).toBeInTheDocument()
    expect(voiceMock.onUserTranscript).toBeDefined()

    act(() => {
      voiceMock.onUserTranscript?.('Please close this voice session')
    })

    expect(screen.queryByRole('dialog', { name: 'Voice mode' })).not.toBeInTheDocument()
    expect(voiceMock.stop).toHaveBeenCalledOnce()
  })

  it('does not start the microphone until the visitor starts a voice session', async () => {
    const user = userEvent.setup()
    render(<VoiceModeHarness />)

    expect(voiceMock.start).not.toHaveBeenCalled()
    await user.click(screen.getByRole('button', { name: 'Start voice session' }))

    expect(voiceMock.start).toHaveBeenCalledOnce()
  })
})
