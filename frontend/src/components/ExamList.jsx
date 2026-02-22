const sessionLabel = {
  session_1: 'Session 1',
  rattrapage: 'Rattrapage',
};

export function ExamList({ exams, onDelete }) {
  return (
    <div className="card">
      <h2 className="mb-4 text-lg font-semibold">Calendrier des examens</h2>
      <ul className="space-y-2">
        {exams.map((exam) => (
          <li
            key={exam._id}
            className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
          >
            <div>
              <p className="font-medium">{exam.course?.name}</p>
              <p className="text-sm text-slate-500">
                {sessionLabel[exam.session]} · {new Date(exam.date).toLocaleString('fr-FR')} · Salle {exam.room}
              </p>
            </div>
            <button
              className="rounded-md bg-rose-100 px-3 py-1 text-rose-700 hover:bg-rose-200"
              onClick={() => onDelete(exam._id)}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
