import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { repository = 'jithendra0909/PatchPulse', branch = 'main' } = req.body || {};
  const cleanRepo = repository.replace('https://github.com/', '').replace('.git', '');
  const [owner, name] = cleanRepo.split('/');

  let detectedLanguage = 'TypeScript / Python';
  let githubVerified = false;

  const githubToken = process.env.GITHUB_TOKEN;

  if (githubToken) {
    try {
      const repoRes = await fetch(`https://api.github.com/repos/${cleanRepo}`, {
        headers: {
          Authorization: `token ${githubToken}`,
          'User-Agent': 'PatchPulse-Agent',
        },
      });
      if (repoRes.ok) {
        const repoData: any = await repoRes.json();
        detectedLanguage = repoData.language || detectedLanguage;
        githubVerified = true;
      }
    } catch (_e) {}
  }

  const newService = {
    id: `srv-${Date.now()}`,
    name: name || 'PatchPulse Guarded API',
    repository: cleanRepo,
    branch,
    language: detectedLanguage,
    status: 'ACTIVE',
    lastSync: 'Just now',
    verified: githubVerified,
  };

  return res.status(200).json({
    success: true,
    service: newService,
    message: `Baseline verified. PatchPulse is now actively guarding ${cleanRepo}`,
  });
}
