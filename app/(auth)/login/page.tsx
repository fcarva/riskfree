'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/app';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError('Credenciais inválidas. Verifique e tente novamente.');
        return;
      }

      router.replace(result?.url ?? callbackUrl);
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-10 shadow-xl">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-brand-dark">Entrar no RiskManager Pro</h1>
          <p className="text-sm text-slate-500">
            Acesse com suas credenciais corporativas ou utilize o usuário demo provisionado no seed.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-left text-sm font-medium text-slate-600">
            E-mail corporativo
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </label>
          <label className="block text-left text-sm font-medium text-slate-600">
            Senha
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </label>
          {error ? <p className="rounded-xl bg-brand-danger/10 px-4 py-3 text-sm text-brand-danger">{error}</p> : null}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <div className="text-center text-xs text-slate-500">
          <Link href="/forgot-password" className="text-brand hover:text-brand-dark">
            Esqueceu a senha?
          </Link>
        </div>
      </div>
    </div>
  );
}
