import { createContext, useState, useMemo, useEffect, useContext } from 'react'
import { ethers } from 'ethers'
import moment from 'moment'

import {
  CONTRACTS,
  READ_WEB3_PROVIDER,
} from 'config'
import CONTROLLER_ABI from 'libs/abis/controller.json'
import ORACLE_ABI from 'libs/abis/oracle.json'
import XDITTO_ABI from 'libs/abis/abi.json'
import * as rebaseAPI from 'services/api-rebase'
import { Big, isZero } from 'utils/helpers/bigNumber'
import { TYPES_ARRAY, DURATIONS_ARRAY } from 'utils/constants/chart-info'

const READ_PROVIDER = new ethers.providers.JsonRpcProvider(READ_WEB3_PROVIDER)

const StatsContext = createContext(null)

export function StatsProvider({ children }) {

  const [dittoSupply, setDittoSupply] = useState(Big(0))
  const [xDittoSupply, setXDittoSupply] = useState(Big(0))
  const [dittoPrice, setPrice] = useState(Big(0))
  const [xDittoPrice, setXDittoPrice] = useState(Big(0))
  const [cooldownExpiryTimestamp, setCooldownExpiryTimestamp] = useState(Big(0))
  const [chartData, setChartData] = useState({})
  const [activeType, setActiveType] = useState(TYPES_ARRAY[0][0])
  const [activeDuration, setActiveDuration] = useState(DURATIONS_ARRAY[1][0])

  const controllerContract = useMemo(() => new ethers.Contract(CONTRACTS.controller, CONTROLLER_ABI, READ_PROVIDER), [])
  const oracleContract = useMemo(() => new ethers.Contract(CONTRACTS.oracle, ORACLE_ABI, READ_PROVIDER), [])
  const xDittoContract = useMemo(() => new ethers.Contract(CONTRACTS.xDitto, XDITTO_ABI, READ_PROVIDER), [])

  const mktCap = useMemo(() => dittoSupply.mul(dittoPrice), [dittoSupply, dittoPrice])

  const cooldownExpired = useMemo(() => isZero(cooldownExpiryTimestamp)
    ? false
    : moment.unix(cooldownExpiryTimestamp).isBefore(moment.utc())
    , [cooldownExpiryTimestamp])

  const priceChartData = useMemo(() =>
    getChartData({
      chartData,
      activeDuration,
      activeType,
      map: ({ x, p }) => ({ x, p }),
    }), [chartData, activeDuration, activeType])

  const supplyChartData = useMemo(() =>
    getChartData({
      chartData,
      activeDuration,
      activeType,
      map: ({ x, s: p }) => ({ x, p }),
    }), [chartData, activeDuration, activeType])

  const mktCapChartData = useMemo(() =>
    getChartData({
      chartData,
      activeDuration,
      activeType,
      map: ({ x, s, p }) => {
        const y = s.map((a, i) => parseFloat(a) + parseFloat(p[i]))
        return { x, p: y }
      },
    }), [chartData, activeDuration, activeType])

  useEffect(() => {
    const load = async () => {
      const [price, cooldownExpiryTimestamp] = await Promise.all([oracleContract.getData(), controllerContract.cooldownExpiryTimestamp()])
      const oraclePrice = ethers.utils.formatUnits(price, 18);

      const exchangeRateData = await xDittoContract.getRedeemAmount(ethers.BigNumber.from("1000000000000000000"));
      const exchangeRate = ethers.utils.formatUnits(exchangeRateData, 9);
      const xDittoPrice = parseFloat(oraclePrice) * parseFloat(exchangeRate);

      setPrice(oraclePrice)
      setXDittoPrice(xDittoPrice);
      setCooldownExpiryTimestamp(Big(cooldownExpiryTimestamp))
    }

    load()
  }, [oracleContract, xDittoContract, controllerContract])

  useEffect(() => {
    const load = async () => {
      const { totalSupply } = await rebaseAPI.getTotalSupply();
      const { totalSupply: xDittoSupply } = await rebaseAPI.getTotalXDittoSupply();
      const chartData = await rebaseAPI.getAll();

      setDittoSupply(Big(totalSupply).div(Big(1e9)))
      setXDittoSupply(ethers.utils.formatUnits(xDittoSupply, 18))
      setChartData(chartData)
    }

    load()
  }, [controllerContract])

  return (
    <StatsContext.Provider
      value={{
        dittoSupply,
        dittoPrice,
        mktCap,
        cooldownExpiryTimestamp,
        cooldownExpired,
        priceChartData,
        supplyChartData,
        mktCapChartData,
        xDittoSupply,
        xDittoPrice,
        activeDuration,
        setActiveDuration,
        activeType,
        setActiveType,
      }}
    >
      {children}
    </StatsContext.Provider>
  )
}

export function useStats() {
  const context = useContext(StatsContext)
  if (!context) {
    throw new Error('Missing stats context')
  }

  const {
    dittoSupply,
    dittoPrice,
    mktCap,
    cooldownExpiryTimestamp,
    cooldownExpired,
    priceChartData,
    supplyChartData,
    mktCapChartData,
    xDittoSupply,
    xDittoPrice,
    activeDuration,
    setActiveDuration,
    activeType,
    setActiveType,
  } = context

  return {
    dittoSupply,
    dittoPrice,
    mktCap,
    cooldownExpiryTimestamp,
    cooldownExpired,
    priceChartData,
    supplyChartData,
    mktCapChartData,
    xDittoSupply,
    xDittoPrice,
    activeDuration,
    setActiveDuration,
    activeType,
    setActiveType,
  }
}

const getChartData = ({ chartData, activeDuration, activeType, map }) => {
  const data = chartData[activeDuration]
  if (!data) return

  const { x, p } = map(data)
  let y
  if (activeType === '%') {
    y = [0]
    for (let i = 1; i < p.length; i++) {
      const a = parseFloat(p[i])
      const b = parseFloat(p[i - 1])
      y.push(!a ? 0 : (1e2 * (a - b)) / a)
    }
  } else {
    y = p.map((py) => parseFloat(py))
  }

  return {
    x,
    y,
    xy: x.map((px, i) => ({ x: px, y: y[i] })),
  }
}
