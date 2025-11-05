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
   - Duplicate `.env.example` (to be created) as `.env.local`.
   - Set at minimum `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`.
3. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```
4. **Start the development server**
   ```bash
   npm run dev
   ```
5. Access the application at [http://localhost:3000](http://localhost:3000).

Demo credentials in the temporary in-memory auth provider:
```
E-mail: demo@ijs.eng.br
Senha: demo123
```

## Documentation

- [`docs/architecture.md`](docs/architecture.md) — system architecture overview, technology stack, and module breakdown.
- [`docs/mvp-plan.md`](docs/mvp-plan.md) — six-week delivery roadmap for the MVP scope.
- `/docs/arquitetura` and `/docs/mvp` routes render the Markdown references directly inside the app.

## Next Steps

- Replace credential stub with Prisma-backed authentication (NextAuth adapters).
- Implement real data fetching via tRPC/Next Safe Actions integrated with Prisma.
- Build CRUD flows for projetos, máquinas, HRN e FMEA utilizando componentes dinâmicos.
- Integrate PDF pipelines e armazenamento de documentos (S3/Supabase).

Contributions should follow clean code principles, maintain UX consistency, and prioritise performance and accessibility.
