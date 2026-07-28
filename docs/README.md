# Documentation

This directory separates current product rules from historical planning notes.

## Authority

Use documents in this order:

1. An active milestone defines its intended scoped change.
2. Current product and architecture documents define shipped rules.
3. Code and tests define implemented behavior.
4. Completed milestones explain how the current state was reached.
5. Scratchpads have no authority.

If code and a current document disagree and no active milestone explains the
difference, record and resolve the contradiction before adding related
behavior.

## Current Documents

- [Product](product.md): audience, routes, content ownership, and PWA behavior.
- [Architecture](architecture.md): workspace and runtime boundaries.

## Planning Documents

- [Milestone registry](milestones/README.md): active and completed work.
- [Milestone template](milestones/template.md): required contract structure.

## Maintenance Rules

- Update the owning current document when a durable decision changes.
- Keep proposed behavior in an active milestone until implementation completes.
- Move completed milestones to `milestones/completed`.
- Preserve historical milestone bodies; record supersession instead of rewriting history.
- Do not copy the full game-content catalogs into prose.
