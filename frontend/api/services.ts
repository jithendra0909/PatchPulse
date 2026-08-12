import type { VercelRequest, VercelResponse } from '@vercel/node';

let servicesList = [
  { id: 'srv-1', name: 'PatchPulse Guarded API', repository: 'jithendra0909/PatchPulse', branch: 'main', language: 'Python/TypeScript', status: 'ACTIVE', lastSync: 'Just now' },
  { id: 'srv-2', name: 'User Service', repository: 'jithendra0909/user-service', branch: 'main', language: 'Python', status: 'ACTIVE', lastSync: '5m ago' },
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { name, repository, branch = 'main', language = 'Python' } = req.body || {};
    const newService = {
      id: `srv-${Date.now()}`,
      name: name || 'New Microservice',
      repository: repository || 'jithendra0909/new-service',
      branch,
      language,
      status: 'ACTIVE',
      lastSync: 'Just now',
    };
    servicesList.unshift(newService);
    return res.status(200).json({ success: true, service: newService, services: servicesList });
  }

  return res.status(200).json({ services: servicesList });
}
