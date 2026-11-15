import type { ThemeName } from '../theme'
import { Header, HeaderInner, Navigation, ThemeToggle, Wordmark } from '../styles/HeaderStyles'
import { Container } from '../styles/PortfolioStyles'

interface SiteHeaderProps {
  themeName: ThemeName
  onThemeChange: (themeName: ThemeName) => void
}

export function SiteHeader({ themeName, onThemeChange }: SiteHeaderProps) {
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
          <ThemeToggle
            type="button"
            aria-label={`Switch to ${themeName === 'dark' ? 'light' : 'dark'} mode`}
            onClick={() => onThemeChange(themeName === 'dark' ? 'light' : 'dark')}
          >
            {themeName === 'dark' ? 'Light mode' : 'Dark mode'}
          </ThemeToggle>
        </HeaderInner>
      </Container>
    </Header>
  )
}
