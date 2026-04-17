---
name: api-test-review
description: Review API automation tests for request design, auth handling, assertion quality, contract awareness, test data stability, and flakiness risk. Produces structured, severity-tagged PR-ready feedback.
when_to_use: Use when reviewing API automation tests, fixing brittle or incomplete API tests, improving contract coverage, or preparing PR feedback for API test code.
argument-hint: [path-to-test-file-or-folder]
allowed-tools:
  - Read
  - Grep
  - Glob
effort: high
---

# Purpose
Review the target API automation script and produce minimal, safe, production-grade improvement guidance using severity-tagged findings and concrete code examples.

# Input
Target path: $ARGUMENTS

# Execution Flow
1. Read the target test file completely before forming any opinion.
2. If the test imports a client, helper, auth utility, or base spec — read that file before evaluating request design or auth handling.
   Skip this step only if the test is fully self-contained with no shared imports.
3. Complete the checklist in `checklists/review-checklist.md` internally before writing output.
4. Evaluate request design: clarity, reuse of existing utilities, test data quality.
5. Evaluate auth handling: no hardcoded secrets, correct token reuse, auth failure coverage.
6. Evaluate assertion quality in layers: status code → body → business fields → schema → side effects.
7. Evaluate contract awareness: does the test protect the response structure?
8. Identify all flakiness and stability risks and classify severity ([MUST FIX] / [RISKY] / [OPTIONAL]).
9. Prefer the smallest safe improvement first — do not suggest rewrites unless justified.
10. Always distinguish "works now" from "production-grade and CI-safe".

# Review Focus
- request design (clarity, utility reuse, test data quality, setup isolation)
- auth handling (no secrets, token reuse, auth failure coverage)
- assertion quality (layered validation, business outcome proof, contract coverage)
- negative testing (error code, error message, error structure coverage)
- test data (deterministic, minimal, no hidden environment dependencies)
- contract awareness (response structure protected, breaking changes flagged)
- stability (test independence, no ordering dependencies, no sleep-based logic)
- readability (naming, structure, maintainability)

# Severity Classification
Tag every finding:
- [MUST FIX] — security risk, broken assertion, false pass/fail in CI, or hardcoded secret. Fix before merge.
- [RISKY] — fragile, works now but unstable under data or environment variation.
- [OPTIONAL] — readability or style improvement. No stability or correctness impact.

# Required Output
Return the review using the structure in `template.md`.
Every [MUST FIX] finding must include an improved code snippet.
Every review must include a Scope and gaps section.

# Guardrails
- Do not suggest unnecessary framework rewrites.
- Never recommend hardcoding credentials or tokens — always flag this as [MUST FIX].
- Prefer reusing existing project utilities over introducing new abstractions.
- Prefer layered assertions over a single status-code-only check.
- Call out contract risk explicitly when an endpoint is business-critical.
- Be explicit when schema or data assumptions were not verified.
- Never give vague feedback. Name the exact line, field, or code block.
- Do not validate every response field — focus on what proves the scenario worked.

# Additional Resources
- Detailed criteria and severity table: `reference.md`
- Good output example: `examples/good-output.md`
- Annotated bad output example: `examples/bad-output.md`
- Pre-review checklist: `checklists/review-checklist.md`
- Project API rules: `.claude/rules/api.md`
