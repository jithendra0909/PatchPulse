export type AgentState =
  | 'IDLE'
  | 'INCIDENT_DETECTED'
  | 'REPRODUCING'
  | 'LOCALIZING'
  | 'PATCH_GENERATING'
  | 'SANDBOX_TESTING'
  | 'API_REPLAY'
  | 'SAFETY_ANALYSIS'
  | 'AWAITING_APPROVAL'
  | 'HEALED'
  | 'FAILED';

export interface TelemetryPayload {
  currentState: AgentState;
  incidentId?: string;
  endpoint?: string;
  errorSignature?: string;
  timestamp: string;
}
