import type { VercelRequest, VercelResponse } from '@vercel/node';

const BACKEND_URL = process.env.BACKEND_URL || '';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  if (BACKEND_URL) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/health`);
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err: any) {
      return res.status(502).json({
        status: 'error',
        message: `Backend unreachable at ${BACKEND_URL}: ${err.message}`,
        database: 'disconnected',
        socket: 'disconnected',
      });
    }
  }

  return res.status(200).json({
    status: 'degraded',
    service: 'patchpulse-vercel-proxy',
    message: 'BACKEND_URL not configured. Set BACKEND_URL env var in Vercel to connect to real backend.',
    database: 'disconnected',
    socket: 'unavailable',
    github: 'not_configured',
    ai: 'not_configured',
    docker: 'unavailable',
    uptime: 0,
  });
}
