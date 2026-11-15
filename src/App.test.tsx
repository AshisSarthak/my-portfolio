import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'
import { themes } from './theme'

describe('portfolio', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the profile and primary portfolio sections', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveAccessibleName('Ashis Sarthak Singh')
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
    expect(document.getElementById('career')).toBeInTheDocument()
    expect(document.getElementById('work')).toBeInTheDocument()
    expect(screen.getByText('A modular frontend foundation for a complex dashboard.')).toBeInTheDocument()
    expect(screen.getByText(/guiding a team of four to five engineers/)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /banking module and frontend team illustration/ })).toBeInTheDocument()
    expect(screen.queryByText('System health')).not.toBeInTheDocument()
    expect(document.querySelector('[data-theme="dark"]')).toBeInTheDocument()
    expect(themes.dark.accent).toBe('#62e6ff')
    expect(screen.getByRole('button', { name: /Systems/ })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('link', { name: 'Ashis Sarthak Singh, return to top' })).toBeInTheDocument()
    expect(screen.getByText(/Explore 12\+ years, eight teams/)).toBeInTheDocument()
    expect(Array.from(document.querySelectorAll('#work h3'), (heading) => heading.textContent)).toEqual([
      'Leading end-to-end delivery of a banking module.',
      'A modular frontend foundation for a complex dashboard.',
      'Helping teams deliver frontend work faster.',
    ])
  })

  it('updates the atlas when visitors choose a different focus area', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /Product/ }))

    expect(screen.getByText(/Start with what the user is trying to do/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Product/ })).toHaveAttribute('aria-pressed', 'true')
  })

  it('lets visitors switch between dark and light themes and remembers their choice', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Switch to light mode' }))

    expect(document.querySelector('[data-theme="light"]')).toBeInTheDocument()
    expect(themes.light.accent).toBe('#35634c')
    expect(window.localStorage.getItem('ashis-portfolio-theme-v4')).toBe('light')
  })

  it('migrates the saved light theme from the previous theme setting', () => {
    window.localStorage.setItem('ashis-portfolio-theme-v3', 'lunar')
    render(<App />)

    expect(document.querySelector('[data-theme="light"]')).toBeInTheDocument()
  })
})
