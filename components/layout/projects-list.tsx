import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    id: 'PRJ-ACM-01',
    name: 'Linha de Corte - NR-12',
    client: 'ACME Metais',
    status: 'Em análise',
    machines: 18,
  },
  {
    id: 'PRJ-FOO-02',
    name: 'Planta Química - NR-13 & NR-10',
    client: 'Foo Chemicals',
    status: 'Em revisão',
    machines: 9,
  },
  {
    id: 'PRJ-BAR-05',
    name: 'Fábrica de Móveis - Inventário HRN',
    client: 'Bar Design',
    status: 'Implementação',
    machines: 24,
  },
];

export function ProjectsList() {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-brand-dark">Projetos ativos</h2>
          <p className="text-sm text-slate-500">Visão geral dos projetos e máquinas associadas.</p>
        </div>
        <Link href="/app/projects" className="text-sm font-medium text-brand hover:text-brand-dark">
          Ver todos
        </Link>
      </header>
      <ul className="divide-y divide-slate-100 text-sm text-slate-600">
        {projects.map((project) => (
          <li key={project.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
            <div>
              <p className="font-medium text-brand-dark">{project.name}</p>
              <p className="text-xs text-slate-500">{project.client}</p>
            </div>
            <Badge variant="outline">{project.status}</Badge>
            <span className="text-xs text-slate-500">{project.machines} máquinas</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
