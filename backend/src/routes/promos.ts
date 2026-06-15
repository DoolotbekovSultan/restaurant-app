import { Router } from 'express';
import { prisma } from '../utils/prisma.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const promos = await prisma.promo.findMany({
      where: { isActive: true, validUntil: { gte: new Date() } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(promos);
  } catch (err) {
    next(err);
  }
});

export default router;
