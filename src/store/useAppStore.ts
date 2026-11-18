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
  cartCount: number;
  isSessionExpired: boolean; // Flag indicating active session has expired
  setCurrentUser: (user: User | null) => void;
  login: (user: User, token?: string) => void;
  logout: () => void;
  setCartCount: (count: number) => void;
  incrementCart: () => void;
  clearCart: () => void;
  setSessionExpired: (expired: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentUser: null,
      cartCount: 0,
      isSessionExpired: false,

      setCurrentUser: (user: User | null) =>
        set({ currentUser: user, isSessionExpired: false }),

      login: (user: User) => {
        // Clean up any legacy tokens from localStorage when migrating to HttpOnly cookies
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
        }
        set({ currentUser: user, isSessionExpired: false });
      },

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
        }
        set({ currentUser: null, cartCount: 0, isSessionExpired: false });
      },

      setCartCount: (count: number) => set({ cartCount: count }),
      incrementCart: () => set((state: AppState) => ({ cartCount: state.cartCount + 1 })),
      clearCart: () => set({ cartCount: 0 }),
      setSessionExpired: (expired: boolean) => set({ isSessionExpired: expired }),
    }),
    {
      name: 'tmv-market-storage',
      // Persist only non-sensitive UI profile metadata & cart badge count
      partialize: (state) => ({
        currentUser: state.currentUser,
        cartCount: state.cartCount,
      }),
    }
  )
);