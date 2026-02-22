import { useState } from 'react';

export function AuthPage({ onLogin, onRegister, error }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const isLogin = mode === 'login';

  const submit = async (event) => {
    event.preventDefault();
    if (isLogin) {
      await onLogin({ email: form.email, password: form.password });
      return;
    }
    await onRegister(form);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center p-4">
      <section className="w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">{isLogin ? 'Connexion' : 'Inscription'}</h1>
        <p className="mt-1 text-sm text-slate-600">
          {isLogin ? 'Connectez-vous pour accéder à vos examens.' : 'Créez un compte pour gérer vos données personnelles.'}
        </p>

        <form onSubmit={submit} className="mt-5 space-y-4">
          {!isLogin && (
            <label className="block space-y-1">
              <span className="text-sm font-medium text-slate-700">Nom complet</span>
              <input
                required
                minLength={2}
                className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              />
            </label>
          )}

          <label className="block space-y-1">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium text-slate-700">Mot de passe</span>
            <input
              type="password"
              required
              minLength={6}
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            {isLogin ? 'Se connecter' : 'Créer un compte'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(isLogin ? 'register' : 'login')}
          className="mt-4 text-sm font-medium text-blue-600 hover:underline"
        >
          {isLogin ? 'Pas de compte ? Créer un compte' : 'Déjà inscrit ? Se connecter'}
        </button>
      </section>
    </main>
  );
}
