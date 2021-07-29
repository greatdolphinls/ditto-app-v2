import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'

import ListItemLink from 'components/UI/ListItemLink'

const useStyles = makeStyles((theme) => ({
  itemIcon: {
    minWidth: 40,
  },
  itemText: {
    color: theme.custom.palette.white
  },
  nested: {
    paddingLeft: theme.spacing(7),
  },
  selected: {
    paddingLeft: theme.spacing(1.5),
    borderLeft: `4px solid ${theme.custom.palette.white}`,
    backgroundColor: theme.custom.component.sideSelected
  },
  expandIcon: {
    color: theme.custom.palette.white
  },
}));

const MultiSideItem = ({
  isOpen,
  isSelect,
  sidebar,
  onTab
}) => {
  const classes = useStyles();

  return (
    <>
      <ListItem
        button
        onClick={() => onTab(sidebar.TITLE, true)}
        className={clsx({ [classes.selected]: isSelect })}
      >
        <ListItemIcon className={classes.itemIcon}>
          <sidebar.ICON />
        </ListItemIcon>
        <ListItemText
          primary={sidebar.TITLE}
          classes={{ primary: classes.itemText }}
        />
        {isOpen
          ? <ExpandLess className={classes.expandIcon} />
          : <ExpandMore className={classes.expandIcon} />
        }
      </ListItem>
      <Collapse in={isOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {
            sidebar?.CHILDREN.map((item) => (
              <ListItemLink
                key={item.TITLE}
                target={item?.IS_OUT_LINK ? '_blank' : ''}
                rel={item?.IS_OUT_LINK ? 'noreferrer' : ''}
                href={item.HREF}
                disabled={item?.IS_DISABLE || false}
                className={classes.nested}
              >
                <ListItemText
                  primary={item.TITLE}
                  classes={{ primary: classes.itemText }}
                />
              </ListItemLink>
            ))
          }
        </List>
      </Collapse>
    </>
  );
}

export default memo(MultiSideItem)