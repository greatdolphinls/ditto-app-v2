import { memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import {
  Drawer,
  Toolbar,
  List,
} from '@material-ui/core'
import clsx from 'clsx'

import SingleSideItem from './SingleSideItem'
import MultiSideItem from './MultiSideItem'
import SideDrawerFooter from './SideDrawerFooter'
import SIDEBAR_MENU from 'utils/constants/sidebar-menu'
import { isEmpty } from 'utils/helpers/utility'

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: theme.custom.layout.openDrawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerPaper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.custom.component.sideDrawer,
    boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.17)',
    overflowX: 'hidden'
  },
  drawerOpen: {
    width: theme.custom.layout.openDrawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    width: theme.custom.layout.closedDrawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
  },
}));

const SideDrawer = ({
  openDrawer,
  openDraw
}) => {
  const classes = useStyles();
  const router = useRouter()
  const [selectedItem, setSelectedItem] = useState('')

  useEffect(() => {
    for (const item of SIDEBAR_MENU) {
      if (isEmpty(item?.CHILDREN)) {
        if (item.HREF === router.pathname) {
          setSelectedItem(item.TITLE)
          return;
        }
      } else {
        for (const childItem of item.CHILDREN) {
          if (childItem.HREF === router.pathname) {
            setSelectedItem(item.TITLE)
          }
        }
      }
    }
  }, [router])

  const itemHandler = (value, open = false) => {
    if (selectedItem === value) {
      setSelectedItem('')
    } else {
      setSelectedItem(value)
    }
    if (open) {
      openDraw()
    }
  }

  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: openDrawer,
        [classes.drawerClose]: !openDrawer,
      })}
      classes={{
        paper: clsx(classes.drawerPaper, {
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
        }),
      }}
    >
      <div>
        <Toolbar />
        <List>
          {SIDEBAR_MENU.map((sidebar) => {
            if (isEmpty(sidebar?.CHILDREN)) {
              return (
                <SingleSideItem
                  key={sidebar.TITLE}
                  sidebar={sidebar}
                  isSelect={selectedItem === sidebar.TITLE}
                  onTab={itemHandler}
                />
              )
            }

            return (
              <MultiSideItem
                key={sidebar.TITLE}
                isOpen={openDrawer && selectedItem === sidebar.TITLE}
                isSelect={selectedItem === sidebar.TITLE}
                sidebar={sidebar}
                onTab={itemHandler}
              />
            )
          })}
        </List>
      </div>

      <SideDrawerFooter
        isOpen={openDrawer}
        openDraw={openDraw}
      />
    </Drawer>
  );
}

export default memo(SideDrawer)