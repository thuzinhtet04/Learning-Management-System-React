import axios from 'axios';
import { useAuthStore } from '../../../store/authStore';
import { API_BASE_URL } from '../../../config/serverApiConfig';
import { toast } from 'sonner';

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add access token to every request
API.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      if (error.response?.data?.message == 'TokenExpired') {
        const { refreshToken, login, logout } = useAuthStore.getState();
        if (!refreshToken) {
          logout();
          return Promise.reject(error);
        }

        try {
          const res = await API.post(API_BASE_URL + '/auth/refresh');

          const { token, refresh_token } = res.data;
          console.log(token, refresh_token, 'refresh-process');
          toast('refresh token work');
          await login({ token, refreshToken: refresh_token });

          // Retry the failed request
          error.config.headers.Authorization = `Bearer ${token}`;
          return API(error.config);
        } catch (error) {
          logout();
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;
