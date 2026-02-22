import { useMemo, useState } from 'react';
import { CourseForm } from './CourseForm';

const getViewerUrl = (document) => {
  if (document.url.startsWith('data:') || document.type === 'pdf' || document.type === 'image') {
    return document.url;
  }

  return `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(document.url)}`;
};

export function CourseList({ courses, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const editingCourse = useMemo(
    () => courses.find((course) => course._id === editingId),
    [courses, editingId]
  );

  return (
    <div className="card">
      <h2 className="mb-4 text-lg font-semibold">Matières</h2>

      {editingCourse && (
        <div className="mb-4 rounded-lg border border-indigo-100 bg-indigo-50 p-3">
          <CourseForm
            initialCourse={editingCourse}
            onSubmit={async (payload) => {
              await onUpdate(editingCourse._id, payload);
              setEditingId(null);
            }}
            onCancel={() => setEditingId(null)}
          />
        </div>
      )}

      <ul className="space-y-2">
        {courses.map((course) => (
          <li key={course._id} className="rounded-lg border border-slate-100 p-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{course.name}</p>
                <p className="text-sm text-slate-500">{course.professor} · {course.ects} ECTS</p>

                {course.documents?.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm">
                    {course.documents.map((document, index) => (
                      <li key={`${course._id}-${document.url}-${index}`}>
                        <button className="text-left text-indigo-600 hover:text-indigo-800 hover:underline" onClick={() => setSelectedDocument(document)}>
                          {document.title} ({document.type})
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex gap-2">
                <button className="rounded-md bg-amber-100 px-3 py-1 text-amber-700 hover:bg-amber-200" onClick={() => setEditingId(course._id)}>
                  Éditer
                </button>
                <button className="rounded-md bg-rose-100 px-3 py-1 text-rose-700 hover:bg-rose-200" onClick={() => onDelete(course._id)}>
                  Supprimer
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="h-[80vh] w-full max-w-4xl rounded-lg bg-white p-3">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">{selectedDocument.title}</h3>
              <button className="rounded-md bg-slate-100 px-3 py-1 text-slate-700" onClick={() => setSelectedDocument(null)}>
                Fermer
              </button>
            </div>
            <iframe src={getViewerUrl(selectedDocument)} title={selectedDocument.title} className="h-[calc(80vh-56px)] w-full rounded border" />
          </div>
        </div>
      )}
    </div>
  );
}
