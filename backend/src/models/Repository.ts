import mongoose, { Schema, Document } from 'mongoose';

export interface IRepository extends Document {
  owner: string;
  name: string;
  fullName: string;
  defaultBranch: string;
  selectedBranch: string;
  language: string;
  framework: string;
  githubUrl: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ANALYZING' | 'ERROR';
  verified: boolean;
  lastSync: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RepositorySchema = new Schema<IRepository>(
  {
    owner: { type: String, required: true },
    name: { type: String, required: true },
    fullName: { type: String, required: true, unique: true },
    defaultBranch: { type: String, default: 'main' },
    selectedBranch: { type: String, default: 'main' },
    language: { type: String, default: 'Unknown' },
    framework: { type: String, default: 'Unknown' },
    githubUrl: { type: String, required: true },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE', 'ANALYZING', 'ERROR'], default: 'ACTIVE' },
    verified: { type: Boolean, default: false },
    lastSync: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Repository = mongoose.model<IRepository>('Repository', RepositorySchema);
