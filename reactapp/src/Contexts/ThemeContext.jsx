import React, { createContext, useContext } from 'react'

/**
 * Global Theme Context
 * Provides application-wide access to current theme mode (light vs dark)
 * and the toggle function, ensuring synchronized styling across components
 * such as the CodeEditor without triggering page reloads.
 */
export const ThemeContext = createContext({
  isThemeModeDark: true,
  setIsThemeModeDark: () => {},
})

export const useTheme = () => useContext(ThemeContext)
