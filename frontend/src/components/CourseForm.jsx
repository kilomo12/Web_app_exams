import { useState } from 'react';

const initialState = { name: '', professor: '', ects: 6 };

export function CourseForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({ ...form, ects: Number(form.ects) });
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
      <button className="rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">
        Enregistrer
      </button>
    </form>
  );
}
