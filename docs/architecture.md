# Architecture

## Workspace Boundaries

- `apps/web` owns all current product behavior. It contains the Next.js App
  Router application, client interactions, route-local content, static assets,
  service worker, and tests.
- `packages/eslint-config` owns one shared flat ESLint configuration.
- `packages/tsconfig` owns the strict compiler baseline and the Next.js compiler
  extension.

There is one product consumer. UI and game logic remain app-local until another
real consumer or independently testable domain boundary justifies a package.

## Runtime

Next.js renders the app through the App Router. Browser interactions are client
components; layouts, metadata, manifests, static fallback pages, and route
coordination remain server-owned where possible.

Serwist integrates with Turbopack. The typed service-worker source is compiled
into ignored output, and the `/serwist/[path]` handler serves the generated
worker. `/~offline` is the document fallback. The install manifest contains the
app shell but excludes cards and audio. A client-side warmer requests those
optional assets through Serwist after load and browser idle time, four at a
time. It defers on Data Saver, `slow-2g`, and `2g` connections.

## State and Content

Games own transient state locally. There is no backend, database, account,
shared store, or persisted game session.

Prompt content is imported from route-local JSON. The standard 52-card deck,
asset URLs, and German card labels have one typed app-local owner. Random pools
copy the source catalog, return every item once per cycle, avoid a repeat at the
cycle boundary, and never mutate imported content.

## Verification

Vitest covers deterministic logic and component integration. Playwright covers
public routes, representative interaction, install metadata, worker
registration, and offline behavior. Turborepo orchestrates package gates; it
does not own product rules.
