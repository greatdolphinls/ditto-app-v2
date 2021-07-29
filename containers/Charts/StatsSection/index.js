
import { memo } from 'react'
import { Grid } from '@material-ui/core'

import RebaseCooldownStat from './RebaseCooldownStat'
import DittoPriceStat from './DittoPriceStat'
import DittoSupplyStat from './DittoSupplyStat'
import RebaseStat from './RebaseStat'
import PriceTargetStat from './PriceTargetStat'
import MarketCapStat from './MarketCapStat'
import XDittoSupplyStat from './XDittoSupplyStat'
import XDittoPriceStat from './XDittoPriceStat'

const StatsSection = () => {
  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <RebaseCooldownStat />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DittoPriceStat />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DittoSupplyStat />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <RebaseStat />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <PriceTargetStat />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <MarketCapStat />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <XDittoPriceStat />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <XDittoSupplyStat />
      </Grid>
    </>
  )
}

export default memo(StatsSection);