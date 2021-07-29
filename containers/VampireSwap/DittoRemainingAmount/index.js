import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import RedIconTooltip from 'parts/RedIconTooltip'

const useStyles = makeStyles((theme) => {
  return {
    dittoLeft: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      marginTop: theme.spacing(1)
    },
    label: {
      fontWeight: 'bold'
    }
  };
});

const DittoRemainingAmount = ({
  totalDittoRemaining
}) => {
  const classes = useStyles();

  return (
    <div className={classes.dittoLeft}>
      <Typography
        variant='caption'
        color='textSecondary'
        className={classes.label}
      >
        Total DITTO Remaining: {totalDittoRemaining}
      </Typography>
      <RedIconTooltip
        placement='bottom'
        title='Total amount of DITTO still available for the incentivized swaps. DITTO is allocated on a first-come, first serve basis.'
      />
    </div>
  );
}

export default memo(DittoRemainingAmount)