# Impact Analysis & Estimate Template

Use this before implementation. The goal is to understand the existing system and make uncertainty visible.

## Full

### 1. Requirement summary
- Objective:
- Assumptions:
- Explicit out of scope:

### 2. Directly affected areas
- Files / modules:
- Main changes likely required:

### 3. Indirect impact
- Callers / consumers:
- Shared components / libraries:
- State / data flow:
- Configuration / deployment:
- External interfaces:

### 4. Cross-cutting checks
- Compatibility:
- Security / privacy:
- Performance:
- Accessibility / UX:
- Observability / operations:
- Documentation:

Use “Not applicable” with a short reason instead of silently omitting a relevant category.

### 5. Test impact
- Unit:
- Integration:
- End-to-end:
- Manual / environment-specific:
- Existing tests likely affected:

### 6. Migration / rollback
- Data or configuration migration:
- Backward compatibility:
- Rollback strategy:

### 7. Risk / Unknown / Decisions required
- Known risks:
- Unknowns:
- Decisions needed before implementation:

### 8. Estimate + Confidence

- Initial size / effort range: S / M / L / XL (or repository-specific scale)
- Confidence: High / Medium / Low
- Evidence:
- Factors lowering confidence:
- Additional information required for Go / No-Go:

### 9. Updated estimate after detailed design

| Item | Initial | Updated |
| --- | --- | --- |
| Size / range | | |
| Confidence | | |
| Reason for change | — | |

## Lite

Use Lite only when impact is local and understood.

### Impact
- Direct change:
- Shared / indirect impact:
- Tests:

### Risk
- Unknown / risk:

### Estimate
- Size:
- Confidence:
- Reason:
