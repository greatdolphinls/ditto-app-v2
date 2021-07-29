import { memo, useState, useEffect } from 'react'
import moment from 'moment'

import CardWrapper from '../CardWrapper'
import { Big, isZero } from 'utils/helpers/bigNumber'
import { useStats } from 'contexts/stats-context'

const RebaseCooldownStat = () => {
  const { cooldownExpiryTimestamp, cooldownExpired } = useStats()
  const [duration, setDuration] = useState('0d:0h:0m:0s')

  useEffect(() => {
    let id = setInterval(() => {
      if (cooldownExpired || isZero(cooldownExpiryTimestamp)) {
        setDuration('0d:0h:0m:0s')
        clearInterval(id)
        id = null
        return;
      }

      const now = Big(moment.utc().unix())
      const ms = cooldownExpiryTimestamp.sub(now)
      setDuration(toHumanizedDuration(ms))
    }, 1000)

    return () => {
      if (id) clearInterval(id)
    }
  }, [cooldownExpiryTimestamp, cooldownExpired])

  return (
    <CardWrapper
      title='Rebase Cooldown'
      context={duration}
    />
  )
}

export default memo(RebaseCooldownStat)

function toHumanizedDuration(ms) {
  const dur = {}
  const units = [
    { label: 's', mod: 60 },
    { label: 'm', mod: 60 },
    { label: 'h', mod: 24 },
    { label: 'd', mod: 31 },
  ]
  units.forEach((u) => {
    const z = (dur[u.label] = ms.mod(u.mod))
    ms = ms.sub(z).div(u.mod)
  })

  return units
    .reverse()
    .filter((u) => {
      return u.label !== 'ms'
    })
    .map((u) => {
      let val = dur[u.label]
      if (u.label === 'm' || u.label === 's') {
        val = val.toString().padStart(2, '0')
      }
      return val + u.label
    })
    .join(':')
}
