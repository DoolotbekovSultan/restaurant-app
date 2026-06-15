import { Router } from 'express';
import { prisma } from '../utils/prisma.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const [ordersCount, usersCount, avgRating] = await Promise.all([
      prisma.order.count(),
      prisma.user.count(),
      prisma.dish.aggregate({ _avg: { rating: true } }),
    ]);

    res.json({
      customers: usersCount + 12500,
      orders: ordersCount + 48000,
      rating: Math.round((avgRating._avg.rating || 4.8) * 10) / 10,
      deliveryTime: 35,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
