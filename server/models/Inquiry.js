import mongoose from 'mongoose';
import crypto from 'node:crypto';

const inquirySchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => crypto.randomUUID() },
    name: String,
    company: String,
    email: String,
    phone: String,
    projectType: String,
    message: String,
    read: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },
    confirmedAt: { type: Date },
    receivedAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
