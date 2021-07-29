import { memo } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import Logo from 'components/Logo'
import MenuIcon from 'components/Icons/MenuIcon'
import MenuOpenIcon from 'components/Icons/MenuOpenIcon'
import ConnectWallet from './ConnectWallet'
import { useCommonStyles } from 'styles/use-styles'

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    boxShadow: 'none',
    width: '100%',
    backgroundColor: theme.custom.component.topAppBar,
    zIndex: theme.zIndex.drawer + 1,
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),
  },
  connect: {
    marginLeft: theme.spacing(1),
  }
}));

const TopAppBar = ({
  openDrawer,
  onDraw
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <AppBar
      position='fixed'
      className={classes.appBar}
    >
      <Toolbar className={clsx(classes.toolBar, commonClasses.containerWidth)}>
        <div className={classes.container}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={onDraw}
          >
            {openDrawer
              ? <MenuOpenIcon color='primary' />
              : <MenuIcon color='primary' />
            }
          </IconButton>
          <Logo />
          <Typography
            variant='h1'
            color='secondary'
            className={classes.title}
          >
            Ditto
          </Typography>
        </div>
        <ConnectWallet className={classes.connect} />
      </Toolbar>
    </AppBar>
  );
};

export default memo(TopAppBar);
