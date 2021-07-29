import moment from 'moment'

const getShortDate = (value) => {
  const date = new Date(value);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = date.getFullYear();

  return `${dd}/${mm}/${yyyy}`
}

const getLocaleDate = (value) => {
  return moment.unix(value).local().format('YYYY-MM-DD HH:mm')
}

export {
  getShortDate,
  getLocaleDate
}