import styled, { keyframes } from 'styled-components'

const reveal = keyframes`
  from { opacity: 0; transform: translateY(9px); }
  to { opacity: 1; transform: translateY(0); }
`

export const CareerPanel = styled.div`
  --career-glow: color-mix(in srgb, var(--accent) 12%, transparent);
  min-width: 0;
  overflow: hidden;
  padding: clamp(18px, 3vw, 32px);
  border: 1px solid var(--rule);
  border-radius: 20px;
  background:
    radial-gradient(ellipse at 82% 0%, var(--career-glow), transparent 42%),
    var(--surface);

  .index-layout {
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
    gap: clamp(18px, 3vw, 36px);
    align-items: start;
  }

  .career-entries {
    min-width: 0;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .index-list .career-entry {
    margin: 3px 0;
  }

  .index-list button {
    display: grid;
    width: 100%;
    min-height: 65px;
    grid-template-columns: minmax(75px, 0.72fr) minmax(0, 1fr) 32px;
    gap: 9px;
    align-items: center;
    padding: 8px 10px;
    border: 0;
    border-radius: 9px;
    background: transparent;
    color: var(--ink);
    cursor: pointer;
    text-align: left;
    transition:
      background 220ms ease,
      color 220ms ease,
      transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .index-list button:hover {
    background: color-mix(in srgb, var(--accent) 5%, transparent);
  }

  .index-list button[aria-pressed='true'] {
    background: color-mix(in srgb, var(--accent) 11%, transparent);
    transform: translateX(2px);
  }

  .index-list button:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }

  .index-list time {
    color: var(--muted);
    font-size: 0.68rem;
    font-variant-numeric: tabular-nums;
    line-height: 1.5;
  }

  .index-company-copy {
    display: grid;
    min-width: 0;
    gap: 3px;
  }

  .index-list .company-name {
    overflow: hidden;
    color: var(--ink);
    font-size: 0.82rem;
    font-weight: 690;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .index-list button[aria-pressed='true'] .company-name {
    color: var(--accent);
  }

  .index-list .company-role {
    overflow: hidden;
    color: var(--muted);
    font-size: 0.72rem;
    line-height: 1.5;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .company-mark {
    display: grid;
    width: 42px;
    height: 42px;
    flex: 0 0 auto;
    place-items: center;
    overflow: hidden;
    border: 1px solid var(--rule);
    border-radius: 12px;
    background: #fff;
  }

  .company-mark img {
    display: block;
    width: 75%;
    height: 75%;
    object-fit: contain;
  }

  .index-list .company-mark {
    width: 30px;
    height: 30px;
    border-radius: 9px;
  }

  .index-detail {
    position: sticky;
    top: 20px;
    display: grid;
    min-width: 0;
    grid-template-columns: 50px minmax(0, 1fr);
    gap: 12px 14px;
    padding: 16px 0 16px 18px;
    border-left: 1px solid var(--accent);
    background: linear-gradient(110deg, var(--career-glow), transparent);
    animation: ${reveal} 380ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  }

  .index-detail .company-mark {
    width: 50px;
    height: 50px;
    margin: 0;
  }

  .index-heading {
    align-self: center;
    min-width: 0;
  }

  .index-detail h3 {
    margin: 0;
    color: var(--ink);
    font-family: var(--display);
    font-size: clamp(1.25rem, 2vw, 1.65rem);
    font-weight: 500;
    letter-spacing: -0.035em;
  }

  .index-detail p {
    margin: 4px 0;
    color: var(--muted);
    font-size: 0.82rem;
  }

  .index-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 3px 9px;
    color: var(--muted);
    font-size: 0.68rem;
  }

  .index-meta > span::before {
    margin-right: 7px;
    color: var(--accent);
    content: '·';
  }

  .index-detail .index-meta time {
    color: var(--muted);
    font-size: 0.68rem;
    font-variant-numeric: tabular-nums;
  }

  .index-overview,
  .index-highlights,
  .index-focus {
    grid-column: 1 / -1;
  }

  .index-overview h4 {
    margin: 1px 0 6px;
    color: var(--ink);
    font-size: 0.82rem;
    font-weight: 740;
  }

  .index-overview p {
    margin: 0;
    color: var(--muted);
    font-size: 0.82rem;
    line-height: 1.75;
  }

  .index-highlights {
    display: grid;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .index-highlights li {
    position: relative;
    padding-left: 13px;
    color: var(--muted);
    font-size: 0.75rem;
    line-height: 1.65;
  }

  .index-highlights li::before {
    position: absolute;
    top: 0.47em;
    left: 0;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--accent);
    content: '';
  }

  .index-focus {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .index-focus li {
    padding: 5px 8px;
    border: 1px solid var(--rule);
    border-radius: 999px;
    color: var(--muted);
    font-size: 0.68rem;
    line-height: 1.4;
  }

  @media (max-width: 700px) {
    .index-layout {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .index-detail {
      position: static;
      padding: 12px 0 0;
      border-top: 1px solid var(--accent);
      border-left: 0;
    }
  }

  @media (max-width: 460px) {
    padding: 15px;

    .index-list button {
      grid-template-columns: minmax(70px, 0.68fr) minmax(0, 1fr) 28px;
      gap: 6px;
      padding-right: 3px;
      padding-left: 8px;
    }

    .index-list time {
      font-size: 0.63rem;
    }

    .index-list .company-name {
      font-size: 0.72rem;
    }

    .index-list .company-role {
      font-size: 0.63rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .index-list button {
      transition: none;
    }

    .index-detail {
      animation: none;
    }
  }
`

export const Recognition = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  margin-top: 18px;
  color: var(--muted);
  font-size: 0.7rem;
`
