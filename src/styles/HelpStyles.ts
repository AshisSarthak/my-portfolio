import styled from 'styled-components'

export const HelpGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`

export const HelpItem = styled.article`
  display: flex;
  min-height: 255px;
  flex-direction: column;
  align-items: flex-start;
  padding: 21px 22px 22px 0;

  & + & {
    padding-left: 22px;
    border-left: 1px solid var(--rule);
  }

  h3 {
    max-width: 260px;
    margin: 0 0 10px;
    font-family: var(--display);
    font-size: clamp(1.35rem, 2.2vw, 1.8rem);
    font-weight: 500;
    letter-spacing: -0.035em;
    line-height: 1.1;
  }

  p {
    max-width: 330px;
    margin: 0;
    color: var(--muted);
    font-size: 0.76rem;
    line-height: 1.7;
  }

  a {
    display: inline-flex;
    gap: 7px;
    margin-top: auto;
    padding-top: 20px;
    color: var(--ink);
    font-size: 0.67rem;
    font-weight: 650;
    text-decoration: underline;
    text-decoration-color: var(--accent);
    text-underline-offset: 4px;
  }

  a:hover {
    color: var(--accent);
  }

  @media (max-width: 760px) {
    min-height: 0;
    padding: 18px 0 20px;

    & + & {
      padding-left: 0;
      border-top: 1px solid var(--rule);
      border-left: 0;
    }

    h3 {
      max-width: none;
      margin: 10px 0 7px;
    }

    p {
      max-width: 540px;
    }

    a {
      margin-top: 0;
      padding-top: 12px;
    }
  }
`

export const ImpactBar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 20px;
  border: 1px solid var(--rule);
  background: var(--surface);

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`

export const ImpactItem = styled.div`
  display: flex;
  min-height: 96px;
  align-items: center;
  gap: 15px;
  padding: 17px 19px;

  & + & {
    border-left: 1px solid var(--rule);
  }

  strong {
    flex: 0 0 auto;
    color: var(--accent);
    font-family: var(--display);
    font-size: clamp(1.45rem, 2.5vw, 2rem);
    font-weight: 500;
    letter-spacing: -0.05em;
    line-height: 1;
  }

  span {
    max-width: 260px;
    color: var(--muted);
    font-size: 0.66rem;
    line-height: 1.55;
  }

  @media (max-width: 650px) {
    min-height: 68px;
    padding: 12px 15px;

    & + & {
      border-top: 1px solid var(--rule);
      border-left: 0;
    }

    span {
      max-width: none;
    }
  }
`
