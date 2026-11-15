# Ashis Sarthak Singh — Portfolio

A responsive React and TypeScript portfolio built with Vite and styled-components. Its interactive Systems Atlas connects product, systems, interface craft, and people to resume-backed case studies. Visitors can switch between dark and light themes; their selection is saved in the browser.

The app is split into focused sections under `src/components/`, with resume-backed content in `src/data/portfolio.ts` and shared theme/design styles in `src/styles/`.

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

## Deploy on Cloudflare Pages

1. Push this repository to GitHub.
2. In Cloudflare, open **Workers & Pages → Create application → Pages → Connect to Git** and select the repository.
3. Configure the build:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Save and deploy. Cloudflare will build on each push and provide a free `*.pages.dev` address with HTTPS.

A custom domain is optional and needs a separately purchased domain name.

## Production

`npm run build` creates the static site in `dist/`.
