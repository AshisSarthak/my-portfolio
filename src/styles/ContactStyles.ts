import styled from 'styled-components'

export const PrimaryLink = styled.a`
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  padding: 0 14px;
  border-radius: 4px;
  background: var(--accent);
  color: var(--on-accent);
  font-size: 0.78rem;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 140ms ease;

  &:hover {
    background: var(--accent-hover);
  }
`

export const Signature = styled.a`
  display: grid;
  width: fit-content;
  margin: clamp(42px, 7vw, 82px) 0 25px;
  color: var(--ink);
  font-family: var(--display);
  font-size: clamp(3.2rem, 11vw, 9.2rem);
  line-height: 0.82;
  letter-spacing: -0.085em;
  text-decoration: none;

  span:last-child {
    margin-left: 0.28em;
    color: var(--accent);
    font-size: 0.72em;
    letter-spacing: -0.055em;
  }

  &:hover span:last-child {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.12em;
  }
`

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 0 27px;
  border-top: 1px solid var(--rule);
  color: var(--muted);
  font-size: 0.68rem;

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    color: var(--accent);
  }
`
