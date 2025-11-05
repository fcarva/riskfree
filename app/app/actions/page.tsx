import { ActionStatus } from '@prisma/client';
import { prisma } from '@/lib/server/db';
import { requireUser } from '@/lib/server/session';
import { actionStatusLabels, priorityLabels } from '@/lib/presenters';

const columnsOrder = [
  ActionStatus.PENDING,
  ActionStatus.IN_PROGRESS,
  ActionStatus.COMPLETED,
  ActionStatus.VERIFIED,
];

export default async function ActionsPage() {
  const user = await requireUser();
  const actions = await prisma.action.findMany({
    where: { project: { userId: user.id } },
    orderBy: [{ priority: 'desc' }, { deadline: 'asc' }],
    include: { project: { select: { name: true } } },
  });

  const grouped = columnsOrder.map((status) => ({
    status,
    items: actions.filter((action) => action.status === status),
  }));

  return (
    <div className="space-y-6 p-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-brand-dark">Plano de ação</h1>
        <p className="text-sm text-slate-500">Acompanhe a implementação das recomendações críticas.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {grouped.map((column) => (
          <section key={column.status} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <header className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-brand-dark">{actionStatusLabels[column.status]}</h2>
              <span className="text-xs text-slate-500">{column.items.length} itens</span>
            </header>
            <ul className="space-y-3 text-sm text-slate-600">
              {column.items.map((action) => (
                <li key={action.id} className="space-y-2 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{action.project.name}</span>
                    <span>Prazo {new Date(action.deadline).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <p className="font-medium text-brand-dark">{action.description}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Responsável: {action.responsible}</span>
                    <span className="font-semibold">Prioridade: {priorityLabels[action.priority]}</span>
                  </div>
                </li>
              ))}
              {column.items.length === 0 ? (
                <li className="rounded-xl border border-dashed border-slate-200 bg-white p-4 text-center text-xs text-slate-500">
                  Nenhuma ação neste estágio.
                </li>
              ) : null}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
