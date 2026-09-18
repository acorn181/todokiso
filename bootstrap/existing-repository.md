# Existing Repository Bootstrap Runbook

This runbook describes how to apply todokiso to an existing repository without a CLI.

The goal is not to copy a folder and declare success. A bootstrap is complete only when the portable lifecycle is connected to the target repository's real architecture, commands, test strategy, and approval ownership.

## Preconditions

Bootstrap from a stable repository state whenever possible.

Prefer:
- the default branch after foundational setup has landed
- a dedicated bootstrap branch
- no unrelated product implementation mixed into the same PR

If the repository is still being initialized, finish the baseline first. The Repository Profile should describe the repository that Executors will actually work in.

## Expected output

A typical target repository will end up with something like:

~~~text
AGENTS.md                          # or docs/REPOSITORY_PROFILE.md
docs/
  todokiso/
    WORKFLOW.md
    EXECUTION.md
    SOURCE.md
    templates/
      impact-analysis.md
      detailed-design-work-packages.md
      business-issue.md
      work-package-issue.md
      pull-request.md
.github/
  ISSUE_TEMPLATE/                 # optional repository-native integration
  pull_request_template.md        # optional repository-native integration
~~~

The exact paths may differ. The responsibilities should not.

## Step 1 — Inspect the target repository

Inspect the stable target branch and record facts, not guesses.

At minimum inspect:
- README / product documentation
- package or build manifests
- source tree
- test configuration
- CI workflows
- deployment configuration
- existing issue / PR templates
- security / secrets handling
- repository-specific safety constraints

Capture:
- product purpose
- architecture
- important directories
- standard development commands
- required verification
- release / rollback model
- guardrails
- existing workflow conventions

If a fact cannot be established from the repository, mark it Unknown and resolve it with the repository owner.

## Step 2 — Generate the Repository Profile

Start from repository-profile-template.md.

The profile should contain only target-repository facts and local policy.

It should answer questions such as:
- What is this repository for?
- Where should a change go?
- Which architectural constraints must not be broken?
- Which commands must an Executor run?
- When is E2E or manual verification required?
- What must never be committed?
- Who may merge or release?

Recommended location:
- AGENTS.md when the repository already uses an agent-context convention
- otherwise docs/REPOSITORY_PROFILE.md

The Repository Profile is not a copy of todokiso core.

## Step 3 — Vendor a pinned todokiso snapshot

For v0.1, prefer a local snapshot over links to a moving main branch.

Copy:
- core/WORKFLOW.md
- core/EXECUTION.md
- the templates the repository intends to use

Recommended target:
- docs/todokiso/

Add docs/todokiso/SOURCE.md containing:
- upstream repository URL
- release tag or commit SHA used
- bootstrap date
- local adaptations, if any

Example:

~~~markdown
# todokiso source

- Upstream: https://github.com/acorn181/todokiso
- Revision: <tag-or-commit>
- Bootstrapped: YYYY-MM-DD

## Local adaptations
- PR verification commands are defined by AGENTS.md.
- GitHub Issue forms are repository-specific wrappers around the upstream templates.
~~~

Do not silently edit the semantics of WORKFLOW.md or EXECUTION.md. If the target repository needs a local exception, document the exception in the Repository Profile or local integration notes.

## Step 4 — Integrate templates with the repository

There are two valid levels of integration.

### Level A — document templates only

Keep the copied templates under docs/todokiso/templates/ and use them when creating Issues and PRs.

This is the smallest bootstrap and is appropriate for first dogfood.

### Level B — GitHub-native templates

Additionally adapt them into:
- .github/ISSUE_TEMPLATE/
- .github/pull_request_template.md

When the repository already has templates:
- merge rather than overwrite
- preserve repository-specific required fields
- add todokiso semantics where missing
- keep concrete commands repository-specific

A GitHub-native template is an adapter. The portable template remains the conceptual source.

## Step 5 — Map roles

Record the current mapping for:

| todokiso role | Current actor |
| --- | --- |
| Decision Owner | |
| Planner | |
| Executor | |
| Reviewer | |

Actors may be humans, AI systems, or a combination.

Vendor-specific triggers, permissions, labels, or UI behavior belong in local integration notes, not in todokiso core.

## Step 6 — Define the gates in local terms

The target repository must make these decisions explicit.

### Gate 1 — Go / No-Go

Input:
- objective
- Impact Analysis
- initial Estimate + Confidence
- known risks / Unknowns

Output:
- explicit Go or No-Go by the Decision Owner

### Gate 2 — Ready for Implementation

Input:
- Detailed Design
- Work Package plan
- Dependency DAG
- Branch / PR Plan
- remaining risk

Output:
- explicit Implementation Approval

Also define who may merge / release.

## Step 7 — Run the bootstrap review

Before calling the bootstrap complete, verify:

- [ ] Repository Profile describes the actual repository
- [ ] concrete verification commands are correct
- [ ] core workflow files are pinned to an upstream revision
- [ ] local exceptions are explicit
- [ ] role mapping exists
- [ ] both approval gates have an owner
- [ ] Work Package template is self-contained
- [ ] existing GitHub templates were not accidentally destroyed
- [ ] no unrelated product behavior changed

The bootstrap PR should ideally contain process and documentation changes only.

## Step 8 — Dogfood one real task

After the bootstrap PR merges, choose one bounded real task.

Create the parent Business Issue using the new process and run:

~~~text
Request
→ Impact Analysis
→ Estimate + Confidence
→ Go
→ Detailed Design
→ Work Package / Dependency DAG
→ PR Plan
→ Implementation Approval
→ Work Package Issue
→ Implementation / Test / PR
→ Review
→ Merge
~~~

Do not retroactively pretend that a task implemented before the bootstrap followed todokiso.

## Step 9 — Record friction

During the first dogfood task, record every step that feels manual or ambiguous.

Classify each item as:
- Core
- Generated
- Repository Profile
- Human decision
- Integration-specific

This classification is the input for future bootstrap automation.

## Updating todokiso later

v0.1 does not automatically track upstream changes.

When upgrading:
1. choose a new todokiso tag / commit
2. compare the vendored core and templates
3. review semantic changes
4. update SOURCE.md
5. adapt local wrappers if required
6. merge as an explicit process-change PR

This prevents a target repository's development rules from changing just because upstream main moved.
