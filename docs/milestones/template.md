# Milestone Template

Create one directory per milestone:

```text
docs/milestones/active/m<nn>-<slug>/milestone.md
docs/milestones/active/m<nn>-<slug>/scratchpad.md
```

The milestone is the contract. The scratchpad is a notebook with no authority.
Resolve material questions before implementation begins.

## Contract

```md
# Milestone M<nn>: <Title>

Status: Active

## Goal

<Concrete product or repository outcome.>

## Summary

- <Main change>
- <Why this boundary is coherent>

## Locked Decisions

- <Rule or tradeoff that must not drift>

## Scope

- <Included subsystem or behavior>

## Non-Goals

- <Explicitly excluded work>

## Interfaces

- <Public types, state, commands, routes, or persisted shape changes>

## Gate A: <Outcome>

- [ ] <Concrete deliverable>

## Testing and Validation

- [ ] <Command or user-visible scenario>

## Assumptions

- <Explicit revisitable assumption>

## Outcome

<Fill when closing. Record deviations, unverified checks, and current documents updated.>
```

## Scratchpad Header

```md
# M<nn> Scratchpad: <Title>

Status: Active notebook. This file has no authority.
```

## Rules

- Gates describe implementation or validation, not planning discussion.
- Keep unresolved questions in the scratchpad until decided.
- Update current documents when durable shipped behavior changes.
- Preserve unchecked validation if it was not run.
- Move completed work to `completed` and update the registry.
- Record later supersession in the registry instead of rewriting history.
