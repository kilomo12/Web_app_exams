import { useState } from 'react';

const initialState = { course: '', session: 'session_1', date: '', room: '' };

export function ExamForm({ courses, onSubmit }) {
  const [form, setForm] = useState(initialState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({ ...form, date: new Date(form.date).toISOString() });
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-3">
      <h2 className="text-lg font-semibold">Programmer un examen</h2>
      <select
        className="w-full rounded-md border border-slate-200 px-3 py-2"
        value={form.course}
        onChange={(e) => setForm({ ...form, course: e.target.value })}
        required
      >
        <option value="">Choisir un cours</option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.name}
          </option>
        ))}
      </select>
      <select
        className="w-full rounded-md border border-slate-200 px-3 py-2"
        value={form.session}
        onChange={(e) => setForm({ ...form, session: e.target.value })}
      >
        <option value="session_1">Session 1</option>
        <option value="rattrapage">Rattrapage</option>
      </select>
      <input
        className="w-full rounded-md border border-slate-200 px-3 py-2"
        type="datetime-local"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />
      <input
        className="w-full rounded-md border border-slate-200 px-3 py-2"
        placeholder="Salle"
        value={form.room}
        onChange={(e) => setForm({ ...form, room: e.target.value })}
        required
      />
      <button className="rounded-md bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700">
        Ajouter l'examen
      </button>
    </form>
  );
}
