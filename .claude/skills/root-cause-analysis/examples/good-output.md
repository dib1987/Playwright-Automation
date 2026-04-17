# Failure captured
- Test file: `tests/checkout/payment.spec.js`
- Failing step: `await page.getByRole('button', { name: 'Pay Now' }).click()`
- Error message: `Error: strict mode violation: getByRole('button', { name: 'Pay Now' }) resolved to 2 elements`
- Stack trace: `at payment.spec.js:34`
- Expected: The Pay Now button to be clicked and the confirmation screen to appear
- Actual: Playwright threw a strict mode violation — two elements match the locator

# Failure category
[x] Locator failure

# Root cause
A second "Pay Now" button was added inside a promotional modal that loads on the payment page. The locator `getByRole('button', { name: 'Pay Now' })` now matches both the modal button and the checkout form button. Playwright strict mode throws because the locator is ambiguous.

# Evidence
- Running `page.getByRole('button', { name: 'Pay Now' }).count()` in debug mode returns `2`
- The modal was introduced in commit `d4f89a2` (merged 2026-04-14), two days before the test started failing
- The test passed consistently before that commit — this is not an intermittent failure
- The modal button is inside `div.promo-modal`; the checkout button is inside `form#checkout-form`

# Fix applied
Scope the locator to the checkout form to eliminate ambiguity. The modal button is irrelevant to this test scenario.

```js
// Before
await page.getByRole('button', { name: 'Pay Now' }).click();

// After
await page.locator('form#checkout-form').getByRole('button', { name: 'Pay Now' }).click();
```

The `form#checkout-form` scoping is stable — the form ID is set in the server template and is unlikely to change with UI updates.

# Validation result
- Test re-run result: Passed — 3 consecutive runs confirmed
- Adjacent tests checked: `tests/checkout/order-summary.spec.js` uses the same page but does not reference the Pay Now button — unaffected
- Regression introduced: No

# Remaining risk
If the checkout form ID (`checkout-form`) is ever renamed, this scoping will break. Low probability — it is a server-rendered ID. Flag during any checkout template refactor.

# Prevention recommendation
- **Pattern**: Ambiguous locator caused by new element with identical text added to the same page
- **Prevention**: When adding a new interactive element with the same label as an existing one, scope all existing locators for that label and verify no strict mode violations are introduced
- **Applies to**: Any test referencing button text that could plausibly appear in a modal, dialog, or repeated component (e.g., "Submit", "Confirm", "Continue", "Cancel")
