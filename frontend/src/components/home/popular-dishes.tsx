'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import { DishCard } from '@/components/menu/dish-card';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { Button } from '@/components/ui/button';

export function PopularDishes() {
  const { data: dishes = [] } = useQuery({
    queryKey: ['dishes', 'popular'],
    queryFn: () => api.dishes.getAll({ popular: true }),
  });

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-medium text-gold uppercase tracking-wider mb-2">Хиты меню</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Популярные блюда</h2>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/menu">
                Все блюда
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dishes.slice(0, 4).map((dish, i) => (
            <DishCard key={dish.id} dish={dish} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
