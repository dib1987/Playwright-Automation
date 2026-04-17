---
name: root-cause-analysis
description: Systematically diagnose Playwright test failures, UI automation issues, and API test failures by identifying the true root cause before applying any fix. Produces a structured diagnosis with evidence, fix, validation, and prevention recommendation.
when_to_use: Use when a test is failing, a locator stops working, timing is unstable, an assertion is failing unexpectedly, behavior is inconsistent, or the root cause is genuinely unclear.
argument-hint: [error message, stack trace, or failing test file path]
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
effort: high
---

# Purpose
Identify the true root cause of a test or automation failure before applying any fix. Never apply a workaround to a symptom. Always verify the fix resolves the actual cause, not just silences the error.

# Input
Target: $ARGUMENTS

# Execution Flow
1. Capture the failure completely before forming any hypothesis.
   - Exact error message and stack trace
   - Which step failed
   - What the test expected vs. what happened
2. Read the failing test file fully. Read any related page objects, fixtures, or helpers.
3. Complete the checklist in `checklists/diagnosis-checklist.md` internally before concluding.
4. Classify the failure into one of the categories in `reference.md`.
   Do not skip this step — the category determines the diagnostic path.
5. Ask the diagnostic questions for that category. Gather evidence from code and error output.
6. State the root cause with evidence. Do not state a cause you cannot support.
7. Design the minimal fix: touch only what caused the failure. Do not over-fix.
8. Validate: re-run the test, check adjacent flows for regression.
9. State any remaining risk that the fix did not address.
10. Recommend a prevention measure if the same failure pattern could recur.
11. Produce the full output using the structure in `template.md`.

# Output Rules
- The root cause must be stated as a specific, evidenced claim — not a hypothesis list.
- The fix must be the smallest safe change that addresses the root cause.
- Validation must be described — not assumed.
- Remaining risk must be stated if the fix is partial or the root cause is uncertain.
- Prevention must include a concrete recommendation, not just "be more careful".

# Guardrails
- Never apply a fix before the root cause is identified.
- Never increase a timeout as a first response to a timing failure.
- Never remove an assertion to make a test pass — investigate why it failed.
- Never blame the application without evidence that the app behavior changed.
- Do not touch code unrelated to the identified root cause.
- Do not mark a diagnosis complete if the fix was not validated.
- Be explicit when the root cause is a hypothesis rather than a confirmed fact.

# Additional Resources
- Failure categories and diagnostic questions: `reference.md`
- Output structure: `template.md`
- Good example: `examples/good-output.md`
- Annotated bad example: `examples/bad-output.md`
- Pre-output checklist: `checklists/diagnosis-checklist.md`
