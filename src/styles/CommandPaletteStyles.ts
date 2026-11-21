import styled from 'styled-components'

export const PaletteOverlay = styled.div`
  position: fixed;
  z-index: 11000;
  inset: 0;
  display: grid;
  align-items: start;
  justify-items: center;
  padding: min(18vh, 150px) 20px 24px;
  background: rgba(4, 7, 10, 0.68);
  backdrop-filter: blur(7px);

  &[hidden] {
    display: none;
  }
`

export const PaletteDialog = styled.section`
  width: min(560px, 100%);
  max-height: min(620px, 75vh);
  overflow: auto;
  border: 1px solid var(--rule);
  border-radius: 12px;
  background: var(--surface);
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.55), 0 0 45px var(--atlas-halo);
  color: var(--ink);
`

export const PaletteSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--rule);

  > span {
    color: var(--accent);
    font-size: 1.15rem;
  }

  input {
    width: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--ink);
    font-size: 0.88rem;
  }

  input::placeholder {
    color: var(--muted);
  }

  kbd {
    padding: 3px 6px;
    border: 1px solid var(--rule);
    border-radius: 5px;
    color: var(--muted);
    font-size: 0.62rem;
  }
`

export const PaletteGroupLabel = styled.h2`
  margin: 0;
  padding: 13px 17px 6px;
  color: var(--muted);
  font-size: 0.58rem;
  font-weight: 750;
  letter-spacing: 0.13em;
`

export const PaletteItems = styled.div`
  padding: 0 8px 8px;
`

export const PaletteItem = styled.button<{ $selected: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 9px;
  border: 0;
  border-radius: 7px;
  background: ${({ $selected }) => ($selected ? 'var(--atlas-active)' : 'transparent')};
  color: var(--ink);
  cursor: pointer;
  text-align: left;

  &:hover {
    background: var(--atlas-active);
  }

  .item-label {
    display: inline-flex;
    min-width: 0;
    align-items: center;
    gap: 10px;
    font-size: 0.76rem;
  }

  .item-icon {
    display: grid;
    width: 25px;
    height: 25px;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid var(--rule);
    border-radius: 6px;
    color: var(--accent);
    font-size: 0.66rem;
  }

  .item-hint {
    color: var(--muted);
    font-size: 0.64rem;
    white-space: nowrap;
  }
`

export const PaletteEmpty = styled.p`
  margin: 0;
  padding: 18px;
  color: var(--muted);
  font-size: 0.75rem;
`

export const PaletteFeedback = styled.p`
  margin: 0 12px 10px;
  padding: 9px 10px;
  border: 1px solid var(--rule);
  border-radius: 6px;
  color: var(--accent);
  font-size: 0.7rem;
`

export const PaletteFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 15px;
  border-top: 1px solid var(--rule);
  color: var(--muted);
  font-size: 0.62rem;

  span {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }

  kbd {
    padding: 2px 5px;
    border: 1px solid var(--rule);
    border-radius: 4px;
    color: var(--ink);
    font: inherit;
  }
`
