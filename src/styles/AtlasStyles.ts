import styled from 'styled-components'

export const AtlasHero = styled.section`
  padding: clamp(34px, 5vw, 64px) 0 0;
`

export const AtlasIntro = styled.div`
  margin-bottom: clamp(24px, 4vw, 42px);

  p {
    margin: 0;
    color: var(--muted);
    font-size: 0.88rem;
    line-height: 1.7;
  }

  .hero-copy {
    max-width: 860px;
  }

  @media (max-width: 700px) {
    margin-bottom: 25px;
  }
`

export const HeroStatus = styled.p`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 12px !important;
  color: var(--accent) !important;
  font-size: 0.68rem !important;
  font-weight: 750;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--muted);
  }
`

export const HeroLead = styled.h2`
  max-width: 760px;
  margin: 0 0 12px !important;
  color: var(--ink) !important;
  font-family: var(--display);
  font-size: clamp(2.35rem, 4.5vw, 3.8rem) !important;
  font-weight: 500;
  letter-spacing: -0.05em;
  line-height: 1.03 !important;
`

export const AtlasActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 21px;

  a {
    display: inline-flex;
    min-height: 42px;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 0 14px;
    border: 1px solid var(--rule);
    border-radius: 4px;
    color: var(--ink);
    font-size: 0.74rem;
    font-weight: 700;
    text-decoration: none;
    transition: border-color 160ms ease, color 160ms ease, background 160ms ease;
  }

  a.primary {
    border-color: var(--accent);
    background: var(--accent);
    color: var(--on-accent);
  }

  a:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  a.primary:hover {
    background: var(--accent-hover);
    color: var(--on-accent);
  }
`

export const AtlasCanvas = styled.div`
  position: relative;
  min-height: clamp(420px, 36vw, 510px);
  overflow: hidden;
  border: 1px solid var(--rule);
  background-color: var(--atlas-surface);
  background-image:
    radial-gradient(var(--atlas-dot) 0.7px, transparent 0.7px),
    radial-gradient(ellipse at 50% 47%, var(--atlas-halo), transparent 49%);
  background-size: 21px 21px, 100% 100%;
  isolation: isolate;

  @media (max-width: 700px) {
    min-height: 430px;
  }
`

export const ConnectionMap = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;

  path {
    fill: none;
    stroke: var(--atlas-line);
    stroke-width: 1;
    stroke-dasharray: 4 7;
    transition: stroke 180ms ease, stroke-width 180ms ease;
  }

  path[data-active='true'] {
    stroke: var(--accent);
    stroke-width: 1.7;
    animation: map-flow 18s linear infinite;
  }

  @keyframes map-flow {
    to {
      stroke-dashoffset: -110;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    path[data-active='true'] {
      animation: none;
    }
  }
`

export const Identity = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  width: max-content;
  max-width: 90%;
  text-align: center;
  transform: translate(-50%, -50%);
  pointer-events: none;
`

export const IdentityName = styled.h1`
  display: grid;
  margin: 0;
  color: var(--ink);
  font-family: var(--display);
  font-size: clamp(2.1rem, 3.6vw, 3.2rem);
  font-weight: 500;
  line-height: 0.76;
  letter-spacing: -0.105em;
  text-transform: uppercase;

  span:last-child {
    color: var(--accent);
    font-size: 0.667em;
    line-height: 1;
    letter-spacing: 0.055em;
  }

  @media (max-width: 700px) {
    font-size: clamp(1.9rem, 7vw, 2.7rem);
  }
`

export const IdentityCaption = styled.p`
  margin: 17px 0 0;
  color: var(--muted);
  font-size: clamp(0.65rem, 1.2vw, 0.76rem);
  letter-spacing: 0.12em;
  text-transform: uppercase;
`

export const AtlasNode = styled.button<{ $position: string; $active: boolean }>`
  position: absolute;
  z-index: 2;
  ${({ $position }) =>
    $position === 'northwest'
      ? 'top: 12%; left: 11%;'
      : $position === 'northeast'
        ? 'top: 14%; right: 12%;'
        : $position === 'southwest'
          ? 'bottom: 15%; left: 14%;'
          : 'right: 11%; bottom: 14%;'}
  display: grid;
  grid-template-columns: 19px auto;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  padding: 7px 12px 7px 8px;
  border: 1px solid ${({ $active }) => ($active ? 'var(--accent)' : 'var(--rule)')};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? 'var(--atlas-active)' : 'var(--atlas-surface)')};
  color: var(--ink);
  cursor: pointer;
  text-align: left;
  box-shadow: ${({ $active }) => ($active ? '0 0 35px var(--atlas-halo)' : 'none')};
  transition: border-color 180ms ease, background 180ms ease, transform 180ms ease;

  &:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }

  &[aria-pressed='true'] {
    color: var(--accent);
  }

  @media (max-width: 700px) {
    ${({ $position }) =>
      $position === 'northwest'
        ? 'top: 8%; left: 5%;'
        : $position === 'northeast'
          ? 'top: 8%; right: 5%;'
          : $position === 'southwest'
            ? 'bottom: 20%; left: 5%;'
            : 'right: 5%; bottom: 20%;'}
    grid-template-columns: 15px auto;
    gap: 7px;
    min-height: 41px;
    padding: 5px 9px 5px 6px;
  }
`

export const NodeSignal = styled.span`
  position: relative;
  display: grid;
  place-items: center;
  width: 17px;
  height: 17px;
  border: 1px solid currentColor;
  border-radius: 50%;

  &::after {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
  }
`

export const NodeText = styled.span`
  display: block;
  font-size: 0.73rem;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: 700px) {
    font-size: 0.65rem;
  }
`

export const AtlasHint = styled.p`
  position: absolute;
  right: 18px;
  bottom: 16px;
  margin: 0;
  color: var(--muted);
  font-size: 0.61rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

export const FocusCard = styled.div`
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr) auto;
  align-items: center;
  gap: 25px;
  padding: 24px 0;
  border-bottom: 1px solid var(--rule);

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`

export const FocusLabel = styled.p`
  margin: 0;
  color: var(--accent);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
`

export const FocusDetail = styled.p`
  max-width: 680px;
  margin: 0;
  color: var(--muted);
  font-size: 0.84rem;
  line-height: 1.7;
`

export const FocusLink = styled.a`
  color: var(--ink);
  font-size: 0.75rem;
  text-decoration-color: var(--accent);
  text-underline-offset: 4px;
  white-space: nowrap;

  &:hover {
    color: var(--accent);
  }

  @media (max-width: 700px) {
    justify-self: start;
  }
`
