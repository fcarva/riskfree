import { readFile } from 'node:fs/promises';
import path from 'node:path';

async function getMvpMarkdown() {
  const filePath = path.join(process.cwd(), 'docs', 'mvp-plan.md');
  return readFile(filePath, 'utf-8');
}

export default async function MvpDocPage() {
  const markdown = await getMvpMarkdown();

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-6 py-12">
      <h1 className="text-3xl font-semibold text-brand-dark">Plano de MVP</h1>
      <p className="text-sm text-slate-600">
        Consulte o roteiro completo para entrega do MVP. Uma versão formatada será implementada com MDX em iterações futuras.
      </p>
      <pre className="whitespace-pre-wrap rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-sm text-slate-700">
        {markdown}
      </pre>
    </div>
  );
}
