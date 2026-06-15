'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { DishCard } from '@/components/menu/dish-card';
import { Heart } from 'lucide-react';
import type { Dish } from '@/lib/types';

export function FavoritesList() {
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: api.favorites.getAll,
    retry: false,
  });

  const toggleFavorite = useMutation({
    mutationFn: (dishId: string) => api.favorites.remove(dishId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  });

  if (isLoading) {
    return <div className="text-white/50 text-center py-8">Загрузка...</div>;
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12 rounded-2xl border border-white/10 bg-white/5">
        <Heart className="h-12 w-12 text-white/20 mx-auto mb-4" />
        <p className="text-white/50">Нет избранных блюд</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {favorites.map((dish: Dish, i: number) => (
        <DishCard
          key={dish.id}
          dish={dish}
          index={i}
          isFavorite
          onFavorite={() => toggleFavorite.mutate(dish.id)}
        />
      ))}
    </div>
  );
}
