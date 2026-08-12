import mongoose, { Schema, Document } from 'mongoose';

export interface IIncident extends Document {
  incidentId: string;
  workflowId: string;
  repositoryId: string;
  repositoryFullName: string;
  method: string;
  endpoint: string;
  error: string;
  errorType: string;
  stackTrace: string;
  observedStatus: number;
  expectedStatus: number;
  requestBody: any;
  status: 'OPEN' | 'IN_PROGRESS' | 'HEALED' | 'FAILED' | 'CANCELLED';
  currentState: string;
  mttr: string;
  prNumber: number | null;
  prUrl: string | null;
  branchName: string | null;
  verificationScore: number | null;
  riskLevel: string | null;
  patchedCode: string | null;
  diagnosis: string | null;
  localizedFile: string | null;
  localizedFunction: string | null;
  testResults: any;
  replayResult: any;
  safetyAssessment: any;
  attempts: number;
  createdAt: Date;
  updatedAt: Date;
  healedAt: Date | null;
}

const IncidentSchema = new Schema<IIncident>(
  {
    incidentId: { type: String, required: true, unique: true },
    workflowId: { type: String, required: true },
    repositoryId: { type: String, default: '' },
    repositoryFullName: { type: String, default: '' },
    method: { type: String, default: 'POST' },
    endpoint: { type: String, required: true },
    error: { type: String, required: true },
    errorType: { type: String, default: '' },
    stackTrace: { type: String, default: '' },
    observedStatus: { type: Number, default: 500 },
    expectedStatus: { type: Number, default: 200 },
    requestBody: { type: Schema.Types.Mixed, default: {} },
    status: { type: String, enum: ['OPEN', 'IN_PROGRESS', 'HEALED', 'FAILED', 'CANCELLED'], default: 'OPEN' },
    currentState: { type: String, default: 'INCIDENT_DETECTED' },
    mttr: { type: String, default: '' },
    prNumber: { type: Number, default: null },
    prUrl: { type: String, default: null },
    branchName: { type: String, default: null },
    verificationScore: { type: Number, default: null },
    riskLevel: { type: String, default: null },
    patchedCode: { type: String, default: null },
    diagnosis: { type: String, default: null },
    localizedFile: { type: String, default: null },
    localizedFunction: { type: String, default: null },
    testResults: { type: Schema.Types.Mixed, default: null },
    replayResult: { type: Schema.Types.Mixed, default: null },
    safetyAssessment: { type: Schema.Types.Mixed, default: null },
    attempts: { type: Number, default: 0 },
    healedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const Incident = mongoose.model<IIncident>('Incident', IncidentSchema);
