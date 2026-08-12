export type AgentState =
  | 'IDLE'
  | 'INCIDENT_DETECTED'
  | 'LOCALIZING'
  | 'PATCH_GENERATING'
  | 'SANDBOX_TESTING'
  | 'HEALED'
  | 'FAILED';

export interface TelemetryPayload {
  currentState: AgentState;
  incidentId?: string;
  endpoint?: string;
  errorSignature?: string;
  timestamp: string;
}
