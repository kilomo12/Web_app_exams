import { Exam } from '../models/Exam.js';

export const getExams = async (_req, res) => {
  const exams = await Exam.find()
    .populate('course', 'name professor ects')
    .sort({ date: 1 });

  res.json(exams);
};

export const getUpcomingExams = async (_req, res) => {
  const now = new Date();
  const exams = await Exam.find({ date: { $gte: now } })
    .populate('course', 'name professor')
    .sort({ date: 1 })
    .limit(5);

  res.json(exams);
};

export const createExam = async (req, res) => {
  const exam = await Exam.create(req.body);
  const populated = await exam.populate('course', 'name professor ects');
  res.status(201).json(populated);
};

export const updateExam = async (req, res) => {
  const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('course', 'name professor ects');

  if (!exam) {
    return res.status(404).json({ message: 'Examen introuvable' });
  }

  return res.json(exam);
};

export const deleteExam = async (req, res) => {
  const deleted = await Exam.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: 'Examen introuvable' });
  }

  return res.status(204).send();
};
