
import { memo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import DittoLoading from 'components/DittoLoading'
import TopAppBar from './TopAppBar'
import SideDrawer from './SideDrawer'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.primary
  },
  container: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: theme.custom.layout.closedDrawerWidth,
    [theme.breakpoints.down('xs')]: {
      minWidth: `calc(100vw - ${theme.custom.layout.closedDrawerWidth}px)`,
    },
  },
  openContainer: {
    marginLeft: theme.custom.layout.openDrawerWidth,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

const Layout = ({
  children
}) => {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(true)

  const drawerHandler = () => {
    setOpenDrawer(prev => !prev);
  };

  const openDrawerHandler = () => {
    setOpenDrawer(true);
  }

  return (
    <main className={classes.root}>
      {/* implement Loading Spiner by great.dolphin.ls */}
      {false && <DittoLoading loading={false} />}
      <TopAppBar
        openDrawer={openDrawer}
        onDraw={drawerHandler}
      />
      <SideDrawer
        openDrawer={openDrawer}
        openDraw={openDrawerHandler}
      />
      <div className={clsx(classes.container, { [classes.openContainer]: openDrawer })}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </main>
  );
};

export default memo(Layout);
