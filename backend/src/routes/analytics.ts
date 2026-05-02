import { Router, Request, Response } from 'express';
import { prisma } from '../services/prisma';

export const analyticsRouter = Router();

analyticsRouter.get('/', async (req: Request, res: Response) => {
  const placeId = req.query.placeId as string | undefined;
  const days    = parseInt((req.query.days as string) ?? '30', 10);
  const since   = new Date(Date.now() - days * 86400_000);

  const where = {
    createdAt: { gte: since },
    ...(placeId ? { placeId } : {}),
  };

  try {
    const [total, byRating, editedCount] = await Promise.all([
      prisma.feedbackEvent.count({ where }),
      prisma.feedbackEvent.groupBy({
        by: ['rating'],
        where,
        _count: { rating: true },
        orderBy: { rating: 'asc' },
      }),
      prisma.feedbackEvent.count({ where: { ...where, edited: true } }),
    ]);

    const avgRatingData = await prisma.feedbackEvent.aggregate({
      where,
      _avg: { rating: true },
    });

    return res.json({
      total,
      avgRating:       Math.round((avgRatingData._avg.rating ?? 0) * 10) / 10,
      aiAcceptanceRate: total > 0 ? Math.round(((total - editedCount) / total) * 100) : 0,
      byRating: byRating.map((r: any) => ({ rating: r.rating, count: r._count.rating })),
      period:   `${days}d`,
    });
  } catch (err) {
    console.error('Analytics error:', err);
    return res.status(500).json({ error: 'Failed to fetch analytics.' });
  }
});