import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', async (req: AuthRequest, res, next) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user!.userId },
      include: { dish: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(favorites.map((f) => f.dish));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: AuthRequest, res, next) => {
  try {
    const { dishId } = z.object({ dishId: z.string() }).parse(req.body);
    const favorite = await prisma.favorite.upsert({
      where: { userId_dishId: { userId: req.user!.userId, dishId } },
      create: { userId: req.user!.userId, dishId },
      update: {},
      include: { dish: true },
    });
    res.status(201).json(favorite.dish);
  } catch (err) {
    next(err);
  }
});

router.delete('/:dishId', async (req: AuthRequest, res, next) => {
  try {
    const dishId = String(req.params.dishId);
    await prisma.favorite.deleteMany({
      where: { userId: req.user!.userId, dishId },
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
