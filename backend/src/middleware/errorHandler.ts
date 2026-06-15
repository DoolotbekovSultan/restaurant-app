import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Ошибка валидации',
      details: err.errors.map((e) => ({ field: e.path.join('.'), message: e.message })),
    });
  }

  if (err instanceof Error) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Внутренняя ошибка сервера' });
  }

  return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
}
