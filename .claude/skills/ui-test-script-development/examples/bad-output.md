# WHY THIS OUTPUT IS BAD
# Use this file to calibrate what NOT to produce.
# Each ❌ annotation explains the specific failure.

---

# Login test
# ❌ No user flow stated. No success outcome defined. The reader doesn't know what this proves.

```js
test('login', async ({ page }) => {
  await page.goto('/login');

  await page.locator('input[type="email"]').fill('admin@example.com');
  // ❌ Brittle CSS type selector — could match multiple inputs, breaks if input type changes
  // ❌ Hardcoded email — environment-specific, will fail if this user doesn't exist in CI

  await page.locator('input[type="password"]').fill('admin123');
  // ❌ Hardcoded password — security risk, environment-specific

  await page.locator('button').click();
  // ❌ Matches any button on the page — clicks the wrong element if layout changes

  await page.waitForTimeout(3000);
  // ❌ Fixed wait — hides the real readiness condition, slow in happy path, still flaky under load

  expect(await page.title()).toBe('Dashboard');
  // ❌ Page title is not a user-visible business outcome
  // ❌ Title can be set before content renders — this does not prove login succeeded
  // ❌ Uses raw expect(), not Playwright's expect(locator) — no retry on failure
});
```
# ❌ No locator decisions section — reader doesn't know why these selectors were chosen.
# ❌ No wait strategy section — the fixed wait is the only approach, with no explanation.
# ❌ No flakiness risks named — the test has at least three flakiness sources.
# ❌ No assumptions section — environment dependencies are hidden.
# ❌ No known gaps — the author appears unaware that negative flows are missing.

---

# CONTRAST: What the same output should look like
See examples/good-output.md for a production-grade version of this same scenario.
