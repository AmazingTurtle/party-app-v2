# Product

## Purpose

The Party App is a German-language browser collection of lightweight group
party and drinking games. It is designed for quick use on a shared phone.

## Published Routes

- `/` lists available games.
- `/imprint` contains provider and contact information.
- `/privacy` explains hosting and local browser data processing.
- `/games/never-have-i-ever`
- `/games/truth-or-dare`
- `/games/big-kings-cup`
- `/games/gigalo`
- `/games/bus-driver`
- `/games/five-seconds`
- Unknown `/games/<name>` routes show a stable unavailable-game message.

## Content Ownership

Route-local `content.json` files own game prompts, cards, and explanations.
Technical work must not silently rewrite, deduplicate, normalize, or moderate
published content.

## PWA Behavior

- The application is installable through its web manifest.
- Visited app routes and static game assets should remain available offline.
- An uncached document request falls back to the German `/~offline` page.
- Audio is progressive enhancement. Rejected browser playback must not block a game.

## Compatibility

Public routes, canonical metadata for `https://new.thepartyapp.xyz/`, legal copy,
game content, static media paths, and offline behavior are compatibility
contracts.
