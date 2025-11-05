import { ActionStatus } from '@prisma/client';
import { prisma } from '@/lib/server/db';
import { requireUser } from '@/lib/server/session';
import { actionStatusLabels } from '@/lib/presenters';
import { Badge } from '@/components/ui/badge';

export async function PendingActions() {
  const user = await requireUser();
  const actions = await prisma.action.findMany({
    where: {
      project: { userId: user.id },
      status: { notIn: [ActionStatus.COMPLETED, ActionStatus.VERIFIED] },
    },
    orderBy: { deadline: 'asc' },
    take: 4,
    include: { project: { select: { name: true } } },
  });

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-brand-dark">Ações críticas</h2>
        <p className="text-sm text-slate-500">Priorize recomendações com prazo próximo e alta severidade.</p>
      </header>
      <ul className="space-y-4 text-sm text-slate-600">
        {actions.map((action) => (
          <li key={action.id} className="space-y-2 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{action.project.name}</span>
              <span>Prazo {new Date(action.deadline).toLocaleDateString('pt-BR')}</span>
            </div>
            <p className="font-medium text-brand-dark">{action.description}</p>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Responsável: {action.responsible}</span>
              <Badge variant={action.status === ActionStatus.IN_PROGRESS ? 'default' : 'danger'}>
                {actionStatusLabels[action.status]}
              </Badge>
            </div>
          </li>
        ))}
        {actions.length === 0 ? (
          <li className="rounded-xl border border-dashed border-slate-200 bg-white p-4 text-center text-xs text-slate-500">
            Todas as ações estão concluídas — excelente trabalho!
          </li>
        ) : null}
      </ul>
    </section>
  );
}
