
const getPriceColor = (value) => {
  if (value > parseFloat(1.05)) {
    return '#3BA05E'
  }

  if (value < parseFloat(0.95)) {
    return '#A03B3B'
  }

  return '#209FC7'
}

export default getPriceColor