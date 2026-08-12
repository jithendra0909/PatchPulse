import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  targetRepoOwner: string;
  targetRepoName: string;
  testCommand: string;
  executionMode: string;
  timeoutSeconds: number;
  cpuLimit: string;
  memoryLimit: string;
  networkIsolation: boolean;
  primaryModel: string;
  fallbackModel: string;
  maxRetries: number;
  temperature: number;
  topP: number;
  autoModeEnabled: boolean;
  autoModeIntervalSeconds: number;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    targetRepoOwner: { type: String, default: '' },
    targetRepoName: { type: String, default: '' },
    testCommand: { type: String, default: 'pytest tests/ --maxfail=1 -q' },
    executionMode: { type: String, default: 'Docker Subprocess (Isolated)' },
    timeoutSeconds: { type: Number, default: 15 },
    cpuLimit: { type: String, default: '0.5 CPU' },
    memoryLimit: { type: String, default: '256 MB' },
    networkIsolation: { type: Boolean, default: true },
    primaryModel: { type: String, default: 'Gemini 1.5 Flash' },
    fallbackModel: { type: String, default: 'Gemini 1.5 Pro' },
    maxRetries: { type: Number, default: 3 },
    temperature: { type: Number, default: 0.2 },
    topP: { type: Number, default: 0.9 },
    autoModeEnabled: { type: Boolean, default: false },
    autoModeIntervalSeconds: { type: Number, default: 60 },
  },
  { timestamps: true }
);

export const Settings = mongoose.model<ISettings>('Settings', SettingsSchema);
