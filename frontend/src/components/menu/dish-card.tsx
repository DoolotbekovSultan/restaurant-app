'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/stores/cart-store';
import { formatPrice } from '@/lib/utils';
import type { Dish } from '@/lib/types';
import { cn } from '@/lib/utils';

interface DishCardProps {
  dish: Dish;
  index?: number;
  onFavorite?: (dish: Dish) => void;
  isFavorite?: boolean;
}

function getPrice(dish: Dish) {
  return dish.isPromo && dish.promoPrice ? dish.promoPrice : dish.price;
}

export function DishCard({ dish, index = 0, onFavorite, isFavorite }: DishCardProps) {
  const { addItem, lastAddedId } = useCartStore();
  const justAdded = lastAddedId === dish.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/10">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <div className="absolute top-3 left-3 flex gap-2">
            {dish.isPopular && <Badge variant="popular">Популярное</Badge>}
            {dish.isPromo && <Badge variant="promo">Акция</Badge>}
          </div>

          {onFavorite && (
            <button
              onClick={() => onFavorite(dish)}
              className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-all hover:bg-black/60"
            >
              <Heart
                className={cn('h-4 w-4 transition-colors', isFavorite ? 'fill-red-400 text-red-400' : 'text-white')}
              />
            </button>
          )}

          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-sm">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            <span className="text-xs font-medium text-white">{dish.rating}</span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-white group-hover:text-gold transition-colors">
            {dish.name}
          </h3>
          <p className="mt-1.5 text-sm text-white/50 line-clamp-2 leading-relaxed">{dish.description}</p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white">{formatPrice(getPrice(dish))}</span>
              {dish.isPromo && dish.promoPrice && (
                <span className="text-sm text-white/30 line-through">{formatPrice(dish.price)}</span>
              )}
            </div>

            <motion.div animate={justAdded ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.4 }}>
              <Button
                size="sm"
                onClick={() => addItem(dish)}
                className="rounded-xl"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">В корзину</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
