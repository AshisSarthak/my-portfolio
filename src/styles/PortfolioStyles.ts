import styled from 'styled-components'

export const Page = styled.div`
  min-height: 100vh;
  background: var(--page);
  color: var(--ink);
`

export const Container = styled.div`
  width: min(1080px, calc(100% - 48px));
  margin: 0 auto;

  @media (max-width: 600px) {
    width: calc(100% - 36px);
  }
`

export const Eyebrow = styled.p`
  margin: 0 0 14px;
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
`

export const Section = styled.section`
  padding: 76px 0 20px;
  scroll-margin-top: 40px;

  @media (max-width: 700px) {
    padding-top: 56px;
  }
`

export const SectionHeading = styled.div`
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  align-items: start;
  gap: 20px;
  margin-bottom: 28px;

  h2 {
    max-width: 690px;
    margin: -7px 0 0;
    font-family: var(--display);
    font-size: clamp(2rem, 4vw, 3.3rem);
    font-weight: 500;
    line-height: 1.05;
    letter-spacing: -0.045em;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 8px;

    h2 {
      margin: 0;
    }
  }
`

export const TextLink = styled.a`
  color: var(--ink);
  text-decoration-color: var(--accent);
  text-underline-offset: 4px;

  &:hover {
    color: var(--accent);
  }
`
