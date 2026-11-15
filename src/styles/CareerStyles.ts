import styled from 'styled-components'

export const CareerList = styled.div`
  border-top: 1px solid var(--rule);
`

export const CareerItem = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 170px;
  gap: 20px;
  align-items: baseline;
  padding: 14px 0;
  border-bottom: 1px solid var(--rule);

  h3,
  p {
    display: inline;
    margin: 0;
    font-size: 0.82rem;
  }

  h3 {
    font-weight: 700;
  }

  p {
    margin-left: 10px;
    color: var(--muted);
  }

  time {
    color: var(--muted);
    font-size: 0.72rem;
    text-align: right;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 4px;

    p {
      display: block;
      margin: 3px 0 0;
    }

    time {
      text-align: left;
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
