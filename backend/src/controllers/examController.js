import { Exam } from '../models/Exam.js';

const SESSION_LABELS = {
  session_1: 'Session 1',
  session_2: 'Session 2',
  rattrapage: 'Rattrapage',
};

const formatUpcoming = (exams) =>
  exams
    .flatMap((exam) =>
      exam.sessions.map((session) => ({
        examId: exam._id,
        course: exam.course,
        session: session.key,
        sessionLabel: SESSION_LABELS[session.key],
        date: session.date,
        room: session.room,
      }))
    )
    .filter((item) => new Date(item.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

export const getExams = async (_req, res) => {
  const exams = await Exam.find().populate('course', 'name professor ects').sort({ createdAt: -1 });
  res.json(exams);
};

export const getUpcomingExams = async (_req, res) => {
  const exams = await Exam.find().populate('course', 'name professor');
  res.json(formatUpcoming(exams));
};

export const createExam = async (req, res, next) => {
  try {
    const exam = await Exam.create(req.body);
    const populated = await exam.populate('course', 'name professor ects');
    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
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
