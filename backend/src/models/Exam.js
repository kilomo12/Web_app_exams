import mongoose from 'mongoose';

const examSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    session: {
      type: String,
      enum: ['session_1', 'rattrapage'],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    room: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

examSchema.index({ course: 1, session: 1 }, { unique: true });

export const Exam = mongoose.model('Exam', examSchema);
