import { prisma } from '@/lib/server/db';
import { requireUser } from '@/lib/server/session';
import { machineStatusLabels, riskLevelBadgeVariants, riskLevelLabels } from '@/lib/presenters';
import { Badge } from '@/components/ui/badge';

export default async function MachinesPage() {
  const user = await requireUser();
  const machines = await prisma.machine.findMany({
    where: { project: { userId: user.id } },
    orderBy: { updatedAt: 'desc' },
    include: {
      project: { select: { name: true } },
      hazards: {
        select: { hrnScore: true, riskLevel: true },
        orderBy: { hrnScore: 'desc' },
        take: 1,
      },
    },
  });

  return (
    <div className="space-y-6 p-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-brand-dark">Inventário de máquinas</h1>
        <p className="text-sm text-slate-500">Visualize estado operacional, classificação de risco e localização.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {machines.map((machine) => (
          <article key={machine.tag} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <header className="space-y-1">
              <h2 className="text-lg font-semibold text-brand-dark">{machine.name}</h2>
              <p className="text-xs font-mono text-slate-400">{machine.tag}</p>
              <p className="text-xs text-slate-500">Projeto: {machine.project.name}</p>
            </header>
            <dl className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <dt>Setor</dt>
                <dd>{machine.location ?? '—'}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Status</dt>
                <dd>{machineStatusLabels[machine.status]}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Risco inicial</dt>
                <dd>
                  {machine.hazards[0] ? (
                    <Badge variant={riskLevelBadgeVariants[machine.hazards[0].riskLevel]}>
                      {riskLevelLabels[machine.hazards[0].riskLevel]} ({machine.hazards[0].hrnScore})
                    </Badge>
                  ) : (
                    'Sem análise'
                  )}
                </dd>
              </div>
            </dl>
          </article>
        ))}
        {machines.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            Nenhuma máquina cadastrada. Inclua inventário a partir do projeto para visualizar aqui.
          </div>
        ) : null}
      </div>
    </div>
  );
}
