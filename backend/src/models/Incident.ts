import mongoose, { Schema, Document } from 'mongoose';

export type AgentStage =
  | 'IDLE'
  | 'INJECTING'
  | 'DETECTED'
  | 'ANALYZING'
  | 'LOCALIZING'
  | 'PATCHING'
  | 'VERIFYING'
  | 'REFLECTING'
  | 'VERIFIED'
  | 'AWAITING_APPROVAL'
  | 'PR_CREATING'
  | 'RESOLVED'
  | 'FAILED';

export interface IIncident extends Document {
  incidentId: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'HEALED' | 'FAILED';
  currentStage: AgentStage;
  service: string;
  endpoint: string;
  errorType: string;
  errorMessage: string;
  stackTrace: string;
  payload: Record<string, any>;
  rootCause?: string;
  localizedFile?: string;
  localizedLine?: number;
  patch?: {
    originalCode: string;
    patchedCode: string;
    explanation: string;
    additions: number;
    deletions: number;
  };
  verification?: {
    score: number;
    riskLevel: string;
    testsPassed: number;
    totalTests: number;
    regressions: number;
    replayBeforeStatus: number;
    replayAfterStatus: number;
    logs: string[];
  };
  pr?: {
    number: number;
    url: string;
    branch: string;
  };
  retryCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const IncidentSchema = new Schema<IIncident>(
  {
    incidentId: { type: String, required: true, unique: true, index: true },
    status: { type: String, enum: ['OPEN', 'IN_PROGRESS', 'HEALED', 'FAILED'], default: 'OPEN' },
    currentStage: { type: String, default: 'IDLE' },
    service: { type: String, required: true },
    endpoint: { type: String, required: true },
    errorType: { type: String, required: true },
    errorMessage: { type: String, required: true },
    stackTrace: { type: String, default: '' },
    payload: { type: Schema.Types.Mixed, default: {} },
    rootCause: { type: String },
    localizedFile: { type: String },
    localizedLine: { type: Number },
    patch: {
      originalCode: String,
      patchedCode: String,
      explanation: String,
      additions: Number,
      deletions: Number,
    },
    verification: {
      score: Number,
      riskLevel: String,
      testsPassed: Number,
      totalTests: Number,
      regressions: Number,
      replayBeforeStatus: Number,
      replayAfterStatus: Number,
      logs: [String],
    },
    pr: {
      number: Number,
      url: String,
      branch: String,
    },
    retryCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const IncidentModel = mongoose.model<IIncident>('Incident', IncidentSchema);
