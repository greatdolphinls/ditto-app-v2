import { memo } from 'react'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useDarkmode } from 'contexts/ui-context'
import DarkThemeIcon from 'components/Icons/DarkThemeIcon'
import LightThemeIcon from 'components/Icons/LightThemeIcon'

const useStyles = makeStyles((theme) => ({
  theme: {
    [theme.breakpoints.down('xs')]: {
      width: 30,
      height: 30
    },
  },
}));

const ThemeButton = () => {
  const classes = useStyles();
  const { darkmode, setDarkmode } = useDarkmode();

  const themeHandler = () => {
    setDarkmode(!darkmode)
  }

  return (
    <IconButton
      className={classes.theme}
      onClick={themeHandler}
    >
      {darkmode
        ? <LightThemeIcon />
        : <DarkThemeIcon />
      }
    </IconButton>
  );
};

export default memo(ThemeButton);
