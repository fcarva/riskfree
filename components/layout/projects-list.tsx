import Link from 'next/link';
import { prisma } from '@/lib/server/db';
import { requireUser } from '@/lib/server/session';
import { projectStatusLabels } from '@/lib/presenters';
import { Badge } from '@/components/ui/badge';

export async function ProjectsList() {
  const user = await requireUser();
  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
    take: 5,
    include: { _count: { select: { machines: true } } },
  });

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
              <p className="text-xs text-slate-500">{project.clientName}</p>
            </div>
            <Badge variant="outline">{projectStatusLabels[project.status]}</Badge>
            <span className="text-xs text-slate-500">{project._count.machines} máquinas</span>
          </li>
        ))}
        {projects.length === 0 ? (
          <li className="py-6 text-center text-xs text-slate-500">Nenhum projeto cadastrado até o momento.</li>
        ) : null}
      </ul>
    </section>
  );
}
