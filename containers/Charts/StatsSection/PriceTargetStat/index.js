import { memo } from 'react'

import CardWrapper from '../CardWrapper'

const PriceTargetStat = () => {
  return (
    <CardWrapper
      title='Price Target'
      context='$1.00'
    />
  )
}

export default memo(PriceTargetStat)