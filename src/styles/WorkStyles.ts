import styled from 'styled-components'

export const CaseStudyList = styled.div`
  display: grid;
  gap: 18px;
`

export const CaseStudy = styled.article`
  display: grid;
  grid-template-columns: minmax(240px, 0.9fr) minmax(0, 1.1fr);
  min-height: 270px;
  scroll-margin-top: 6rem;
  overflow: hidden;
  border: 1px solid var(--rule);
  background: var(--surface);
  transition: border-color 180ms ease, transform 180ms ease;

  &:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }

  &:nth-child(even) {
    grid-template-columns: minmax(0, 1.1fr) minmax(240px, 0.9fr);
  }

  &:nth-child(even) > div:first-child {
    order: 2;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;

    &:nth-child(even) {
      grid-template-columns: 1fr;
    }

    &:nth-child(even) > div:first-child {
      order: 0;
    }
  }
`

export const WorkArtwork = styled.div`
  display: grid;
  place-items: center;
  min-height: 270px;
  padding: clamp(20px, 4vw, 40px);
  overflow: hidden;
  border-right: 1px solid var(--rule);
  background-color: var(--art-bg);
  background-image: radial-gradient(var(--art-dot) 0.7px, transparent 0.7px);
  background-size: 15px 15px;

  svg {
    width: 100%;
    max-width: 380px;
    height: auto;
  }

  .art-frame {
    fill: var(--art-panel);
    stroke: var(--art-line);
    stroke-width: 1.4;
  }

  .art-accent {
    fill: var(--accent);
  }

  .art-soft {
    fill: var(--art-soft);
  }

  .art-line {
    fill: none;
    stroke: var(--accent);
    stroke-width: 2;
    stroke-linecap: round;
  }

  .art-muted {
    fill: var(--art-muted);
  }

  @media (max-width: 720px) {
    min-height: 210px;
    border-right: 0;
    border-bottom: 1px solid var(--rule);
  }
`

export const CaseStudyCopy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: clamp(22px, 4vw, 38px);

  > span {
    color: var(--accent);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h3 {
    max-width: 530px;
    margin: 15px 0 11px;
    font-family: var(--display);
    font-size: clamp(1.7rem, 3.4vw, 2.7rem);
    font-weight: 500;
    line-height: 1.03;
    letter-spacing: -0.05em;
  }

  p {
    max-width: 540px;
    margin: 0;
    color: var(--muted);
    font-size: 0.82rem;
    line-height: 1.75;
  }

  small {
    margin-top: auto;
    padding-top: 20px;
    color: var(--ink);
    font-size: 0.69rem;
    line-height: 1.6;
  }
`

export const CaseStudyIndex = styled.span`
  margin-bottom: 14px;
  color: var(--muted);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
`

export const ContactBlock = styled.section`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 22px;
  margin-top: 82px;
  padding: 28px 0;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  scroll-margin-top: 40px;

  h2 {
    max-width: 620px;
    margin: 0;
    font-family: var(--display);
    font-size: clamp(2rem, 4.7vw, 3.8rem);
    font-weight: 500;
    line-height: 1.03;
    letter-spacing: -0.05em;
  }

  @media (max-width: 620px) {
    align-items: flex-start;
    flex-direction: column;
  }
`
