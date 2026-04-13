---
name: ui-test-script-development
description: Create and improve Playwright UI tests with stable locators, strong assertions, and minimal flakiness.
---

# UI Test Script Development

## When to use
Use this skill when:
- creating a new Playwright test
- improving an existing UI test
- fixing flaky UI behavior
- designing automation flows

---

## Steps

1. Understand user flow
   - what user does
   - expected visible outcome

2. Choose locator strategy
   Prefer:
   - getByRole()
   - getByLabel()
   - getByPlaceholder()
   - stable CSS
   Avoid:
   - nth-child
   - deep absolute selectors

3. Perform actions clearly
   - keep steps sequential
   - avoid chaining too much
   - ensure element readiness

4. Add assertions
   - validate user-visible behavior
   - validate important state change
   - avoid weak checks

5. Handle waits properly
   - wait for state, not time
   - avoid waitForTimeout
   - rely on Playwright auto-wait

6. Ensure stability
   - avoid flaky elements
   - avoid timing dependency
   - keep test deterministic

---

## Output

Always provide:
- scenario covered
- test code
- locator rationale
- assertion explanation
- possible flakiness risks