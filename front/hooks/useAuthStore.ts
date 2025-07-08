import { create } from 'zustand';
import { login as apiLogin, register as apiRegister, getProfile } from '@/lib/api';

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('reauth_token') : null,
  user: null,
  loading: false,
  error: null,
  login: async (email, password) => {
    set({ loading: true, error: null });
    const res = await apiLogin({ email, password });
    if (res.access_token) {
      localStorage.setItem('reauth_token', res.access_token);
      set({ token: res.access_token, error: null });
      await get().fetchProfile();
    } else {
      set({ error: res.error || 'Ошибка входа' });
    }
    set({ loading: false });
  },
  register: async (name, email, password) => {
    set({ loading: true, error: null });
    const res = await apiRegister({ name, email, password });
    if (res.msg) {
      set({ error: null });
      await get().login(email, password);
    } else {
      set({ error: res.error || 'Ошибка регистрации' });
    }
    set({ loading: false });
  },
  logout: () => {
    localStorage.removeItem('reauth_token');
    set({ token: null, user: null });
  },
  fetchProfile: async () => {
    const token = get().token;
    if (!token) return;
    const res = await getProfile(token);
    if (res.id) {
      set({ user: res });
    } else {
      set({ user: null });
    }
  },
})); 