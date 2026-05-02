import { Request, Response, NextFunction } from 'express';

export function validateContentType(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'POST' && !req.is('application/json')) {
    return res.status(415).json({ error: 'Content-Type must be application/json' });
  }
  return next();
}