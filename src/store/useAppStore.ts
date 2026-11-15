// src/store/useAppStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string | null;
  role?: string;
}

interface AppState {
  currentUser: User | null;
  token: string | null;
  cartCount: number;
  isSessionExpired: boolean; // State penanda sesi habis
  login: (user: User, token: string) => void;
  logout: () => void;
  setCartCount: (count: number) => void;
  incrementCart: () => void;
  clearCart: () => void;
  setSessionExpired: (expired: boolean) => void; // Fungsi pemicu
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentUser: null,
      token: null,
      cartCount: 0,
      isSessionExpired: false,
      login: (user: User, token: string) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token);
        }
        set({ currentUser: user, token, isSessionExpired: false });
      },
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
        }
        set({ currentUser: null, token: null, cartCount: 0, isSessionExpired: false });
      },
      setCartCount: (count: number) => set({ cartCount: count }),
      incrementCart: () => set((state: AppState) => ({ cartCount: state.cartCount + 1 })),
      clearCart: () => set({ cartCount: 0 }),
      setSessionExpired: (expired: boolean) => set({ isSessionExpired: expired }),
    }),
    {
      name: 'tmv-market-storage',
      // Hanya simpan data akun & keranjang ke localStorage; jangan simpan flag modal sementara
      partialize: (state) => ({
        currentUser: state.currentUser,
        token: state.token,
        cartCount: state.cartCount,
      }),
    }
  )
);