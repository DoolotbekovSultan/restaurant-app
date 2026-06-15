export type Category =
  | 'PIZZA'
  | 'BURGERS'
  | 'SUSHI'
  | 'DRINKS'
  | 'DESSERTS'
  | 'NATIONAL';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  rating: number;
  popularity: number;
  isPopular: boolean;
  isPromo: boolean;
  promoPrice?: number | null;
}

export interface CategoryInfo {
  id: Category;
  label: string;
  icon: string;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  address?: string | null;
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  dish: Dish;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  comment?: string | null;
  paymentMethod: 'CARD' | 'CASH' | 'ONLINE';
  status: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  avatar?: string | null;
  createdAt: string;
}

export interface Promo {
  id: string;
  title: string;
  description: string;
  discount: number;
  image: string;
  validUntil: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface Stats {
  customers: number;
  orders: number;
  rating: number;
  deliveryTime: number;
}

export type SortOption = 'popularity' | 'rating' | 'price_asc' | 'price_desc';

export interface DishFilters {
  search?: string;
  category?: Category;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: SortOption;
  popular?: boolean;
  promo?: boolean;
}
