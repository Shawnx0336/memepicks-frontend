import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  walletAddress: string | null;
  balance: number;
  wins: number;
  totalEarned: number;
  isAdmin: boolean;
  createdAt: string;
}

interface AuthStore {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  user: null,

  login: async (email, password) => {
    try {
const res = await fetch('http://137.184.104.153:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log('Login Response:', data); // 🧪 debugging
      if (!res.ok) throw new Error(data.error);
      set({ token: data.token, user: data.user });
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  },

  signup: async (email, password) => {
    try {
const res = await fetch('http://137.184.104.153:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      set({ token: data.token, user: data.user });
      return true;
    } catch (err) {
      console.error('Signup failed:', err);
      return false;
    }
  },

  logout: () => {
    set({ token: null, user: null });
  },
}));
