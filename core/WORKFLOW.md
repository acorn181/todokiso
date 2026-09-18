# Core Workflow

todokiso defines a development lifecycle for carrying approved intent into working software without binding the process to a specific implementation tool.

## 1. Source of truth model

Use three layers of information.

1. **Business / Parent Issue body**
   - Canonical source for the approved objective, scope, overall plan, and Work Package structure.
2. **Comments / discussion**
   - Audit log for analysis, alternatives, approvals, and historical decisions.
   - Comments are not the primary execution specification.
3. **Work Package Issue body**
   - Canonical execution specification for one Executor.
   - It must be usable without reconstructing decisions from parent comments.

When an approved decision changes, update the canonical bodies that are affected and re-approve the affected execution specification.

## 2. Roles

### Decision Owner
Owns objectives, priorities, approval gates, and final merge/release decisions.

### Planner
Turns the request into evidence-backed impact analysis, estimates, design, Work Packages, dependencies, and an execution plan.

### Executor
Implements one approved Work Package within its stated scope and verifies it.

### Reviewer
Checks scope, behavior, tests, risks, and alignment with the approved intent.

A role is a responsibility. It is not synonymous with human or AI.

## 3. Lifecycle

### Step 1 — Request / Requirement

Goal: state the problem and desired outcome.

Minimum output:
- background / problem
- objective
- requirements
- explicit out of scope
- acceptance criteria, where already knowable

Do not begin implementation if the objective itself is unclear.

### Step 2 — Impact Analysis

Goal: understand the existing system before choosing a change.

Inspect:
- directly affected code or configuration
- indirectly affected modules
- shared interfaces and data flows
- tests
- compatibility and migration concerns
- security / performance / operational risk
- unknowns

Constraint: this is an investigation phase. Do not modify production code as part of impact analysis.

Use templates/impact-analysis.md.

### Step 3 — Estimate + Confidence

Record:
- size or effort range
- confidence
- evidence behind the estimate
- factors lowering confidence
- information required before a decision

Estimate is not a promise. It is decision support.

### Gate 1 — Go / No-Go

The Decision Owner explicitly chooses whether to continue.

A Go decision means the objective and known risk justify investing in detailed design. It is not yet permission to implement.

### Step 4 — Detailed Design

Define the implementation approach with enough specificity to expose trade-offs and hidden coupling.

Cover:
- chosen design and alternatives
- interfaces / data / state changes
- invariants and compatibility
- migration / rollback
- test strategy
- remaining unknowns
- changes from the initial impact analysis

If an unresolved design choice materially affects implementation, stop and resolve it before execution.

### Step 5 — Work Package decomposition

Split the design into independently executable units.

Default model:

**1 Work Package = 1 execution issue = 1 Executor = 1 branch/workspace = 1 PR**

This is a default, not a reason to create meaningless micro-PRs.

Each Work Package needs:
- a single purpose
- acceptance criteria
- change boundaries
- tests / verification
- dependencies
- explicit out of scope

### Step 6 — Dependency DAG

Make sequencing explicit.

Identify:
- hard dependencies that block start
- units that can run in parallel
- shared files or interfaces likely to conflict
- integration work that truly requires its own Work Package

Do not create an “integration WP” unless integration itself requires implementation or distinct verification.

### Step 7 — Branch / PR Plan

For each Work Package define:
- base branch
- branch naming recommendation
- intended PR boundary
- expected verification
- relation to parent and execution issues

Prefer short-lived leaf branches when work is independent. Use an integration / feature branch only when the design actually requires staged integration.

### Gate 2 — Ready for Implementation

The Decision Owner approves:
- detailed design
- Work Package decomposition
- dependency plan
- PR plan
- remaining known risk

Only approved Work Packages may be handed to Executors.

### Step 8 — Materialize Work Package Issues

Create or update a self-contained issue for each approved Work Package.

A Work Package Issue is ready only when it passes the Handoff Gate in core/EXECUTION.md.

### Step 9 — Implementation / Test / PR

The Executor:
- stays inside the Work Package scope
- follows the target repository profile
- adds or updates tests as required
- records verification results
- opens a PR that closes the Work Package Issue and references the parent issue

### Step 10 — Review

Review against two things:

1. implementation quality
2. approved intent

A technically clean change that violates the objective, invariant, or scope is not complete.

### Step 11 — Merge / Release

Merge only after required verification and review are complete.

The Work Package Issue may close with its PR. The parent Business Issue closes only after all required Work Packages are complete and the Decision Owner confirms the objective has been met.

## 4. Change after approval

If a parent objective or design changes after Work Package materialization:

1. identify affected Work Packages
2. update their canonical issue bodies
3. invalidate stale implementation approval
4. re-run the affected handoff checks
5. re-approve before execution continues

Historical comments remain useful as audit history, but they do not override the current canonical specification.

## 5. Lite mode

Lite mode shortens artifacts; it does not remove the lifecycle's essential semantics.

A small, low-risk change may use shorter templates when:
- impact is local and understood
- unknowns are minimal
- one Work Package is sufficient
- rollback is obvious
- verification is straightforward

Lite mode still requires an explicit objective, scope boundary, verification, and execution handoff.
