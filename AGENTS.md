# Repository Guidelines

## Communication Style

- You MUST be blunt, direct, and technically precise.
- You MUST keep language simple and avoid filler, corporate phrasing, and vague reassurance.
- You MUST address the operator directly as `you` or `du`. Do not imply that a wider internal team exists.
- You MUST distinguish repository truth from assumptions.
- You MUST verify material assumptions instead of building on them silently.
- You MUST call out contradictions, explain their impact, and request a decision before implementing affected work.

## Project Overview

The Party App is a German-language browser collection of party and drinking
games. It is installable as a Progressive Web App and keeps previously loaded
content usable offline.

The repository is a Yarn and Turborepo monorepo:

- Next.js 16 App Router and React 19
- TypeScript 6
- Tailwind CSS 4
- Framer Motion
- Serwist with Turbopack for PWA behavior
- Vitest and React Testing Library
- Playwright for browser and offline-flow tests

The product boundary matters. The shared app shell, individual games, game
content catalogs, legal copy, static media, and PWA cache behavior are separate
concerns and MUST remain explicit.

## RFC 2119 Language

MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY are to be interpreted as RFC-style
requirements.

## Engineering Approach

- You MUST fix root causes instead of patching around symptoms.
- You MUST inspect relevant callers, tests, package exports, and configs before changing a contract.
- You MUST treat sandbox, network, permission, and unavailable-service failures as missing evidence.
- You MUST prefer straightforward logic with explicit invariants over fallback-heavy implementations.
- You MUST NOT add retries, compatibility shims, casts, or duplicate paths merely to make a check pass.
- You SHOULD reuse current repository patterns before adding an abstraction.
- You SHOULD reduce net complexity and keep ownership obvious.
- You MUST preserve intentional public routes, metadata, legal copy, game content, and offline behavior unless the operator explicitly changes them.

## Repository Structure

- `apps/web` owns the Next.js application, routes, game UI, content JSON, tests, static assets, and PWA worker.
- `packages/eslint-config` owns the shared flat ESLint and Prettier integration.
- `packages/tsconfig` owns shared TypeScript compiler policy.
- `tests/e2e` under `apps/web` owns Playwright user-flow and PWA coverage.
- `docs` owns current product and architecture documents plus milestone history.
- `.github` owns issue, pull-request, and security-reporting templates.

Product code MUST remain in `apps/web` until a second real consumer or an
independent domain boundary justifies another package. Do not create a shared UI
or game-core package for hypothetical reuse.

## Planning and Milestones

- Routine bounded work does not require a planning artifact.
- Significant features and repository-wide changes MUST start with an active milestone.
- `docs/milestones/README.md` is the canonical lifecycle and registry.
- Active milestones use:
  - `docs/milestones/active/m<nn>-<slug>/milestone.md`
  - `docs/milestones/active/m<nn>-<slug>/scratchpad.md`
- The milestone is the implementation contract. The scratchpad is a notebook with no authority.
- Active milestones MUST lock scope, non-goals, decisions, interfaces, gates, and validation.
- Open product or architecture questions belong in the scratchpad until resolved.
- Planning and implementation are separate unless the operator explicitly requests both.
- Completed milestone directories MUST move to `docs/milestones/completed`.
- Completed milestones are historical and MUST NOT override current documents or code.
- Durable product or architecture decisions MUST update the owning current document before a milestone closes.
- Unrun validation MUST remain unchecked.

## Sources of Truth

Use sources in this order:

1. An active milestone for its locked scope.
2. Current documents linked from `docs/README.md`.
3. Code and tests for implemented runtime behavior.
4. Completed milestones as history.
5. Scratchpads as non-authoritative working notes.

Game prompt catalogs under route-owned `content.json` files own published game
content. Do not rewrite, normalize, deduplicate, or moderate that content as a
side effect of technical work.

## Shell and Process Ownership

- The default shell is zsh. Quote paths containing brackets or parentheses.
- Use `rg` and `rg --files` for repository searches.
- Root `yarn dev` is the normal development command.
- You MUST NOT start persistent development servers or watchers without explicit operator permission.
- `yarn test:e2e` MAY start and stop its own short-lived Playwright server when browser validation is in scope.
- Existing listeners and development servers are operator-owned unless the current tool session demonstrably started them.
- You MUST NOT stop, restart, signal, or reuse an operator-owned server.
- You MUST NOT run a production build concurrently with a development server for this repository because both own `.next`.
- A port conflict is not authorization to terminate a process.

