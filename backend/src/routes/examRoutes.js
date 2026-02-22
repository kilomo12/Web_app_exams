import { Router } from 'express';
import {
  createExam,
  deleteExam,
  getExams,
  getUpcomingExams,
  updateExam,
} from '../controllers/examController.js';

const router = Router();

router.get('/', getExams);
router.get('/upcoming', getUpcomingExams);
router.post('/', createExam);
router.put('/:id', updateExam);
router.delete('/:id', deleteExam);

export default router;
