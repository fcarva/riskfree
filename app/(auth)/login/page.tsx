import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-10 shadow-xl">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-brand-dark">Entrar no RiskManager Pro</h1>
          <p className="text-sm text-slate-500">Acesse com suas credenciais corporativas ou envie convite para novos usuários.</p>
        </div>
        <form className="space-y-4">
          <label className="block text-left text-sm font-medium text-slate-600">
            E-mail corporativo
            <input
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </label>
          <label className="block text-left text-sm font-medium text-slate-600">
            Senha
            <input
              type="password"
              required
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-dark"
          >
            Entrar
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
