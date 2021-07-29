import BigJs from 'big.js'
import toformat from 'toformat'

toformat(BigJs)
const PRECISION = 4

const toFixed = (a, b, precision) => {
  if (isZero(Big(a)) || isZero(Big(b))) {
    return '0'
  }

  return Big(a)
    .div(Big(b))
    .toFormat(precision ?? PRECISION)
}

const formatUnits = (a, decimals, precision) => {
  return toFixed(a, Big(10).pow(decimals), precision)
}

const isZero = (a) => {
  return Big(a).eq(Big('0'))
}

const Big = (n) => {
  return new BigJs(n.toString())
}

export {
  toFixed,
  formatUnits,
  isZero,
  Big
}