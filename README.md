# todokiso

**From intent to working software.**

> その意図、実装まで届きそ？

todokiso is a portable, role-based, tool-agnostic software development lifecycle for preserving intent from a request through design, implementation, review, and delivery.

It does not assume a specific AI product, coding agent, IDE, framework, or programming language. Each role can be performed by a human, an AI system, or a mix of both.

## Why

Fast implementation is useful, but speed does not guarantee that the thing being built still matches the original intent.

todokiso makes the path from intent to implementation explicit:

~~~text
Request / Requirement
        ↓
Impact Analysis
        ↓
Estimate + Confidence
        ↓
Approval: Go / No-Go
        ↓
Detailed Design
        ↓
Work Packages + Dependency DAG
        ↓
Branch / PR Plan
        ↓
Approval: Ready for Implementation
        ↓
Materialize self-contained Work Package Issues
        ↓
Implementation / Test / PR
        ↓
Review against intent
        ↓
Merge / Release
~~~

## Core ideas

- **Roles, not products.** Responsibilities are stable even when tools change.
- **Intent has a source of truth.** Approved objectives and plans live in a canonical place.
- **Unknown means stop.** Do not turn uncertainty into implementation assumptions.
- **Investigation and implementation are separate.** Upstream analysis should not silently modify the product.
- **Handoffs are self-contained.** An Executor should not have to reconstruct the current specification from a long comment history.
- **Small execution units.** The default model is one Work Package, one execution issue, one branch/workspace, one PR.
- **Approval is explicit.** Decision gates are part of the process, not an implied chat state.
- **Review checks intent, not only code quality.**

## Roles

todokiso defines responsibilities rather than actor types.

| Role | Responsibility |
| --- | --- |
| Decision Owner | Owns objectives, priorities, approval gates, merge/release decisions |
| Planner | Structures requirements, investigates impact, designs, decomposes work |
| Executor | Implements an approved Work Package and produces verifiable changes |
| Reviewer | Checks implementation, tests, scope, and alignment with approved intent |

A repository may map these roles to humans, AI systems, or hybrid workflows.

## Repository layout

~~~text
core/
  WORKFLOW.md
  EXECUTION.md
templates/
  impact-analysis.md
  detailed-design-work-packages.md
  business-issue.md
  work-package-issue.md
  pull-request.md
bootstrap/
  README.md
  repository-profile-template.md
~~~

## Getting started

Start with the manual bootstrap in bootstrap/README.md.

v0.1 intentionally avoids a CLI. The first goal is to prove the process in real repositories, observe what is truly portable, and only then automate it.

## Project-specific information

todokiso does not own your product context. Product goals, architecture, development commands, test strategy, deployment rules, and repository-specific guardrails belong in the target repository's **Repository Profile**.

See bootstrap/repository-profile-template.md.

## Name

**todokiso** comes from the casual Japanese expression 「届きそ」 — a clipped form of 「届きそう」, roughly “looks like it'll reach.”

The question behind the project is simple:

> Will the original intent make it all the way to working software?

## Status

Early v0.1 extraction. The first external dogfood target is expected to be another repository before automation or packaging is added.
