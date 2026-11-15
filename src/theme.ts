import 'styled-components'

export type ThemeName = 'dark' | 'light'

export interface PortfolioTheme {
  background: string
  surface: string
  surfaceStrong: string
  text: string
  muted: string
  accent: string
  accentSecondary: string
  border: string
  glow: string
  buttonText: string
}

declare module 'styled-components' {
  export interface DefaultTheme extends PortfolioTheme {}
}

export const themes: Record<ThemeName, PortfolioTheme> = {
  dark: {
    background: '#090c10',
    surface: '#111820',
    surfaceStrong: '#1a242d',
    text: '#f4f7fa',
    muted: '#b5c0ca',
    accent: '#62e6ff',
    accentSecondary: '#b5a2ff',
    border: 'rgba(225, 238, 248, 0.2)',
    glow: 'rgba(98, 230, 255, 0.14)',
    buttonText: '#090c10',
  },
  light: {
    background: '#f7f6f2',
    surface: '#eeede7',
    surfaceStrong: '#ffffff',
    text: '#20251f',
    muted: '#5d655e',
    accent: '#35634c',
    accentSecondary: '#51735f',
    border: 'rgba(32, 37, 31, 0.16)',
    glow: 'rgba(53, 99, 76, 0.1)',
    buttonText: '#ffffff',
  },
}

export function isThemeName(value: string): value is ThemeName {
  return value === 'dark' || value === 'light'
}
