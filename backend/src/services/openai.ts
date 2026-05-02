import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface GenerateOptions {
  rating: number;
  bizName: string;
  category: string;
  lang: string;
  count?: number;
}

export async function generateSuggestions(opts: GenerateOptions): Promise<string[]> {
  const { rating, bizName, category, lang, count = 3 } = opts;

  const systemPrompt = `You generate authentic-sounding Google reviews for a ${category} business called "${bizName}".
Rating: ${rating}/5 stars.

Rules:
- Each review is 2–4 sentences (short).
- Sound natural and human.
- No bullet points.
- Return ONLY a JSON array of strings like:
["review 1", "review 2", "review 3"]
`;

  const userPrompt = `Generate ${count} ${rating}-star reviews. Return JSON only.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.8,
      max_tokens: 500,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });

    const raw = response.choices[0]?.message?.content ?? '[]';

    // clean markdown if present
    const clean = raw.replace(/```json|```/g, '').trim();

    const parsed = JSON.parse(clean);

    return parsed.map((item: any) => ({
      text: item.text,
      tone: item.tone || 'General'
    }));

    return [];

  } catch (error) {
    console.error('OpenAI ERROR:', error);
    return [];
  }
}