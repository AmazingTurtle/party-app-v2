# Milestone M03: Full Product Visual Redesign

Status: Completed on 2026-07-29

> Historical record. Current product and architecture documents plus the
> implementation own the current behavior.

## Goal

Replace the inconsistent launcher and game presentation with one accessible,
responsive visual system that works equally well in light and dark themes.

## Summary

- Introduce a clean neutral app shell, balanced launcher, and shared game stage.
- Keep game identity through icons, restrained route tints, and explicit accent
  tokens instead of full-page color washes.

## Locked Decisions

- The existing wordmark and install icons remain unchanged and the wordmark is
  shown once per page.
- The shared theme control remains a bottom-right native popover with System,
  light, and dark choices.
- Light and dark themes share one layout and semantic token system.
- Route tints remain subtle. Game color belongs primarily to icons, controls,
  borders, progress, and motion accents.
- Lucide owns interface icons. The app does not handcraft a parallel icon set.
- Current launcher descriptions, game prompts, legal body copy, routes,
  metadata, game mechanics, media paths, and PWA behavior remain unchanged.
- Navigation and other short interface labels may be polished.

## Scope

- Shared app shell, header, footer, theme popover, and navigation
- Home launcher and its typed game appearance catalog
- Playable game stages and controls
- Legal, offline, unavailable-game, and unavailable-Gigalo presentation
- Focused component, browser-flow, and visual-regression coverage
- Current product and architecture documentation

## Non-Goals

- Game prompt or explanation changes
- Legal body copy changes
- Game mechanics, persistence, accounts, analytics, or backend behavior
- New workspace packages or a generalized shared UI library
- Wordmark, app icon, playing-card asset, or audio redesign

## Interfaces

- Add an app-local `GameId` and typed game-definition catalog.
- Launcher links and shared game stages consume a game identity instead of
  arbitrary presentation class names.
- Route tint animation writes a dedicated tint token without replacing the
  neutral canvas.
- Add exact runtime dependency `lucide-react@1.27.0`.
- No public route, persisted value, or service-worker contract changes.

## Gate A: Visual Foundation

- Semantic light and dark tokens replace one-off shell colors.
- Shared header, footer, navigation, and theme popover use one visual system.
- Route tint animation remains restrained and reduced-motion safe.

## Gate B: Launcher

- The wordmark appears once with a compact “Wähle ein Spiel” hierarchy.
- Five game links use a deliberate responsive grid.
- Cards use typed identities, Lucide icons, explicit muted text, and visible
      hover, focus, pending, and active states.

## Gate C: Product Routes

- Playable games use a neutral shared stage with route-owned accents.
- Legal, offline, unknown-game, and Gigalo routes match the shared shell.
- Existing content, interaction, metadata, asset loading, and offline
      behavior remain intact.

## Gate D: Documentation and Regression Coverage

- Product and architecture documents own the durable appearance rules.
- Component and browser tests cover the changed accessible behavior.
- Deterministic visual baselines cover representative light, dark, desktop,
      and mobile surfaces.

## Validation Record

No validation command was run during milestone closure. The implementation was
already committed and pushed as `a41e117`. No lint, typecheck, test, build,
browser-test, final-diff, LOC, or folder-density result is claimed here.

## Assumptions

- Existing uncommitted theme work and operator-edited launcher descriptions are
  implementation inputs and must not be reverted.
- Chromium remains the browser and visual-regression target.
- The redesign may restructure app-local components without creating a package.

## Outcome

The implementation introduced the shared shell, theme control, typed game
appearance catalog, launcher, shared game stage, route tint, responsive styles,
and visual browser coverage. The current product and architecture documents
were updated.

The milestone closed at the operator's direction without rerunning its
validation commands or manually completing its final inspection items.
