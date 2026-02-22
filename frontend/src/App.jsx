import { useEffect, useState } from 'react';
import { CourseForm } from './components/CourseForm';
import { CourseList } from './components/CourseList';
import { ExamForm } from './components/ExamForm';
import { ExamList } from './components/ExamList';
import { UpcomingExamsDashboard } from './components/UpcomingExamsDashboard';
import { api } from './services/api';

export default function App() {
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const loadData = async () => {
    const [coursesData, examsData, upcomingData] = await Promise.all([
      api.getCourses(),
      api.getExams(),
      api.getUpcomingExams(),
    ]);

    setCourses(coursesData);
    setExams(examsData);
    setUpcoming(upcomingData);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="mx-auto min-h-screen max-w-6xl space-y-6 p-4 md:p-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Gestion des examens universitaires</h1>
        <p className="mt-1 text-slate-600">Suivez et éditez vos contenus pédagogiques et vos examens en un seul endroit.</p>
      </header>

      <UpcomingExamsDashboard exams={upcoming} />

      <section className="grid gap-4 lg:grid-cols-2">
        <CourseForm
          onSubmit={async (payload) => {
            await api.createCourse(payload);
            await loadData();
          }}
        />
        <ExamForm
          courses={courses}
          onSubmit={async (payload) => {
            await api.createExam(payload);
            await loadData();
          }}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <CourseList
          courses={courses}
          onUpdate={async (id, payload) => {
            await api.updateCourse(id, payload);
            await loadData();
          }}
          onDelete={async (id) => {
            await api.deleteCourse(id);
            await loadData();
          }}
        />
        <ExamList
          courses={courses}
          exams={exams}
          onUpdate={async (id, payload) => {
            await api.updateExam(id, payload);
            await loadData();
          }}
          onDelete={async (id) => {
            await api.deleteExam(id);
            await loadData();
          }}
        />
      </section>
    </main>
  );
}
