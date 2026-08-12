import type { VercelRequest, VercelResponse } from '@vercel/node';

const BACKEND_URL = process.env.BACKEND_URL || '';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  if (BACKEND_URL) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/analytics/timeline`);
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err: any) {
      return res.status(502).json({ timeline: [], error: `Backend unreachable: ${err.message}` });
    }
  }

  // No backend — return empty timeline
  return res.status(200).json({ timeline: [] });
}
