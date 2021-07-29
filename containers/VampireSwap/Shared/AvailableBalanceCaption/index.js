import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import RedIconTooltip from 'parts/RedIconTooltip'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      marginTop: theme.spacing(2)
    },
    label: {
      fontWeight: 'bold'
    }
  };
});

const AvailableBalanceCaption = ({
  tooltip,
  label
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant='caption'
        color='textSecondary'
        className={classes.label}
      >
        {label}
      </Typography>
      <RedIconTooltip title={tooltip} />
    </div>
  );
}

export default memo(AvailableBalanceCaption)