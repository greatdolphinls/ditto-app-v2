import { memo } from 'react'

import CardWrapper from '../CardWrapper'
import { toFixed } from 'utils/helpers/bigNumber'
import { useStats } from 'contexts/stats-context'

const DittoSupplyStat = () => {
  const { dittoSupply } = useStats()

  return (
    <CardWrapper
      title='Ditto Supply'
      context={`${toFixed(dittoSupply, 1, 2)}`}
    />
  )
}

export default memo(DittoSupplyStat)