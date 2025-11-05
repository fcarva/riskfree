'use client';

import { useFormState, useFormStatus } from 'react-dom';
import type { ProjectStatus } from '@prisma/client';
import { createProjectAction, type ProjectFormState } from '@/app/app/projects/actions';

type ProjectFormProps = {
  statusOptions: { value: ProjectStatus; label: string }[];
  analysisTypes: { value: string; label: string; description: string }[];
};

const initialState: ProjectFormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Salvando...' : 'Criar projeto'}
    </button>
  );
}

export function ProjectForm({ statusOptions, analysisTypes }: ProjectFormProps) {
  const [state, formAction] = useFormState(createProjectAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="space-y-1">
          <h2 className="text-lg font-semibold text-brand-dark">Dados principais</h2>
          <p className="text-sm text-slate-500">Informe informações do cliente, responsável técnico e cronograma.</p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1 text-sm font-medium text-slate-600">
            Nome do projeto
            <input
              name="name"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-slate-600">
            Cliente
            <input
              name="clientName"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-slate-600">
            CNPJ
            <input
              name="clientCNPJ"
              placeholder="Opcional"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-slate-600">
            Unidade/Site
            <input
              name="site"
              placeholder="Opcional"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-slate-600">
            Responsável técnico
            <input
              name="responsible"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-slate-600">
            CREA
            <input
              name="crea"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-slate-600">
            Data de início
            <input
              type="date"
              name="startDate"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-slate-600">
            Data de término prevista
            <input
              type="date"
              name="endDate"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </label>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="space-y-1">
          <h2 className="text-lg font-semibold text-brand-dark">Escopo e status</h2>
          <p className="text-sm text-slate-500">Selecione normas aplicáveis e acompanhe a etapa do workflow.</p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-slate-600">Normas e metodologias</legend>
            {analysisTypes.map((type) => (
              <label key={type.value} className="flex items-start gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  name="type"
                  value={type.value}
                  defaultChecked={type.value === 'NR-12'}
                  className="mt-1 size-4 rounded border-slate-300 text-brand focus:ring-brand"
                />
                <span>
                  <span className="font-medium text-brand-dark">{type.label}</span>
                  <span className="block text-xs text-slate-500">{type.description}</span>
                </span>
              </label>
            ))}
          </fieldset>
          <label className="space-y-1 text-sm font-medium text-slate-600">
            Status do projeto
            <select
              name="status"
              defaultValue="IN_ANALYSIS"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
            >
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="space-y-1 text-sm font-medium text-slate-600">
          Observações
          <textarea
            name="observations"
            rows={4}
            placeholder="Detalhe premissas, escopo contratual ou particularidades da planta."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </label>
      </section>

      {state?.errors?.length ? (
        <div className="rounded-xl border border-brand-danger bg-brand-danger/10 px-4 py-3 text-sm text-brand-danger">
          <p className="font-semibold">Não foi possível criar o projeto</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            {state.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <SubmitButton />
    </form>
  );
}
