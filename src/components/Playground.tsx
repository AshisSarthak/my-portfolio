import { useCallback, useEffect, useRef, useState } from 'react'
import { profile, work } from '../data/portfolio'
import { useGeminiLive } from '../hooks/useGeminiLive'
import type { ThemeName } from '../theme'
import { getVoiceCommand } from '../voiceCommands'
import {
  VoiceBeam,
  VoiceBeamBar,
  VoiceBeamBars,
  VoiceConsole,
  VoiceDialog,
  VoiceDialogTopbar,
  VoiceError,
  VoiceExitButton,
  VoiceModeAction,
  VoiceModeGrid,
  VoiceModeOverlay,
  VoiceModeSubtitle,
  VoiceModeTitle,
  VoiceStatus,
  VoiceTranscript,
  VoiceTranscriptBlock,
  VoiceTranscriptHeader,
  VoiceTranscriptPanel,
} from '../styles/PlaygroundStyles'

interface PlaygroundProps {
  onThemeChange: (themeName: ThemeName) => void
  voiceModeOpen: boolean
  onVoiceClose: () => void
}

function appendConversation(messages: TranscriptMessage[], speaker: TranscriptMessage['speaker'], text: string) {
  const lastMessage = messages[messages.length - 1]
  if (lastMessage?.speaker === speaker) {
    const updatedText = appendTranscript(lastMessage.text, text)
    if (updatedText === lastMessage.text) return messages
    return [...messages.slice(0, -1), { ...lastMessage, text: updatedText }]
  }
  return [...messages, { speaker, text: text.trim() }]
}

interface NavigationAction {
  id: string
  label: string
}

interface TranscriptMessage {
  speaker: 'you' | 'guide'
  text: string
}

function appendTranscript(current: string, next: string) {
  const text = next.trim()
  if (!text || current.endsWith(text)) return current
  return current ? `${current} ${text}` : text
}

function resolveProject(text: string) {
  const normalizedText = text.toLowerCase()
  return work.find((project) => {
    const name = project.organization.toLowerCase().split(' · ')[0]
    return normalizedText.includes(name)
      || (project.id === 'case-apple' && normalizedText.includes('apple'))
      || (project.id === 'case-adia' && normalizedText.includes('ai workflow'))
  }) ?? (/\b(project|projects|work|case stud(y|ies))\b/.test(normalizedText) ? work[0] : undefined)
}

function getNavigationAction(text: string): NavigationAction | undefined {
  const command = text.toLowerCase()
  if (!/\b(show|open|go to|navigate to|take me to|jump to|view|explore)\b/.test(command)) {
    return undefined
  }
  if (/\b(journey|career|experience|timeline)\b/.test(command)) {
    return { id: 'career', label: 'Career journey' }
  }
  if (/\b(approach|expertise|skills)\b/.test(command)) {
    return { id: 'approach', label: 'Engineering approach' }
  }
  if (/\b(contact|email)\b/.test(command)) {
    return { id: 'contact', label: 'Contact details' }
  }
  return undefined
}

interface VoiceModeProps {
  state: 'idle' | 'connecting' | 'listening' | 'thinking' | 'speaking'
  audioLevel: number
  error: string
  messages: TranscriptMessage[]
  selectedProject?: (typeof work)[number]
  navigationAction?: NavigationAction
  onStart: () => void
  onStop: () => void
  onClose: () => void
  onNavigate: (action: NavigationAction) => void
  onProjectOpen: (projectId: string) => void
}

