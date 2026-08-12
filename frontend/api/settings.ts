import type { VercelRequest, VercelResponse } from '@vercel/node';

const BACKEND_URL = process.env.BACKEND_URL || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (BACKEND_URL) {
    try {
      const options: RequestInit = { headers: { 'Content-Type': 'application/json' } };
      if (req.method === 'PUT' || req.method === 'POST') {
        options.method = req.method;
        options.body = JSON.stringify(req.body || {});
      }
      const response = await fetch(`${BACKEND_URL}/api/settings`, options);
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (err: any) {
      return res.status(502).json({ error: `Backend unreachable: ${err.message}` });
    }
  }

  // No backend — return defaults without pretending they're persisted
  return res.status(200).json({
    targetRepoOwner: '',
    targetRepoName: '',
    testCommand: 'pytest tests/ --maxfail=1 -q',
    executionMode: 'Docker Subprocess (Isolated)',
    timeoutSeconds: 15,
    cpuLimit: '0.5 CPU',
    memoryLimit: '256 MB',
    networkIsolation: true,
    primaryModel: 'Gemini 1.5 Flash',
    fallbackModel: 'Gemini 1.5 Pro',
    maxRetries: 3,
    temperature: 0.2,
    topP: 0.9,
    autoModeEnabled: false,
    autoModeIntervalSeconds: 60,
    _warning: 'BACKEND_URL not configured. Settings are not persisted.',
  });
}
