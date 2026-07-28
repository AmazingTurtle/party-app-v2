# The Party App

German-language party games in an installable, offline-capable Next.js
application.

## Requirements

- Node.js 22.22.2 or newer
- Corepack

```bash
corepack enable
yarn install --immutable
```

Install the Playwright browser once before running browser tests:

```bash
yarn workspace @party-app/web playwright install chromium
```

## Workspace

```text
apps/web                 Next.js app, game content, tests, and PWA worker
packages/eslint-config   Shared flat ESLint and formatting policy
packages/tsconfig        Shared strict TypeScript policy
docs                     Current specifications and milestone history
```

Product code stays in `apps/web` until another real consumer justifies a new
package.

## Commands

```bash
yarn dev          # Start the app through Turborepo
yarn lint         # Read-only lint and formatting check
yarn lint:fix     # Apply supported lint and formatting fixes
yarn typecheck    # Typecheck every workspace
yarn test         # Run Vitest
yarn build        # Build the production app
yarn test:e2e     # Build and run Playwright against an owned production server
yarn check        # Lint, typecheck, unit tests, and build
yarn check:full   # Lint, typecheck, unit tests, build, and browser tests
```

## PWA

Serwist is integrated through Turbopack. The service worker caches application
assets and visited routes, and `/~offline` is used when a document was not
previously cached. Generated service-worker files live under
`apps/web/public` and are ignored.

## Documentation

Start at [docs/README.md](docs/README.md). Significant work uses the milestone
contract under `docs/milestones`; current product and architecture documents
take precedence over completed milestone history.
