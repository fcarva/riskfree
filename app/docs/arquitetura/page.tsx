import { readFile } from 'node:fs/promises';
import path from 'node:path';

async function getArchitectureMarkdown() {
  const filePath = path.join(process.cwd(), 'docs', 'architecture.md');
  return readFile(filePath, 'utf-8');
}

export default async function ArchitectureDocPage() {
  const markdown = await getArchitectureMarkdown();

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-6 py-12">
      <h1 className="text-3xl font-semibold text-brand-dark">Arquitetura</h1>
      <p className="text-sm text-slate-600">
        Conteúdo fonte disponível em <code>docs/architecture.md</code>. Renderização simples em texto puro por enquanto.
      </p>
      <pre className="whitespace-pre-wrap rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-sm text-slate-700">
        {markdown}
      </pre>
    </div>
  );
}
