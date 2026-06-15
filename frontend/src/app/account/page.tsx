'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { AuthForm } from '@/components/account/auth-form';
import { ProfileForm } from '@/components/account/profile-form';
import { OrderHistory } from '@/components/account/order-history';
import { FavoritesList } from '@/components/account/favorites-list';
import { PageTransition } from '@/components/shared/page-transition';
import { Button } from '@/components/ui/button';
import { LogOut, User, Package, Heart } from 'lucide-react';
import { useState } from 'react';

type Tab = 'profile' | 'orders' | 'favorites';

export default function AccountPage() {
  const { user, logout, fetchUser, token } = useAuthStore();
  const [tab, setTab] = useState<Tab>('profile');

  useEffect(() => {
    if (token) fetchUser();
  }, [token, fetchUser]);

  if (!user) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-white">Личный кабинет</h1>
            <p className="mt-3 text-white/50">Войдите, чтобы управлять заказами и избранным</p>
          </div>
          <AuthForm />
        </div>
      </PageTransition>
    );
  }

  const tabs = [
    { id: 'profile' as const, label: 'Профиль', icon: User },
    { id: 'orders' as const, label: 'Заказы', icon: Package },
    { id: 'favorites' as const, label: 'Избранное', icon: Heart },
  ];

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-medium text-gold uppercase tracking-wider mb-2">Кабинет</p>
            <h1 className="text-4xl font-bold text-white">Привет, {user.name.split(' ')[0]}!</h1>
          </div>
          <Button variant="ghost" onClick={logout}>
            <LogOut className="h-4 w-4" />
            Выйти
          </Button>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all whitespace-nowrap ${
                tab === t.id
                  ? 'bg-gold/20 text-gold border border-gold/30'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl">
          {tab === 'profile' && <ProfileForm />}
          {tab === 'orders' && <OrderHistory />}
          {tab === 'favorites' && <FavoritesList />}
        </div>
      </div>
    </PageTransition>
  );
}
