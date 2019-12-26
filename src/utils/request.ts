import axios from 'axios';
import { pickBy } from 'lodash';

const parsingEmptyValueParams = params =>
  pickBy(params, value => value != null && value !== '');

const RequestApi = axios.create();

RequestApi.defaults.baseURL =
  process.env.server || 'http://apis.worklifebell.ryulth.com';

RequestApi.interceptors.request.use(
  config => {
    const parsedParams = parsingEmptyValueParams(config.params);
    config.params = parsedParams;

    const accessToken = window.localStorage.getItem('access_token');
    const isLoginURL = config.url && config.url.includes('accounts');

    if (accessToken && isLoginURL === false) {
      config.headers.Authorization = `bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

const NOT_AUTHORIZED_HTTP_CODE = 401;

RequestApi.interceptors.response.use(
  response => {
    if (response && response.config.method !== 'get') {

    }
    return response.data;
  },
  error => {
    const { config, response } = error;
    const originalRequest = config;

    if (
      response &&
      response.status === NOT_AUTHORIZED_HTTP_CODE &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      // token refresh 요청
    }

    message.error('요청이 실패하였습니다.', 1.5);
    return Promise.reject(error);
  },
);

export default RequestApi;
