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

  @media (max-width: 720px) {
    flex-wrap: wrap;
    padding: 14px 0;
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
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid var(--rule);
  border-radius: 999px;
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  font-size: 0.72rem;
  white-space: nowrap;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
`
