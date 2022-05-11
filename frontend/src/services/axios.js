import axios from 'axios';

const axiosClient = axios.create();
axiosClient.defaults.baseURL = '/';
axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0',
};
//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 10000;
//axiosClient.defaults.withCredentials = true;

export default axiosClient;