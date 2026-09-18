# Execution and Handoff

This document defines the contract between an approved plan and an Executor.

## 1. Handoff Gate

Before an Executor starts a Work Package, verify all six conditions.

1. **Go decision exists**
   - The parent objective has passed the first decision gate.
2. **Implementation approval exists**
   - The detailed design and execution plan have passed the second decision gate.
3. **The Work Package Issue is current**
   - All approved changes affecting this WP are reflected in its body.
4. **The Work Package Issue is self-contained**
   - Purpose, specification, acceptance criteria, invariants, verification, exclusions, dependencies, and PR plan are available without mining parent comments.
5. **Hard dependencies are resolved**
   - Required upstream work is merged or otherwise available.
6. **No unresolved contradiction exists**
   - The parent issue and Work Package Issue do not disagree about an implementation-relevant requirement.

If any condition fails, do not start implementation.

## 2. Executor contract

The Executor should treat the Work Package Issue body and the target repository profile as the execution contract.

The Executor must:
- stay within the approved scope
- preserve stated invariants
- avoid unrelated refactoring
- follow repository-specific development and test commands
- surface newly discovered unknowns rather than silently inventing requirements
- update tests and documentation when the Work Package requires it
- report verification that was actually performed

If implementation discovers a requirement or architectural contradiction that changes the approved design, stop and return the task to planning rather than expanding scope autonomously.

## 3. Execution issue lifecycle

Recommended status flow:

~~~text
Planned
  ↓
Approved
  ↓
Ready for Implementation
  ↓
In Progress
  ↓
PR Open
  ↓
Merged
~~~

A cancelled or materially changed execution should not resume from stale assumptions. Synchronize the issue body with the latest approved specification before restarting.

## 4. Pull request relationship

An execution PR should:

- close its Work Package Issue
- reference its parent Business Issue without closing it
- summarize the actual change
- record verification results
- call out deviations or unresolved risk

Recommended references:

~~~text
Fixes #<work-package-issue>
Refs #<parent-business-issue>
~~~

## 5. Review contract

Review should answer:

- Does the implementation satisfy every Acceptance Criterion?
- Does it preserve every stated invariant?
- Is any unrelated change included?
- Are tests appropriate for the changed behavior?
- Do verification results match the target repository's policy?
- Did the implementation reveal a new risk or unknown?
- Does the resulting behavior still match the parent objective?

Code quality review is necessary but not sufficient.

## 6. CI and verification

The target repository profile owns concrete commands.

todokiso only requires that:
- required checks are explicit
- failures are investigated rather than ignored
- skipped checks are explained
- environment-specific verification is recorded honestly
- a failed check caused by a specification conflict returns to planning / decision rather than being patched around

## 7. Merge and close

The Decision Owner merges or releases according to the target repository's policy.

After merge:
- the corresponding Work Package Issue may close automatically
- the parent Business Issue remains open until all required Work Packages are complete
- the parent closes only after the objective itself is verified, not merely because all PRs exist
