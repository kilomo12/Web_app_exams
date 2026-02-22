import { useMemo, useState } from 'react';
import { ExamForm } from './ExamForm';

const sessionLabel = {
  session_1: 'Session 1',
  session_2: 'Session 2',
  rattrapage: 'Rattrapage',
};

export function ExamList({ courses, exams, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);

  const editingExam = useMemo(() => exams.find((exam) => exam._id === editingId), [exams, editingId]);

  return (
    <div className="card">
      <h2 className="mb-4 text-lg font-semibold">Calendrier des examens</h2>

      {editingExam && (
        <div className="mb-4 rounded-lg border border-emerald-100 bg-emerald-50 p-3">
          <ExamForm
            courses={courses}
            initialExam={editingExam}
            onSubmit={async (payload) => {
              await onUpdate(editingExam._id, payload);
              setEditingId(null);
            }}
            onCancel={() => setEditingId(null)}
          />
        </div>
      )}

      <ul className="space-y-2">
        {exams.map((exam) => (
          <li key={exam._id} className="rounded-lg border border-slate-100 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-medium">{exam.course?.name}</p>
              <div className="flex gap-2">
                <button className="rounded-md bg-amber-100 px-3 py-1 text-amber-700 hover:bg-amber-200" onClick={() => setEditingId(exam._id)}>
                  Éditer
                </button>
                <button className="rounded-md bg-rose-100 px-3 py-1 text-rose-700 hover:bg-rose-200" onClick={() => onDelete(exam._id)}>
                  Supprimer
                </button>
              </div>
            </div>
            <ul className="space-y-1 text-sm text-slate-600">
              {exam.sessions.map((session) => (
                <li key={`${exam._id}-${session.key}`}>
                  {sessionLabel[session.key]} · {new Date(session.date).toLocaleString('fr-FR')} · Salle {session.room}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
