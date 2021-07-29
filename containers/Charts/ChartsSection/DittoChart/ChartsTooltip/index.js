import { memo } from 'react'

const ChartsTooltip = ({
  active,
  payload,
  yAxisTickFormatter
}) => {
  if (active && payload) {
    return (
      <div>
        {yAxisTickFormatter(payload[0].value)}
      </div>
    )
  }

  return null
}

export default memo(ChartsTooltip)