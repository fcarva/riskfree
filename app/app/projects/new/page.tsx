import Link from 'next/link';
import { ProjectStatus } from '@prisma/client';
import { projectStatusLabels } from '@/lib/presenters';
import { ProjectForm } from '@/app/app/projects/new/project-form';

const analysisTypes = [
  { value: 'NR-12', label: 'NR-12 - Segurança em Máquinas e Equipamentos', description: 'Apreciação completa incluindo HRN e plano de ação.' },
  { value: 'NR-10', label: 'NR-10 - Segurança em Instalações Elétricas', description: 'Revisão de diagramas, prontuários e procedimentos elétricos.' },
  { value: 'NR-13', label: 'NR-13 - Caldeiras e Vasos de Pressão', description: 'Inventário, inspeções e planos de manutenção obrigatórios.' },
  { value: 'FMEA', label: 'FMEA - Failure Mode and Effects Analysis', description: 'Aplicação sistemática da metodologia FMEA para linhas críticas.' },
];

const statusOptions = Object.values(ProjectStatus).map((status) => ({
  value: status,
  label: projectStatusLabels[status],
}));

export default function NewProjectPage() {
  return (
    <div className="space-y-8 p-8">
      <header className="space-y-2">
        <Link href="/app/projects" className="text-sm font-medium text-brand hover:text-brand-dark">
          ← Voltar para lista de projetos
        </Link>
        <div>
          <h1 className="text-3xl font-semibold text-brand-dark">Novo projeto de apreciação</h1>
          <p className="text-sm text-slate-500">
            Cadastre um novo cliente, vincule máquinas e inicie a análise de riscos com HRN, FMEA e checklist NR-12.
          </p>
        </div>
      </header>
      <ProjectForm statusOptions={statusOptions} analysisTypes={analysisTypes} />
    </div>
  );
}
