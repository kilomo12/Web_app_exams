import { useState } from 'react';

const initialState = {
  name: '',
  professor: '',
  ects: 6,
  documentTitle: '',
  documentUrl: '',
  documentType: 'pdf',
};

export function CourseForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const documents =
      form.documentTitle.trim() && form.documentUrl.trim()
        ? [
            {
              title: form.documentTitle.trim(),
              url: form.documentUrl.trim(),
              type: form.documentType,
            },
          ]
        : [];

    await onSubmit({
      name: form.name,
      professor: form.professor,
      ects: Number(form.ects),
      documents,
    });
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-3">
      <h2 className="text-lg font-semibold">Ajouter un cours</h2>
      <input
        className="w-full rounded-md border border-slate-200 px-3 py-2"
        placeholder="Nom du cours"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        className="w-full rounded-md border border-slate-200 px-3 py-2"
        placeholder="Professeur"
        value={form.professor}
        onChange={(e) => setForm({ ...form, professor: e.target.value })}
        required
      />
      <input
        className="w-full rounded-md border border-slate-200 px-3 py-2"
        type="number"
        min="1"
        max="30"
        placeholder="Crédits ECTS"
        value={form.ects}
        onChange={(e) => setForm({ ...form, ects: e.target.value })}
        required
      />

      <div className="rounded-md border border-slate-200 p-3">
        <p className="mb-2 text-sm font-medium text-slate-700">Document du cours (optionnel)</p>
        <input
          className="mb-2 w-full rounded-md border border-slate-200 px-3 py-2"
          placeholder="Titre du document (ex: Chapitre 1)"
          value={form.documentTitle}
          onChange={(e) => setForm({ ...form, documentTitle: e.target.value })}
        />
        <input
          className="mb-2 w-full rounded-md border border-slate-200 px-3 py-2"
          type="url"
          placeholder="URL du document"
          value={form.documentUrl}
          onChange={(e) => setForm({ ...form, documentUrl: e.target.value })}
        />
        <select
          className="w-full rounded-md border border-slate-200 px-3 py-2"
          value={form.documentType}
          onChange={(e) => setForm({ ...form, documentType: e.target.value })}
        >
          <option value="pdf">PDF</option>
          <option value="image">Image</option>
          <option value="other">Autre</option>
        </select>
      </div>

      <button className="rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">
        Enregistrer
      </button>
    </form>
  );
}
