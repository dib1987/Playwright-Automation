# UI Test Script Development Reference

## Locator Strategy — Priority Order
Always use the highest-priority locator that uniquely identifies the element.
This order matches the project standard in `.claude/rules/ui.md`.

| Priority | Method | When to use |
|---|---|---|
| 1 | `getByRole()` | Any interactive element with a semantic role (button, link, textbox, etc.) |
| 2 | `getByLabel()` | Form inputs with an associated label |
| 3 | `getByPlaceholder()` | Inputs with a placeholder when no label is present |
| 4 | `getByText()` | Static text content that is stable and user-visible |
| 5 | CSS selector | When semantic locators cannot uniquely identify the element |
| 6 | XPath | Last resort only — must be justified in the output |

Avoid:
- `nth-child`, `nth-of-type`, or any positional selector
- selectors tied to layout structure (e.g., `div > ul > li:first-child`)
- class names that could be generated or changed by a build tool
- deeply chained brittle selectors that will break on harmless DOM changes

Note: Only recommend `getByTestId` if the project already uses `data-testid` attributes consistently.

## Wait Strategy — State-Based Readiness
Every state transition (click, navigation, form submit) must have an explicit readiness condition before the next action.

Prefer:
```js
await expect(locator).toBeVisible()      // element is rendered
await expect(locator).toBeEnabled()      // element is interactive
await expect(page).toHaveURL(...)        // navigation completed
await locator.waitFor({ state: 'visible' }) // explicit wait when needed
```

Avoid:
- `await page.waitForTimeout(n)` — hides the real readiness condition
- clicking immediately after navigation without a visibility check
- assuming auto-wait will cover all transitions (it covers actions, not all state changes)
- waits that only exist to paper over a timing bug

## Assertion Quality
Every test must assert a user-visible business outcome — not just that an element exists.

Prefer:
```js
await expect(locator).toBeVisible()
await expect(locator).toHaveText('Expected value')
await expect(page).toHaveURL(/confirmation/)
await expect(locator).toBeEnabled()
await expect(locator).toHaveValue('expected')
```

Avoid:
- `expect(locator).toBeTruthy()` — element could exist but be hidden or empty
- checking only that an element exists when stronger state is available
- asserting CSS classes or implementation details
- no-assertion tests

## Action Design
Prefer:
- sequential steps with one action per line
- ensuring element readiness before each action
- clear, readable step names that match the user's mental model

Avoid:
- chaining too many actions in one expression
- performing actions on elements that may not yet be ready
- mixing navigation and interaction in a single step without a readiness check

## Structure and Readability
Prefer:
- test name that describes the scenario, not the implementation
- visible arrange / act / assert separation
- page objects only when the same interaction is reused in 3+ tests
- descriptive `const` names for locators used more than once

Avoid:
- giant test bodies with no visual structure
- repeated raw selectors that should be extracted
- comments that describe what the code does (code should be self-describing)
- mixed concerns in a single test block

## Flakiness Prevention
Before submitting any test, ask:
- Does every state transition have a readiness condition?
- Does any locator depend on DOM position or layout?
- Could animation or loading overlays delay element availability?
- Does the test depend on previous test state (cookies, localStorage, DB)?
- Could this test behave differently in CI vs. local (viewport, speed, network)?

Common flakiness sources:
- missing readiness check after click or navigation
- detached element errors from stale locator references after re-render
- animation timing not accounted for
- hidden loading overlays blocking interaction
- environment-specific data (user accounts, feature flags, dates)

## Anti-Patterns Reference

| Anti-pattern | Why it's a problem |
|---|---|
| `waitForTimeout(n)` | Hides real cause, slow in happy path, fails under load |
| `nth-child` selector | Breaks when siblings are added or reordered |
| No assertion | Test proves nothing — false pass in every state |
| DOM-position locator | Breaks on harmless layout changes |
| Assertion on CSS class | Implementation detail — invisible to the user |
| Giant chained action | Unreadable, hard to debug when it fails |
| No readiness check after navigation | Race condition, intermittent CI failure |
