import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { generateSuggestions } from '../services/openai';
import { getRedis } from '../services/redis';

export const generateRouter = Router();

const schema = z.object({
  rating: z.number().int().min(1).max(5),
  context: z.object({
    placeId:  z.string().min(1),
    bizName:  z.string().min(1).max(100),
    category: z.string().min(1).max(50),
    lang:     z.string().min(2).max(10),
  }),
});

generateRouter.post('/', async (req: Request, res: Response) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() });
  }

  const { rating, context } = parsed.data;
  const redis = getRedis();

  // Cache key: rating + category + lang (NOT placeId — suggestions are generic enough to share)
  const cacheKey = `suggestions:${rating}:${context.category}:${context.lang}`;
  const start = Date.now();

  try {
    // Try cache first
    const cached = await redis.get(cacheKey).catch(() => null);
    if (cached) {
      return res.json({
        suggestions: JSON.parse(cached),
        cached: true,
        latencyMs: Date.now() - start,
      });
    }

    // Generate via OpenAI
    const suggestions = await generateSuggestions({
      rating,
      bizName: context.bizName,
      category: context.category,
      lang: context.lang,
      count: 3,
    });

    // Cache result
    const ttl = parseInt(process.env.CACHE_TTL_SECONDS ?? '3600', 10);
    await redis.setex(cacheKey, ttl, JSON.stringify(suggestions)).catch(() => {});

    return res.json({
      suggestions,
      cached: false,
      latencyMs: Date.now() - start,
    });
  } catch (err) {
    console.error('Generation error:', err);
    return res.status(502).json({ error: 'Failed to generate suggestions. Please retry.' });
  }
});