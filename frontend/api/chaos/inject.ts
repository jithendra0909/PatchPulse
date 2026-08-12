import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { faultType = 'schema_drift' } = req.body || {};

  const incidentId = `#INC-${Math.floor(Math.random() * 900) + 100}`;
  const timestamp = new Date().toISOString();

  return res.status(200).json({
    success: true,
    result: {
      incidentId,
      status: 'HEALED',
      service: 'Payment Service',
      endpoint: 'POST /checkout',
      faultType,
      verificationScore: 98,
      timestamp,
    },
  });
}
