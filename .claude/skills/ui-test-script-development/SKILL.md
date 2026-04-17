---
name: ui-test-script-development
description: Create and improve Playwright UI tests with stable locators, state-based waits, strong assertions, and minimal flakiness. Produces complete, production-grade test code with explicit locator rationale and flakiness risk assessment.
when_to_use: Use when creating a new Playwright UI test, improving an existing test, fixing a flaky flow, or designing automation for a new user journey.
argument-hint: [user flow description or test file path]
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
effort: high
---

# Purpose
Design and produce a complete, production-grade Playwright UI test for the target user flow. Every test produced must use stable locators, state-based waits, meaningful assertions, and an explicit output contract.

# Input
Target: $ARGUMENTS

# Execution Flow
1. Understand the user flow before writing code.
   - What does the user do?
   - What is the user-visible outcome that proves success?
   - What page(s) are involved?
2. Read related page objects, fixtures, or helper files if they exist.
   Do not duplicate locators or actions that are already abstracted.
3. Complete the checklist in `checklists/dev-checklist.md` internally before writing output.
4. Choose locators using the priority order in `reference.md`. Justify any non-preferred choice.
5. Design the action sequence: keep steps sequential, ensure readiness before each action.
6. Design waits: every state transition must have a readiness condition — no fixed timeouts.
7. Design assertions: prove the business outcome, not just that elements exist.
8. Identify flakiness risks before submitting — name them explicitly.
9. Write the test code. Prefer the simplest readable implementation.
10. Produce the full output using the structure in `template.md`.

# Output Rules
- Every test must assert a user-visible business outcome.
- Every locator choice must follow the project priority order or include a justification.
- Every state transition must have an explicit readiness condition.
- Every assumption about the DOM, URL, or app behavior must be stated explicitly.
- Every [KNOWN RISK] must be named — do not silently omit coverage.

# Guardrails
- Never use `waitForTimeout()` or hardcoded sleep.
- Never use nth-child, positional, or layout-dependent selectors without justification.
- Do not recommend `getByTestId` unless the project already uses `data-testid` attributes.
- Do not introduce a page object unless the flow is reused in 3+ tests.
- Do not add assertions for implementation details — assert user-visible state.
- Do not chain too many actions in one line — keep steps readable.
- Be explicit when DOM structure was assumed rather than verified.

# Additional Resources
- Locator strategy, wait rules, assertion quality: `reference.md`
- Output structure: `template.md`
- Good example: `examples/good-output.md`
- Annotated bad example: `examples/bad-output.md`
- Pre-output checklist: `checklists/dev-checklist.md`
- Project UI rules: `.claude/rules/ui.md`
