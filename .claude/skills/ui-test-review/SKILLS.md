---
name: ui-test-review
description: Review UI automation tests for locator stability, wait strategy, assertion quality, readability, and flakiness risk. Produces structured, severity-tagged PR-ready feedback.
when_to_use: Use when reviewing Playwright or UI automation tests, fixing flaky tests, improving maintainability, or preparing PR feedback for test code.
argument-hint: [path-to-test-file-or-folder]
allowed-tools:
  - Read
  - Grep
  - Glob
effort: high
---

# Purpose
Review the target UI automation script and produce minimal, safe, production-grade improvement guidance using severity-tagged findings and concrete code examples.

# Input
Target path: $ARGUMENTS

# Execution Flow
1. Read the target test file completely before forming any opinion.
2. If the test imports a page object, helper, or fixture — read that file before evaluating locators.
   Skip this step only if the test is fully self-contained with no imports.
3. Complete the checklist in `checklists/review-checklist.md` internally before writing output.
4. Evaluate locator quality against the preferred strategy in `reference.md`.
5. Evaluate waits and readiness conditions for every state transition.
6. Evaluate assertion strength — does each assertion prove the business outcome?
7. Identify all flakiness risks and classify severity ([MUST FIX] / [RISKY] / [OPTIONAL]).
8. Prefer the smallest safe improvement first — do not suggest rewrites unless justified.
9. Always distinguish "works now" from "production-grade and CI-safe".

# Review Focus
- locator strategy (stability, semantic meaning, project standard compliance)
- wait strategy (readiness conditions, absence of hardcoded sleep)
- assertion quality (business outcome proof, signal strength)
- readability (arrange/act/assert clarity, naming, structure)
- maintainability (repeated selectors, mixed concerns, abstraction need)
- flakiness risk (timing, detached elements, state leakage, environment dependency)

# Severity Classification
Tag every finding:
- [MUST FIX] — will cause flakiness or false pass/fail in CI. Must be fixed before merge.
- [RISKY] — fragile, works now but not CI-safe under load or speed variation.
- [OPTIONAL] — readability or style improvement. No stability impact.

# Required Output
Return the review using the structure in `template.md`.
Every [MUST FIX] finding must include an improved code snippet.
Every review must include a Scope and gaps section.

# Guardrails
- Do not suggest unnecessary framework rewrites.
- Prefer stable locators over clever locators.
- Prefer user-visible readiness conditions over sleep-based waits.
- Prefer obvious maintainable code over abstraction-heavy solutions.
- Call out tradeoffs when multiple locator choices are reasonable.
- Be explicit when DOM certainty is missing — state the assumption.
- Do not recommend `getByTestId` unless the project already uses `data-testid` attributes.
- Never give vague feedback. Name the exact selector, line, or code block.

# Additional Resources
- Detailed criteria and severity table: `reference.md`
- Good output example: `examples/good-output.md`
- Annotated bad output example: `examples/bad-output.md`
- Pre-review checklist: `checklists/review-checklist.md`
