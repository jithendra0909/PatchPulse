import type { VercelRequest, VercelResponse } from '@vercel/node';

let appSettings = {
  targetRepoOwner: 'jithendra0909',
  targetRepoName: 'PatchPulse',
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
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'PUT' || req.method === 'POST') {
    appSettings = { ...appSettings, ...(req.body || {}) };
    return res.status(200).json({ success: true, settings: appSettings });
  }

  return res.status(200).json(appSettings);
}
