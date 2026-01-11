import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      error.userMessage = 'Сервер недоступен. Проверьте подключение к интернету.';
    } else if (error.response) {
      error.userMessage = error.response.data?.message || `Ошибка сервера: ${error.response.status}`;
    } else {
      error.userMessage = 'Произошла ошибка при выполнении запроса.';
    }
    return Promise.reject(error);
  }
);
