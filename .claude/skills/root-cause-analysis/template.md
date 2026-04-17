# Failure captured
- Test file: [path]
- Failing step: [exact step or line]
- Error message: [exact error text]
- Stack trace: [key lines — not the full trace if it is long]
- Expected: [what the test expected]
- Actual: [what happened instead]

# Failure category
State exactly one category from the taxonomy in `reference.md`:
[ ] Locator failure
[ ] Timing failure
[ ] Assertion failure
[ ] Test data failure
[ ] Auth / session failure
[ ] Application defect
[ ] Environment failure
[ ] Test design failure

# Root cause
One clear statement with supporting evidence.
Do not write a hypothesis list — write the confirmed cause.

Example: "The `getByText('Submit')` locator matches two elements after the new modal was added in commit abc123. Playwright strict mode throws because the locator is ambiguous."

# Evidence
Bullet list. Each point must be observable from the code or error output:
- [evidence 1]
- [evidence 2]

# Fix applied
Describe the exact change made. Include before / after code if the change is in a test file.

```js
// Before
...

// After
...
```

# Validation result
- Test re-run result: [pass / fail / n runs to confirm stability]
- Adjacent tests checked: [list any tests that share the same locator, fixture, or data]
- Regression introduced: yes / no

# Remaining risk
State any risk the fix did not fully address. If none, write "None identified."

# Prevention recommendation
- **Pattern**: [type of failure]
- **Prevention**: [concrete practice to prevent recurrence]
- **Applies to**: [where else in the suite the same pattern could exist]
