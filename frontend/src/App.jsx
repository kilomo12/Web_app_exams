import { useEffect, useState } from 'react';
import { AuthPage } from './components/AuthPage';
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
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');

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

  const loadProfile = async () => {
    try {
      const profile = await api.me();
      setUser(profile.user);
      await loadData();
    } catch {
      localStorage.removeItem('auth_token');
      setUser(null);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (!user) {
    return (
      <AuthPage
        error={authError}
        onLogin={async (payload) => {
          try {
            setAuthError('');
            const response = await api.login(payload);
            localStorage.setItem('auth_token', response.token);
            setUser(response.user);
            await loadData();
          } catch (error) {
            setAuthError(error.message);
          }
        }}
        onRegister={async (payload) => {
          try {
            setAuthError('');
            const response = await api.register(payload);
            localStorage.setItem('auth_token', response.token);
            setUser(response.user);
            await loadData();
          } catch (error) {
            setAuthError(error.message);
          }
        }}
      />
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl space-y-6 p-4 md:p-8">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Gestion des examens universitaires</h1>
          <p className="mt-1 text-slate-600">Suivez et éditez vos contenus pédagogiques et vos examens en un seul endroit.</p>
          <p className="mt-2 text-sm text-slate-500">Connecté : {user.name} ({user.email})</p>
        </div>
        <button
          type="button"
          onClick={async () => {
            try {
              await api.logout();
            } catch {
              // Ignore logout API failures.
            }
            localStorage.removeItem('auth_token');
            setUser(null);
            setCourses([]);
            setExams([]);
            setUpcoming([]);
          }}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Se déconnecter
        </button>
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
