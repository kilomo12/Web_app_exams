import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    professor: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    ects: {
      type: Number,
      required: true,
      min: 1,
      max: 30,
    },
    documents: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 2,
        },
        url: {
          type: String,
          required: true,
          trim: true,
        },
        type: {
          type: String,
          enum: ['pdf', 'word', 'image', 'other'],
          default: 'other',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model('Course', courseSchema);
