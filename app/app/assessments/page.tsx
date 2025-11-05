const assessments = [
  {
    machine: 'Prensa Hidráulica 120T',
    hazard: 'Ponto de esmagamento na zona de operação',
    hrn: 48,
    level: 'Alto',
    controls: ['Cortina de luz categoria 4', 'Treinamento de setup seguro'],
  },
  {
    machine: 'Torno CNC HAAS',
    hazard: 'Contato com cavaco quente',
    hrn: 6,
    level: 'Médio',
    controls: ['Luvas térmicas', 'Aspirador de cavaco'],
  },
];

export default function AssessmentsPage() {
  return (
    <div className="space-y-6 p-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-brand-dark">Análises de risco (HRN)</h1>
        <p className="text-sm text-slate-500">Visualização inicial das análises cadastradas para cada máquina.</p>
      </header>
      <div className="space-y-4">
        {assessments.map((assessment) => (
          <article key={`${assessment.machine}-${assessment.hazard}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <header className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-brand-dark">{assessment.machine}</h2>
                <p className="text-sm text-slate-500">{assessment.hazard}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-semibold text-brand-dark">{assessment.hrn}</p>
                <p className="text-xs text-slate-500">Risco {assessment.level}</p>
              </div>
            </header>
            <footer className="mt-4 text-sm text-slate-600">
              <p className="font-medium">Medidas de controle</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {assessment.controls.map((control) => (
                  <li key={control}>{control}</li>
                ))}
              </ul>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
