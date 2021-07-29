import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import clsx from 'clsx'

import ListItemLink from 'components/UI/ListItemLink'

const useStyles = makeStyles((theme) => ({
  itemIcon: {
    minWidth: 40,
    color: theme.palette.primary.main
  },
  itemText: {
    color: theme.custom.palette.white
  },
  selected: {
    paddingLeft: theme.spacing(1.5),
    borderLeft: `4px solid ${theme.custom.palette.white}`,
    backgroundColor: theme.custom.component.sideSelected
  }
}));

const SingleSideItem = ({
  isSelect,
  sidebar,
  onTab
}) => {
  const classes = useStyles();

  return (
    <div onClick={() => onTab(sidebar.TITLE)}>
      <ListItemLink
        target={sidebar.IS_OUT_LINK ? '_blank' : ''}
        rel={sidebar.IS_OUT_LINK ? 'noreferrer' : ''}
        href={sidebar.HREF}
        disabled={sidebar?.IS_DISABLE || false}
        className={clsx({ [classes.selected]: isSelect })}
      >
        <ListItemIcon className={classes.itemIcon}>
          <sidebar.ICON />
        </ListItemIcon>
        <ListItemText
          primary={sidebar.TITLE}
          classes={{ primary: classes.itemText }}
        />
      </ListItemLink>
    </div>
  );
}

export default memo(SingleSideItem)