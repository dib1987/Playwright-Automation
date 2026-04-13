# Testing Rules

## General
- Prefer deterministic tests
- Keep tests simple and readable
- Use the smallest relevant validation first
- Avoid flaky test design

## Validation Rules
- Bug fix -> add regression coverage when practical
- Feature change -> review impacted tests
- Report what passed
- Report what failed
- Report what was not tested

## Anti-Patterns
- hardcoded waits
- duplicate test logic
- weak assertions
- unnecessary broad changes