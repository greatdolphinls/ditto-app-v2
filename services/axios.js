
import axios from 'axios'

import { API_URL } from 'config'

const apiAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

apiAxios.interceptors.response.use((response) => {
  return response.data;
});

export default apiAxios;