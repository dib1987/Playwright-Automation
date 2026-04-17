---
name: api-test-script-development
description: Create and improve API automation tests with strong validation, contract awareness, and maintainable structure. Produces complete, production-grade test code with layered assertions and explicit rationale.
when_to_use: Use when creating a new API test, improving an existing API test, adding negative scenarios, or strengthening validation on an existing endpoint.
argument-hint: [endpoint or test file path]
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
effort: high
---

# Purpose
Design and produce a complete, production-grade API test for the target scenario. Every test produced must include layered assertions, externalized auth, stable test data, and an explicit output contract.

# Input
Target: $ARGUMENTS

# Execution Flow
1. Understand the scenario fully before writing a single line of code.
   - What endpoint? What method?
   - What is the expected business outcome?
   - What auth is required?
2. Read existing test files, client utilities, auth helpers, and base specs before building anything.
   Do not duplicate setup that already exists.
3. Complete the checklist in `checklists/dev-checklist.md` internally before writing output.
4. Design the request: reuse existing client/util, keep payload explicit and readable.
5. Design assertions using the layered validation model in `reference.md`.
6. Identify which negative cases add real value for this scenario and include them.
7. Choose test data that is stable, minimal, and environment-independent.
8. Write the test code. Prefer the smallest complete implementation over a clever one.
9. Produce the full output using the structure in `template.md`.

# Output Rules
- Every test must assert beyond status code for business-critical flows.
- Every token or credential must come from an environment variable or approved utility.
- Every assumption about the environment, data, or schema must be stated explicitly.
- Every [KNOWN RISK] must be named — do not silently omit coverage.

# Guardrails
- Never hardcode credentials, tokens, or API keys.
- Never assert only the status code for a business-critical flow.
- Do not introduce a new client or utility if one already exists in the project.
- Do not add negative cases for every scenario — only where they add real value.
- Do not validate every response field — focus on what proves the scenario worked.
- Do not use sleep or arbitrary waits in API tests.
- Be explicit when schema or contract was not verified.

# Additional Resources
- Assertion layers, request design, test data rules: `reference.md`
- Output structure: `template.md`
- Good example: `examples/good-output.md`
- Annotated bad example: `examples/bad-output.md`
- Pre-output checklist: `checklists/dev-checklist.md`
- Project API rules: `.claude/rules/api.md`
