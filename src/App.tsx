import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Career } from './components/Career'
import { CommandPalette } from './components/CommandPalette'
import { Contact } from './components/Contact'
import { Expertise } from './components/Expertise'
import { HowIHelp } from './components/HowIHelp'
import { PlaygroundLab } from './components/PlaygroundLab'
import { SelectedWork } from './components/SelectedWork'
import { SiteHeader } from './components/SiteHeader'
import { SystemsAtlas } from './components/SystemsAtlas'
import { Page } from './styles/PortfolioStyles'
import { GlobalStyles } from './styles/GlobalStyles'
import { isThemeName, themes, type ThemeName } from './theme'
import { isAppRoute } from './paths'

const themeStorageKey = 'ashis-portfolio-theme-v4'
const VoiceMode = lazy(() =>
  import('./components/Playground').then(({ Playground: component }) => ({ default: component })),
)

function getInitialTheme(): ThemeName {
  const savedTheme = window.localStorage.getItem(themeStorageKey)
  if (savedTheme && isThemeName(savedTheme)) return savedTheme

  const previousTheme = window.localStorage.getItem('ashis-portfolio-theme-v3')
  if (previousTheme === 'lunar') return 'light'
  return 'dark'
}

function App() {
  const [themeName, setThemeName] = useState<ThemeName>(getInitialTheme)
  const [voiceModeOpen, setVoiceModeOpen] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const openCommandPalette = useCallback(() => setCommandPaletteOpen(true), [])
  const closeCommandPalette = useCallback(() => setCommandPaletteOpen(false), [])
  const isPlaygroundRoute = isAppRoute(window.location.pathname, 'playground')

  useEffect(() => {
    window.localStorage.setItem(themeStorageKey, themeName)
  }, [themeName])

  useEffect(() => {
    document.title = isPlaygroundRoute
      ? 'Interactive Playground | Ashis Sarthak Singh'
      : 'Ashis Sarthak Singh | Principal Engineer & UI Architect'
  }, [isPlaygroundRoute])

  return (
    <ThemeProvider theme={themes[themeName]}>
      <GlobalStyles />
      <Page data-theme={themeName}>
        <SiteHeader
          themeName={themeName}
          onThemeChange={(nextTheme) => setThemeName(nextTheme)}
          onVoiceOpen={() => setVoiceModeOpen(true)}
          onCommandOpen={openCommandPalette}
          isPlaygroundRoute={isPlaygroundRoute}
        />
        <CommandPalette
          open={commandPaletteOpen}
          onOpen={openCommandPalette}
          onClose={closeCommandPalette}
          themeName={themeName}
          onThemeChange={setThemeName}
        />
        <main>
          {isPlaygroundRoute ? (
            <PlaygroundLab themeName={themeName} />
          ) : (
            <>
              <SystemsAtlas />
              <HowIHelp />
              <SelectedWork />
              <Career />
              <Expertise />
              <Contact />
            </>
          )}
        </main>
        {voiceModeOpen && (
          <Suspense fallback={null}>
            <VoiceMode
              onThemeChange={(nextTheme) => setThemeName(nextTheme)}
              voiceModeOpen={voiceModeOpen}
              onVoiceClose={() => setVoiceModeOpen(false)}
            />
          </Suspense>
        )}
      </Page>
    </ThemeProvider>
  )
}

export default App
