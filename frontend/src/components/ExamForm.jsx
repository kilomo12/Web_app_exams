import { useMemo, useState } from 'react';

const sessionOptions = [
  { key: 'session_1', label: 'Session 1' },
  { key: 'session_2', label: 'Session 2' },
  { key: 'rattrapage', label: 'Rattrapage' },
];

const buildInitial = (initialExam) => ({
  course: initialExam?.course?._id ?? initialExam?.course ?? '',
  sessions:
    initialExam?.sessions?.map((session) => ({
      key: session.key,
      date: session.date ? new Date(session.date).toISOString().slice(0, 16) : '',
      room: session.room ?? '',
    })) ?? sessionOptions.map((session) => ({ key: session.key, date: '', room: '' })),
});

export function ExamForm({ courses, onSubmit, initialExam, onCancel }) {
  const [form, setForm] = useState(() => buildInitial(initialExam));
  const isEdit = useMemo(() => Boolean(initialExam?._id), [initialExam]);

  const updateSession = (sessionKey, field, value) => {
    setForm((current) => ({
      ...current,
      sessions: current.sessions.map((session) =>
        session.key === sessionKey ? { ...session, [field]: value } : session
      ),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({
      course: form.course,
      sessions: form.sessions.map((session) => ({
        key: session.key,
        date: new Date(session.date).toISOString(),
        room: session.room,
      })),
    });
    if (!isEdit) setForm(buildInitial());
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-3">
      <h2 className="text-lg font-semibold">{isEdit ? 'Modifier un examen' : 'Programmer un examen'}</h2>
      <select className="w-full rounded-md border border-slate-200 px-3 py-2" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} required disabled={isEdit}>
        <option value="">Choisir un cours</option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>{course.name}</option>
        ))}
      </select>

      {sessionOptions.map((session) => {
        const sessionForm = form.sessions.find((item) => item.key === session.key);
        return (
          <div key={session.key} className="rounded-md border border-slate-200 p-3">
            <p className="mb-2 text-sm font-medium">{session.label}</p>
            <input className="mb-2 w-full rounded-md border border-slate-200 px-3 py-2" type="datetime-local" value={sessionForm?.date ?? ''} onChange={(e) => updateSession(session.key, 'date', e.target.value)} required />
            <input className="w-full rounded-md border border-slate-200 px-3 py-2" placeholder="Salle" value={sessionForm?.room ?? ''} onChange={(e) => updateSession(session.key, 'room', e.target.value)} required />
          </div>
        );
      })}

      <div className="flex gap-2">
        <button className="rounded-md bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700">{isEdit ? 'Enregistrer les modifications' : "Ajouter l'examen"}</button>
        {isEdit && onCancel && (
          <button type="button" className="rounded-md bg-slate-100 px-4 py-2 font-medium text-slate-700 hover:bg-slate-200" onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
