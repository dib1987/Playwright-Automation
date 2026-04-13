# UI Automation Rules

## Locator Strategy (STRICT ORDER)
Always prefer:

1. getByRole()
2. getByLabel()
3. getByPlaceholder()
4. getByText()
5. CSS selectors (if stable)
6. XPath ONLY if no better option exists

Avoid:
- absolute XPath
- fragile DOM-based locators

---

## Waiting Strategy
- Wait for state, NOT time
- Avoid `waitForTimeout()` unless absolutely necessary
- Use Playwright auto-waiting wherever possible

Preferred:
- `await expect(locator).toBeVisible()`
- `await locator.waitFor()`

---

## Actions
- Keep steps simple and sequential
- Avoid chaining too many actions in one line
- Always ensure element is ready before action

---

## Assertions
- Always validate user-visible behavior
- Use meaningful assertions

Examples:
- element visible
- text matches expected value
- navigation happened

Avoid:
- weak assertions
- no-assertion tests

---

## Stability Rules
- Avoid flaky elements
- Avoid timing-based logic
- Prefer deterministic flows

---

## Structure Rules
- Keep locators separate from test logic (future improvement)
- Keep tests readable and debuggable