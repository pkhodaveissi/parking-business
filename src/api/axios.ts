import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://parkdemeer-afde952e3fef.herokuapp.com/v1',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;