// src/components/layout/Navbar.tsx
'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';

import { api } from '@/services/wrapperAPI';
import { apiCart } from '@/services/apicart';
import { useAppStore } from '@/store/useAppStore';

import NavbarBrand from './NavbarBrand';
import NavbarLinks from './NavbarLinks';
import NavbarActions from './NavbarActions';
import MobileMenu from './MobileMenu';

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function Navbar() {
  const router = useRouter();
  const cartCount = useAppStore((state) => state.cartCount);
  const setCartCount = useAppStore((state) => state.setCartCount);
  const currentUser = useAppStore((state) => state.currentUser);
  const logout = useAppStore((state) => state.logout);

  const isLoggedIn = Boolean(currentUser && currentUser.id);
  const mounted = useIsMounted();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync cart count from backend
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!isLoggedIn) {
        setCartCount(0);
        return;
      }

      try {
        const response = await apiCart.getCart();

        if (response && response.success) {
          const items = response.data?.items || [];
          const totalQty = Array.isArray(items)
            ? items.reduce((acc, item) => acc + (item.quantity ?? 1), 0)
            : 0;

          setCartCount(totalQty);
        } else {
          setCartCount(0);
        }
      } catch {
        setCartCount(0);
      }
    };

    if (mounted) {
      fetchCartCount();
    }
  }, [mounted, isLoggedIn, setCartCount]);

  // Complete sign out: invalidate backend cookie -> clear local state -> redirect home
  const handleLogout = async () => {
    try {
      await api.post('/auth/signout');
    } catch (error) {
      console.error('[Signout Error]:', error);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
      }
      logout();
      setCartCount(0);
      router.replace('/');
      router.refresh();
    }
  };

  // Trigger modal-only Google OAuth flow
  const openAuthModal = () => {
    setIsMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-auth-modal'));
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0F1035] border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <NavbarBrand />
          <NavbarLinks />
          <NavbarActions
            mounted={mounted}
            cartCount={cartCount}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            logout={handleLogout}
            openAuthModal={openAuthModal}
          />

          <div className="flex lg:hidden items-center gap-2">
            <Link href="/cart" className="relative p-2 text-slate-300">
              <ShoppingCart className="w-5 h-5" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-emerald-500 text-white ring-2 ring-[#0F1035]">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-300 hover:bg-slate-800 rounded-xl cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        mounted={mounted}
        isLoggedIn={isLoggedIn}
        onClose={() => setIsMobileMenuOpen(false)}
        logout={handleLogout}
        openAuthModal={openAuthModal}
      />
    </header>
  );
}