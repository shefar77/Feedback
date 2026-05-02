import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../services/prisma';

export const submitRouter = Router();

const schema = z.object({
  rating:          z.number().int().min(1).max(5),
  context: z.object({
    placeId: z.string().min(1),
    bizName: z.string().min(1),
    category: z.string().min(1),
    lang: z.string().min(2),
  }),  
  text: z.string().min(1),
});

submitRouter.post('/', async (req: Request, res: Response) => {
  console.log("REQ BODY:", req.body);
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() });
  }

  const { rating, context, text } = parsed.data;

  try {
    const record = await prisma.feedbackEvent.create({
      data: {
        placeId:         context.placeId,
        bizName:         context.bizName,
        category:        context.category,
        lang:            context.lang,
        rating:          rating,
        suggestionIndex: 0,
        finalText:       text,
        edited:          false,
      },
    });

    const googleReviewUrl = `https://search.google.com/local/writereview?placeid=${context.placeId}`;

    return res.status(201).json({
      id:             record.id,
      googleReviewUrl,
      storedAt:       record.createdAt,
    });
  } catch (err) {
    console.error('Submit error:', err);
    return res.status(500).json({ error: 'Failed to store feedback.' });
  }
});