# Manual Bootstrap

v0.1 intentionally starts as a manual process. The goal is to learn what should be portable, generated, or explicitly decided before building a CLI.

## Step 1 — Inspect the target repository

Read enough of the repository to understand:
- product purpose
- architecture
- directory structure
- package / dependency manager
- development commands
- test strategy
- CI
- deployment
- repository-specific guardrails
- existing issue / PR conventions

Do not copy assumptions from another repository.

## Step 2 — Create the Repository Profile

Use repository-profile-template.md.

The profile is the seam between todokiso's generic lifecycle and the target repository's actual implementation environment.

A useful profile is short enough to stay current and specific enough that an Executor can work safely.

## Step 3 — Install the core workflow

Copy or reference:
- core/WORKFLOW.md
- core/EXECUTION.md

The target repository may place them under docs/sdlc/ or another documented location.

## Step 4 — Install templates

Start with:
- templates/impact-analysis.md
- templates/detailed-design-work-packages.md
- templates/business-issue.md
- templates/work-package-issue.md
- templates/pull-request.md

Adapt labels and repository-specific verification commands only where necessary.

Do not fork the lifecycle semantics merely to match a tool.

## Step 5 — Map roles

Write down who or what currently performs:
- Decision Owner
- Planner
- Executor
- Reviewer

The answer may be a human, an AI system, or a hybrid for each role.

Avoid embedding vendor names into the core workflow. Put tool-specific triggers and permissions in the Repository Profile or a local integration document.

## Step 6 — Define approval gates

At minimum, make these explicit:
1. Go / No-Go after Impact Analysis + Estimate
2. Ready for Implementation after Detailed Design + Work Package / PR Plan

Also define who may merge / release.

## Step 7 — Run one real task

Choose a meaningful but bounded task.

Run the full path:
Request → Impact Analysis → Go → Design → Work Package → Implementation Approval → Handoff → PR → Review → Merge.

Record friction.

## Step 8 — Classify the friction

For every awkward step, ask whether the missing piece is:
- **Core** — should every repository using todokiso need it?
- **Generated** — can it be derived from repository structure / config?
- **Repository Profile** — is it project-specific?
- **Human decision** — should automation avoid guessing it?

Only automate after this classification is stable.

## Exit criteria for a successful bootstrap

- the repository has an explicit profile
- roles are mapped
- approval owners are clear
- at least one Work Package Issue is self-contained
- an Executor can act without reconstructing the parent discussion
- a Reviewer can trace the PR back to the approved objective
