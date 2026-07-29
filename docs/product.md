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
- `/games` redirects to `/`.
- Unknown `/games/<name>` routes show a stable unavailable-game message.

Gigalo is unavailable and therefore hidden from the home page. Its direct route
remains available as an explanatory page.

## Content Ownership

Route-local `content.json` files own game prompts and explanations. The shared
standard playing-card domain owns the deck, card asset paths, and labels.
Technical work must not silently rewrite, deduplicate, normalize, or moderate
published content.

## PWA Behavior

- The application is installable through its web manifest.
- The app shell is cached during service-worker installation.
- Cards and audio warm silently after load on normal connections. Data Saver,
  `slow-2g`, and `2g` connections defer that optional work.
- Visited app routes remain available offline.
- An uncached document request falls back to the German `/~offline` page.
- Audio is progressive enhancement. Rejected browser playback must not block a game.

## Compatibility

Public routes, canonical metadata for `https://new.thepartyapp.xyz/`, legal copy,
game content, static media paths, and offline behavior are compatibility
contracts.
