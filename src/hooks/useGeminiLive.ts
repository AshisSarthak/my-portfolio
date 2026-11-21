import { useCallback, useEffect, useRef, useState } from 'react'
import { appPath } from '../paths'

export type LiveVoiceState = 'idle' | 'connecting' | 'listening' | 'thinking' | 'speaking'

interface LiveServerMessage {
  setupComplete?: unknown
  serverContent?: {
    inputTranscription?: { text?: string }
    outputTranscription?: { text?: string }
    modelTurn?: {
      parts?: Array<{
        inlineData?: { data?: string; mimeType?: string }
      }>
    }
    turnComplete?: boolean
  }
  error?: { message?: string }
}

export async function parseLiveServerMessage(data: unknown): Promise<LiveServerMessage> {
  let text: string
  if (typeof data === 'string') {
    text = data
  } else if (Object.prototype.toString.call(data) === '[object ArrayBuffer]') {
    text = new TextDecoder().decode(data as ArrayBuffer)
  } else if (typeof Blob !== 'undefined' && data instanceof Blob) {
    text = await data.text()
  } else {
    throw new Error('Gemini Live returned an unsupported WebSocket frame type.')
  }

  try {
    const parsed: unknown = JSON.parse(text)
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      throw new Error()
    }
    return parsed as LiveServerMessage
  } catch {
    throw new Error('Gemini Live returned a non-JSON WebSocket frame.')
  }
}

function resampleTo16k(samples: Float32Array, sampleRate: number) {
  const outputLength = Math.floor(samples.length * 16000 / sampleRate)
  const output = new Int16Array(outputLength)
  const ratio = sampleRate / 16000

  for (let index = 0; index < outputLength; index += 1) {
    const sourceIndex = index * ratio
    const lower = Math.floor(sourceIndex)
    const upper = Math.min(lower + 1, samples.length - 1)
    const fraction = sourceIndex - lower
    const sample = samples[lower] * (1 - fraction) + samples[upper] * fraction
    output[index] = Math.max(-1, Math.min(1, sample)) * 0x7fff
  }

  return output
}

function encodeBase64(samples: Int16Array) {
  const bytes = new Uint8Array(samples.buffer, samples.byteOffset, samples.byteLength)
  let binary = ''
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index])
  }
  return window.btoa(binary)
}

function decodePcm(data: string) {
  const binary = window.atob(data)
  const samples = new Int16Array(binary.length / 2)
  for (let index = 0; index < samples.length; index += 1) {
    const value = (binary.charCodeAt(index * 2 + 1) << 8) | binary.charCodeAt(index * 2)
    samples[index] = value > 0x7fff ? value - 0x10000 : value
  }
  return samples
}

interface UseGeminiLiveOptions {
  onUserTranscript: (text: string) => void
  onAssistantTranscript: (text: string) => void
}

