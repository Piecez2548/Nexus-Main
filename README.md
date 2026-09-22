# Nexus Main

Nexus Main is the primary web and Android workspace for personal finance, planning, and related productivity workflows. The standalone repository is built from the Nexus application source and is maintained as an independently deployable project.

| Resource | URL |
| --- | --- |
| Production | https://nexus-main-phi.vercel.app |
| Repository | https://github.com/Piecez2548/Nexus-Main |
| Source workspace | https://github.com/Piecez2548/Nexus |

## Scope

The application provides authenticated finance, portfolio, transaction, planning, vault, and account-management workflows. It is intended for personal use and reviewable software delivery; it is not financial, tax, or investment advice.

## Technology

React 19, TypeScript, Vite, React Router, Zustand, Supabase, Capacitor, Vitest, Playwright, and Vercel.

## Local development

Requirements: Node.js 22 or later.

```bash
npm ci
npm run dev
npm run build
npm run lint
```

The production build uses environment variables supplied by the deployment configuration. Create `.env.local` locally; credentials are intentionally excluded from this repository.

## Repository policy

The repository is public for professional review. Do not commit credentials, personal financial records, generated build output, mobile release artifacts, or local environment files. The original Nexus repository remains the upstream source for shared modules during the migration.
