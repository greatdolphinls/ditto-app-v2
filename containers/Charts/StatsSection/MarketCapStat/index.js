import { memo } from 'react'

import CardWrapper from '../CardWrapper'
import { toFixed } from 'utils/helpers/bigNumber'
import { useStats } from 'contexts/stats-context'

const MarketCapStat = () => {
  const { mktCap } = useStats()

  return (
    <CardWrapper
      title='Ditto Market Cap'
      context={`$${toFixed(mktCap, 1, 2)}`}
    />
  )
}

export default memo(MarketCapStat)