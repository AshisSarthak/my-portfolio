import { render, screen, within } from '@testing-library/react'
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
    expect(screen.getByRole('button', { name: /Product/ })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: '02 Systems' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('link', { name: 'Ashis Sarthak Singh, return to top' })).toBeInTheDocument()
    const careerIndex = screen.getByRole('region', { name: 'Career index' })
    const careerTimeline = within(careerIndex).getByRole('list', { name: 'Career timeline' })
    expect(careerTimeline).toBeInTheDocument()
    const latestRole = within(careerTimeline).getAllByRole('listitem')[0]
    expect(latestRole).toHaveTextContent('ADIA (via Intuitive)')
    expect(latestRole).toHaveTextContent('Principal Architect')
    expect(latestRole).toHaveTextContent('Mar 2026 — Present')
    expect(screen.getAllByRole('img', { name: / logo$/i })).toHaveLength(1)
    expect(screen.getByRole('link', { name: 'GitHub ↗' })).toHaveAttribute('href', 'https://github.com/ashissarthak')
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

    await user.click(screen.getByRole('button', { name: 'Switch theme' }))

    expect(document.querySelector('[data-theme="light"]')).toBeInTheDocument()
    expect(themes.light.accent).toBe('#35634c')
    expect(window.localStorage.getItem('ashis-portfolio-theme-v4')).toBe('light')
  })

  it('keeps voice mode out of the main page and exposes one voice entry point', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: 'Voice mode' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Playground' })).not.toBeInTheDocument()
    expect(screen.queryByText('Ask about the work.')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Start a voice conversation' })).not.toBeInTheDocument()
  })

  it('shows the career index and updates the overview when a step is selected', async () => {
    const user = userEvent.setup()
    render(<App />)

    const careerIndex = screen.getByRole('region', { name: 'Career index' })
    expect(screen.queryByRole('button', { name: 'Career chapters' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Era-based bento' })).not.toBeInTheDocument()
    expect(screen.getAllByRole('img', { name: / logo$/i })).toHaveLength(1)
    const overview = screen.getByRole('complementary', { name: 'Role overview' })
    expect(overview).toHaveTextContent('ADIA (via Intuitive)')
    expect(overview).toHaveTextContent('Principal Architect')
    expect(overview).toHaveTextContent('Mar 2026 — Present')
    expect(overview).toHaveTextContent('Improved application delivery speed by 90%')

    await user.click(within(careerIndex).getByRole('button', { name: /Sberbank/ }))

    expect(within(careerIndex).getByRole('button', { name: /Sberbank/ })).toHaveAttribute('aria-pressed', 'true')
    const updatedOverview = screen.getByRole('complementary', { name: 'Role overview' })
    expect(updatedOverview).toHaveTextContent('Overview')
    expect(updatedOverview).toHaveTextContent('Sberbank')
    expect(updatedOverview).toHaveTextContent('Lead Software Engineer')
    expect(updatedOverview).toHaveTextContent('Aug 2024 — Feb 2026')
    expect(updatedOverview).toHaveTextContent('Led frontend execution from initial design through production')
    expect(updatedOverview).toHaveTextContent('data visualization and responsiveness')
  })

  it('opens the immersive voice experience and dismisses it with Escape', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Voice mode' }))

    expect(await screen.findByRole('dialog', { name: 'Voice mode' })).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: 'Start voice session' })).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Start voice session' }))
    expect(await screen.findByRole('alert')).toHaveTextContent(/Realtime voice needs a supported browser/)
    expect(document.body.style.overflow).toBe('hidden')

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('')
    expect(screen.getByRole('button', { name: 'Voice mode' })).toHaveFocus()
  })

  it('explains that voice is unavailable when browser audio APIs are missing', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Voice mode' }))

    expect(screen.getByRole('button', { name: 'Start voice session' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Start voice session' }))
    expect(await screen.findByText(/Realtime voice needs a supported browser/)).toBeInTheDocument()
  })

  it('migrates the saved light theme from the previous theme setting', () => {
    window.localStorage.setItem('ashis-portfolio-theme-v3', 'lunar')
    render(<App />)

    expect(document.querySelector('[data-theme="light"]')).toBeInTheDocument()
  })
})
