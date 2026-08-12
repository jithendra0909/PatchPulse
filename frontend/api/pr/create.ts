import type { VercelRequest, VercelResponse } from '@vercel/node';

const BACKEND_URL = process.env.BACKEND_URL || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (BACKEND_URL) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/pr/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body || {}),
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (err: any) {
      return res.status(502).json({ success: false, error: `Backend unreachable: ${err.message}` });
    }
  }

  return res.status(503).json({
    success: false,
    error: 'BACKEND_URL not configured. PR creation requires real backend with GitHub token.',
  });
}
