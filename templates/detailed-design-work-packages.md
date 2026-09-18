# Detailed Design, Work Packages, and PR Plan Template

## 1. Detailed Design

### 1.1 Objective and scope
- Technical objective:
- In scope:
- Out of scope:

### 1.2 Chosen approach
- Approach:
- Why:
- Alternatives considered:
  - Alternative A:
  - Alternative B:

### 1.3 Affected areas
- Main modules:
- Interfaces / types:
- Existing behavior that may be affected:

### 1.4 Invariants and compatibility
- Invariants:
- Backward compatibility requirements:

### 1.5 Data / state / interface changes
- Data model:
- State:
- API / event / props / command interface:

### 1.6 Migration / rollback
- Migration:
- Rollback:

### 1.7 Test strategy
- Unit:
- Integration:
- End-to-end:
- Manual / environment-specific:

### 1.8 Remaining risk and unknowns
- Risks:
- Unknowns:

### 1.9 Changes since Impact Analysis
- Newly discovered constraints:
- Assumptions that changed:

### 1.10 Updated Estimate + Confidence
- Updated size / range:
- Updated confidence:
- Reason:

## 2. Work Packages

### Business Objective
[What outcome does the parent issue seek?]

### WP-1 — [name]
- Purpose:
- Acceptance Criteria:
  - [ ] 
- Change boundary:
- Verification:
- Out of scope:
- Dependencies:

### WP-2 — [name]
- Purpose:
- Acceptance Criteria:
  - [ ]
- Change boundary:
- Verification:
- Out of scope:
- Dependencies:

## 3. Dependency DAG

Describe hard dependencies and parallelism.

Example:

~~~text
WP-1
 ├─→ WP-2
 └─→ WP-3
      └─→ WP-4
~~~

- Parallelizable:
- Shared-file / conflict risk:
- Required integration order:

## 4. Branch / PR Plan

| PR | Work Package | Base | Suggested branch | Scope | Verification |
| --- | --- | --- | --- | --- | --- |
| PR-1 | WP-1 | main | feat/... | | |
| PR-2 | WP-2 | main or dependent branch | feat/... | | |

State whether a leaf branch or integration / feature branch is required and why.

## 5. Implementation Approval

- Decision: Approved / Not approved
- Decision Owner:
- Date:
- Conditions / notes:

After approval, materialize each WP using templates/work-package-issue.md.
