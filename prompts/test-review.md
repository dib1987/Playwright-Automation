# Prompt: Test Review

## Purpose
Review and improve a Playwright test using repository guidance and strong engineering judgment.

---

## Prompt
Analyze the provided Playwright test using:

- CLAUDE.md
- .claude/rules/testing.md
- .claude/rules/ui.md
- .claude/rules/git.md
- .claude/rules/security.md

Focus on:
1. locator strategy
2. wait strategy
3. assertion quality
4. readability
5. flakiness risk
6. minimal safe improvements

---

## Critical Review Rules

- Do not apply rules mechanically
- Prefer the most stable locator, not just the most semantic one
- Explain tradeoffs when multiple locator choices are reasonable
- Always recommend ONE best approach, not just list options
- Tie wait strategies to real user-visible readiness conditions
- If suggesting env vars, do not leave real secret fallbacks in code
- Distinguish between:
  - works now
  - production-grade
- Call out any inconsistency in your own recommendations

---

## Decision & Priority Rules

- Identify the **top 3 issues that should be fixed first**
- For each issue, explain:
  - impact (high / medium / low)
  - effort (low / medium / high)
- Prioritize fixes based on:
  → high impact + low effort first

---

## Constraints

- Do not over-engineer
- Do not introduce unnecessary abstractions
- Do not modify unrelated logic
- Prefer Playwright-native APIs
- Avoid waitForTimeout unless absolutely necessary
- Keep output practical and production-oriented

---

## Output Format

- What is good
- What is weak
- Top 3 issues to fix first (with impact/effort)
- Tradeoffs / judgment calls
- Improved version of the test
- Risk / notes
- Confidence level (high / medium / low)