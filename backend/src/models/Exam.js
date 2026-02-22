import mongoose from 'mongoose';

const examSessionSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      enum: ['session_1', 'session_2', 'rattrapage'],
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
  { _id: false }
);

const examSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      unique: true,
    },
    sessions: {
      type: [examSessionSchema],
      validate: {
        validator: (value) => {
          if (!Array.isArray(value) || value.length !== 3) return false;
          const keys = value.map((session) => session.key).sort();
          return JSON.stringify(keys) === JSON.stringify(['rattrapage', 'session_1', 'session_2']);
        },
        message: 'Un examen doit contenir Session 1, Session 2 et Rattrapage.',
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Exam = mongoose.model('Exam', examSchema);
