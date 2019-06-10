import axios from 'axios';
import { BASE_URL } from 'MYRN/app/utils/global';

// 注册一个主实例
const req = axios.create({
  baseURL: `${BASE_URL}/api`,
  method: 'POST'
});

// 剥离无意义数据
req.interceptors.response.use(function (response) {
  let { error, ret, data } = response.data;
  if (error || ret !== 1) {
    error = error || response.data;
    error.message = error.msg || error.data;
    return Promise.reject(error);
  }

  if (data) {
    return data;
  }
  return response.data;
});

export default function request (url, option = {}) {
  return req({ url, ...option });
}
