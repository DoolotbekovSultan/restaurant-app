import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Dish } from '@/lib/types';

interface CartState {
  items: { dish: Dish; quantity: number }[];
  isOpen: boolean;
  lastAddedId: string | null;
  addItem: (dish: Dish) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

function getDishPrice(dish: Dish): number {
  return dish.isPromo && dish.promoPrice ? dish.promoPrice : dish.price;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      lastAddedId: null,

      addItem: (dish) => {
        set((state) => {
          const existing = state.items.find((i) => i.dish.id === dish.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.dish.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
              lastAddedId: dish.id,
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { dish, quantity: 1 }],
            lastAddedId: dish.id,
            isOpen: true,
          };
        });
        setTimeout(() => set({ lastAddedId: null }), 600);
      },

      removeItem: (dishId) =>
        set((state) => ({ items: state.items.filter((i) => i.dish.id !== dishId) })),

      updateQuantity: (dishId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(dishId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.dish.id === dishId ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotal: () =>
        get().items.reduce((sum, i) => sum + getDishPrice(i.dish) * i.quantity, 0),

      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'aurum-cart' }
  )
);
