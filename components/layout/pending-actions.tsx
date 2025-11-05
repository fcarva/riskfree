import { CalendarClock, CheckCircle2, Loader2 } from 'lucide-react';

const actions = [
  {
    id: 'ACT-1024',
    title: 'Instalar cortina de luz na prensa hidráulica',
    dueDate: '2024-08-12',
    status: 'Em andamento',
  },
  {
    id: 'ACT-0981',
    title: 'Treinamento NR-12 operadores linha de corte',
    dueDate: '2024-08-22',
    status: 'Pendente',
  },
  {
    id: 'ACT-0874',
    title: 'Atualizar procedimentos de bloqueio e etiquetagem',
    dueDate: '2024-09-01',
    status: 'Aguardando verificação',
  },
];

export function PendingActions() {
  return (
    <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-brand-dark">Plano de ação</h2>
        <Loader2 className="size-4 animate-spin text-brand" aria-hidden />
      </header>
      <ul className="space-y-4 text-sm text-slate-600">
        {actions.map((action) => (
          <li key={action.id} className="space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-mono text-xs text-slate-400">{action.id}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-1 text-xs font-medium text-brand-dark">
                <CheckCircle2 className="size-3" />
                {action.status}
              </span>
            </div>
            <p className="font-medium text-brand-dark">{action.title}</p>
            <p className="flex items-center gap-2 text-xs text-slate-500">
              <CalendarClock className="size-3" />
              Prazo {new Date(action.dueDate).toLocaleDateString('pt-BR')}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
