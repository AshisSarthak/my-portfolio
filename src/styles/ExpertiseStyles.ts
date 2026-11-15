import styled from 'styled-components'

export const PracticeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--rule);

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`

export const PracticeArea = styled.article`
  padding: 20px 20px 22px 0;
  border-bottom: 1px solid var(--rule);

  &:nth-child(odd) {
    margin-right: 28px;
  }

  > span {
    display: block;
    margin-bottom: 13px;
    color: var(--accent);
    font-family: var(--display);
    font-size: 1.35rem;
  }

  @media (max-width: 650px) {
    &:nth-child(odd) {
      margin-right: 0;
    }
  }
`

export const CapabilityList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`

export const Capability = styled.span`
  padding: 5px 8px;
  border: 1px solid var(--rule);
  border-radius: 3px;
  color: var(--muted);
  font-size: 0.69rem;
`
