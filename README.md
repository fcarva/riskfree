# RiskManager Pro

RiskManager Pro is a comprehensive risk analysis platform being developed for **IJS Engenharia** to digitalise and automate machinery and equipment assessments in compliance with Brazilian Normas Regulamentadoras (e.g., NR-12, NR-10, NR-13). The system empowers engineering safety consultants with modern tooling, data-driven dashboards, and professional reporting.

## Monorepo Layout

```
/
├─ app/               # Next.js App Router source (landing, auth, dashboard)
├─ components/        # UI primitives and layout scaffolding
├─ docs/              # Architecture and delivery plans (Markdown)
├─ lib/               # Shared utilities, server adapters (auth, db)
├─ prisma/            # Prisma schema and migrations (to be generated)
├─ public/            # Static assets (to be added)
└─ styles/            # Shared CSS tokens (reserved)
```

## Getting Started

> **Note**: package installation is not performed in this environment, but the configuration is prepared for Node.js 18+.

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Configure environment variables**
   - Duplicate `.env.example` as `.env.local`.
   - Set at minimum `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL`.
3. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```
4. **Seed reference data (demo user, projetos, máquinas, HRN/FMEA, plano de ação)**
   ```bash
   npm run db:seed
   ```
5. **Start the development server**
   ```bash
   npm run dev
   ```
6. Access the application at [http://localhost:3000](http://localhost:3000).

Demo credentials provisioned pelo seed:
```
E-mail: demo@ijs.eng.br
Senha: demo123
```

## Documentation

- [`docs/architecture.md`](docs/architecture.md) — system architecture overview, technology stack, and module breakdown.
- [`docs/mvp-plan.md`](docs/mvp-plan.md) — six-week delivery roadmap for the MVP scope.
- `/docs/arquitetura` and `/docs/mvp` routes render the Markdown references directly inside the app.

## Next Steps

- Expand server actions/API routes para edição e exclusão de projetos, máquinas e análises.
- Construir telas detalhadas de HRN e FMEA com formulários ricos (React Hook Form + validação).
- Implementar exportação de relatórios (PDF, Excel) e upload de documentos para S3/Supabase.
- Integrar notificações (e-mail/WhatsApp) e auditoria completa com trilhas de auditoria.

Contributions should follow clean code principles, maintain UX consistency, and prioritise performance and accessibility.
