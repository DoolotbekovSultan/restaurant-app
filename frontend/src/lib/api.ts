import type {
  Dish,
  DishFilters,
  User,
  Order,
  Review,
  Promo,
  Faq,
  Stats,
  CategoryInfo,
} from './types';
import {
  mockDishes,
  mockReviews,
  mockPromos,
  mockFaqs,
  mockStats,
} from './mock-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('aurum_token');
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options?.headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Ошибка сервера' }));
    throw new Error(error.error || 'Ошибка запроса');
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

function filterMockDishes(filters: DishFilters): Dish[] {
  let result = [...mockDishes];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (d) => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
    );
  }
  if (filters.category) result = result.filter((d) => d.category === filters.category);
  if (filters.minPrice !== undefined) result = result.filter((d) => d.price >= filters.minPrice!);
  if (filters.maxPrice !== undefined) result = result.filter((d) => d.price <= filters.maxPrice!);
  if (filters.popular) result = result.filter((d) => d.isPopular);
  if (filters.promo) result = result.filter((d) => d.isPromo);

  switch (filters.sortBy) {
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'price_asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      result.sort((a, b) => b.price - a.price);
      break;
    default:
      result.sort((a, b) => b.popularity - a.popularity);
  }

  return result;
}

export const api = {
  dishes: {
    getAll: async (filters: DishFilters = {}): Promise<Dish[]> => {
      try {
        const params = new URLSearchParams();
        if (filters.search) params.set('search', filters.search);
        if (filters.category) params.set('category', filters.category);
        if (filters.minPrice !== undefined) params.set('minPrice', String(filters.minPrice));
        if (filters.maxPrice !== undefined) params.set('maxPrice', String(filters.maxPrice));
        if (filters.sortBy) params.set('sortBy', filters.sortBy);
        if (filters.popular) params.set('popular', 'true');
        if (filters.promo) params.set('promo', 'true');
        const query = params.toString();
        return await fetchApi<Dish[]>(`/dishes${query ? `?${query}` : ''}`);
      } catch {
        return filterMockDishes(filters);
      }
    },
    getCategories: async (): Promise<CategoryInfo[]> => {
      try {
        return await fetchApi<CategoryInfo[]>('/dishes/categories');
      } catch {
        return [
          { id: 'PIZZA', label: 'Пицца', icon: '🍕' },
          { id: 'BURGERS', label: 'Бургеры', icon: '🍔' },
          { id: 'SUSHI', label: 'Суши', icon: '🍣' },
          { id: 'DRINKS', label: 'Напитки', icon: '🥤' },
          { id: 'DESSERTS', label: 'Десерты', icon: '🍰' },
          { id: 'NATIONAL', label: 'Национальная кухня', icon: '🍲' },
        ];
      }
    },
  },
  stats: {
    get: async (): Promise<Stats> => {
      try {
        return await fetchApi<Stats>('/stats');
      } catch {
        return mockStats;
      }
    },
  },
  reviews: {
    getAll: async (): Promise<Review[]> => {
      try {
        return await fetchApi<Review[]>('/reviews');
      } catch {
        return mockReviews;
      }
    },
  },
  promos: {
    getAll: async (): Promise<Promo[]> => {
      try {
        return await fetchApi<Promo[]>('/promos');
      } catch {
        return mockPromos;
      }
    },
  },
  faq: {
    getAll: async (): Promise<Faq[]> => {
      try {
        return await fetchApi<Faq[]>('/faq');
      } catch {
        return mockFaqs;
      }
    },
  },
  auth: {
    login: (email: string, password: string) =>
      fetchApi<{ user: User; token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    register: (data: { email: string; password: string; name: string; phone?: string }) =>
      fetchApi<{ user: User; token: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    me: () => fetchApi<User>('/auth/me'),
    updateProfile: (data: Partial<Pick<User, 'name' | 'phone' | 'address'>>) =>
      fetchApi<User>('/auth/profile', { method: 'PATCH', body: JSON.stringify(data) }),
  },
  orders: {
    create: (data: {
      customerName: string;
      phone: string;
      address: string;
      comment?: string;
      paymentMethod: 'CARD' | 'CASH' | 'ONLINE';
      items: { dishId: string; quantity: number }[];
    }) =>
      fetchApi<Order>('/orders', { method: 'POST', body: JSON.stringify(data) }),
    getMy: () => fetchApi<Order[]>('/orders/my'),
  },
  favorites: {
    getAll: () => fetchApi<Dish[]>('/favorites'),
    add: (dishId: string) =>
      fetchApi<Dish>('/favorites', { method: 'POST', body: JSON.stringify({ dishId }) }),
    remove: (dishId: string) =>
      fetchApi<void>(`/favorites/${dishId}`, { method: 'DELETE' }),
  },
};
