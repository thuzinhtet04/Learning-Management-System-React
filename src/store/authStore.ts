import API from '@/features/authentication/service/api';
import { IAuthUser } from '@/features/authentication/types/types';
import { Navigate, redirect } from 'react-router-dom';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserRole = 'student' | 'instructor' | 'admin' | null;
interface AuthState {
  authUser: IAuthUser | null;
  userRole: UserRole;
  setRole: (role: Exclude<UserRole, null>) => void;
  token: string | null;
  refreshToken: string | null;
  login: (tokens: { token: string; refreshToken: string }) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      authUser: null,
      userRole: null,
      token: null,
      refreshToken: null,

      login: async ({ token, refreshToken }) => {
        console.log(token, refreshToken);
        set((state) => ({ token: token, refreshToken: refreshToken }));

        // Fetch user data
        get().fetchUser();
      },

      logout: () => {
        set({
          authUser: null,
          token: null,
          refreshToken: null,
          userRole: null,
        });
        Navigate({ to: '/login' });
      },

      fetchUser: async () => {
        try {
          const res = await API.get('/auth/me');

          set({ authUser: res.data, userRole: res.data.data.roleName });
        } catch (error) {
          console.error(error);
          get().logout();
        }
      },
      setRole: (role) => set({ userRole: role }),
    }),
    { name: 'auth-storage' }
  )
);
