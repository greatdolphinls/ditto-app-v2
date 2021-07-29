
import { memo } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'

import { useDarkmode } from 'contexts/ui-context'
import { lightTheme, darkTheme } from 'styles/theme'

const ThemeProvider = ({
  children
}) => {
  const darkmodeContext = useDarkmode();
  const theme = darkmodeContext.darkmode ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
};

export default memo(ThemeProvider);
