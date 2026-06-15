'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { CreditCard, Banknote, Smartphone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCartStore } from '@/stores/cart-store';
import { useAuthStore } from '@/stores/auth-store';
import { api } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

const schema = z.object({
  customerName: z.string().min(2, 'Введите имя'),
  phone: z.string().min(10, 'Введите корректный телефон'),
  address: z.string().min(5, 'Введите адрес доставки'),
  comment: z.string().optional(),
  paymentMethod: z.enum(['CARD', 'CASH', 'ONLINE']),
});

type FormData = z.infer<typeof schema>;

const paymentOptions = [
  { value: 'ONLINE' as const, label: 'Онлайн оплата', icon: Smartphone },
  { value: 'CARD' as const, label: 'Картой курьеру', icon: CreditCard },
  { value: 'CASH' as const, label: 'Наличными', icon: Banknote },
];

export function CheckoutForm() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const total = getTotal();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      customerName: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
      paymentMethod: 'ONLINE',
    },
  });

  const paymentMethod = watch('paymentMethod');

  const onSubmit = async (data: FormData) => {
    try {
      const order = await api.orders.create({
        ...data,
        items: items.map((i) => ({ dishId: i.dish.id, quantity: i.quantity })),
      });
      setOrderId(order.id);
      setSuccess(true);
      clearCart();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ошибка оформления заказа');
    }
  };

  if (items.length === 0 && !success) {
    return (
      <div className="text-center py-20">
        <p className="text-white/50 mb-4">Корзина пуста</p>
        <Button onClick={() => router.push('/menu')}>Перейти в меню</Button>
      </div>
    );
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <CheckCircle className="h-20 w-20 text-emerald-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-2">Заказ оформлен!</h2>
        <p className="text-white/50 mb-2">Номер заказа: {orderId.slice(0, 8).toUpperCase()}</p>
        <p className="text-white/50 mb-8">Мы свяжемся с вами для подтверждения</p>
        <Button onClick={() => router.push('/')}>На главную</Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-4">
          <h3 className="text-lg font-semibold text-white">Контактные данные</h3>
          <div className="space-y-2">
            <Label htmlFor="name">Имя</Label>
            <Input id="name" {...register('customerName')} />
            {errors.customerName && <p className="text-xs text-red-400">{errors.customerName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input id="phone" {...register('phone')} placeholder="+7 (999) 123-45-67" />
            {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Адрес доставки</Label>
            <Input id="address" {...register('address')} />
            {errors.address && <p className="text-xs text-red-400">{errors.address.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Комментарий к заказу</Label>
            <Textarea id="comment" {...register('comment')} placeholder="Домофон, этаж, пожелания..." />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-4">
          <h3 className="text-lg font-semibold text-white">Способ оплаты</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {paymentOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setValue('paymentMethod', opt.value)}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-xl border p-4 transition-all duration-300',
                  paymentMethod === opt.value
                    ? 'border-gold/50 bg-gold/10 text-gold'
                    : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20'
                )}
              >
                <opt.icon className="h-6 w-6" />
                <span className="text-xs font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-28 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-4">
          <h3 className="text-lg font-semibold text-white">Ваш заказ</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {items.map((item) => (
              <div key={item.dish.id} className="flex justify-between text-sm">
                <span className="text-white/70">
                  {item.dish.name} × {item.quantity}
                </span>
                <span className="text-white font-medium">
                  {formatPrice(
                    (item.dish.isPromo && item.dish.promoPrice ? item.dish.promoPrice : item.dish.price) *
                      item.quantity
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between">
            <span className="text-white/60">Итого</span>
            <span className="text-2xl font-bold text-white">{formatPrice(total)}</span>
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Оформление...' : 'Подтвердить заказ'}
          </Button>
        </div>
      </div>
    </form>
  );
}
