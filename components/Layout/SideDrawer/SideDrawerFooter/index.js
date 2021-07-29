import { memo } from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SettingIcon from '@material-ui/icons/Settings'

import SocialGroup from './SocialGroup'
import ThemeButton from './ThemeButton'

const useStyles = makeStyles((theme) => ({
  itemIcon: {
    minWidth: 40,
    color: theme.palette.primary.main,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    overflowX: 'hidden'
  },
  container: {
    display: 'flex',
    width: '100%',
    alignItems: 'center'
  }
}));

const SideDrawerFooter = ({
  isOpen,
  openDraw
}) => {
  const classes = useStyles()

  return (
    <List>
      {isOpen
        ? (
          <ListItem className={classes.root}>
            <div className={classes.container}>
              <ThemeButton />
            </div>
            <SocialGroup />
          </ListItem>
        ) : (
          <ListItem button onClick={openDraw} >
            <ListItemIcon className={classes.itemIcon}>
              <SettingIcon />
            </ListItemIcon>
          </ListItem>
        )}
    </List>
  )
};

export default memo(SideDrawerFooter);
