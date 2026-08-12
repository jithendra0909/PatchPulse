import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({
    timeline: [
      { time: 'May 17', traffic: 900, errors: 300, resolved: 280 },
      { time: 'May 18', traffic: 1100, errors: 450, resolved: 430 },
      { time: 'May 19', traffic: 950, errors: 320, resolved: 310 },
      { time: 'May 20', traffic: 1300, errors: 520, resolved: 500 },
      { time: 'May 21', traffic: 1050, errors: 380, resolved: 370 },
      { time: 'May 22', traffic: 1250, errors: 490, resolved: 475 },
      { time: 'May 23', traffic: 1000, errors: 340, resolved: 330 },
      { time: 'May 24', traffic: 1400, errors: 550, resolved: 540 },
    ],
  });
}
