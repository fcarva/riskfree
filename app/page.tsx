import { ArrowRight, ShieldAlert, Workflow } from 'lucide-react';
import Link from 'next/link';

const highlights = [
  {
    title: 'Inventário inteligente de máquinas',
    description:
      'Cadastre máquinas com mídia, classificações de risco e QR Codes para inspeções rápidas em campo.',
  },
  {
    title: 'Cálculos HRN e FMEA automáticos',
    description:
      'Aplicamos metodologias NR-12 com validações obrigatórias e medidas de controle recomendadas.',
  },
  {
    title: 'Relatórios profissionais em um clique',
    description:
      'Gere PDFs, Excel e compartilhamento seguro com clientes direto do dashboard.',
  },
];

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 py-20">
      <section className="flex flex-col gap-6 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <ShieldAlert className="size-6" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Plataforma completa para apreciação de riscos industriais
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-slate-600">
          O RiskManager Pro centraliza inventário de máquinas, análises HRN/FMEA, planos de ação e relatórios profissionais
          para consultorias de Engenharia de Segurança do Trabalho.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-white shadow-md transition hover:bg-brand-dark"
          >
            Acessar aplicação
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/docs/arquitetura"
            className="inline-flex items-center gap-2 rounded-full border border-brand px-6 py-3 text-brand transition hover:bg-brand/5"
          >
            Ver arquitetura
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-brand-dark">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-md md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-brand-dark">Roadmap do MVP</h2>
          <p className="text-sm text-slate-600">
            Estruturamos um MVP em seis semanas com foco em autenticação, inventário, análise HRN e geração de relatórios.
          </p>
          <Link href="/docs/mvp" className="inline-flex items-center gap-2 text-brand hover:text-brand-dark">
            Consultar plano completo
            <Workflow className="size-4" />
          </Link>
        </div>
        <ul className="space-y-3 text-sm text-slate-600">
          <li>
            <strong>Semana 1:</strong> Setup de projeto, design system e fundações de autenticação.
          </li>
          <li>
            <strong>Semana 2:</strong> CRUD de projetos e inventário de máquinas com importação.
          </li>
          <li>
            <strong>Semana 3:</strong> Módulo HRN com biblioteca inicial de perigos e controles.
          </li>
          <li>
            <strong>Semana 4:</strong> Plano de ação e geração de relatório PDF básico.
          </li>
          <li>
            <strong>Semana 5:</strong> Dashboard, notificações e refinamentos UX.
          </li>
          <li>
            <strong>Semana 6:</strong> Endurecimento, auditoria e deploy.
          </li>
        </ul>
      </section>
    </main>
  );
}
