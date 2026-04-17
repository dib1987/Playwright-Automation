# UI Test Review Reference

## Locator Strategy
Preferred order (matches project rules in `.claude/rules/ui.md`):
1. getByRole
2. getByLabel
3. getByPlaceholder
4. getByText (stable, user-visible text)
5. CSS selectors (only if stable and semantically meaningful)
6. XPath — last resort only, must be justified in review comment

Note: `getByTestId` is not in the project locator standard. Only recommend it if
the codebase already uses `data-testid` attributes consistently. Call out the
tradeoff: it improves stability but requires coordination with the dev team.

Prefer:
- semantic locators tied to user-visible meaning
- locators that survive harmless style or layout changes
- reusable locator patterns when the same element is referenced in multiple steps

Avoid:
- nth-child or positional selectors
- deeply chained brittle selectors (e.g., `div > ul > li:first-child > span`)
- selectors tied to layout rather than meaning
- over-specific CSS that will break with harmless UI changes
- class names that could be generated or changed by a build tool

## Wait Strategy
Prefer waits tied to observable state:
- element visible: `await expect(locator).toBeVisible()`
- element enabled: `await expect(locator).toBeEnabled()`
- URL change: `await expect(page).toHaveURL(...)`
- network completion: only when the next action genuinely depends on it
- user-visible state transition: success message, modal open, page title change

Avoid:
- `waitForTimeout()` — hides the real readiness condition
- arbitrary `sleep` or `page.waitForTimeout(n)`
- hidden timing dependencies (clicking immediately after navigation without a check)
- waits that only exist to paper over an underlying timing bug

## Assertion Quality
Prefer:
- assertions that prove the business outcome worked
- high-signal assertions tied to user-visible state
- clear, readable expected values
- assertions that would fail if the scenario broke silently

Avoid:
- checking only that an element exists when stronger state is available
- asserting implementation details (DOM structure, CSS class names)
- redundant assertions that recheck what a previous step already confirmed
- asserting too many volatile details (exact pixel count, dynamic timestamps)

## Readability
Prefer:
- clear scenario intent visible from the test name and first few lines
- clean arrange / act / assert flow with visible separation
- page objects only when the same interaction is reused in 3+ tests
- stable, descriptive naming for locators and helpers
- helpers with a single, obvious responsibility

Avoid:
- mixed concerns in a single test block
- repeated raw selectors that should be extracted
- giant test bodies with no structure
- dense logic with hidden assumptions
- comments that explain what the code does instead of why

## Flakiness Indicators
Watch for:
- dynamic DOM timing after click, submit, or navigation
- detached element errors from stale references
- race conditions between action and state transition
- animation or transition timing not accounted for
- hidden loading overlays that block interaction
- environment-dependent data (user accounts, dates, feature flags)
- state leakage between tests (shared cookies, localStorage, db state)
- tests that pass locally but fail in CI due to different viewport or speed

## Severity Classification
Use these labels consistently in every review:

| Label | Meaning |
|---|---|
| [MUST FIX] | Will cause flakiness or false pass/fail in CI. Fix before merge. |
| [RISKY] | Works now but fragile. Should be fixed, can be tracked as follow-up. |
| [OPTIONAL] | Readability or style improvement. No stability impact. |

## Review Mindset
Always separate:
- what is acceptable now
- what is risky under load or in CI
- what must change before merge
- what can be a tracked follow-up

Prefer:
- minimal safe improvements first
- PR-safe advice that doesn't require a full rewrite
- production-grade reasoning over style nitpicks
- naming the exact line or selector — never give vague feedback
