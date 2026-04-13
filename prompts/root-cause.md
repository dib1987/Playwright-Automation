# Prompt: Root Cause Analysis

## Purpose
Analyze a failing or risky Playwright test and identify the true root cause before suggesting a fix.

## Prompt
Use the root-cause-analysis skill together with repository guidance.

Analyze the provided Playwright test failure or suspected weak area.

Do the following:
1. identify the likely failure type
2. identify the most likely root cause
3. explain why it is happening
4. suggest the smallest safe fix
5. explain how to validate the fix

## Constraints
- Do not over-fix
- Do not change unrelated code
- Prefer deterministic solutions
- Avoid adding timing hacks
- Keep the solution maintainable

## Output Format
- Failure type
- Root cause
- Fix
- Validation steps
- Remaining risk