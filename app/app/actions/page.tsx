const boardColumns = [
  {
    title: 'Pendente',
    items: ['Instalar guarda fixa na esteira', 'Revisar checklist NR-12 setor embalagem'],
  },
  {
    title: 'Em andamento',
    items: ['Cotação EPC fornecedor SafeTech'],
  },
  {
    title: 'Concluída',
    items: ['Treinamento operadores linha prensa'],
  },
];

export default function ActionsPage() {
  return (
    <div className="space-y-6 p-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-brand-dark">Plano de ação</h1>
        <p className="text-sm text-slate-500">Acompanhe a implementação das recomendações críticas.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {boardColumns.map((column) => (
          <section key={column.title} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <header className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-brand-dark">{column.title}</h2>
              <span className="text-xs text-slate-500">{column.items.length} itens</span>
            </header>
            <ul className="space-y-3 text-sm text-slate-600">
              {column.items.map((item) => (
                <li key={item} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
