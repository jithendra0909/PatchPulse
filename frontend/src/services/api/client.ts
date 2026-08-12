const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export async function fetchApi<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `API Error: ${response.status} ${response.statusText}`;
    try {
      const parsed = JSON.parse(errorText);
      if (parsed.error) errorMessage = parsed.error;
    } catch (_e) {}
    throw new Error(errorMessage);
  }

  return response.json();
}

export const api = {
  getHealth: () => fetchApi('/api/health'),
  getServices: () => fetchApi('/api/services'),
  connectRepository: (repository: string, branch = 'main') =>
    fetchApi('/api/services/connect', {
      method: 'POST',
      body: JSON.stringify({ repository, branch }),
    }),
  injectChaos: (faultType: string) =>
    fetchApi('/api/chaos/inject', {
      method: 'POST',
      body: JSON.stringify({ faultType }),
    }),
  createPullRequest: (params: { repoOwner?: string; repoName?: string; filePath?: string; title?: string }) =>
    fetchApi('/api/pr/create', {
      method: 'POST',
      body: JSON.stringify(params),
    }),
  getIncidents: () => fetchApi('/api/incidents'),
  getAnalyticsSummary: () => fetchApi('/api/analytics/summary'),
  getAnalyticsTimeline: () => fetchApi('/api/analytics/timeline'),
  getSettings: () => fetchApi('/api/settings'),
  updateSettings: (settings: any) =>
    fetchApi('/api/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),
};
