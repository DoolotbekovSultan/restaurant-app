'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Users, ShoppingCart, Star, Clock } from 'lucide-react';
import { api } from '@/lib/api';
import { ScrollReveal } from '@/components/shared/scroll-reveal';

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(value * eased));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString('ru-RU')}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: api.stats.get,
  });

  const items = [
    { icon: Users, label: 'Довольных клиентов', value: stats?.customers ?? 12500, suffix: '+' },
    { icon: ShoppingCart, label: 'Выполненных заказов', value: stats?.orders ?? 48000, suffix: '+' },
    { icon: Star, label: 'Средний рейтинг', value: stats?.rating ?? 4.9, suffix: '', isDecimal: true },
    { icon: Clock, label: 'Минут доставка', value: stats?.deliveryTime ?? 35, suffix: '' },
  ];

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:border-gold/30 hover:bg-white/8 hover:shadow-lg hover:shadow-gold/5"
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gold/5 blur-2xl transition-all group-hover:bg-gold/10" />
                <item.icon className="h-6 w-6 text-gold mb-4" />
                <p className="text-3xl font-bold text-white">
                  {item.isDecimal ? (
                    <span>{stats?.rating ?? 4.9}</span>
                  ) : (
                    <AnimatedNumber value={item.value} suffix={item.suffix} />
                  )}
                </p>
                <p className="mt-1 text-sm text-white/50">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
