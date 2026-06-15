'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/stores/auth-store';

const authSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
  name: z.string().optional(),
});

type AuthFormData = z.infer<typeof authSchema>;

export function AuthForm() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { login, register: registerUser, isLoading } = useAuthStore();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    setError('');
    try {
      if (mode === 'login') {
        await login(data.email, data.password);
      } else {
        if (!data.name || data.name.length < 2) {
          setError('Введите имя (минимум 2 символа)');
          return;
        }
        await registerUser({
          email: data.email,
          password: data.password,
          name: data.name,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка авторизации');
    }
  };

  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setError('');
    reset();
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        {mode === 'login' ? 'Вход' : 'Регистрация'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {mode === 'register' && (
          <div className="space-y-2">
            <Label htmlFor="name">Имя</Label>
            <Input id="name" {...register('name')} />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Пароль</Label>
          <Input id="password" type="password" {...register('password')} />
          {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
        </div>

        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-white/50">
        {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
        <button
          onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
          className="text-gold hover:underline"
        >
          {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </p>

      {mode === 'login' && (
        <p className="mt-3 text-center text-xs text-white/30">
          Демо: demo@aurum.ru / password123
        </p>
      )}
    </div>
  );
}
