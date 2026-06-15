'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/stores/auth-store';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(2, 'Введите имя'),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function ProfileForm() {
  const { user, updateProfile } = useAuthStore();
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
    },
  });

  const onSubmit = async (data: FormData) => {
    await updateProfile(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label>Email</Label>
        <Input value={user?.email || ''} disabled className="opacity-50" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Имя</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Телефон</Label>
        <Input id="phone" {...register('phone')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Адрес</Label>
        <Input id="address" {...register('address')} />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {saved ? 'Сохранено ✓' : isSubmitting ? 'Сохранение...' : 'Сохранить'}
      </Button>
    </form>
  );
}