export function useGeminiLive({ onUserTranscript, onAssistantTranscript }: UseGeminiLiveOptions) {
  const [state, setState] = useState<LiveVoiceState>('idle')
  const [error, setError] = useState('')
  const [audioLevel, setAudioLevel] = useState(0)
  const streamRef = useRef<MediaStream | null>(null)
  const socketRef = useRef<WebSocket | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const processorRef = useRef<AudioWorkletNode | null>(null)
  const playbackTimeRef = useRef(0)
  const onUserTranscriptRef = useRef(onUserTranscript)
  const onAssistantTranscriptRef = useRef(onAssistantTranscript)
  const playbackTimerRef = useRef<number | null>(null)
  const activeSessionRef = useRef(0)
  const tokenRequestRef = useRef<AbortController | null>(null)
  const connectionTimerRef = useRef<number | null>(null)

  useEffect(() => {
    onUserTranscriptRef.current = onUserTranscript
    onAssistantTranscriptRef.current = onAssistantTranscript
  }, [onAssistantTranscript, onUserTranscript])

  const reportAudioLevel = useCallback((level: number) => {
    const boundedLevel = Math.min(1, Math.max(0, level))
    setAudioLevel(boundedLevel)
  }, [])

  const stop = useCallback(() => {
    activeSessionRef.current += 1
    tokenRequestRef.current?.abort()
    tokenRequestRef.current = null
    if (connectionTimerRef.current !== null) {
      window.clearTimeout(connectionTimerRef.current)
      connectionTimerRef.current = null
    }
    if (playbackTimerRef.current !== null) {
      window.clearTimeout(playbackTimerRef.current)
      playbackTimerRef.current = null
    }
    processorRef.current?.disconnect()
    sourceRef.current?.disconnect()
    processorRef.current = null
    sourceRef.current = null
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    const socket = socketRef.current
    socketRef.current = null
    if (socket && socket.readyState < WebSocket.CLOSING) socket.close()
    const context = audioContextRef.current
    audioContextRef.current = null
    if (context && context.state !== 'closed') void context.close()
    playbackTimeRef.current = 0
    reportAudioLevel(0)
    setState('idle')
  }, [reportAudioLevel])

  useEffect(() => () => {
    processorRef.current?.disconnect()
    sourceRef.current?.disconnect()
    streamRef.current?.getTracks().forEach((track) => track.stop())
    if (socketRef.current && socketRef.current.readyState < WebSocket.CLOSING) {
      socketRef.current.close()
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      void audioContextRef.current.close()
    }
    activeSessionRef.current += 1
    if (playbackTimerRef.current !== null) window.clearTimeout(playbackTimerRef.current)
    if (connectionTimerRef.current !== null) window.clearTimeout(connectionTimerRef.current)
    tokenRequestRef.current?.abort()
    processorRef.current = null
    sourceRef.current = null
    streamRef.current = null
    socketRef.current = null
    audioContextRef.current = null
  }, [])

  const start = useCallback(async () => {
    if (state !== 'idle') return

    setError('')
    setState('connecting')
    const sessionId = activeSessionRef.current + 1
    activeSessionRef.current = sessionId
    const tokenRequest = new AbortController()
    tokenRequestRef.current = tokenRequest
    let mediaStream: MediaStream | null = null
    let audioContext: AudioContext | null = null

    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.AudioWorkletNode) {
        throw new Error('Realtime voice needs a supported browser and a secure HTTPS connection.')
      }

      mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
        },
      })
      if (sessionId !== activeSessionRef.current) {
        mediaStream.getTracks().forEach((track) => track.stop())
        return
      }
      streamRef.current = mediaStream

      const tokenResponse = await fetch(appPath('/api/live-session'), {
        method: 'POST',
        signal: tokenRequest.signal,
      })
      if (sessionId !== activeSessionRef.current) return
      const responseText = await tokenResponse.text()
      let tokenPayload: unknown
      try {
        tokenPayload = responseText ? JSON.parse(responseText) as unknown : null
      } catch {
        throw new Error(
          tokenResponse.status === 404 || tokenResponse.status === 200
            ? 'The voice service is not available here. Deploy with Cloudflare Pages Functions and configure GEMINI_API_KEY.'
            : `The voice service returned an unexpected response (${tokenResponse.status}). Please try again later.`,
        )
      }
      if (!tokenResponse.ok) {
        const message = typeof tokenPayload === 'object' && tokenPayload !== null && 'error' in tokenPayload
          ? tokenPayload.error
          : undefined
        if (tokenResponse.status === 404) {
          throw new Error(
            'The voice service endpoint is missing. Use Cloudflare Pages Functions with GEMINI_API_KEY configured; plain Vite development does not provide this endpoint.',
          )
        }
        throw new Error(
          typeof message === 'string'
            ? message
            : `Could not start realtime voice (${tokenResponse.status}). Please try again later.`,
        )
      }
      if (tokenPayload === null) {
        throw new Error(
          `The voice service returned an empty response (${tokenResponse.status}). Check the Cloudflare Pages Function deployment and try again.`,
        )
      }
      if (
        typeof tokenPayload !== 'object'
        || tokenPayload === null
        || !('token' in tokenPayload)
        || typeof tokenPayload.token !== 'string'
      ) {
        throw new Error('Realtime voice returned an invalid session token.')
      }

      audioContext = new AudioContext()
      audioContextRef.current = audioContext
      await audioContext.resume()
      await audioContext.audioWorklet.addModule(appPath('/pcm-capture-processor.js'))
      if (sessionId !== activeSessionRef.current) return

      const socket = new WebSocket(
        `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContentConstrained?access_token=${encodeURIComponent(tokenPayload.token)}`,
      )
      socket.binaryType = 'arraybuffer'
      socketRef.current = socket

      socket.onopen = () => {
        if (sessionId !== activeSessionRef.current) {
          socket.close()
          return
        }
        socket.send(JSON.stringify({
          setup: {
            model: 'models/gemini-3.8-live',
            generationConfig: {
              responseModalities: ['AUDIO'],
            },
            inputAudioTranscription: {},
            outputAudioTranscription: {},
            systemInstruction: {
              parts: [{
                text: 'You are the portfolio voice guide for Ashis Sarthak Singh, a Principal Engineer and UI Architect in Hyderabad. Answer questions about his experience using only these facts: he led frontend delivery of a Sberbank banking module with a team of four to five engineers using React, TypeScript, GraphQL, and modular architecture; at GlobalLogic he helped shape a data-heavy dashboard monorepo for Apple Technologies; at ADIA he introduced AI-assisted workflows and the portfolio reports a 90% delivery-speed improvement. Do not invent details, metrics, dates, or client information. If a fact is not available, say so. Keep answers concise and conversational.',
              }],
            },
          },
        }))
        connectionTimerRef.current = window.setTimeout(() => {
          if (socketRef.current !== socket) return
          setError('The voice service did not finish connecting. Please try again.')
          stop()
        }, 20_000)
      }

      socket.onmessage = async (event: MessageEvent) => {
        let message: LiveServerMessage
        try {
          message = await parseLiveServerMessage(event.data)
        } catch (caught) {
          setError(caught instanceof Error ? caught.message : 'Gemini Live returned an unreadable response.')
          stop()
          return
        }

        if (message.error) {
          setError(message.error.message ?? 'The voice service could not complete the session.')
          stop()
          return
        }

        if (message.setupComplete) {
          if (connectionTimerRef.current !== null) {
            window.clearTimeout(connectionTimerRef.current)
            connectionTimerRef.current = null
          }
          const source = audioContext!.createMediaStreamSource(mediaStream!)
          const processor = new AudioWorkletNode(audioContext!, 'pcm-capture-processor', {
            numberOfInputs: 1,
            numberOfOutputs: 1,
            outputChannelCount: [1],
          })
          processor.port.onmessage = (audioEvent: MessageEvent<{ samples: Float32Array; level: number }>) => {
            if (socket.readyState !== WebSocket.OPEN) return
            const pcm = resampleTo16k(audioEvent.data.samples, audioContext!.sampleRate)
            if (!pcm.length) return
            reportAudioLevel(audioEvent.data.level)
            socket.send(JSON.stringify({
              realtimeInput: {
                audio: {
                  data: encodeBase64(pcm),
                  mimeType: 'audio/pcm;rate=16000',
                },
              },
            }))
          }
          source.connect(processor)
          processor.connect(audioContext!.destination)
          sourceRef.current = source
          processorRef.current = processor
          setState('listening')
          return
        }

        const serverContent = message.serverContent
        if (!serverContent) return

        if (serverContent.inputTranscription?.text) {
          setState('thinking')
          onUserTranscriptRef.current(serverContent.inputTranscription.text)
        }
        if (serverContent.outputTranscription?.text) {
          onAssistantTranscriptRef.current(serverContent.outputTranscription.text)
          setState('speaking')
        }

        for (const part of serverContent.modelTurn?.parts ?? []) {
          const audioData = part.inlineData?.data
          if (!audioData || !audioContextRef.current) continue

          const samples = decodePcm(audioData)
          const buffer = audioContextRef.current.createBuffer(1, samples.length, 24000)
          const channel = buffer.getChannelData(0)
          for (let index = 0; index < samples.length; index += 1) {
            channel[index] = samples[index] / 0x8000
          }
          const source = audioContextRef.current.createBufferSource()
          source.buffer = buffer
          source.connect(audioContextRef.current.destination)
          const startAt = Math.max(playbackTimeRef.current, audioContextRef.current.currentTime)
          source.start(startAt)
          playbackTimeRef.current = startAt + buffer.duration
          let sumSquares = 0
          for (let index = 0; index < samples.length; index += 1) {
            const sample = samples[index] / 0x8000
            sumSquares += sample * sample
          }
          reportAudioLevel(Math.sqrt(sumSquares / samples.length))
          setState('speaking')
        }

        if (serverContent.turnComplete) {
          const context = audioContextRef.current
          const remainingAudio = context
            ? Math.max(0, playbackTimeRef.current - context.currentTime)
            : 0
          if (playbackTimerRef.current !== null) window.clearTimeout(playbackTimerRef.current)
          playbackTimerRef.current = window.setTimeout(() => {
            playbackTimerRef.current = null
            reportAudioLevel(0)
            setState((current) => current === 'speaking' ? 'listening' : current)
          }, remainingAudio * 1000)
        }
      }

      socket.onerror = () => {
        setError('Could not connect to Gemini Live. Check your connection and try again.')
        stop()
      }

      socket.onclose = (event) => {
        if (socketRef.current !== socket) return
        socketRef.current = null
        if (event.code !== 1000) {
          setError('The realtime voice session ended. Please try again.')
        }
        stop()
      }
    } catch (caught) {
      mediaStream?.getTracks().forEach((track) => track.stop())
      if (streamRef.current === mediaStream) streamRef.current = null
      if (audioContext && audioContext.state !== 'closed') void audioContext.close()
      if (audioContextRef.current === audioContext) audioContextRef.current = null
      socketRef.current?.close()
      socketRef.current = null
      if (sessionId !== activeSessionRef.current) return
      setState('idle')
      setError(caught instanceof Error ? caught.message : 'Could not start realtime voice.')
    } finally {
      if (tokenRequestRef.current === tokenRequest) tokenRequestRef.current = null
    }
  }, [reportAudioLevel, state, stop])

  return { state, error, audioLevel, start, stop }
}
