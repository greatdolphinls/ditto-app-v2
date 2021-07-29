
import { memo } from 'react'
import { Grid } from '@material-ui/core'

import DittoChart from './DittoChart'
import { useStats } from 'contexts/stats-context'

const ChartsSection = () => {
  const {
    priceChartData,
    supplyChartData,
    mktCapChartData
  } = useStats();

  const yAxisLabelFormatter = (value) => `$${value}`
  const yAxisSupplyChartLabelFormatter = (value) => `${value}`


  return (
    <>
      <Grid item xs={12}>
        <DittoChart
          title='PRICE'
          data={priceChartData}
          yAxisLabelFormatter={yAxisLabelFormatter}
        />
      </Grid>
      <Grid item xs={12}>
        <DittoChart
          title='SUPPLY'
          data={supplyChartData}
          yAxisLabelFormatter={yAxisSupplyChartLabelFormatter}
        />
      </Grid>
      <Grid item xs={12}>
        <DittoChart
          title='MARKET CAP'
          data={mktCapChartData}
          yAxisLabelFormatter={yAxisLabelFormatter}
        />
      </Grid>
    </>
  )
}

export default memo(ChartsSection);