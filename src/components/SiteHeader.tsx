import type { ThemeName } from '../theme'
import { Header, HeaderInner, Navigation, ThemeToggle, VoiceLaunchButton, Wordmark } from '../styles/HeaderStyles'
import { Container } from '../styles/PortfolioStyles'

interface SiteHeaderProps {
  themeName: ThemeName
  onThemeChange: (themeName: ThemeName) => void
  onVoiceOpen: () => void
}

export function SiteHeader({ themeName, onThemeChange, onVoiceOpen }: SiteHeaderProps) {
  return (
    <Header>
      <Container>
        <HeaderInner>
          <Wordmark href="#top" aria-label="Ashis Sarthak Singh, home">
            Ashis Sarthak Singh<span>.</span>
          </Wordmark>
          <Navigation aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#career">Journey</a>
            <a href="#approach">Approach</a>
            <a href="#contact">Contact</a>
          </Navigation>
          <div className="header-actions">
            <VoiceLaunchButton type="button" onClick={onVoiceOpen} aria-label="Voice mode">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3v18M7.5 7v10M3 9.5v5M16.5 7v10M21 9.5v5" />
              </svg>
              <span>Voice mode</span>
            </VoiceLaunchButton>
            <ThemeToggle
              type="button"
              aria-label="Switch theme"
              title="Switch theme"
              onClick={() => onThemeChange(themeName === 'dark' ? 'light' : 'dark')}
            >
              {themeName === 'dark' ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.7 8.7 0 1 0 20.2 15.1Z" />
                  <path d="m16.5 3 .5 1.5 1.5.5-1.5.5-.5 1.5L16 5.5 14.5 5 16 4.5l.5-1.5Z" />
                </svg>
              )}
            </ThemeToggle>
          </div>
        </HeaderInner>
      </Container>
    </Header>
  )
}
