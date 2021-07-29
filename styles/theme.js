
import {
  createMuiTheme,
  responsiveFontSizes
} from '@material-ui/core/styles'

const fontFamily = [
  'Rubik',
  'Source Sans Pro',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
]

const lightTheme = responsiveFontSizes(createMuiTheme({
  typography: {
    fontFamily: fontFamily.join(',')
  },
  overrides: {
    MuiCard: {
      root: {
        borderRadius: 35,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  palette: {
    primary: {
      main: '#5F5F5F'
    },
    secondary: {
      main: '#D37ABC',
      contrastText: '#ffffff'
    },
    danger: {
      main: '#A03B79'
    },
    background: {
      default: '#FFF9FF',
      primary: '#E9E9E9',
      secondary: '#E5D0DD'
    },
    text: {
      primary: '#5F5F5F',
      secondary: '#A03B79',
    },
  },
  custom: {
    palette: {
      white: '#FFFFFF',
      black: '#000000',
      blue: '#209FC7',
      grey: '#424242',
      red: '#A03B3B',
      lightPink: '#E1C2D5',
      pink: '#D37ABC',
      yellow: '#ffb418',
      green: '#3BA05E',
      border: '#555555'
    },
    component: {
      sideDrawer: '#D37ABC',
      sideSelected: '#BB5BA2',
      topAppBar: '#FFFFFF'
    },
    layout: {
      openDrawerWidth: 240,
      closedDrawerWidth: 57
    },
  }
}));

const darkTheme = responsiveFontSizes(createMuiTheme({
  typography: {
    fontFamily: fontFamily.join(',')
  },
  overrides: {
    MuiCard: {
      root: {
        borderRadius: 35,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#D37ABC',
      contrastText: '#ffffff'
    },
    danger: {
      main: '#A03B79'
    },
    background: {
      default: '#424242',
      primary: '#392D36',
      secondary: '#4E3547',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A03B79',
    },
  },
  custom: {
    palette: {
      white: '#FFFFFF',
      black: '#000000',
      blue: '#209FC7',
      grey: '#424242',
      red: '#A03B3B',
      lightPink: '#E1C2D5',
      pink: '#D37ABC',
      yellow: '#ffb418',
      green: '#3BA05E',
      border: '#555555'
    },
    component: {
      sideDrawer: '#714766',
      sideSelected: '#BB5BA2',
      topAppBar: '#542D4A'
    },
    layout: {
      openDrawerWidth: 240,
      closedDrawerWidth: 57
    },
  }
}));

export {
  lightTheme,
  darkTheme
};
