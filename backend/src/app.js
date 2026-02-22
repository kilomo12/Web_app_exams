import cors from 'cors';
import express from 'express';
import courseRoutes from './routes/courseRoutes.js';
import examRoutes from './routes/examRoutes.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/courses', courseRoutes);
app.use('/api/exams', examRoutes);
