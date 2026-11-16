import { lazy, Suspense, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Career } from './components/Career'
import { Contact } from './components/Contact'
import { Expertise } from './components/Expertise'
import { SelectedWork } from './components/SelectedWork'
import { SiteHeader } from './components/SiteHeader'
import { SystemsAtlas } from './components/SystemsAtlas'
import { Page } from './styles/PortfolioStyles'
import { GlobalStyles } from './styles/GlobalStyles'
import { isThemeName, themes, type ThemeName } from './theme'

const themeStorageKey = 'ashis-portfolio-theme-v4'
const Playground = lazy(() =>
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

  useEffect(() => {
    window.localStorage.setItem(themeStorageKey, themeName)
  }, [themeName])

  return (
    <ThemeProvider theme={themes[themeName]}>
      <GlobalStyles />
      <Page data-theme={themeName}>
        <SiteHeader
          themeName={themeName}
          onThemeChange={(nextTheme) => setThemeName(nextTheme)}
          onVoiceOpen={() => setVoiceModeOpen(true)}
        />
        <main>
          <SystemsAtlas />
          <SelectedWork />
          {voiceModeOpen && (
            <Suspense fallback={null}>
              <Playground
                onThemeChange={(nextTheme) => setThemeName(nextTheme)}
                voiceModeOpen={voiceModeOpen}
                onVoiceClose={() => setVoiceModeOpen(false)}
              />
            </Suspense>
          )}
          <Career />
          <Expertise />
          <Contact />
        </main>
      </Page>
    </ThemeProvider>
  )
}

export default App
