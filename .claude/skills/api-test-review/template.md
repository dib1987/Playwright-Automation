# Summary
One paragraph. State the endpoint or scenario covered, overall verdict, and the single highest-priority risk.

# What is already good
Bullet list. Call out solid request design, correct auth reuse, strong assertions, and stable patterns worth keeping.

# Risks found
Bullet list. Tag each finding with a severity label:
- [MUST FIX] — security risk, hardcoded secret, broken assertion, or false pass/fail in CI. Fix before merge.
- [RISKY] — fragile under data or environment variation. Should be fixed, can be tracked as follow-up.
- [OPTIONAL] — readability or style improvement. No stability or correctness impact.

# Findings by category

## Request design
Reference the exact request block. Explain whether it follows project patterns and reuses existing utilities. Flag duplicate setup or opaque construction.

## Auth handling
State whether credentials are externalized. Flag any hardcoded token or secret as [MUST FIX]. Confirm token utility is reused if one exists.

## Assertion quality
Evaluate each assertion layer: status code → body → business fields → schema → side effects.
State which layers are covered and which are missing for this scenario.

## Negative testing
Confirm whether error status, error message, and error structure are validated. Flag gaps for business-critical flows.

## Test data
State whether test data is explicit, stable, and environment-independent. Flag hidden dependencies or random values without justification.

## Contract awareness
State whether the response structure is protected. Flag breaking contract risk explicitly if the endpoint is business-critical.

## Stability
Identify ordering dependencies, sleep-based waits, or hidden environment assumptions.

# Minimal safe improvements
Ordered list. Smallest safe change first. Every item must be PR-safe and targeted.
1. ...
2. ...

# Optional stronger refactor
Only if repeated patterns justify extraction (shared client, auth helper, base spec). Do not suggest unless the value is clear.

# Improved code
```js
// Paste only the affected lines — not the full file
// Each snippet should replace a specific problematic block identified above
```

# Scope and gaps
- Files reviewed: [list files actually read]
- Files NOT reviewed: [list related clients, helpers, auth utilities, or base specs that were skipped]
- Assumptions made: [e.g., "Auth token assumed valid — token expiry behavior not verified", "Schema assumed stable — not validated against API contract document"]
