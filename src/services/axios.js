import axios from 'axios';
import EE from 'eventemitter3';
import { axiosBaseConfig } from './axiosConfig';

window.eventStore = new EE();

export default (url, reqData, axiosConfig) => {
  const instance = axios.create(axiosConfig || axiosBaseConfig);
  instance.interceptors.response.use(
    (res) => {
      const json = res.data;
      if (json.data && (json.code < 0 || json.error || json.code > 20000)) {
        res.data.code = -1;
        res.data.message = json.msg || json.message;
      } else if (json.code === 100302) {
        const { code, data, msg } = json;
        window.eventStore.emit('permisson', { code, data, message: msg });
      }
      return res.data;
    },
    (error) => {
    }
  );
  return instance.post(url, reqData);
}

