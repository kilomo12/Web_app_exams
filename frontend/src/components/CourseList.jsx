export function CourseList({ courses, onDelete }) {
  return (
    <div className="card">
      <h2 className="mb-4 text-lg font-semibold">Matières</h2>
      <ul className="space-y-2">
        {courses.map((course) => (
          <li
            key={course._id}
            className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
          >
            <div>
              <p className="font-medium">{course.name}</p>
              <p className="text-sm text-slate-500">
                {course.professor} · {course.ects} ECTS
              </p>
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
