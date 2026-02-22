import { Router } from 'express';
import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from '../controllers/courseController.js';

const router = Router();

router.get('/', getCourses);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;
