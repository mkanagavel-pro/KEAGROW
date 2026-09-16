import mongoose from 'mongoose';

const caseStudySchema = new mongoose.Schema(
  {
    challenge: String,
    solution: String,
    technology: String,
    outcome: String,
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    // Human-readable slug (e.g. "royal-snacks") instead of an auto ObjectId,
    // so URLs/IDs stay readable and match the original static seed data.
    _id: { type: String },
    title: { type: String, required: true },
    category: { type: String, required: true },
    tagline: String,
    description: String,
    liveUrl: String,
    isPlaceholder: { type: Boolean, default: false },
    statusBadge: { type: String, default: 'Project Showcase' },
    technologies: { type: [String], default: [] },
    caseStudy: caseStudySchema,
    accentColor: String,
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const Project = mongoose.model('Project', projectSchema);
