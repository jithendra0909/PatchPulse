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
  | 'REGRESSION_TESTING'
  | 'API_REPLAY'
  | 'REFLECTION'
  | 'SAFETY_ANALYSIS'
  | 'AWAITING_APPROVAL'
  | 'PR_CREATING'
  | 'HEALED'
  | 'FAILED';

export interface TelemetryEventPayloadMap {
  'state:changed': {
    incidentId: string;
    previousState: AgentState;
    currentState: AgentState;
    timestamp: number;
    durationMs: number;
  };
  'log:terminal': {
    incidentId: string;
    stream: 'stdout' | 'stderr';
    chunk: string;
    timestamp: number;
  };
  'patch:synthesized': {
    incidentId: string;
    attempt: number;
    filePath: string;
    startLine: number;
    endLine: number;
    unifiedDiff: string;
    beforeCode: string;
    afterCode: string;
  };
  'verification:level_completed': {
    incidentId: string;
    level: 1 | 2 | 3 | 4 | 5;
    name: string;
    passed: boolean;
    durationMs: number;
    details: string;
  };
  'replay:completed': {
    incidentId: string;
    endpoint: string;
    beforeStatus: number;
    afterStatus: number;
    beforeResponse: Record<string, unknown>;
    afterResponse: Record<string, unknown>;
    success: boolean;
  };
  'safety:evaluated': {
    incidentId: string;
    verificationScore: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    scope: 'LOCAL' | 'MODERATE' | 'BROAD';
    metrics: {
      filesChanged: number;
      linesChanged: number;
      testsPassed: number;
      testsFailed: number;
      regressionPassed: boolean;
      replayPassed: boolean;
    };
  };
  'pr:created': {
    incidentId: string;
    prNumber: number;
    prUrl: string;
    branchName: string;
  };
}

export interface IncidentData {
  id: string;
  incidentCode: string;
  timestamp: string;
  microservice: string;
  endpoint: string;
  errorSignature: string;
  errorMessage: string;
  stackTrace: string;
  initialPayload: Record<string, unknown>;
  mttr: string;
  status: 'Healed' | 'Partially Healed' | 'Failed' | 'Pending';
  prNumber?: string;
  prUrl?: string;
  branchName?: string;
  beforeCode?: string;
  afterCode?: string;
  unifiedDiff?: string;
  filePath?: string;
  verificationScore?: number;
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
  testsPassedCount?: number;
  testsTotalCount?: number;
  testEvidenceLogs?: string[];
  replayResult?: {
    beforeStatus: number;
    afterStatus: number;
    beforeTime: string;
    afterTime: string;
  };
  rootCauseAnalysis?: string;
}
