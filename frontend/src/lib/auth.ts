import { create } from 'zustand';
import api from './api';

interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
}

interface AuthState {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: async (username, password) => {
    const form = new FormData();
    form.append('username', username);
    form.append('password', password);
    const res = await api.post('/api/auth/login', form, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    localStorage.setItem('token', res.data.access_token);
    await useAuthStore.getState().fetchUser();
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null });
  },

  fetchUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token');
    const res = await api.get('/api/auth/me');
    set({ user: res.data });
  },
}));
