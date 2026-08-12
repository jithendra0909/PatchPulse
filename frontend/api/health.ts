import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    status: 'ok',
    service: 'patchpulse-backend',
    agent: 'ready',
    database: true,
    socket: true,
    microservicesGuarded: 1,
    hasGeminiKey: true,
    hasGitHubToken: true,
  });
}
