import { Router } from 'express';
import { z } from 'zod';
import { Category, Prisma } from '@prisma/client';
import { prisma } from '../utils/prisma.js';

const router = Router();

const querySchema = z.object({
  search: z.string().optional(),
  category: z.nativeEnum(Category).optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  sortBy: z.enum(['popularity', 'rating', 'price_asc', 'price_desc']).optional(),
  popular: z.coerce.boolean().optional(),
  promo: z.coerce.boolean().optional(),
});

router.get('/', async (req, res, next) => {
  try {
    const query = querySchema.parse(req.query);
    const where: Prisma.DishWhereInput = {};

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    if (query.category) where.category = query.category;
    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      where.price = {};
      if (query.minPrice !== undefined) where.price.gte = query.minPrice;
      if (query.maxPrice !== undefined) where.price.lte = query.maxPrice;
    }
    if (query.popular) where.isPopular = true;
    if (query.promo) where.isPromo = true;

    let orderBy: Prisma.DishOrderByWithRelationInput = { popularity: 'desc' };
    switch (query.sortBy) {
      case 'rating':
        orderBy = { rating: 'desc' };
        break;
      case 'price_asc':
        orderBy = { price: 'asc' };
        break;
      case 'price_desc':
        orderBy = { price: 'desc' };
        break;
      case 'popularity':
      default:
        orderBy = { popularity: 'desc' };
    }

    const dishes = await prisma.dish.findMany({ where, orderBy });
    res.json(dishes);
  } catch (err) {
    next(err);
  }
});

router.get('/categories', (_req, res) => {
  const categories = [
    { id: 'PIZZA', label: 'Пицца', icon: '🍕' },
    { id: 'BURGERS', label: 'Бургеры', icon: '🍔' },
    { id: 'SUSHI', label: 'Суши', icon: '🍣' },
    { id: 'DRINKS', label: 'Напитки', icon: '🥤' },
    { id: 'DESSERTS', label: 'Десерты', icon: '🍰' },
    { id: 'NATIONAL', label: 'Национальная кухня', icon: '🍲' },
  ];
  res.json(categories);
});

router.get('/:id', async (req, res, next) => {
  try {
    const dish = await prisma.dish.findUnique({ where: { id: req.params.id } });
    if (!dish) return res.status(404).json({ error: 'Блюдо не найдено' });
    res.json(dish);
  } catch (err) {
    next(err);
  }
});

export default router;
