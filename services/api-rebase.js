
import axios from 'services/axios'

const getAll = async () => {
  return await axios.get('/');
};

const getRebase = async (params) => {
  return await axios.get('/rebases', { params });
};

const getTotalSupply = async () => {
  return await axios.get('/total-supply');
};

const getTotalXDittoSupply = async () => {
  return await axios.get('/xditto-total-supply');
};

export {
  getAll,
  getRebase,
  getTotalSupply,
  getTotalXDittoSupply
};
