'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X, Flame } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cart-store';
import { useAuthStore } from '@/stores/auth-store';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/menu', label: 'Меню' },
  { href: '/contacts', label: 'Контакты' },
  { href: '/account', label: 'Кабинет' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCart, getItemCount } = useCartStore();
  const { user } = useAuthStore();
  const itemCount = getItemCount();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 backdrop-blur-2xl sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-amber shadow-lg shadow-gold/20 transition-transform group-hover:scale-105">
              <Flame className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white">Aurum</span>
              <span className="text-gold">.</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                  pathname === link.href
                    ? 'text-gold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-gold/10 border border-gold/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            <Button variant="secondary" size="icon" onClick={openCart} className="relative">
              <ShoppingBag className="h-5 w-5" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-gold to-amber text-[10px] font-bold text-black"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-4 mt-2 rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-2xl md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                  pathname === link.href ? 'bg-gold/10 text-gold' : 'text-white/70 hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <p className="mt-3 border-t border-white/10 pt-3 px-4 text-xs text-white/40">
                {user.name}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