function VoiceMode({
  state,
  audioLevel,
  error,
  messages,
  selectedProject,
  navigationAction,
  onStart,
  onStop,
  onClose,
  onNavigate,
  onProjectOpen,
}: VoiceModeProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const transcriptEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const dialog = closeButtonRef.current?.closest('[role="dialog"]')
      const focusable = dialog?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), a[href], textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [onClose])

  useEffect(() => {
    if (typeof transcriptEndRef.current?.scrollIntoView === 'function') {
      transcriptEndRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [messages, state])

  const statusLabel = {
    idle: 'Voice mode ready',
    connecting: 'Connecting to Gemini Live',
    listening: 'Listening · speak naturally',
    thinking: 'Thinking',
    speaking: 'Speaking · interrupt anytime',
  }[state]

  return (
    <VoiceModeOverlay>
      <VoiceDialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="voice-mode-title"
        aria-label="Voice mode"
      >
        <VoiceDialogTopbar>
          <a href="#top" onClick={onClose} aria-label={`${profile.name}, return to portfolio`}>
            AS<span>.</span>
          </a>
          <span className="dialog-meta"><i aria-hidden="true" /> PORTFOLIO VOICE MODE</span>
          <VoiceExitButton ref={closeButtonRef} type="button" onClick={onClose}>
            <span>Close</span>
            <span aria-hidden="true">×</span>
          </VoiceExitButton>
        </VoiceDialogTopbar>

        <VoiceModeGrid>
          <VoiceConsole data-state={state}>
            <div className="console-intro">
              <span className="voice-kicker">GEMINI LIVE · SPEECH TO SPEECH</span>
              <VoiceModeTitle id="voice-mode-title">Voice mode</VoiceModeTitle>
              <VoiceModeSubtitle>
                Ask about my work, architecture, or experience.
              </VoiceModeSubtitle>
            </div>

            <VoiceBeam
              aria-hidden="true"
              data-state={state}
              data-testid="voice-beam"
              style={{ transform: `scaleX(${1 + Math.min(audioLevel, 0.8) * (state === 'speaking' ? 0.62 : 0.44)})` }}
            >
              <VoiceBeamBars>
                {Array.from({ length: 37 }, (_, index) => {
                  const idleHeight = 10 + Math.abs(Math.sin(index * 0.58)) * 27
                  const liveHeight = 8 + audioLevel * 84 * (0.28 + Math.abs(Math.sin(index * 1.21)) * 0.72)
                  const height = state === 'listening' || state === 'speaking' ? liveHeight : idleHeight
                  return (
                    <VoiceBeamBar
                      key={index}
                      style={{ height: `${height}px`, animationDelay: `${(index % 7) * -90}ms` }}
                    />
                  )
                })}
              </VoiceBeamBars>
              <span className="beam-sweep" />
            </VoiceBeam>

            <VoiceStatus aria-live="polite" data-state={state}>
              <span className="status-indicator" />
              {statusLabel}
            </VoiceStatus>

            {error && <VoiceError role="alert">{error}</VoiceError>}

            <div className="voice-controls">
              {state === 'idle' ? (
                <>
                  <VoiceModeAction
                    type="button"
                    onClick={onStart}
                    aria-label={error ? 'Retry voice connection' : 'Start voice session'}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 3v18M7.5 7v10M3 9.5v5M16.5 7v10M21 9.5v5" />
                    </svg>
                    <span>{error ? 'Try again' : messages.length > 0 ? 'Start again' : 'Start conversation'}</span>
                  </VoiceModeAction>
                  {!error && <p className="launch-hint">Your microphone stays off until you start.</p>}
                </>
              ) : (
                <VoiceModeAction type="button" $ending onClick={onStop} aria-label="End voice conversation">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" /></svg>
                  <span>End voice mode</span>
                </VoiceModeAction>
              )}
              <p>Audio is sent to Google Gemini for live responses.</p>
            </div>
          </VoiceConsole>

          <VoiceTranscriptPanel aria-label="Conversation and portfolio actions">
            <VoiceTranscriptHeader>
              <div>
                <span className="voice-kicker">Your conversation</span>
                <h2>Explore by asking.</h2>
              </div>
              <span className="live-tag"><i aria-hidden="true" /> LIVE</span>
            </VoiceTranscriptHeader>

            <VoiceTranscript aria-live="polite" aria-relevant="additions text">
              {messages.length === 0 && (
                <div className="transcript-empty">
                  <p className="hint-label">Try asking</p>
                  <ul>
                    <li>“How do you approach architecture?”</li>
                    <li>“What did you lead at Sberbank?”</li>
                    <li>“Show me your work at ADIA.”</li>
                  </ul>
                </div>
              )}
              {messages.map((message, index) => (
                <VoiceTranscriptBlock key={`${message.speaker}-${index}`} data-speaker={message.speaker}>
                  <span>{message.speaker === 'you' ? 'YOU' : 'ASHIS’ GUIDE'}</span>
                  <p>{message.text}</p>
                </VoiceTranscriptBlock>
              ))}
              {state === 'thinking' && <p className="thinking-note"><span /> Finding the right details</p>}
              {selectedProject && (
                <article className="project-action">
                  <span>IN THE PORTFOLIO · CASE {selectedProject.number}</span>
                  <h3>{selectedProject.organization}</h3>
                  <p>{selectedProject.description}</p>
                  <button type="button" onClick={() => onProjectOpen(selectedProject.id)}>
                    Explore this case study <span aria-hidden="true">↗</span>
                  </button>
                </article>
              )}
              {navigationAction && (
                <button
                  type="button"
                  className="navigation-action"
                  onClick={() => onNavigate(navigationAction)}
                >
                  Open {navigationAction.label} <span aria-hidden="true">↗</span>
                </button>
              )}
              <div ref={transcriptEndRef} />
            </VoiceTranscript>
            <p className="privacy-note">Audio is processed by Google Gemini to provide this live conversation. Avoid sharing sensitive information.</p>
          </VoiceTranscriptPanel>
        </VoiceModeGrid>
      </VoiceDialog>
    </VoiceModeOverlay>
  )
}

export function Playground({
  onThemeChange,
  voiceModeOpen,
  onVoiceClose,
}: PlaygroundProps) {
  const [messages, setMessages] = useState<TranscriptMessage[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string>()
  const [navigationAction, setNavigationAction] = useState<NavigationAction>()
  const userTurnRef = useRef('')
  const closeVoiceModeRef = useRef<() => void>(() => {})
  const voice = useGeminiLive({
    onUserTranscript: (text) => {
      userTurnRef.current = appendTranscript(userTurnRef.current, text)
      setMessages((current) => appendConversation(current, 'you', text))
      const project = resolveProject(userTurnRef.current)
      if (project) setSelectedProjectId(project.id)
      setNavigationAction(getNavigationAction(userTurnRef.current))
      handleVoiceCommand(userTurnRef.current)
    },
    onAssistantTranscript: (text) => {
      setMessages((current) => appendConversation(current, 'guide', text))
      userTurnRef.current = ''
    },
  })
  const selectedProject = work.find(({ id }) => id === selectedProjectId)

  function handleVoiceCommand(utterance: string) {
    const command = getVoiceCommand(utterance)
    if (command === 'close') {
      closeVoiceModeRef.current()
    } else if (command === 'dark') {
      onThemeChange('dark')
    } else if (command === 'light') {
      onThemeChange('light')
    }
  }

  const stopVoice = voice.stop
  const closeVoiceMode = useCallback(() => {
    stopVoice()
    setMessages([])
    userTurnRef.current = ''
    setSelectedProjectId(undefined)
    setNavigationAction(undefined)
    onVoiceClose()
  }, [onVoiceClose, stopVoice])

  useEffect(() => {
    closeVoiceModeRef.current = closeVoiceMode
  }, [closeVoiceMode])

  const navigateFromVoice = useCallback((action: NavigationAction) => {
    closeVoiceMode()
    window.setTimeout(() => {
      const target = document.getElementById(action.id)
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (target instanceof HTMLElement) {
        target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
      }
    }, 0)
  }, [closeVoiceMode])

  if (!voiceModeOpen) return null

  return (
    <VoiceMode
      state={voice.state}
      audioLevel={voice.audioLevel}
      error={voice.error}
      messages={messages}
      selectedProject={selectedProject}
      navigationAction={navigationAction}
      onStart={() => void voice.start()}
      onStop={voice.stop}
      onClose={closeVoiceMode}
      onNavigate={navigateFromVoice}
      onProjectOpen={(projectId) => navigateFromVoice({ id: projectId, label: 'case study' })}
    />
  )
}
