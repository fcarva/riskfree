import type { ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ShieldAlert, LogOut } from 'lucide-react';
import { auth, signOut } from '@/lib/server/auth';
import { NavLink } from '@/components/layout/nav-link';
import { roleLabels } from '@/lib/presenters';

const navLinks = [
  { href: '/app', label: 'Dashboard' },
  { href: '/app/projects', label: 'Projetos' },
  { href: '/app/machines', label: 'Máquinas' },
  { href: '/app/assessments', label: 'Análises' },
  { href: '/app/actions', label: 'Plano de ação' },
];

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="grid min-h-screen grid-cols-[260px_1fr] bg-slate-100">
      <aside className="flex flex-col gap-8 border-r border-slate-200 bg-white p-6">
        <Link href="/app" className="flex items-center gap-3 text-lg font-semibold text-brand-dark">
          <ShieldAlert className="size-5 text-brand" />
          RiskManager Pro
        </Link>
        <nav className="space-y-2 text-sm text-slate-600">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>
        <div className="mt-auto space-y-2 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
          <p>
            Logado como <strong>{session.user.name ?? session.user.email}</strong>
          </p>
          <p>{roleLabels[session.user.role]}</p>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/login' });
            }}
            className="pt-2"
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-brand hover:text-brand-dark"
            >
              <LogOut className="size-4" /> Sair
            </button>
          </form>
        </div>
      </aside>
      <div className="flex flex-col">
        <header className="flex h-16 items-center justify-end border-b border-slate-200 bg-white px-8">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span>Hoje é {new Date().toLocaleDateString('pt-BR')}</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-slate-100">{children}</main>
      </div>
    </div>
  );
}
