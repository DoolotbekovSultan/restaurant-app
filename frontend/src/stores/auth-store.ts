import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/lib/types';
import { api } from '@/lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; name: string; phone?: string }) => Promise<void>;
  fetchUser: () => Promise<void>;
  updateProfile: (data: Partial<Pick<User, 'name' | 'phone' | 'address'>>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,

      setAuth: (user, token) => {
        localStorage.setItem('aurum_token', token);
        set({ user, token });
      },

      logout: () => {
        localStorage.removeItem('aurum_token');
        set({ user: null, token: null });
      },

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const { user, token } = await api.auth.login(email, password);
          get().setAuth(user, token);
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (data) => {
        set({ isLoading: true });
        try {
          const { user, token } = await api.auth.register(data);
          get().setAuth(user, token);
        } finally {
          set({ isLoading: false });
        }
      },

      fetchUser: async () => {
        const token = get().token;
        if (!token) return;
        try {
          const user = await api.auth.me();
          set({ user });
        } catch {
          get().logout();
        }
      },

      updateProfile: async (data) => {
        const user = await api.auth.updateProfile(data);
        set({ user });
      },
    }),
    {
      name: 'aurum-auth',
      partialize: (state) => ({ user: state.user, token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          localStorage.setItem('aurum_token', state.token);
        }
      },
    }
  )
);
