import { ActionStatus, RiskLevel } from '@prisma/client';
import { prisma } from '@/lib/server/db';
import { requireUser } from '@/lib/server/session';
import { cn } from '@/lib/utils';

export async function CardsGrid() {
  const user = await requireUser();

  const [
    projectsCount,
    machinesCount,
    criticalRisksCount,
    openActionsCount,
    totalActionsCount,
    completedActionsCount,
  ] = await Promise.all([
    prisma.project.count({ where: { userId: user.id } }),
    prisma.machine.count({ where: { project: { userId: user.id } } }),
    prisma.hazard.count({
      where: {
        machine: { project: { userId: user.id } },
        riskLevel: { in: [RiskLevel.HIGH, RiskLevel.VERY_HIGH] },
      },
    }),
    prisma.action.count({
      where: {
        project: { userId: user.id },
        status: { in: [ActionStatus.PENDING, ActionStatus.IN_PROGRESS] },
      },
    }),
    prisma.action.count({ where: { project: { userId: user.id } } }),
    prisma.action.count({
      where: {
        project: { userId: user.id },
        status: { in: [ActionStatus.COMPLETED, ActionStatus.VERIFIED] },
      },
    }),
  ]);

  const implementationRate = totalActionsCount === 0
    ? 100
    : Math.round((completedActionsCount / totalActionsCount) * 100);

  const implementationTrend = totalActionsCount === 0
    ? 'Nenhuma ação cadastrada'
    : `${completedActionsCount} de ${totalActionsCount} ações concluídas`;

  const metrics = [
    {
      label: 'Projetos ativos',
      value: projectsCount,
      trend: `${machinesCount} máquinas cadastradas`,
    },
    {
      label: 'Máquinas avaliadas',
      value: machinesCount,
      trend: `${criticalRisksCount} riscos críticos identificados`,
    },
    {
      label: 'Riscos críticos',
      value: criticalRisksCount,
      trend: `${openActionsCount} ações abertas associadas`,
    },
    {
      label: 'Implementação concluída',
      value: `${implementationRate}%`,
      trend: implementationTrend,
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <article
          key={metric.label}
          className={cn(
            'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md',
            metric.label === 'Riscos críticos' && 'border-brand-danger/70',
          )}
        >
          <p className="text-sm text-slate-500">{metric.label}</p>
          <p className="mt-3 text-3xl font-semibold text-brand-dark">{metric.value}</p>
          <p className="mt-1 text-xs text-slate-500">{metric.trend}</p>
        </article>
      ))}
    </section>
  );
}
