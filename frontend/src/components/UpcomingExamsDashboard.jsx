export function UpcomingExamsDashboard({ exams }) {
  return (
    <section className="card">
      <h2 className="mb-3 text-lg font-semibold">Prochains examens</h2>
      {exams.length === 0 ? (
        <p className="text-slate-500">Aucun examen à venir.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam, index) => (
            <article key={`${exam.examId}-${exam.session}-${index}`} className="rounded-lg bg-slate-50 p-3 ring-1 ring-slate-100">
              <p className="font-semibold">{exam.course?.name}</p>
              <p className="text-sm text-slate-600">{exam.sessionLabel}</p>
              <p className="mt-1 text-sm">{new Date(exam.date).toLocaleString('fr-FR')}</p>
              <p className="text-sm text-slate-600">Salle {exam.room}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
