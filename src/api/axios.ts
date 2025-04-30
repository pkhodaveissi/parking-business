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

// ⬇️ Response interceptor to catch expired tokens
instance.interceptors.response.use(
  res => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login'; // force logout
    }
    return Promise.reject(error);
  }
);

export default instance;