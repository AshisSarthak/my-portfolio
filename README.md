# Ashis Sarthak Singh — Portfolio

A responsive React and TypeScript portfolio built with Vite and styled-components. Its interactive Systems Atlas connects product, systems, interface craft, and people to resume-backed case studies. Visitors can switch between dark and light themes; their selection is saved in the browser.

The app is split into focused sections under `src/components/`, with resume-backed content in `src/data/portfolio.ts` and shared theme/design styles in `src/styles/`.

The interactive performance and design-token lab is available as a separate page at `/playground`, keeping the homepage focused on portfolio work. The site-wide command palette opens with `⌘K` or `Ctrl+K` and can navigate to the lab, projects, and page sections.

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

## Deploy on GitHub Pages

The `Deploy GitHub Pages` workflow builds the app with the `/my-portfolio/` base path, publishes the `dist/` output, and creates a `404.html` fallback for the standalone `/playground` route. In the repository settings, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. Pushes to `main` then deploy automatically.

GitHub Pages is static hosting, so the Gemini Live voice feature requires the Cloudflare Pages deployment, where the `functions/api/live-session.ts` endpoint can run. Cloudflare Pages remains available at [ashis-sarthak.pages.dev](https://ashis-sarthak.pages.dev).

## Deploy on Cloudflare Pages

1. Push this repository to GitHub.
2. In Cloudflare, open **Workers & Pages → Create application → Pages → Connect to Git** and select the repository.
3. Configure the build:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Save and deploy. Cloudflare Pages will deploy production from `main` and create preview deployments for pull requests. Add the encrypted `GEMINI_API_KEY` secret to the Pages production environment (and preview if desired) to enable voice sessions.
5. In GitHub, protect `main` and require the **Test, lint, build, and browser tests** check before merging pull requests. This makes the GitHub Actions CI check a merge gate; Cloudflare Pages handles deployment from the connected branch.

### Use `ashissarthak.is-a.dev`

The Cloudflare Pages project is `ashis-sarthak`, available at [ashis-sarthak.pages.dev](https://ashis-sarthak.pages.dev). To request `ashissarthak.is-a.dev`:

1. Fork [is-a-dev/register](https://github.com/is-a-dev/register/fork) and add `domains/ashissarthak.json` to your fork:
   ```json
   {
     "owner": {
       "username": "AshisSarthak"
     },
     "records": {
       "CNAME": "ashis-sarthak.pages.dev"
     }
   }
   ```
2. Open a pull request against `is-a-dev/register` and complete its current template yourself. The maintainers review registration requests; follow their [quickstart](https://docs.is-a.dev/quickstart/) and respond to requested changes.
3. After the registration is merged, associate `ashissarthak.is-a.dev` with the `ashis-sarthak` Pages project using the [is-a.dev Cloudflare Pages guide](https://docs.is-a.dev/guides/cloudflare-pages/). Since `is-a.dev` is a public suffix, follow the guide's current instructions to add the domain through its Pages tool or Cloudflare API.
4. Verify `https://ashissarthak.is-a.dev` loads and has an active HTTPS certificate. Future pushes to `main` deploy automatically through Cloudflare Pages.

## Production

`npm run build` creates the static site in `dist/`.
