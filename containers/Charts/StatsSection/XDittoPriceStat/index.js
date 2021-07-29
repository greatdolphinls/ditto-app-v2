import { memo } from 'react'
import { Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import CardWrapper from '../CardWrapper'
import { toFixed } from 'utils/helpers/bigNumber'
import { useStats } from 'contexts/stats-context'

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: theme.custom.palette.pink,
  },
  tooltip: {
    borderRadius: 12,
    backgroundColor: theme.custom.palette.pink,
  },
}));

const XDittoPriceStat = () => {
  const classes = useStyles();
  const { xDittoPrice } = useStats()

  return (
    <Tooltip
      arrow
      classes={{
        arrow: classes.arrow,
        tooltip: classes.tooltip
      }}
      title={'Oracle price is the average price of xDITTO since the previous rebase.'}
      placement={'top'}
    >
      <div>
        <CardWrapper
          title='xDitto Price'
          context={`$${toFixed(xDittoPrice, 1, 2)}`}
        />
      </div>
    </Tooltip>
  )
}

export default memo(XDittoPriceStat)
