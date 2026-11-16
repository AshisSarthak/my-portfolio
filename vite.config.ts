import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { loadEnv, type Plugin } from 'vite'
import { onRequestPost } from './functions/api/live-session.ts'

export default defineConfig(({ command, mode }) => ({
  plugins: [
    react(),
    ...(command === 'serve'
      ? [
          {
            name: 'local-gemini-live-function',
            configureServer(server) {
              const env = loadEnv(mode, process.cwd(), '')
              server.middlewares.use('/api/live-session', async (request, response, next) => {
                if (request.method !== 'POST') {
                  next()
                  return
                }

                try {
                  const host = request.headers.host ?? 'localhost'
                  const headers = new Headers()
                  for (const [name, value] of Object.entries(request.headers)) {
                    if (typeof value === 'string') headers.set(name, value)
                    else if (Array.isArray(value)) headers.set(name, value.join(', '))
                  }
                  const functionRequest = new Request(`http://${host}/api/live-session`, {
                    method: 'POST',
                    headers,
                  })
                  const functionResponse = await onRequestPost({
                    request: functionRequest,
                    env: { GEMINI_API_KEY: env.GEMINI_API_KEY ?? process.env.GEMINI_API_KEY },
                  })

                  response.statusCode = functionResponse.status
                  functionResponse.headers.forEach((value, name) => response.setHeader(name, value))
                  response.end(await functionResponse.text())
                } catch (error) {
                  next(error instanceof Error ? error : new Error('Local voice endpoint failed.'))
                }
              })
            },
          } satisfies Plugin,
        ]
      : []),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.test.{ts,tsx}'],
    clearMocks: true,
  },
}))
