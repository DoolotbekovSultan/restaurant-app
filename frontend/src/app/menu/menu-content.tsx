'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { DishCard } from '@/components/menu/dish-card';
import { MenuFilters } from '@/components/menu/menu-filters';
import { PageTransition } from '@/components/shared/page-transition';
import type { Category, SortOption } from '@/lib/types';

export default function MenuPage() {
  const searchParams = useSearchParams();
  const initialPopular = searchParams.get('popular') === 'true';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filters = useMemo(
    () => ({
      search: search || undefined,
      category: category !== 'ALL' ? category : undefined,
      sortBy,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      popular: initialPopular || undefined,
    }),
    [search, category, sortBy, minPrice, maxPrice, initialPopular]
  );

  const { data: dishes = [], isLoading } = useQuery({
    queryKey: ['dishes', filters],
    queryFn: () => api.dishes.getAll(filters),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: api.dishes.getCategories,
  });

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="mb-10">
          <p className="text-sm font-medium text-gold uppercase tracking-wider mb-2">Меню</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Наши блюда</h1>
          <p className="mt-3 text-white/50 max-w-lg">
            Более 100 блюд от лучших шеф-поваров. Выберите своё идеальное блюдо.
          </p>
        </div>

        <div className="mb-8">
          <MenuFilters
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            minPrice={minPrice}
            onMinPriceChange={setMinPrice}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            categories={categories}
          />
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : dishes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/50 text-lg">Блюда не найдены</p>
            <p className="text-white/30 text-sm mt-2">Попробуйте изменить фильтры</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dishes.map((dish, i) => (
              <DishCard key={dish.id} dish={dish} index={i} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
