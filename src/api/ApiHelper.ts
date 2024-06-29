import Filter from '@/models/Filter';
import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 'https://cpvptz.upirko.tech/api' : '/api';

const api = axios.create({
  baseURL,
});

export const getToken = () => {
  return window.localStorage.getItem('access_token');
};

api.interceptors.response.use(
  (res) => res.data,
  (error) => {
    switch (error.response.status) {
      case 401:
        window.localStorage.removeItem('access_token');
        window.location.reload();
        break;
      default:
        throw error;
    }
  },
);

api.interceptors.request.use((config) => {
  const access_token = getToken();
  if (access_token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${access_token}`,
    };
  }
  return config;
});

export const buildFilter = (filter: Filter) => {
  return Object.fromEntries(
    Object.entries(filter)
      .filter(([_, value]) => value !== undefined)
      .map(([field, value]) => [`filter[${field}]`, value]),
  );
};

export interface PageResponse<T> {
  rows: T[];
  count: number;
}

export default api;
