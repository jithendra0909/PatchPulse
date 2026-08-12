import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  serviceId: string;
  name: string;
  repository: string;
  branch: string;
  language: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR';
  lastSync: string;
}

const ServiceSchema = new Schema<IService>(
  {
    serviceId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    repository: { type: String, required: true },
    branch: { type: String, default: 'main' },
    language: { type: String, default: 'Python' },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE', 'ERROR'], default: 'ACTIVE' },
    lastSync: { type: String, default: 'Just now' },
  },
  { timestamps: true }
);

export const ServiceModel = mongoose.model<IService>('Service', ServiceSchema);
