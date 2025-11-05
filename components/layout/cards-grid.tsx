'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

const metrics = [
  {
    label: 'Projetos ativos',
    value: 8,
    trend: '+2 vs mês anterior',
  },
  {
    label: 'Máquinas avaliadas',
    value: 126,
    trend: '58 pendentes',
  },
  {
    label: 'Riscos críticos',
    value: 12,
    trend: '4 aguardando validação',
  },
  {
    label: 'Implementação concluída',
    value: '68%',
    trend: '+12% nos últimos 30 dias',
  },
];

export function CardsGrid() {
  const items = useMemo(() => metrics, []);

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((metric) => (
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
