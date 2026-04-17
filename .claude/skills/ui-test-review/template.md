# Summary
One paragraph. State the scenario intent, overall verdict, and the single highest-priority risk.

# What is already good
Bullet list. Call out stable patterns, good locator choices, and strong assertions worth keeping.

# Risks found
Bullet list. Tag each finding with a severity label:
- [MUST FIX] — flakiness risk, broken assertion, brittle locator that will fail in CI
- [RISKY] — timing dependency or weak assertion that works now but is fragile
- [OPTIONAL] — readability or style improvement with no stability impact

# Findings by category

## Locator strategy
Reference the exact selector. Explain why it is stable or brittle. Suggest the preferred replacement.

## Wait strategy
Identify any fixed sleep, missing readiness condition, or premature action after a state transition.

## Assertion quality
State whether assertions prove the business outcome. Flag weak, redundant, or missing assertions.

## Readability
Note structure issues: mixed concerns, repeated locators, unclear naming, or poor arrange/act/assert flow.

## Flakiness risk
Call out timing transitions, detached element risk, animation timing, state leakage, or environment dependencies.

# Minimal safe improvements
Ordered list. Smallest safe change first. Every item must be PR-safe and targeted.
1. ...
2. ...

# Optional stronger refactor
Only if repeated patterns justify abstraction (page object, helper extraction). Do not suggest unless the value is clear.

# Improved code
```ts
// Paste only the affected lines — not the full file
// Each snippet should replace a specific problematic block identified above
```

# Scope and gaps
- Files reviewed: [list files actually read]
- Files NOT reviewed: [list related page objects, fixtures, or helpers that were skipped]
- Assumptions made: [e.g., "DOM structure assumed stable — not verified against live app"]
