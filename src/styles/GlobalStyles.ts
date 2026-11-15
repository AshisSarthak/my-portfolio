import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :root {
    --page: ${({ theme }) => theme.background};
    --surface: ${({ theme }) => theme.surface};
    --ink: ${({ theme }) => theme.text};
    --muted: ${({ theme }) => theme.muted};
    --accent: ${({ theme }) => theme.accent};
    --accent-hover: ${({ theme }) => theme.accentSecondary};
    --on-accent: ${({ theme }) => theme.buttonText};
    --rule: ${({ theme }) => theme.border};
    --atlas-surface: ${({ theme }) => theme.surface};
    --atlas-active: ${({ theme }) => theme.surfaceStrong};
    --atlas-dot: ${({ theme }) => `${theme.accent}30`};
    --atlas-line: ${({ theme }) => theme.border};
    --atlas-halo: ${({ theme }) => theme.glow};
    --art-bg: ${({ theme }) => theme.surface};
    --art-dot: ${({ theme }) => `${theme.accent}30`};
    --art-panel: ${({ theme }) => theme.surfaceStrong};
    --art-line: ${({ theme }) => theme.border};
    --art-soft: ${({ theme }) => `${theme.accent}40`};
    --art-muted: ${({ theme }) => theme.muted};
    --display: Georgia, "Times New Roman", serif;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 6rem;
  }

  body {
    min-width: 320px;
    min-height: 100vh;
    margin: 0;
    background: var(--page);
    color: var(--ink);
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    line-height: 1.6;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  button, select, a {
    font: inherit;
  }

  a {
    color: inherit;
  }

  button:focus-visible, select:focus-visible, a:focus-visible {
    outline: 3px solid var(--accent);
    outline-offset: 4px;
  }

  ::selection {
    color: var(--on-accent);
    background: var(--accent);
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
  }

  .section-index {
    padding-top: 5px;
    color: var(--accent);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  @media (max-width: 700px) {
    .section-index {
      padding-top: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`
