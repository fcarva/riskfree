import { prisma } from '@/lib/server/db';
import { requireUser } from '@/lib/server/session';
import { riskLevelBadgeVariants, riskLevelLabels } from '@/lib/presenters';
import { Badge } from '@/components/ui/badge';

export default async function AssessmentsPage() {
  const user = await requireUser();
  const hazards = await prisma.hazard.findMany({
    where: { machine: { project: { userId: user.id } } },
    orderBy: { updatedAt: 'desc' },
    take: 10,
    include: {
      machine: {
        select: {
          name: true,
          tag: true,
          project: { select: { name: true } },
        },
      },
    },
  });

  return (
    <div className="space-y-6 p-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-brand-dark">Análises de risco (HRN)</h1>
        <p className="text-sm text-slate-500">Visualização inicial das análises cadastradas para cada máquina.</p>
      </header>
      <div className="space-y-4">
        {hazards.map((hazard) => (
          <article key={hazard.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <header className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-brand-dark">{hazard.machine.name}</h2>
                <p className="text-xs font-mono text-slate-400">{hazard.machine.tag}</p>
                <p className="text-sm text-slate-500">{hazard.description}</p>
                <p className="text-xs text-slate-500">Projeto: {hazard.machine.project.name}</p>
              </div>
              <div className="text-right">
                <Badge variant={riskLevelBadgeVariants[hazard.riskLevel]}>
                  {riskLevelLabels[hazard.riskLevel]}
                </Badge>
                <p className="mt-2 text-3xl font-semibold text-brand-dark">{hazard.hrnScore.toFixed(1)}</p>
                {hazard.residualHRN ? (
                  <p className="text-xs text-slate-500">Residual: {hazard.residualHRN.toFixed(1)}</p>
                ) : null}
              </div>
            </header>
            <footer className="mt-4 text-sm text-slate-600">
              <p className="font-medium">Medidas de controle</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {hazard.controlMeasures.length ? (
                  hazard.controlMeasures.map((control) => <li key={control}>{control}</li>)
                ) : (
                  <li>Nenhuma medida cadastrada.</li>
                )}
              </ul>
            </footer>
          </article>
        ))}
        {hazards.length === 0 ? (
          <article className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
            Nenhuma análise HRN registrada ainda. Cadastre perigos a partir do inventário de máquinas.
          </article>
        ) : null}
      </div>
    </div>
  );
}
