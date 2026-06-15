import { Router } from 'express';
import { z } from 'zod';
import { PaymentMethod } from '@prisma/client';
import { prisma } from '../utils/prisma.js';
import { authenticate, optionalAuth, AuthRequest } from '../middleware/auth.js';

const router = Router();

const orderItemSchema = z.object({
  dishId: z.string(),
  quantity: z.number().int().min(1).max(99),
});

const createOrderSchema = z.object({
  customerName: z.string().min(2, 'Введите имя'),
  phone: z.string().min(10, 'Введите телефон'),
  address: z.string().min(5, 'Введите адрес'),
  comment: z.string().optional(),
  paymentMethod: z.nativeEnum(PaymentMethod),
  items: z.array(orderItemSchema).min(1, 'Корзина пуста'),
});

router.post('/', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const data = createOrderSchema.parse(req.body);
    const dishIds = data.items.map((i) => i.dishId);
    const dishes = await prisma.dish.findMany({ where: { id: { in: dishIds } } });
    const dishMap = new Map(dishes.map((d) => [d.id, d]));

    let total = 0;
    const orderItems = data.items.map((item) => {
      const dish = dishMap.get(item.dishId);
      if (!dish) throw new Error(`Блюдо ${item.dishId} не найдено`);
      const price = dish.isPromo && dish.promoPrice ? dish.promoPrice : dish.price;
      total += price * item.quantity;
      return { dishId: item.dishId, quantity: item.quantity, price };
    });

    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          userId: req.user?.userId,
          customerName: data.customerName,
          phone: data.phone,
          address: data.address,
          comment: data.comment,
          paymentMethod: data.paymentMethod,
          total,
          items: { create: orderItems },
        },
        include: {
          items: { include: { dish: true } },
        },
      });

      for (const item of data.items) {
        await tx.dish.update({
          where: { id: item.dishId },
          data: { popularity: { increment: item.quantity } },
        });
      }

      return created;
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

router.get('/my', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.userId },
      include: { items: { include: { dish: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const orderId = String(req.params.id);
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { dish: true } } },
    });
    if (!order) return res.status(404).json({ error: 'Заказ не найден' });
    if (order.userId && order.userId !== req.user?.userId) {
      return res.status(403).json({ error: 'Доступ запрещён' });
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
});

export default router;
