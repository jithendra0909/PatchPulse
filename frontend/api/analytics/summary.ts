import type { VercelRequest, VercelResponse } from '@vercel/node';

const BACKEND_URL = process.env.BACKEND_URL || '';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  if (BACKEND_URL) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/analytics/summary`);
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err: any) {
      return res.status(502).json({ error: `Backend unreachable: ${err.message}` });
    }
  }

  // No backend — return zeros
  return res.status(200).json({
    autoHealedSuccessRate: '0%',
    averageMttr: '0s',
    totalIncidents: 0,
    engineeringHoursSaved: '0',
  });
}
