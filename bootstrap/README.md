# Manual Bootstrap

v0.1 intentionally starts as a manual process. The goal is to learn what should be portable, generated, or explicitly decided before building a CLI.

For an actionable, file-by-file procedure, use **[Existing Repository Bootstrap Runbook](./existing-repository.md)**.

## Bootstrap at a glance

1. Start from a stable target-repository baseline.
2. Inspect the repository and resolve Unknowns.
3. Create its Repository Profile from [repository-profile-template.md](./repository-profile-template.md).
4. Vendor a **pinned** snapshot of todokiso core and templates into the target repository.
5. Record the upstream revision in a local SOURCE.md.
6. Map Decision Owner / Planner / Executor / Reviewer.
7. Define Go / No-Go and Ready for Implementation approval ownership.
8. Integrate Issue / PR templates without overwriting repository-specific policy.
9. Run the target repository's formatter and required checks on the bootstrap changes.
10. Review the bootstrap as a process-only change.
11. Dogfood one real, bounded task and record friction.

## What belongs where

### todokiso Core

Portable semantics:
- lifecycle
- roles
- approval gates
- source-of-truth model
- Work Package / handoff rules
- review semantics

### Repository Profile

Target-specific facts:
- product purpose
- architecture
- stack
- directories
- commands
- test policy
- deployment
- security / data guardrails
- local conventions

### Local integration

Tool-specific mechanics:
- labels
- automated triggers
- vendor-specific permissions
- agent setup / snapshots
- GitHub Issue-form adapters

## Why pin a local snapshot?

Linking Executors to upstream main would make the target repository's execution rules change without a local review.

v0.1 therefore prefers vendoring the workflow and templates at a known todokiso revision and recording that revision in the target repository.

Later tooling may automate this update, but the update should remain explicit and reviewable.

## Exit criteria for a successful bootstrap

- the repository has an explicit Repository Profile
- roles are mapped
- approval owners are clear
- core / templates are pinned to a known todokiso revision
- at least one Work Package Issue can be made self-contained
- an Executor can act without reconstructing the parent discussion
- a Reviewer can trace the PR back to the approved objective
- generated files satisfy the target repository's formatting and required checks, or an explicit local exception is documented

After bootstrap, the first real task is the dogfood test—not the bootstrap itself.
