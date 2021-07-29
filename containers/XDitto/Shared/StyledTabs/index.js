import { withStyles } from '@material-ui/core/styles'
import { Tab, Tabs } from '@material-ui/core'

const StyledTabs = withStyles((theme) => ({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 4,
    '& > span': {
      maxWidth: 90,
      width: '100%',
      borderRadius: theme.spacing(0.5),
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'none',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color: theme.custom.palette.white,
    '&:focus': {
      opacity: 1
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

export {
  StyledTab,
  StyledTabs
}