import { memo } from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import CardWrapper from '../CardWrapper'
import { toFixed } from 'utils/helpers/bigNumber'
import getPriceColor from 'utils/helpers/getPriceColor'
import { useStats } from 'contexts/stats-context'

const useStyles = makeStyles((theme) => ({
  context: {
    fontWeight: 700,
    fontSize: 25,
    [theme.breakpoints.down('xs')]: {
      fontSize: 18,
    },
  },
  arrow: {
    color: theme.custom.palette.pink,
  },
  tooltip: {
    borderRadius: 12,
    backgroundColor: theme.custom.palette.pink,
  },
}));

const DittoPriceStat = () => {
  const classes = useStyles()
  const { dittoPrice } = useStats()

  return (
    <Tooltip
      arrow
      classes={{
        arrow: classes.arrow,
        tooltip: classes.tooltip
      }}
      title={'Oracle price is the average price of DITTO since the previous rebase.'}
      placement={'top'}
    >
      <div>
        <CardWrapper title='Oracle Price'>
          <Typography
            color='textPrimary'
            align='right'
            className={classes.context}
            style={{ color: getPriceColor(toFixed(dittoPrice, 1, 2)) }}
          >
            {`$${toFixed(dittoPrice, 1, 2)}`}
          </Typography>
        </CardWrapper>
      </div>
    </Tooltip>
  )
}

export default memo(DittoPriceStat)
