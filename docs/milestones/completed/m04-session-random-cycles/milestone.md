# Milestone M04: Session-Persistent Random Cycles

Status: Completed on 2026-07-29

> Historical record. Current product and architecture documents plus the
> implementation own the current behavior.

## Goal

Prevent repeated prompts and cards across navigation and reloads within one
browser-tab session, then automatically reshuffle each exhausted pool.

## Summary

- Persist independent draw histories for every playable random pool.
- Remove case-insensitive exact prompt duplicates without changing retained text.
- Keep current game screens, rounds, timers, and animations transient.

## Locked Decisions

- Draw history uses tab-scoped `sessionStorage`, not durable local storage.
- Ich hab noch nie, Wahrheit, Pflicht, 5 Sekunden, Big Kings Cup, and Bus
  Fahrer own separate pools.
- The first catalog occurrence wins when later text differs only by letter case.
- Case-insensitive comparison does not trim or otherwise normalize content.
- Gigalo remains unchanged because it has no playable random content.
- The Privacy Policy remains unchanged.
- Concurrent M03 visual-redesign changes are preserved and remain outside M04.

## Scope

- Pure random-cycle state and browser-session persistence.
- Hydration-safe integration with every playable randomized game.
- Case-insensitive exact duplicate removal and regression tests.
- Current product and architecture documentation.

## Non-Goals

- Restoring the visible prompt, card round, timer, or animation after reload.
- Cross-tab synchronization, a manual reset control, accounts, or backend state.
- Rewriting, moderating, or normalizing retained prompt text.

## Interfaces

- Versioned stored pool state with drawn keys and the last drawn key.
- A deterministic random-pool domain API with injected randomness.
- A hydration-aware React adapter backed by `sessionStorage`.

## Gate A: Random-Cycle Domain

- Every key is drawn once before rollover.
- Exhausted pools reshuffle and avoid an immediate boundary repeat.
- Persisted history reconciles with current catalog entries.

## Gate B: Browser Persistence

- Valid session state resumes after reload or remount.
- Invalid or unavailable storage degrades to a fresh in-memory cycle.
- Initial automatic draws happen only after browser hydration.

## Gate C: Game and Content Integration

- Every playable randomized game uses its own persisted pool.
- Later case-insensitive exact duplicates are removed from prompt catalogs.
- Catalog tests prevent duplicate canonical keys from returning.

## Validation Record

No validation command was run during milestone closure. The implementation was
already committed and pushed as `a41e117`. No focused-test, lint, typecheck,
test, build, or browser-test result is claimed here.

## Assumptions

- Dealt face-down Bus Fahrer cards count as drawn.
- Closing the tab ends the intended persistence lifecycle.
- Newly added catalog content is immediately eligible; removed keys are ignored.

## Outcome

The implementation introduced a pure keyed random-cycle domain, versioned
tab-scoped persistence, hydration-aware React integration, independent game
and prompt-category pools, and duplicate-catalog regression coverage. The
current product and architecture documents were updated.

The milestone closed at the operator's direction without rerunning its
validation commands.
