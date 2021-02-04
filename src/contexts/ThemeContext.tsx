import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import React, { createContext, useContext } from 'react'
import theme from '../configs/theme'

interface ThemeContextProps {}

export const ThemeContext = createContext({} as ThemeContextProps)

export const ThemeProvider: React.FC = ({ children }) => {
  return (
    <ThemeContext.Provider value={{}}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </ThemeContext.Provider>
  )
}
