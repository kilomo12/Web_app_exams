export function CourseList({ courses, onDelete }) {
  return (
    <div className="card">
      <h2 className="mb-4 text-lg font-semibold">Matières</h2>
      <ul className="space-y-2">
        {courses.map((course) => (
          <li
            key={course._id}
            className="flex items-start justify-between gap-4 rounded-lg border border-slate-100 p-3"
          >
            <div>
              <p className="font-medium">{course.name}</p>
              <p className="text-sm text-slate-500">
                {course.professor} · {course.ects} ECTS
              </p>

              {course.documents?.length > 0 && (
                <ul className="mt-2 space-y-1 text-sm">
                  {course.documents.map((document, index) => (
                    <li key={`${course._id}-${document.url}-${index}`}>
                      <a
                        href={document.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 hover:underline"
                      >
                        {document.title} ({document.type})
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              className="rounded-md bg-rose-100 px-3 py-1 text-rose-700 hover:bg-rose-200"
              onClick={() => onDelete(course._id)}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
