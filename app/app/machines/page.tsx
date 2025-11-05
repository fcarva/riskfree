const machines = [
  {
    tag: 'MC-PR-001',
    name: 'Prensa Hidráulica 120T',
    location: 'Linha de conformação',
    status: 'Ativa',
    risk: 'Alto',
  },
  {
    tag: 'MC-TR-002',
    name: 'Torno CNC HAAS',
    location: 'Usinagem',
    status: 'Em manutenção',
    risk: 'Médio',
  },
];

export default function MachinesPage() {
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
            </header>
            <dl className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <dt>Setor</dt>
                <dd>{machine.location}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Status</dt>
                <dd>{machine.status}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Risco inicial</dt>
                <dd>{machine.risk}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
