# Ashis Sarthak Singh — Portfolio

A responsive React and TypeScript portfolio built with Vite and styled-components. Its interactive Systems Atlas connects product, systems, interface craft, and people to resume-backed case studies. Visitors can switch between dark and light themes; their selection is saved in the browser.

The app is split into focused sections under `src/components/`, with resume-backed content in `src/data/portfolio.ts` and shared theme/design styles in `src/styles/`.

The portfolio includes an immersive Gemini Live speech-to-speech mode launched from the header. Visitors explicitly start the microphone and live connection after opening Voice mode; it includes an audio-reactive voice beam, live captions, project links, and spoken theme controls. Voice-only code is loaded only when the mode is opened. Career history is presented as an interactive company index, and the footer links to GitHub and LinkedIn.

### Configure realtime voice

The Cloudflare Pages Function at `functions/api/live-session.ts` issues a one-use, short-lived Gemini Live token constrained with the `bidiGenerateContentSetup` REST field. The Gemini API key stays in the server environment and is never bundled into the site.

1. Create a Gemini API key in Google AI Studio and confirm that the selected Gemini Live model is available for your account and region.
2. In Cloudflare Pages, add `GEMINI_API_KEY` as an encrypted secret for the production environment (and preview if needed).
3. Deploy the site over HTTPS. Voice requires microphone permission and a browser that supports `getUserMedia`, `AudioWorklet`, and WebSocket.

For local development with Vite, copy `.env.example` to `.env.local`, add a development API key, then run `npm run dev`. The Vite-only server route calls the same token function as Cloudflare Pages; it reads the key server-side and never exposes it to the browser. For a production-like Pages preview, use `.dev.vars` with Wrangler (`npm run build` then `npx wrangler pages dev dist`). Do not commit `.env.local` or `.dev.vars`.

The Gemini free tier is limited, may change, and Google’s current terms state that free-tier content may be used to improve its products. Free-tier eligibility for the selected Live model depends on current availability and account/region; it is not guaranteed. Review current model pricing and data terms before enabling this publicly. Configure provider quotas and a Cloudflare rate limit for `POST /api/live-session` before public launch. If the function has no configured key or Gemini is unavailable, the overlay shows an error and visitors can continue browsing the portfolio.

## Requirements

- Node.js 22.12 or newer
- npm

## Development

```sh
npm install
npm run dev
```

## Quality checks

```sh
npm test
npm run build
npm run lint
```

Run the end-to-end suite with:

```sh
npx playwright install chromium
npm run test:e2e
```

GitHub Actions runs unit tests, lint, a production build, and the Playwright suite on pushes and pull requests targeting `main`.

## Deploy on Cloudflare Pages

1. Push this repository to GitHub.
2. In Cloudflare, open **Workers & Pages → Create application → Pages → Connect to Git** and select the repository.
3. Configure the build:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Save and deploy. Cloudflare Pages will deploy production from `main` and create preview deployments for pull requests. Add the encrypted `GEMINI_API_KEY` secret to the Pages production environment (and preview if desired) to enable voice sessions.
5. In GitHub, protect `main` and require the **Test, lint, build, and browser tests** check before merging pull requests. This makes the GitHub Actions CI check a merge gate; Cloudflare Pages handles deployment from the connected branch.

A custom domain is optional and needs a separately purchased domain name.

## Production

`npm run build` creates the static site in `dist/`.
