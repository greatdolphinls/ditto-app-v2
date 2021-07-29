import { memo } from 'react'

import CardWrapper from '../CardWrapper'
import { toFixed } from 'utils/helpers/bigNumber'
import { useStats } from 'contexts/stats-context'

const XDittoSupplyStat = () => {
  const { xDittoSupply } = useStats()

  return (
    <CardWrapper
      title='xDitto Supply'
      context={`${toFixed(xDittoSupply, 1, 2)}`}
    />
  )
}

export default memo(XDittoSupplyStat)