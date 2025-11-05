# MVP Delivery Plan

## Goal
Deliver a usable RiskManager Pro MVP in 6 weeks that covers authentication, project/machine inventory, HRN risk assessments, baseline dashboards, and PDF reporting so IJS Engenharia can replace manual spreadsheets for core workflows.

## Guiding Principles
- **Value first**: Prioritise features that remove manual effort (project CRUD, HRN automation).
- **Incremental architecture**: Implement scalable foundations (Prisma schema, NextAuth) while deferring advanced AI or offline modes until after MVP.
- **Design system early**: Establish Tailwind + shadcn/ui primitives in Week 1 to ensure consistent UX.
- **Automated quality**: Introduce linting, testing, and CI from the start.

## Workstreams & Milestones

### Week 1 – Project Setup & Authentication
- [ ] Initialise Next.js 14 + TypeScript repo with Tailwind, shadcn/ui, ESLint, Prettier.
- [ ] Configure Prisma with PostgreSQL (local docker + Supabase for staging).
- [ ] Implement NextAuth with email/password and RBAC roles (Admin, Engineer, Technician, Client).
- [ ] Create base layout, navigation shell, and responsive design tokens.
- [ ] Set up CI (GitHub Actions) for lint/test/build.

### Week 2 – Projects Module
- [ ] Define Prisma models for `User`, `Project`, `Machine`, `Hazard`, `Document` (minimal fields for MVP).
- [ ] Build project list page with filters and KPIs (placeholder metrics).
- [ ] Implement project create/edit forms with validation (React Hook Form + Zod).
- [ ] Add workflow status transitions (Draft → In Analysis → Completed) with audit trail.

### Week 3 – Machine Inventory
- [ ] Create machine CRUD UI with table and detail view (upload cover image, manual URL link placeholder).
- [ ] Implement search, filter by status, and export CSV (server-side generation).
- [ ] Generate QR codes per machine (server API returning PNG/SVG).
- [ ] Seed database with sample projects/machines.

### Week 4 – HRN Risk Assessments
- [ ] Implement hazard entry form with dropdowns for LO/FE/DPH scale values.
- [ ] Calculate HRN score and risk level automatically; show colour-coded badges.
- [ ] Require control measures for High/Very High risks; capture residual risk.
- [ ] Introduce hazard library (static JSON) for quick insert suggestions.
- [ ] Create per-machine risk overview with summary chart (Recharts bar/pie).

### Week 5 – Reporting & Dashboard
- [ ] Build dashboard page summarising active projects, machine counts, risk distribution, and alerts.
- [ ] Implement PDF generator for project report (cover, summary, machine tables, HRN listings).
- [ ] Allow scheduling manual PDF generation via button and queue background job.
- [ ] Export HRN table to Excel/CSV.

### Week 6 – Hardening & Deploy
- [ ] Add action log + notifications (email) for high risk hazards.
- [ ] Polish UI, add skeleton loaders, ensure mobile responsiveness of key flows.
- [ ] Write unit tests for HRN calculation, API route guards, and forms.
- [ ] Conduct security review (OWASP top 10 basics), ensure env validation.
- [ ] Deploy staging environment (Vercel frontend + Supabase backend), prepare demo data.

## Dependencies & Tooling
- **Database**: Dockerised Postgres for local dev; Supabase for staging with automatic migrations via Prisma.
- **Storage**: Supabase storage bucket for images/documents (MVP restrict to images/PDFs).
- **Background Jobs**: Use Upstash Redis (or local Redis) + BullMQ worker hosted alongside Next.js server (Railway/Fly.io) for PDF generation.
- **PDF Engine**: @react-pdf/renderer templates maintained in `/reports` directory with shared theming.

## Risks & Mitigations
- **Complex PDF layouts** → Start with basic layout, iterate; leverage design tokens shared with web components.
- **Offline checklist requirement** → Defer to post-MVP; ensure architecture allows service worker integration later.
- **AI scope creep** → Document integration points but mock responses for MVP (feature flags).
- **Data migration** → Provide Excel import template; plan "Magic Import" for V1.0 with queue + AI mapping.

## Success Criteria for MVP
- Authenticated engineer can create project, add machines, log hazards with HRN, and generate PDF summary in <15 minutes.
- Dashboard reflects project totals and risk breakdown using live data.
- System passes automated lint/test suite and deploys to staging pipeline.

