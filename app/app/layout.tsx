import type { ReactNode } from 'react';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

const navLinks = [
  { href: '/app', label: 'Dashboard' },
  { href: '/app/projects', label: 'Projetos' },
  { href: '/app/machines', label: 'Máquinas' },
  { href: '/app/assessments', label: 'Análises' },
  { href: '/app/actions', label: 'Plano de ação' },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-[260px_1fr] bg-slate-100">
      <aside className="flex flex-col gap-8 border-r border-slate-200 bg-white p-6">
        <Link href="/app" className="flex items-center gap-3 text-lg font-semibold text-brand-dark">
          <ShieldAlert className="size-5 text-brand" />
          RiskManager Pro
        </Link>
        <nav className="space-y-2 text-sm text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-xl px-4 py-2 font-medium transition hover:bg-brand/10 hover:text-brand-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-2 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
          <p>
            Logado como <strong>Usuário Demo</strong>
          </p>
          <p>Engenheiro de Segurança</p>
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
