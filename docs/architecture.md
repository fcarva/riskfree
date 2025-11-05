# RiskManager Pro - Architecture Overview

## Vision
RiskManager Pro is a full-stack web platform that digitises machine and equipment risk assessments for IJS Engenharia, automating HRN and FMEA workflows, action tracking, and professional report generation while supporting a modern consultancy experience for internal teams and clients.

## System Architecture

### High-Level Diagram
```
[Client Apps]
   |-- Web App (Next.js + React 18, App Router)
   |-- Mobile Web / PWA (responsive, offline-first)
        |
[API Layer]
   |-- Next.js API routes (Edge-friendly where possible)
   |-- Background Jobs (BullMQ workers)
        |
[Core Services]
   |-- Authentication (NextAuth.js + OAuth/Email/Password + optional 2FA)
   |-- Risk Engine (HRN + FMEA calculations)
   |-- Reporting Service (pdf-lib / @react-pdf/renderer)
   |-- Document Service (S3/Supabase storage + processing)
   |-- AI Service Integrations (OpenAI, Claude, Vision models)
        |
[Data Layer]
   |-- PostgreSQL (Supabase or managed Postgres) via Prisma
   |-- Redis (BullMQ queues, cache)
   |-- Object Storage (S3-compatible)
   |-- Vector Store (Supabase pgvector or Pinecone)
```

### Frontend
- **Framework**: Next.js 14+ with App Router, React 18, TypeScript.
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent UI patterns.
- **State Management**: TanStack Query for server state, Zustand for lightweight local state.
- **Forms & Validation**: React Hook Form + Zod schemas.
- **Charts**: Recharts for dashboards, with custom wrappers for theming.
- **PDF/Document Rendering**: Server-triggered (API route) using @react-pdf/renderer; client preview via React-PDF.
- **Internationalisation**: i18next (pt-BR default) with support for future en-US.
- **Offline Support**: Progressive web app enhancements, service worker caching for mobile checklist experience.

### Backend
- **Runtime**: Next.js API routes (Node.js 18+). Heavy processes delegated to queue workers hosted alongside (e.g., Vercel/Edge functions + separate worker on Fly.io/Render/AWS ECS).
- **ORM**: Prisma with generated Zod validators for consistent typing between frontend and backend.
- **Auth**: NextAuth.js with credential (email/password) + OAuth (Google/Microsoft). 2FA via authenticator apps stored in Prisma with TOTP.
- **File Storage**: Uploads to S3-compatible bucket (Supabase Storage or AWS S3). Presigned URLs served from backend.
- **Queue Processing**: BullMQ (Redis) for PDF generation, AI enrichment, large imports, scheduled reports.
- **AI Integrations**:
  - GPT-4o / GPT-4 Vision for image analysis.
  - Claude 3 for document parsing and chatbot responses.
  - LangChain orchestrates prompts, retrieval-augmented generation using project knowledge base (pgvector / Pinecone).
- **Notifications**: Webhooks/queues for email (Resend), WhatsApp (Twilio), push notifications (OneSignal/Firebase).

### Security
- HTTPS enforced; HSTS on custom domain.
- User roles enforced in middleware (`middleware.ts`) using RBAC matrix (Admin, Engineer, Technician, Client).
- Field-level audit logging via Prisma middleware writing to `AuditLog` table.
- Data encryption at rest handled by managed Postgres/S3; sensitive fields (passwords, tokens) hashed with bcrypt/argon2.
- Daily backups configured via hosting provider; disaster recovery replication across regions.

## Domain Modules

1. **Authentication & Users**
   - Sign-up invitations, password resets, multi-factor auth.
   - Role assignment and permission gating per API route/component.

2. **Projects**
   - CRUD with workflow states (Draft → Completed).
   - Associations: Machines, Actions, Documents, Checklist results.
   - Timeline and KPI aggregation for dashboards.

3. **Machine Inventory**
   - Detailed machine profiles with media gallery, manuals, QR code generation.
   - Import/export (Excel/CSV) pipelines with AI-assisted mapping.

4. **Risk Assessments (HRN)**
   - Hazard library integration, automatic calculations, residual risk evaluation.
   - Validation rules requiring controls for High/Very High risk levels.

5. **FMEA Module**
   - Interactive table editor with prioritisation by RPN.
   - Action linkage and versioning for before/after comparisons.

6. **Action Management**
   - Kanban/Gantt UI, notifications, SLA tracking, evidence uploads.
   - Auto-generation from high-risk findings or checklist failures.

7. **Checklist Engine**
   - Configurable questionnaires (NR-12, NR-10, etc.).
   - Offline-capable forms, auto action creation for "No" responses.

8. **Document Management**
   - Hierarchical storage, tagging, versioning, previews, sharing.

9. **Reporting**
   - PDF/DOCX/Excel exports, scheduled emails, analytics dashboards.

10. **AI Services**
    - Suggestion engines, vision analysis, document parsing, chat assistant.

## Data Model Considerations
- Prisma schema aligned with initial entities (`Project`, `Machine`, `Hazard`, `FMEA`, `Action`, `Document`, `User`, `ChecklistTemplate`, `ChecklistResponse`, `AuditLog`).
- Use Prisma Enums for status fields; maintain translation maps for UI.
- Soft delete strategy via `deletedAt` timestamp for recoverability.

## API Strategy
- RESTful JSON endpoints via Next.js route handlers under `/api/*`.
- Use TRPC or next-safe-action for type-safe mutations (optional future iteration).
- All endpoints require auth; use `withAuth` middleware to enforce RBAC.
- Background jobs triggered by API events (e.g., `POST /api/reports/:id/generate`).

## DevOps & Tooling
- **Testing**: Jest + React Testing Library (frontend), Vitest (utility), Playwright (E2E). CI via GitHub Actions with lint/test/build gates.
- **Linting/Formatting**: ESLint (Next.js config), Prettier, Husky + lint-staged for pre-commit hooks.
- **Environment Management**: `.env.local` for local dev, `env.mjs` for runtime validation (t3-env/zod). Secrets stored in Doppler/Vercel.
- **Observability**: Sentry for error tracking, PostHog for product analytics, Logflare for server logs.

## Performance & Offline Strategy
- Optimistic UI for high-frequency mutations (actions, checklist items).
- Incremental static regeneration for dashboard summaries when possible.
- Service worker caches checklist templates and uploads queued offline.
- Background sync API to push offline-collected data when connectivity resumes.

## Accessibility & UX
- Follow WCAG 2.1 AA guidelines; semantic HTML, keyboard navigable components.
- Provide tooltips and inline help for complex scales (HRN, FMEA).
- Localised units and currency formatting.

## Future Extensions
- Multi-tenant architecture with organisation separation.
- IoT data ingestion microservice for realtime monitoring.
- AR/VR modules interfacing with 3D risk heatmap.