## TypeScript and Architecture

- Product code MUST avoid `any`. Use `unknown`, narrowing, explicit schemas, or focused guards at untrusted boundaries.
- Network, storage, form, URL, environment, and third-party data MUST remain `unknown` until validated.
- Public contracts, persisted values, content types, and state transitions SHOULD use explicit types.
- Local implementation details SHOULD use inference when obvious.
- Do not use `as T` or non-null assertions as runtime validation.
- Use `@/` imports across app architecture boundaries. Same-folder relative imports MAY keep a focused module cohesive.
- Keep browser-only effects and state in client components.
- Page and layout files SHOULD remain thin.
- State updates MUST be immutable. Do not mutate props, imported content, React state, or store data.
- Failure causes SHOULD be preserved and translated at the owning boundary.

## React Standards

- Component return types MUST remain inferred.
- Reusable component props MUST use an exported `ComponentNameProps` interface.
- Reusable component filenames MUST be kebab-case and normally contain one component.
- Framework entry files such as `page.tsx`, `layout.tsx`, and `route.ts` are exempt from component filename rules.
- Event handlers passed to JSX MUST be named; do not use inline arrow callbacks.
- Keep ephemeral interaction state local and use focused shared state only when ownership is genuinely shared.
- Effects MUST synchronize with external systems, include every dependency, and clean up resources.
- Use semantic HTML, accessible names, keyboard behavior, and focus-visible states.
- Interactive styling and the actual interactive element MUST cover the same visible surface.
- Responsive and reduced-motion behavior MUST remain usable.

## Code Quality Gates

- Check physical line counts before growing a file likely to be large.
- Over 250 LOC: confirm that the file still owns one responsibility.
- Over 400 LOC: SHOULD split unless the file is deliberate flat declarative data.
- Over 600 LOC: MUST split or document why splitting makes ownership worse.
- Over 1000 LOC: MUST NOT add behavior without refactoring or explicit operator approval.
- Large legal copy and typed content catalogs MAY remain flat when splitting would reduce consistency.
- Inspect a target folder before adding files.
- At six direct source files, SHOULD consider grouping by feature or responsibility.
- At ten direct source files, MUST group before adding more unless a documented flat-folder budget exists.
- Generic buckets such as `misc`, `common`, or vague `utils` MUST NOT be introduced.

## Styling and Formatting

- Two-space indentation, semicolons, single quotes, trailing commas, sorted imports, and sorted Tailwind utilities are enforced.
- `yarn lint` is read-only validation.
- `yarn lint:fix` and `yarn format` are the routine automatic-fix entrypoints.
- Do not run Prettier directly for routine source formatting.
- Reuse current design tokens and visual patterns before adding one-off values.

## Testing and Validation

- Use the narrowest checks that prove the changed behavior.
- Available root gates are:
  - `yarn lint`
  - `yarn typecheck`
  - `yarn test`
  - `yarn build`
  - `yarn test:e2e`
  - `yarn check`
  - `yarn check:full`
- Deterministic game logic SHOULD have direct unit tests with injected randomness or time.
- React tests MUST assert user-visible behavior through accessible roles and names.
- Browser tests SHOULD cover route navigation, interaction, install metadata, and offline behavior when those boundaries change.
- Do not weaken assertions, loosen types, suppress rules, or add retries to hide failures.
- Report every check that could not run and why.

## Dependency and Generated Artifact Hygiene

- Use Yarn 4 workspaces and exact direct dependency versions.
- Use `npm view <package>` to verify current package metadata before upgrades.
- Dependency changes MUST update `package.json` and `yarn.lock` together.
- Prefer platform and existing dependencies over adding packages.
- Generated service-worker output MUST NOT be edited or committed.
- TypeScript 6.0.x is the supported compiler line until the ESLint parser officially supports TypeScript 7.

## Git

- Git inspection and status checks are allowed.
- Do not create commits unless explicitly requested.
- Never revert or overwrite operator changes.
- Keep unrelated worktree changes untouched.
- Do not use destructive broad-path commands.
