import { useMemo, useState } from 'react';

const createEmptyDocument = () => ({ title: '', url: '', type: 'pdf' });

const inferDocumentType = (file) => {
  const mimeType = file.type.toLowerCase();
  const lowerName = file.name.toLowerCase();

  if (mimeType.includes('pdf') || lowerName.endsWith('.pdf')) return 'pdf';
  if (mimeType.includes('word') || lowerName.endsWith('.doc') || lowerName.endsWith('.docx')) return 'word';
  if (mimeType.startsWith('image/')) return 'image';

  return 'other';
};

const toDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Impossible de lire le fichier.'));
    reader.readAsDataURL(file);
  });

const makeInitialState = (initialCourse) => ({
  name: initialCourse?.name ?? '',
  professor: initialCourse?.professor ?? '',
  ects: initialCourse?.ects ?? 6,
  documents:
    initialCourse?.documents?.length > 0
      ? initialCourse.documents.map((doc) => ({ ...doc }))
      : [createEmptyDocument()],
});

export function CourseForm({ onSubmit, initialCourse, onCancel }) {
  const [form, setForm] = useState(() => makeInitialState(initialCourse));
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const isEdit = useMemo(() => Boolean(initialCourse?._id), [initialCourse]);

  const updateDocument = (index, field, value) => {
    setForm((current) => ({
      ...current,
      documents: current.documents.map((doc, docIndex) =>
        docIndex === index ? { ...doc, [field]: value } : doc
      ),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const documents = form.documents
      .map((doc) => ({
        title: doc.title.trim(),
        url: doc.url.trim(),
        type: doc.type,
      }))
      .filter((doc) => doc.title && doc.url);

    await onSubmit({
      name: form.name,
      professor: form.professor,
      ects: Number(form.ects),
      documents,
    });

    if (!isEdit) {
      setForm(makeInitialState());
    }
  };

  const handleDocumentFileChange = async (index, file) => {
    if (!file) return;

    try {
      setUploadError('');
      setUploadingIndex(index);
      const dataUrl = await toDataUrl(file);
      setForm((current) => ({
        ...current,
        documents: current.documents.map((doc, docIndex) =>
          docIndex === index
            ? {
                ...doc,
                title: doc.title || file.name,
                url: dataUrl,
                type: inferDocumentType(file),
              }
            : doc
        ),
      }));
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setUploadingIndex(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-3">
      <h2 className="text-lg font-semibold">{isEdit ? 'Modifier le cours' : 'Ajouter un cours'}</h2>
      <input className="w-full rounded-md border border-slate-200 px-3 py-2" placeholder="Nom du cours" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input className="w-full rounded-md border border-slate-200 px-3 py-2" placeholder="Professeur" value={form.professor} onChange={(e) => setForm({ ...form, professor: e.target.value })} required />
      <input className="w-full rounded-md border border-slate-200 px-3 py-2" type="number" min="1" max="30" placeholder="Crédits ECTS" value={form.ects} onChange={(e) => setForm({ ...form, ects: e.target.value })} required />

      <div className="rounded-md border border-slate-200 p-3">
        <p className="mb-2 text-sm font-medium text-slate-700">Documents du cours (optionnels)</p>
        {uploadError && <p className="mb-2 text-sm text-rose-600">{uploadError}</p>}
        <div className="space-y-2">
          {form.documents.map((document, index) => (
            <div key={`doc-${index}`} className="rounded-md border border-slate-100 p-2">
              <input className="mb-2 w-full rounded-md border border-slate-200 px-3 py-2" placeholder="Titre du document" value={document.title} onChange={(e) => updateDocument(index, 'title', e.target.value)} />
              <input className="mb-2 w-full rounded-md border border-slate-200 px-3 py-2" type="text" placeholder="URL du document (https://...) ou import local" value={document.url} onChange={(e) => updateDocument(index, 'url', e.target.value)} />
              <label className="mb-2 block rounded-md border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-600">
                <span className="mb-1 block font-medium">ou importer depuis mon ordinateur</span>
                <input
                  className="w-full text-sm"
                  type="file"
                  onChange={(e) => handleDocumentFileChange(index, e.target.files?.[0])}
                />
                {uploadingIndex === index && <span className="mt-1 block text-indigo-600">Lecture du fichier...</span>}
              </label>
              <div className="flex gap-2">
                <select className="w-full rounded-md border border-slate-200 px-3 py-2" value={document.type} onChange={(e) => updateDocument(index, 'type', e.target.value)}>
                  <option value="pdf">PDF</option>
                  <option value="word">Word</option>
                  <option value="image">Image</option>
                  <option value="other">Autre</option>
                </select>
                <button type="button" className="rounded-md bg-slate-100 px-3 py-2 text-slate-700 hover:bg-slate-200" onClick={() =>
                    setForm((current) => {
                      const nextDocuments = current.documents.filter((_, docIndex) => docIndex !== index);
                      return {
                        ...current,
                        documents: nextDocuments.length > 0 ? nextDocuments : [createEmptyDocument()],
                      };
                    })
                  }>
                  Retirer
                </button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="mt-2 rounded-md bg-slate-100 px-3 py-2 text-slate-700 hover:bg-slate-200" onClick={() => setForm((current) => ({ ...current, documents: [...current.documents, createEmptyDocument()] }))}>
          Ajouter un document
        </button>
      </div>

      <div className="flex gap-2">
        <button className="rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">{isEdit ? 'Enregistrer les modifications' : 'Enregistrer'}</button>
        {isEdit && onCancel && (
          <button type="button" className="rounded-md bg-slate-100 px-4 py-2 font-medium text-slate-700 hover:bg-slate-200" onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
