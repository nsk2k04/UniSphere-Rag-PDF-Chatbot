import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext(undefined)
const STORAGE_KEY = 'unisphere-theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  // index.html already applied the correct class pre-paint; just read it back
  // so React state matches the DOM and we avoid a flash/mismatch.
  if (document.documentElement.classList.contains('dark')) return 'dark'
  if (document.documentElement.classList.contains('light')) return 'light'

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  // Follow system changes only if the user has never explicitly chosen a theme.
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event) => {
      const hasExplicitChoice = window.localStorage.getItem(STORAGE_KEY)
      if (!hasExplicitChoice) {
        setTheme(event.matches ? 'dark' : 'light')
      }
    }
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
