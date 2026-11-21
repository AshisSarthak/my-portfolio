import styled from 'styled-components'

export const Header = styled.header`
  border-bottom: 1px solid var(--rule);
`

export const HeaderInner = styled.div`
  display: flex;
  min-height: 70px;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  .header-actions {
    display: flex;
    align-items: center;
    gap: 9px;
  }

  @media (max-width: 720px) {
    flex-wrap: wrap;
    padding: 14px 0;

    .header-actions {
      margin-left: auto;
    }
  }
`

export const Wordmark = styled.a`
  color: var(--ink);
  font-size: 0.94rem;
  font-weight: 750;
  letter-spacing: -0.04em;
  text-decoration: none;
  white-space: nowrap;

  span {
    color: var(--accent);
  }
`

export const Navigation = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 22px;

  a {
    color: var(--muted);
    font-size: 0.76rem;
    text-decoration: none;
  }

  a:hover {
    color: var(--ink);
  }

  @media (max-width: 720px) {
    order: 3;
    width: 100%;
    justify-content: flex-start;
    gap: 20px;
  }

  @media (max-width: 420px) {
    gap: 13px;
  }
`

export const ThemeToggle = styled.button`
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border: 1px solid var(--rule);
  border-radius: 50%;
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  transition: border-color 180ms ease, color 180ms ease, transform 180ms ease;

  svg {
    width: 17px;
    height: 17px;
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.6;
  }

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
    transform: rotate(12deg);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const VoiceLaunchButton = styled.button`
  display: inline-flex;
  min-height: 36px;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border: 1px solid var(--rule);
  border-radius: 999px;
  background: var(--surface);
  color: var(--ink);
  cursor: pointer;
  font-size: 0.72rem;
  font-weight: 750;
  white-space: nowrap;
  transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;

  svg {
    width: 17px;
    height: 17px;
    fill: none;
    stroke: var(--accent);
    stroke-linecap: round;
    stroke-width: 1.8;
  }

  &:hover {
    border-color: var(--accent);
    box-shadow: 0 0 24px var(--atlas-halo);
    transform: translateY(-1px);
  }

  @media (max-width: 420px) {
    min-width: 38px;
    justify-content: center;
    padding: 0 10px;

    span {
      display: none;
    }
  }
`

export const CommandLaunchButton = styled.button`
  display: inline-flex;
  min-height: 36px;
  align-items: center;
  padding: 0 11px;
  border: 1px solid var(--rule);
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: 700;
  transition: border-color 180ms ease, color 180ms ease;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }
`
