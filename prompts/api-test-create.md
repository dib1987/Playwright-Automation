# Prompt: API Test Creation

## Purpose
Create API automation tests using repository rules and API test development skill.

---

## Prompt

Create an API test using:

- CLAUDE.md
- .claude/rules/testing.md
- .claude/rules/api.md
- .claude/rules/git.md
- .claude/rules/security.md
- api-test-script-development skill

---

## Requirements

1. Define clear API scenario:
   - endpoint
   - method
   - request payload
2. Validate in layers:
   - status code
   - response body
   - business-critical fields
3. Include meaningful assertions
4. Avoid over-validating irrelevant fields
5. Keep test readable and maintainable

---

## Decision Rules

- Validate what proves business logic, not everything
- Prefer deterministic test data
- Avoid hardcoding secrets
- If multiple validation strategies exist → choose ONE and explain why

---

## Output Format

- Scenario covered
- Request details
- Validation points
- Test code
- Assumptions
- Risks / gaps
- Confidence level (high / medium / low)