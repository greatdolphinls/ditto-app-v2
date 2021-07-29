import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Tooltip } from '@material-ui/core'
import clsx from 'clsx'

import InfoIcon from 'components/Icons/InfoIcon'

const useStyles = makeStyles((theme) => {
  return {
    arrow: {
      color: theme.custom.palette.pink,
    },
    tooltip: {
      borderRadius: 12,
      backgroundColor: theme.custom.palette.pink,
    },
    icon: {
      display: 'flex',
      margin: theme.spacing(0, 0.5)
    }
  };
});

const RedIconTooltip = ({
  title,
  placement = 'top',
  className,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Tooltip
      aria-label='swap-tooltip'
      arrow
      interactive
      placement={placement}
      title={title}
      classes={{
        arrow: classes.arrow,
        tooltip: classes.tooltip
      }}
      {...rest}
    >
      <div className={clsx(classes.icon, className)} >
        <InfoIcon />
      </div>
    </Tooltip>
  );
}

export default memo(RedIconTooltip)