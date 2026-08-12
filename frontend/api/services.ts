import type { VercelRequest, VercelResponse } from '@vercel/node';

const BACKEND_URL = process.env.BACKEND_URL || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (BACKEND_URL) {
    try {
      const options: RequestInit = { headers: { 'Content-Type': 'application/json' } };
      if (req.method === 'POST') {
        options.method = 'POST';
        options.body = JSON.stringify(req.body || {});
      }
      const response = await fetch(`${BACKEND_URL}/api/services`, options);
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (err: any) {
      return res.status(502).json({ services: [], error: `Backend unreachable: ${err.message}` });
    }
  }

  // No backend — return empty services list
  return res.status(200).json({ services: [] });
}
