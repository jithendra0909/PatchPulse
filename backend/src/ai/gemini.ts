import { AIProvider, AIPatchRequest, AIPatchResponse } from './provider';

export class GeminiProvider implements AIProvider {
  public name = 'Google Gemini 1.5 Flash';
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
  }

  public async generatePatch(request: AIPatchRequest): Promise<AIPatchResponse> {
    console.log(`⚡ [AI ENGINE] Calling Gemini 1.5 for ${request.localizedFile}:${request.localizedLine}`);

    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY not configured. AI patch generation unavailable.');
    }

    try {
      const prompt = `You are a Principal Software Engineer specializing in API repair.
Fix the following API failure:
Error: ${request.errorType} - ${request.errorMessage}
File: ${request.localizedFile} (Line ${request.localizedLine})

Original Code:
\`\`\`python
${request.originalCode}
\`\`\`

Stack Trace:
${request.stackTrace}

Return ONLY a JSON object with keys: "explanation", "patchedCode", "additions", "deletions".`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Gemini API returned status ${response.status}: ${errorBody.substring(0, 200)}`);
      }

      const data: any = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

      if (!rawText) {
        throw new Error('Gemini returned empty response. No candidates available.');
      }

      const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

      let parsed;
      try {
        parsed = JSON.parse(cleanJson);
      } catch (_e) {
        throw new Error('Gemini returned non-JSON response. Unable to parse patch.');
      }

      if (!parsed.patchedCode) {
        throw new Error('Gemini response missing "patchedCode" field.');
      }

      return {
        explanation: parsed.explanation || 'AI-generated repair applied.',
        patchedCode: parsed.patchedCode,
        confidence: 0.0, // Not used — verification score replaces this
        additions: parsed.additions || 0,
        deletions: parsed.deletions || 0,
      };
    } catch (err: any) {
      console.error('[GEMINI ERROR]', err.message);
      throw err; // Propagate — do NOT return fake data
    }
  }
}
