import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function register({ email, password, name }: { email: string, password: string, name?: string }) {
  try {
    const res = await api.post('/auth/register', { email, password, name });
    return res.data;
  } catch (err: any) {
    return err.response?.data || { error: 'Ошибка регистрации' };
  }
}

export async function login({ email, password }: { email: string, password: string }) {
  try {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  } catch (err: any) {
    return err.response?.data || { error: 'Ошибка входа' };
  }
}

export async function getProfile(token: string) {
  try {
    const res = await api.get('/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: any) {
    return err.response?.data || { error: 'Ошибка получения профиля' };
  }
}

export async function updateProfile(token: string, data: any) {
  try {
    const res = await api.put('/user/profile', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: any) {
    return err.response?.data || { error: 'Ошибка обновления профиля' };
  }
}

export async function getApps(token: string, owner_id: number) {
  try {
    const res = await api.get(`/developer/apps?owner_id=${owner_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: any) {
    return err.response?.data || { error: 'Ошибка получения приложений' };
  }
}

export async function createApp(token: string, data: any) {
  try {
    const res = await api.post('/developer/apps', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: any) {
    return err.response?.data || { error: 'Ошибка создания приложения' };
  }
}

export async function getStats(token: string) {
  try {
    const res = await api.get('/stats/stats', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: any) {
    return err.response?.data || { error: 'Ошибка получения статистики' };
  }
}

export async function getEvents(token: string) {
  try {
    const res = await api.get('/stats/events', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: any) {
    return err.response?.data || { error: 'Ошибка получения событий' };
  }
} 