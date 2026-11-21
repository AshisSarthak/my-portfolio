import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { profile, work } from '../data/portfolio'
import type { ThemeName } from '../theme'
import {
  PaletteDialog,
  PaletteEmpty,
  PaletteFeedback,
  PaletteFooter,
  PaletteGroupLabel,
  PaletteItem,
  PaletteItems,
  PaletteOverlay,
  PaletteSearch,
} from '../styles/CommandPaletteStyles'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  onOpen?: () => void
  themeName: ThemeName
  onThemeChange: (themeName: ThemeName) => void
}

interface PaletteCommand {
  id: string
  label: string
  hint: string
  icon: string
  group: 'NAVIGATE' | 'PROJECTS' | 'QUICK ACTIONS'
  searchText: string
  action: 'navigate' | 'theme' | 'copy-email' | 'easter-egg'
  target?: string
}

export function CommandPalette({
  open,
  onClose,
  onOpen,
  themeName,
  onThemeChange,
}: CommandPaletteProps) {
  const searchRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [feedback, setFeedback] = useState('')
  const isPlaygroundRoute = window.location.pathname.replace(/\/+$/, '') === '/playground'

  const commands: PaletteCommand[] = useMemo(() => [
    ...(isPlaygroundRoute
      ? [{ id: 'home', label: 'Back to portfolio home', hint: 'Home', icon: '⌂', group: 'NAVIGATE' as const, searchText: 'home portfolio main', action: 'navigate' as const, target: '/' }]
      : []),
    { id: 'playground', label: 'Open Playground', hint: 'Interactive lab', icon: '⌘', group: 'NAVIGATE', searchText: 'playground lab interactive', action: 'navigate', target: 'playground' },
    { id: 'work', label: 'Selected work', hint: 'Projects', icon: '↗', group: 'NAVIGATE', searchText: 'work projects portfolio', action: 'navigate', target: 'work' },
    { id: 'career', label: 'Career journey', hint: 'Experience', icon: '⌁', group: 'NAVIGATE', searchText: 'career journey experience', action: 'navigate', target: 'career' },
    { id: 'services', label: 'How I help', hint: 'Ways I add value', icon: '✳', group: 'NAVIGATE', searchText: 'help services value architecture teams', action: 'navigate', target: 'services' },
    { id: 'approach', label: 'Engineering approach', hint: 'Expertise', icon: '⌘', group: 'NAVIGATE', searchText: 'approach expertise skills', action: 'navigate', target: 'approach' },
    { id: 'contact', label: 'Contact', hint: 'Get in touch', icon: '@', group: 'NAVIGATE', searchText: 'contact email', action: 'navigate', target: 'contact' },
    ...work.map((project) => ({
      id: project.id,
      label: project.organization,
      hint: project.category,
      icon: project.number,
      group: 'PROJECTS' as const,
      searchText: `${project.organization} ${project.title} ${project.description}`,
      action: 'navigate' as const,
      target: project.id,
    })),
    { id: 'theme', label: `Switch to ${themeName === 'dark' ? 'light' : 'dark'} theme`, hint: 'Appearance', icon: '◐', group: 'QUICK ACTIONS', searchText: 'theme dark light appearance', action: 'theme' },
    { id: 'email', label: 'Copy email address', hint: profile.email, icon: '✉', group: 'QUICK ACTIONS', searchText: `copy email address ${profile.email}`, action: 'copy-email' },
    { id: 'easter-egg', label: 'Surprise me', hint: 'A little secret', icon: '✳', group: 'QUICK ACTIONS', searchText: 'surprise easter egg secret', action: 'easter-egg' },
  ], [isPlaygroundRoute, themeName])

  const filteredCommands = commands.filter((command) =>
    `${command.label} ${command.hint} ${command.searchText}`.toLowerCase().includes(query.trim().toLowerCase()),
  )
  const closePalette = useCallback(() => {
    setQuery('')
    setSelectedIndex(0)
    setFeedback('')
    onClose()
  }, [onClose])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (open) closePalette()
        else onOpen?.()
        return
      }
      if (open && event.key === 'Escape') {
        event.preventDefault()
        closePalette()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closePalette, onOpen, open])

  useEffect(() => {
    if (!open) return

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    searchRef.current?.focus()

    function trapTab(event: KeyboardEvent) {
      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'input:not(:disabled), button:not(:disabled)',
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', trapTab)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', trapTab)
      previousFocus?.focus()
    }
  }, [open])

  async function runCommand(command: PaletteCommand) {
    setFeedback('')
    if (command.action === 'navigate' && command.target) {
      if (command.target === '/') {
        window.location.assign('/')
        return
      }
      if (command.target === 'playground') {
        window.location.assign('/playground')
        return
      }
      const target = document.getElementById(command.target)
      if (!target) {
        window.location.assign(`/#${command.target}`)
        return
      }
      if (typeof target.scrollIntoView === 'function') {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      closePalette()
    } else if (command.action === 'theme') {
      onThemeChange(themeName === 'dark' ? 'light' : 'dark')
      closePalette()
    } else if (command.action === 'copy-email') {
      if (!navigator.clipboard?.writeText) {
        setFeedback('Clipboard access is unavailable in this browser.')
        return
      }
      try {
        await navigator.clipboard.writeText(profile.email)
        setFeedback('Email address copied to clipboard.')
      } catch {
        setFeedback('Could not copy the email address. Check clipboard permissions and try again.')
      }
    } else {
      setFeedback('You found the hidden command. Good interfaces reward curiosity.')
    }
  }

  function handlePaletteKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'ArrowDown' && filteredCommands.length > 0) {
      event.preventDefault()
      setSelectedIndex((index) => (index + 1) % filteredCommands.length)
    } else if (event.key === 'ArrowUp' && filteredCommands.length > 0) {
      event.preventDefault()
      setSelectedIndex((index) => (index - 1 + filteredCommands.length) % filteredCommands.length)
    } else if (event.key === 'Enter' && filteredCommands[selectedIndex]) {
      event.preventDefault()
      void runCommand(filteredCommands[selectedIndex])
    }
  }

  const groups = ['NAVIGATE', 'PROJECTS', 'QUICK ACTIONS'] as const

  return (
    <PaletteOverlay
      hidden={!open}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closePalette()
      }}
    >
      <PaletteDialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={handlePaletteKeyDown}
      >
        <PaletteSearch>
          <span aria-hidden="true">⌕</span>
          <input
            ref={searchRef}
            aria-label="Search commands"
            placeholder="Search projects, actions, and pages..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setSelectedIndex(0)
            }}
          />
          <kbd>ESC</kbd>
        </PaletteSearch>
        {groups.map((group) => {
          const groupCommands = filteredCommands.filter((command) => command.group === group)
          if (groupCommands.length === 0) return null
          return (
            <section key={group} aria-label={group}>
              <PaletteGroupLabel>{group}</PaletteGroupLabel>
              <PaletteItems>
                {groupCommands.map((command) => {
                  const index = filteredCommands.indexOf(command)
                  return (
                    <PaletteItem
                      key={command.id}
                      type="button"
                      $selected={selectedIndex === index}
                      aria-current={selectedIndex === index ? 'true' : undefined}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={() => void runCommand(command)}
                    >
                      <span className="item-label"><span className="item-icon">{command.icon}</span>{command.label}</span>
                      <span className="item-hint">{command.hint}</span>
                    </PaletteItem>
                  )
                })}
              </PaletteItems>
            </section>
          )
        })}
        {filteredCommands.length === 0 && <PaletteEmpty>No matching commands. Try another search.</PaletteEmpty>}
        {feedback && <PaletteFeedback role="status">{feedback}</PaletteFeedback>}
        <PaletteFooter>
          <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Select</span>
          <span><kbd>ESC</kbd> Close</span>
        </PaletteFooter>
      </PaletteDialog>
    </PaletteOverlay>
  )
}
