import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({
    autoHealedSuccessRate: '98.4%',
    averageMttr: '6.8s',
    totalIncidents: 142,
    engineeringHoursSaved: 185.5,
  });
}
