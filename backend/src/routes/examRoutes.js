import { Router } from 'express';
import {
  createExam,
  deleteExam,
  getExams,
  getUpcomingExams,
  updateExam,
} from '../controllers/examController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(requireAuth);

router.get('/', getExams);
router.get('/upcoming', getUpcomingExams);
router.post('/', createExam);
router.put('/:id', updateExam);
router.delete('/:id', deleteExam);

export default router;
