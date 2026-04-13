# Prompt: UI Test Creation

## Purpose
Create a Playwright UI test using repository rules and UI test development skill.

---

## Prompt

Create a Playwright test using:

- CLAUDE.md
- .claude/rules/testing.md
- .claude/rules/ui.md
- .claude/rules/git.md
- .claude/rules/security.md
- ui-test-script-development skill

---

## Requirements

1. Follow existing project test style
2. Use stable locator strategy:
   - getByRole
   - getByLabel
   - getByPlaceholder
3. Avoid brittle locators:
   - nth-child
   - deep CSS paths
4. Avoid waitForTimeout
5. Use meaningful assertions
6. Keep test simple and readable

---

## Decision Rules

- Choose most stable locator, not just most semantic
- Prefer minimal working solution
- Avoid unnecessary abstraction
- If multiple approaches exist → choose ONE and explain why

---

## Output Format

- Scenario covered
- Assumptions
- Test code
- Locator rationale
- Assertion explanation
- Flakiness risks (if any)
- Confidence level (high / medium / low)