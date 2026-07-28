# Milestone M01: Repository Modernization

Status: Completed on 2026-07-28

## Goal

Modernize the repository into a current, reproducible Next.js monorepo without
changing its published party-game behavior.

## Summary

- Move the app into a Yarn 4 and Turborepo workspace with shared tooling.
- Upgrade the framework, compiler, styling, PWA, lint, formatting, and test stack.

## Locked Decisions

- Product code remains in `apps/web`; only ESLint and TypeScript are shared packages.
- Package scope is `@party-app`.
- TypeScript remains on 6.0.x until `typescript-eslint` supports TypeScript 7.
- Serwist preserves PWA/offline behavior through Turbopack.
- The local quality gate includes Vitest, React Testing Library, and Playwright.
- No GitHub Actions workflow is added.

## Scope

- Workspace and dependency migration.
- Next.js 16, React 19, Tailwind 4, and Framer Motion upgrades.
- Strict TypeScript and flat ESLint policy.
- PWA migration from `next-pwa` to Serwist.
- Focused compatibility corrections and tests.
- Repository guidance, current docs, milestones, and GitHub templates.

## Non-Goals

- Game redesign, new games, prompt editing, or legal-copy changes.
- Shared UI or game-core packages.
- Backend, persistence, accounts, analytics, or deployment automation.

## Interfaces

- Preserve current public routes, canonical metadata, content, and static media.
- Replace internal `party/*` imports with `@/*`.
- Add internal `/serwist/[path]` and `/~offline` routes.
- Add root workspace quality commands documented in the README.

## Gate A: Workspace and Tooling

- [x] Create the Yarn/Turbo workspace and shared tooling packages.
- [x] Pin compatible current dependency versions and regenerate the lockfile.
- [x] Add strict TypeScript, flat ESLint, and automatic formatting.

## Gate B: Application Upgrade

- [x] Move the app to `apps/web`.
- [x] Upgrade Next.js, React, Tailwind, Framer Motion, and App Router contracts.
- [x] Preserve PWA behavior with Serwist and Turbopack.
- [x] Correct strictness and accessibility defects exposed by the upgrade.

## Gate C: Quality and Documentation

- [x] Add deterministic unit and user-facing component tests.
- [x] Add Playwright route, interaction, manifest, and offline coverage.
- [x] Add project-specific AGENTS, current docs, milestone workflow, and templates.

## Testing and Validation

- [x] `yarn install --immutable`
- [x] `yarn lint`
- [x] `yarn typecheck`
- [x] `yarn test`
- [x] `yarn build`
- [x] `yarn test:e2e`
- [x] `yarn dedupe --check`
- [x] `git diff --check`

## Assumptions

- `../space-game-idle` refers to the existing `../space-idle-game` repository.
- Vercel-compatible Next.js output remains the deployment shape.
- The large privacy page remains one declarative legal document.

## Outcome

The application now runs as a Yarn 4.17.1 and Turborepo workspace on Next.js
16.2.12, React 19.2.8, Tailwind CSS 4.3.3, and TypeScript 6.0.3. Shared strict
TypeScript, flat ESLint, Prettier, unit, component, and production browser
testing are in place.

Serwist now owns installability, precaching, visited-route caching, and offline
fallback behavior through Turbopack. Browser validation also locks the
five-second game controls inside a 2048 by 948 viewport.

All planned validation passed against a freshly generated and dedupe-complete
lockfile. Yarn reports four upstream peer metadata conflicts in optional WASM
fallback packages from Rolldown and Tailwind; the native Linux packages used by
the build are unaffected.
