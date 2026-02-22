import { Router } from 'express';
import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from '../controllers/courseController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(requireAuth);

router.get('/', getCourses);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;
