import axios from 'axios';

const axiosClient = axios.create();
axiosClient.defaults.baseURL = '/';
axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Authorization': 'Bearer '
};
//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;
//axiosClient.defaults.withCredentials = true;

export default axiosClient;