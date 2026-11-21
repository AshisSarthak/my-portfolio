import styled from 'styled-components'

export const LabPageContainer = styled.div`
  width: min(1440px, calc(100% - 64px));
  margin: 0 auto;

  @media (max-width: 700px) {
    width: calc(100% - 36px);
  }
`

export const LabSection = styled.section`
  --lab-accent: ${({ theme }) => theme.accent};
  --lab-surface: ${({ theme }) => theme.surface};
  --accent: var(--lab-accent);
  --surface: var(--lab-surface);
  --lab-radius: 8px;
  --lab-row-height: 38px;

  padding: 42px 0 56px;
  color: var(--ink);

  @media (max-width: 700px) {
    padding-top: 30px;
  }
`

export const LabHeading = styled.div`
  margin-bottom: 22px;

  .lab-kicker {
    display: block;
    margin-bottom: 7px;
    color: var(--lab-accent);
    font-size: 0.65rem;
    font-weight: 750;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  h2 {
    margin: 0 0 6px;
    font-family: var(--display);
    font-size: clamp(2rem, 3.4vw, 3rem);
    font-weight: 500;
    letter-spacing: -0.045em;
    line-height: 1;
  }

  p {
    max-width: 700px;
    margin: 0;
    color: var(--muted);
    font-size: 0.82rem;
  }
`

export const LabLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
`

export const LabPanel = styled.article`
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--rule);
  border-radius: var(--lab-radius);
  background: var(--lab-surface);
`

export const LabPanelHeader = styled.div`
  display: flex;
  min-height: 48px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 16px;
  border-bottom: 1px solid var(--rule);

  h3 {
    margin: 0;
    font-size: 0.69rem;
    font-weight: 750;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  > span {
    color: var(--muted);
    font-size: 0.62rem;
    white-space: nowrap;
  }
`

export const TokenControls = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  padding: 12px 14px;

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 430px) {
    grid-template-columns: 1fr;
  }
`

export const TokenControl = styled.label`
  display: grid;
  min-height: 64px;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 4px 8px;
  padding: 8px 10px;
  border: 1px solid rgba(225, 238, 248, 0.1);
  border-radius: 6px;
  background: color-mix(in srgb, var(--page) 45%, transparent);
  color: var(--ink);
  font-size: 0.68rem;

  > span:first-child {
    color: var(--muted);
  }

  > span:nth-child(2) {
    text-align: right;
  }

  input[type='color'] {
    width: 100%;
    height: 20px;
    grid-column: 1 / -1;
    padding: 2px;
    border: 1px solid var(--rule);
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
  }

  input[type='range'] {
    width: 100%;
    grid-column: 1 / -1;
    accent-color: var(--lab-accent);
  }

  select {
    width: 100%;
    grid-column: 1 / -1;
    padding: 4px 7px;
    border: 1px solid var(--rule);
    border-radius: 6px;
    background: var(--page);
    color: var(--ink);
    font-size: 0.68rem;
  }
`

export const TokenValue = styled.span`
  color: var(--ink);
  font-size: 0.68rem;
  font-variant-numeric: tabular-nums;
`

export const TokenReset = styled.button`
  flex: 0 0 auto;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--lab-accent);
  cursor: pointer;
  font-size: 0.68rem;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`

export const TokenReadout = styled.code`
  display: block;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: anywhere;
  color: var(--muted);
  font-size: 0.58rem;
  white-space: nowrap;

  span {
    color: var(--muted);
  }
`

export const TokenActions = styled.div`
  display: flex;
  min-height: 38px;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 0 14px 10px;

  @media (max-width: 650px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
`

export const LabMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 7px;
  padding: 12px;
  border-bottom: 1px solid var(--rule);

  @media (max-width: 400px) {
    gap: 4px;
    padding: 8px;
  }
`

export const LabMetric = styled.div`
  min-width: 0;
  padding: 9px 10px;
  border: 1px solid rgba(225, 238, 248, 0.1);
  border-radius: 6px;
  background: color-mix(in srgb, var(--page) 75%, transparent);

  span {
    display: block;
    overflow: hidden;
    color: var(--muted);
    font-size: 0.6rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  strong {
    display: block;
    margin-top: 3px;
    font-size: clamp(0.9rem, 2vw, 1.15rem);
    font-variant-numeric: tabular-nums;
    font-weight: 650;
    letter-spacing: -0.04em;
  }

  em {
    color: var(--muted);
    font-size: 0.62rem;
    font-style: normal;
    font-weight: 450;
    letter-spacing: 0;
  }
`

export const GridViewport = styled.div`
  height: clamp(480px, 68vh, 760px);
  overflow: auto;
  overscroll-behavior: contain;
  scrollbar-color: var(--lab-accent) transparent;
  scrollbar-width: thin;

  &:focus-visible {
    outline-offset: -3px;
  }
`

export const GridContent = styled.div`
  position: relative;
  min-width: 720px;
`

export const GridHeader = styled.div`
  position: sticky;
  z-index: 2;
  top: 0;
  display: grid;
  height: 34px;
  grid-template-columns: 0.65fr 1.6fr 1.2fr 0.9fr;
  align-items: center;
  padding: 0 14px;
  border-bottom: 1px solid var(--rule);
  background: var(--lab-surface);
  color: var(--muted);
  font-size: 0.57rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

export const GridRow = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  display: grid;
  height: var(--lab-row-height);
  grid-template-columns: 0.65fr 1.6fr 1.2fr 0.9fr;
  align-items: center;
  padding: 0 14px;
  border-bottom: 1px solid rgba(225, 238, 248, 0.08);
  color: var(--ink);
  font-size: 0.67rem;

  .row-id {
    color: var(--muted);
    font-variant-numeric: tabular-nums;
  }

  .project-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #95ddb0;
    white-space: nowrap;
  }

  .status::before {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
    content: '';
  }

  .status.review { color: #e6c77e; }
  .status.queued { color: var(--muted); }
`

export const GridFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 13px;
  border-top: 1px solid var(--rule);
  color: var(--muted);
  font-size: 0.61rem;

  @media (max-width: 450px) {
    flex-direction: column;
  }
`

export const GridHint = styled.p`
  margin: 14px 0 0;
  color: var(--muted);
  font-size: 0.68rem;
`
