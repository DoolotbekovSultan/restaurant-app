'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Category, SortOption } from '@/lib/types';

interface MenuFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: Category | 'ALL';
  onCategoryChange: (value: Category | 'ALL') => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  minPrice: string;
  onMinPriceChange: (value: string) => void;
  maxPrice: string;
  onMaxPriceChange: (value: string) => void;
  categories: { id: string; label: string; icon: string }[];
}

export function MenuFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  categories,
}: MenuFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
        <Input
          placeholder="Поиск блюд..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-11"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('ALL')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
            category === 'ALL'
              ? 'bg-gold/20 text-gold border border-gold/30'
              : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
          }`}
        >
          Все
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id as Category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              category === cat.id
                ? 'bg-gold/20 text-gold border border-gold/30'
                : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Select value={sortBy} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-white/40" />
              <SelectValue placeholder="Сортировка" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">По популярности</SelectItem>
            <SelectItem value="rating">По рейтингу</SelectItem>
            <SelectItem value="price_asc">Цена: по возрастанию</SelectItem>
            <SelectItem value="price_desc">Цена: по убыванию</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Цена от"
          value={minPrice}
          onChange={(e) => onMinPriceChange(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Цена до"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
        />
      </div>
    </div>
  );
}
