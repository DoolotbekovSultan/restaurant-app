'use client';

import { useQuery } from '@tanstack/react-query';
import { Package, Clock } from 'lucide-react';
import { api } from '@/lib/api';
import { formatPrice, formatDate } from '@/lib/utils';

const statusLabels: Record<string, string> = {
  PENDING: 'Ожидает',
  CONFIRMED: 'Подтверждён',
  PREPARING: 'Готовится',
  DELIVERING: 'Доставляется',
  DELIVERED: 'Доставлен',
  CANCELLED: 'Отменён',
};

export function OrderHistory() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: api.orders.getMy,
    retry: false,
  });

  if (isLoading) {
    return <div className="text-white/50 text-center py-8">Загрузка...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 rounded-2xl border border-white/10 bg-white/5">
        <Package className="h-12 w-12 text-white/20 mx-auto mb-4" />
        <p className="text-white/50">У вас пока нет заказов</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all hover:border-gold/20"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-white">
                #{order.id.slice(0, 8).toUpperCase()}
              </span>
            </div>
            <span className="rounded-full bg-gold/10 border border-gold/20 px-3 py-0.5 text-xs text-gold">
              {statusLabels[order.status] || order.status}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40 mb-3">
            <Clock className="h-3.5 w-3.5" />
            {formatDate(order.createdAt)}
          </div>
          <div className="space-y-1.5 mb-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-white/60">
                  {item.dish.name} × {item.quantity}
                </span>
                <span className="text-white/80">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t border-white/10 pt-3">
            <span className="text-white/50 text-sm">{order.address}</span>
            <span className="font-bold text-white">{formatPrice(order.total)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
