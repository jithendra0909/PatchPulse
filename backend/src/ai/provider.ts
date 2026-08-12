export interface AIPatchRequest {
  errorType: string;
  errorMessage: string;
  stackTrace: string;
  localizedFile: string;
  localizedLine: number;
  originalCode: string;
}

export interface AIPatchResponse {
  explanation: string;
  patchedCode: string;
  confidence: number;
  additions: number;
  deletions: number;
}

export interface AIProvider {
  name: string;
  generatePatch(request: AIPatchRequest): Promise<AIPatchResponse>;
}
