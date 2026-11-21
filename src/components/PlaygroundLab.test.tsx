import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import { describe, expect, it } from 'vitest'
import { themes } from '../theme'
import { PlaygroundLab } from './PlaygroundLab'

function renderLab() {
  return render(
    <ThemeProvider theme={themes.dark}>
      <PlaygroundLab themeName="dark" />
    </ThemeProvider>,
  )
}

describe('PlaygroundLab', () => {
  it('renders a 100,000-row grid while mounting only a small visible window', () => {
    renderLab()

    const grid = screen.getByRole('grid', { name: 'Virtualized sample project data' })
    expect(grid).toHaveAttribute('aria-rowcount', '100001')
    expect(within(grid).getAllByRole('row').length).toBeLessThan(30)
    expect(screen.getByText('Only visible rows plus a small buffer are mounted.')).toBeInTheDocument()
  })

  it('updates token values and grid density immediately', async () => {
    const user = userEvent.setup()
    renderLab()
    const section = document.getElementById('playground')
    expect(section).not.toBeNull()

    fireEvent.change(screen.getByLabelText('Accent color token'), { target: { value: '#ff0000' } })
    expect(section).toHaveStyle({ '--lab-accent': '#ff0000' })

    await user.selectOptions(screen.getByRole('combobox', { name: 'Grid density token' }), 'Compact')
    expect(section).toHaveStyle({ '--lab-row-height': '32px' })

    await user.click(screen.getByRole('button', { name: /Reset tokens/ }))
    expect(section).toHaveStyle({ '--lab-accent': '#62e6ff', '--lab-row-height': '38px' })
  })

  it('virtualizes the grid as the visitor scrolls', () => {
    renderLab()
    const grid = screen.getByRole('grid', { name: 'Virtualized sample project data' })

    Object.defineProperty(grid, 'scrollTop', { configurable: true, value: 3800 })
    fireEvent.scroll(grid)

    expect(screen.getByText(/Rows 100–/)).toBeInTheDocument()
    expect(within(grid).getAllByRole('row').length).toBeLessThan(30)
  })
})
