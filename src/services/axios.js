import axios from 'axios';
import EE from 'eventemitter3';
import { axiosBaseConfig } from './axiosConfig';

window.eventStore = new EE();

export default (url, reqData, axiosConfig, method) => {
  const instance = axios.create(axiosConfig || axiosBaseConfig);
  instance.interceptors.response.use(
    (res) => {
      if (typeof res.data !== 'object') {
        return JSON.parse(res.data);
      }
      return res.data || res;
    },
    (error) => {
      return JSON.parse(error.response.data)
    }
  );
  if (method && method.toUpperCase() === 'GET') {
    return instance.get(url, { params: reqData });
  } else {
    console.log(reqData);
    return instance.post(url, reqData);
  }
}

