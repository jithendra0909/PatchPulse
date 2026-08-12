import type { VercelRequest, VercelResponse } from '@vercel/node';

let incidentsStore = [
  { id: '#INC-94', time: '2 mins ago', service: 'Payment Service', endpoint: 'POST /checkout', error: 'SchemaDriftKeyError', mttr: '6.4s', status: 'Healed', pr: 'PR #104', prUrl: 'https://github.com/jithendra0909/PatchPulse/pull/1' },
  { id: '#INC-93', time: '1 hour ago', service: 'User Service', endpoint: 'GET /user/profile', error: 'NullPointerExpression', mttr: '7.1s', status: 'Healed', pr: 'PR #103', prUrl: 'https://github.com/jithendra0909/PatchPulse/pull/1' },
  { id: '#INC-92', time: '3 hours ago', service: 'Order Service', endpoint: 'POST /orders', error: 'TypeMismatchError', mttr: '8.3s', status: 'Healed', pr: 'PR #102', prUrl: 'https://github.com/jithendra0909/PatchPulse/pull/1' },
  { id: '#INC-91', time: '5 hours ago', service: 'Inventory Service', endpoint: 'GET /inventory', error: 'DatabaseTimeoutError', mttr: '9.2s', status: 'Healed', pr: 'PR #101', prUrl: 'https://github.com/jithendra0909/PatchPulse/pull/1' },
];

export default function handler(_req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({ incidents: incidentsStore });
}
