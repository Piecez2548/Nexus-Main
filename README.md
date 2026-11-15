# Nexus Main

> **Archived on 2026-11-15.** Nexus Finance (web and Android) is now built from the [Nexus](https://github.com/Piecez2548/Nexus) repository with `VITE_APP_TARGET=finance`; see its [consolidation plan](https://github.com/Piecez2548/Nexus/blob/main/docs/CONSOLIDATION_PLAN_2026-11-14.md). The production site https://nexus-main-phi.vercel.app now deploys from Nexus. This repository is kept read-only for history; the last state before the move is tagged `pre-consolidation-2026-11`. Make all changes in Nexus.

Nexus Main is the primary web and Android workspace for personal finance, planning, and related productivity workflows. The standalone repository is built from the Nexus application source and is maintained as an independently deployable project.

| Resource | URL |
| --- | --- |
| Production | https://nexus-main-phi.vercel.app |
| Repository | https://github.com/Piecez2548/Nexus-Main |
| Source workspace | https://github.com/Piecez2548/Nexus |

## Related repositories

| Repository | Role |
| --- | --- |
| [Nexus](https://github.com/Piecez2548/Nexus) | Source workspace and upstream for shared modules |
| [Nexus-Tools](https://github.com/Piecez2548/Nexus-Tools) | Bilingual PDF, image, OCR and QR toolkit |
| [ScreenTutor](https://github.com/Piecez2548/ScreenTutor) | Local-first screen learning assistant |

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
