import { Course } from '../models/Course.js';
import { Exam } from '../models/Exam.js';

export const getCourses = async (_req, res) => {
  const courses = await Course.find().sort({ name: 1 });
  res.json(courses);
};

export const createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json(course);
};

export const updateCourse = async (req, res) => {
  const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return res.status(404).json({ message: 'Cours introuvable' });
  }

  return res.json(updated);
};

export const deleteCourse = async (req, res) => {
  const deleted = await Course.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: 'Cours introuvable' });
  }

  await Exam.deleteMany({ course: req.params.id });
  return res.status(204).send();
};
