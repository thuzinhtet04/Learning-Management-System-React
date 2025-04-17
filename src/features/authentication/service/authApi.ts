import { API_BASE_URL } from '@/config/serverApiConfig';
import { UserAuthInput } from '../types/types';
import API from './api';
import { useAuthStore } from '@/store/authStore';
import { FormData } from '@/pages/auth/register/Register';

export const loginUserFn = async (user: UserAuthInput) => {
  try {
    const res = await API.post('/auth/login', {
      email: user.email,
      password: user.password,
    });
    if (res.status === 200) {
      const { token  , refreshToken } = res.data;
      console.log('accesstoken', token);
      await useAuthStore.getState().login({ token, refreshToken });
    }

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const RegisterUserFn = async (data: FormData) => {
      // Replace this with your actual registration API call
      const response = await fetch(
        API_BASE_URL + '/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Accept-Type" : 'application/json',
      
          },
          body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password,
            password_confirmation: data.confirmPassword,
            role: data.role,
          }),
          credentials : "include"
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }
      return response.json();
    }
  


export const fetchUser = async () => {
  try {
    const res = await API.get('/auth/me');
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
