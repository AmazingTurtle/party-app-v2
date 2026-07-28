# M01 Scratchpad: Repository Modernization

Status: Completed notebook. This file has no authority.

## Locked Inputs

- Workspace depth: app plus tooling packages.
- Quality depth: Vitest/RTL and Playwright, without GitHub Actions.
- PWA: preserve installability and offline behavior.
- Package manager: Yarn 4.17.1.
- Runtime baseline: Node 22.22.2.

## Compatibility Notes

- TypeScript 7.0.2 is current, but `typescript-eslint` 8.65.0 supports
  TypeScript versions below 6.1. TypeScript 6.0.3 is the compatible ceiling.
- Serwist 9.5.12 provides a Turbopack integration, avoiding the old PWA
  plugin's Webpack-only path.

## Validation Log

- Fresh `yarn.lock` generated from the new workspace manifests.
- Immutable install and highest-strategy dedupe check passed.
- ESLint and TypeScript checks passed.
- Vitest passed 9 tests across 3 files.
- Next.js production build generated 15 routes and a 94-entry Serwist precache.
- Playwright passed 4 Chromium scenarios covering navigation, legal and fallback
  routes, the 2048 by 948 five-second-game viewport, manifest metadata, visited
  content offline, and the offline fallback.
- `git diff --check` passed.
- The production build and browser suite ran from an isolated copy because an
  operator-owned development server was active in the source workspace.
- Yarn's remaining peer warnings are confined to optional WASM fallback
  packages from Rolldown and Tailwind.
