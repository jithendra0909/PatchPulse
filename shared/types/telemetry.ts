export type AgentState =
  | 'IDLE'
  | 'INCIDENT_DETECTED'
  | 'REPRODUCING'
  | 'DIAGNOSING'
  | 'LOCALIZING'
  | 'CONTEXT_GATHERING'
  | 'PATCH_GENERATING'
  | 'PATCH_VALIDATING'
  | 'SANDBOX_TESTING'
  | 'TARGETED_TESTING'
  | 'REGRESSION_TESTING'
  | 'API_REPLAY'
  | 'REFLECTION'
  | 'SAFETY_ANALYSIS'
  | 'AWAITING_APPROVAL'
  | 'PR_CREATING'
  | 'HEALED'
  | 'FAILED';

export interface RepositoryMetadata {
  id: string;
  provider: 'github';
  owner: string;
  name: string;
  fullName: string;
  defaultBranch: string;
  selectedBranch: string;
  language: string;
  framework: string;
  testRunner: string;
  packageManager: string;
  connectedAt: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR';
}

export interface PatchHunk {
  file: string;
  originalCode: string;
  patchedCode: string;
  explanation: string;
  additions: number;
  deletions: number;
}

export interface VerificationResult {
  score: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'BLOCKED';
  testsPassed: number;
  totalTests: number;
  regressions: number;
  replayBeforeStatus: number;
  replayAfterStatus: number;
  logs: string[];
}

export interface IncidentRecord {
  incidentId: string;
  workflowId: string;
  repositoryId: string;
  service: string;
  endpoint: string;
  errorType: string;
  errorMessage: string;
  stackTrace: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'HEALED' | 'FAILED';
  currentStage: AgentState;
  localizedFile?: string;
  localizedLine?: number;
  patch?: PatchHunk;
  verification?: VerificationResult;
  pr?: {
    number: number;
    url: string;
    branch: string;
  };
  createdAt: string;
  updatedAt: string;
}
