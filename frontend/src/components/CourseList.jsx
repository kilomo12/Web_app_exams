import { useMemo, useState } from 'react';
import { CourseForm } from './CourseForm';

const normalizeDocumentUrl = (url = '') => {
  const trimmed = url.trim();

  if (!trimmed) return '';
  if (/^(data:|blob:|https?:|file:)/i.test(trimmed)) return trimmed;

  if (/^[a-zA-Z]:\\/.test(trimmed)) {
    return `file:///${trimmed.replace(/\\/g, '/')}`;
  }

  if (trimmed.startsWith('/')) {
    return `file://${trimmed}`;
  }

  return trimmed;
};

const getViewerUrl = (document) => {
  const normalizedUrl = normalizeDocumentUrl(document.url);

  if (
    normalizedUrl.startsWith('data:') ||
    normalizedUrl.startsWith('blob:') ||
    normalizedUrl.startsWith('file:') ||
    document.type === 'pdf' ||
    document.type === 'image'
  ) {
    return normalizedUrl;
  }

  return `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(normalizedUrl)}`;
};

export function CourseList({ courses, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const editingCourse = useMemo(
    () => courses.find((course) => course._id === editingId),
    [courses, editingId]
  );

  const selectedDocumentUrl = selectedDocument ? getViewerUrl(selectedDocument) : '';
  const isLocalFile = selectedDocumentUrl.startsWith('file:');

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
                      <li key={`${course._id}-${document.url}-${index}`} className="flex items-center gap-2">
                        <a
                          className="text-indigo-600 hover:text-indigo-800 hover:underline"
                          href={getViewerUrl(document)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {document.title} ({document.type})
                        </a>
                        <button
                          type="button"
                          className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200"
                          onClick={() => setSelectedDocument(document)}
                        >
                          Aperçu
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
            {isLocalFile ? (
              <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                <p className="font-medium">Ce document pointe vers un fichier local.</p>
                <p className="mt-1">Pour des raisons de sécurité, le navigateur bloque souvent l'aperçu des URL <code>file://</code> depuis une application web.</p>
                <p className="mt-1">Importez le PDF depuis le formulaire du cours pour l'enregistrer dans l'application et l'ouvrir sans blocage.</p>
              </div>
            ) : (
              <iframe src={selectedDocumentUrl} title={selectedDocument.title} className="h-[calc(80vh-56px)] w-full rounded border" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
