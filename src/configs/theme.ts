import { extendTheme, theme as themeChakra } from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
  gray: {
    50: '#f0f0fc',
    100: '#d4d6e0',
    200: '#b9bac6',
    300: '#9d9eae',
    400: '#818396',
    500: '#67697c',
    600: '#505261',
    700: '#393a46',
    800: '#21232c',
    900: '#070c15',
  },
  primary: {
    50: '#e0f5ff',
    100: '#afdbff',
    200: '#7ebeff',
    300: '#4d9efe',
    400: '#1c7afc',
    500: '#035ae3',
    600: '#0052b1',
    700: '#004380',
    800: '#002e50',
    900: '#001320',
  },
}
const theme = extendTheme({
  shadows: {
    ...themeChakra.shadows,
    outline: 'none',
  },
  breakpoints: {
    sm: '481px',
    md: '1280px',
    lg: '1360px',
    xl: '1919px',
  },
  fonts: {
    body: '"Noto Sans JP"',
    heading: '"Noto Sans JP"',
  },
  fontSizes: {
    ...themeChakra.fontSizes,
    md: '14px',
  },
  colors,
})

export default theme
