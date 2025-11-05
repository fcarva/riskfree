import Link from 'next/link';
import { prisma } from '@/lib/server/db';
import { requireUser } from '@/lib/server/session';
import { projectStatusLabels } from '@/lib/presenters';

export default async function ProjectsPage() {
  const user = await requireUser();
  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6 p-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-brand-dark">Projetos</h1>
          <p className="text-sm text-slate-500">Organize clientes, unidades e cronogramas de apreciação de riscos.</p>
        </div>
        <Link
          href="/app/projects/new"
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Novo projeto
        </Link>
      </header>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full table-fixed">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-3">Projeto</th>
              <th className="px-6 py-3">Cliente</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Início</th>
              <th className="px-6 py-3">Término</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-600">
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-slate-100">
                <td className="px-6 py-4">
                  <div className="font-medium text-brand-dark">{project.name}</div>
                  <div className="text-xs text-slate-500">
                    {project.type.length ? project.type.join(', ') : 'Sem metodologia definida'}
                  </div>
                </td>
                <td className="px-6 py-4">{project.clientName}</td>
                <td className="px-6 py-4">{projectStatusLabels[project.status]}</td>
                <td className="px-6 py-4">{new Date(project.startDate).toLocaleDateString('pt-BR')}</td>
                <td className="px-6 py-4">
                  {project.endDate ? new Date(project.endDate).toLocaleDateString('pt-BR') : '—'}
                </td>
              </tr>
            ))}
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-xs text-slate-500">
                  Nenhum projeto cadastrado. Utilize o botão "Novo projeto" para começar.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
