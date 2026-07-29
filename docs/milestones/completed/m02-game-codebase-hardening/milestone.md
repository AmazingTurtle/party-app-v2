# Milestone M02: Game and Codebase Hardening

Status: Completed on 2026-07-29

## Goal

Make every published game reliable, accessible, efficient, and testable while
preserving its German prompt catalog and visual identity.

## Summary

- Replace implicit game state with typed domains and explicit transitions.
- Remove avoidable asset loading and warm optional offline assets silently.
- Tighten metadata, navigation, responsive behavior, formatting, and tests.

## Locked Decisions

- Prompt catalogs remain byte-for-byte unchanged.
- Gigalo remains directly reachable but is hidden from the home page.
- The app shell is install-critical; cards and sounds warm in the background.
- Data Saver, `slow-2g`, and `2g` connections defer optional asset warming.
- The four-card Bus Fahrer quick flow remains intact.
- Serwist does not reload the page when the browser comes back online.

## Scope

- Game state, card domain, animation, audio, accessibility, and route metadata.
- PWA precache boundaries and optional background asset warming.
- Formatting policy plus unit, component, browser, and offline regression tests.
- Removal of assets and helpers made obsolete by these changes.

## Non-Goals

- Editing published prompt text or legal copy.
- Adding a game, backend, account system, analytics, or visible download UI.
- Making the unavailable Gigalo game playable.

## Interfaces

- `CardId`, rank, suit, deck, asset URL, and German label contracts.
- Typed Wahrheit/Pflicht prompts and explicit Bus Fahrer and timer states.
- `/games` redirects to `/`; unavailable games remain direct, no-index routes.
- The service worker handles batched `CACHE_URLS` messages for optional assets.

## Gate A: Correct Game State

- [x] Random pools are O(1), immutable at the input boundary, and avoid cycle repeats.
- [x] Wahrheit oder Pflicht has a meaningful initial state.
- [x] Bus Fahrer transitions and five-second timer states are explicit and tested.
- [x] Card games share one typed deck and load only visible card SVGs.

## Gate B: Resilient Presentation

- [x] Color changes animate from the computed current color and respect reduced motion.
- [x] Audio elements are reused, reset, cleaned up, and tolerate rejected playback.
- [x] Game controls and cards expose useful accessible names and status.
- [x] Desktop/mobile viewport behavior has no unintended overflow.

## Gate C: Loading and Offline

- [x] Install precache excludes cards and sounds.
- [x] Optional assets warm after load and idle in batches of four.
- [x] Constrained connections defer warming and retry on a later online event.
- [x] Unused static assets are removed and the timer audio is compact.

## Gate D: Routes and Tooling

- [x] Home navigation hides Gigalo and uses framework link status.
- [x] Route metadata has correct titles, canonicals, and no-index behavior.
- [x] Prettier owns formatting independently of ESLint.

## Testing and Validation

- [x] `yarn lint`
- [x] `yarn typecheck`
- [x] `yarn test`
- [x] `yarn build`
- [x] `yarn test:e2e`
- [x] Dependency deduplication and generated-asset diff reviewed.

## Assumptions

- German UI copy and the current colors/layout are intentional.
- Background warming is best-effort and does not need visible progress.
- TypeScript 6 remains the supported compiler until its ESLint parser supports 7.

## Outcome

Every playable game now uses explicit typed state and accessible controls.
Card games share one deck contract, load only visible card assets, and preserve
rounded card faces through reveal animations. Big Kings Cup owns its random
first draw at a browser-only boundary, avoiding server/client divergence and
duplicate initial card downloads.

Serwist precaches the install-critical shell while optional cards and audio warm
silently on suitable connections. Unused aggregate assets are gone, and the
timer sound is substantially smaller.

Formatting, lint, type checking, unit and component tests, the production build,
six Chromium user/offline scenarios, dependency deduplication, and generated
artifact review all passed.
