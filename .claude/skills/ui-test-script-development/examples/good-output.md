# Scenario
User logs in with valid credentials and is redirected to the dashboard. The test proves authentication succeeds by asserting the dashboard heading is visible and the URL contains `/dashboard`.

# User flow steps
1. Navigate to `/login`
2. Enter a valid username into the email field
3. Enter a valid password into the password field
4. Click the Sign In button
5. Dashboard heading is visible and URL confirms the redirect

# Locator decisions
- Email input: `getByLabel('Email')` — the label is stable, semantic, and survives DOM restructuring
- Password input: `getByLabel('Password')` — same rationale
- Sign In button: `getByRole('button', { name: 'Sign In' })` — role + name is the most resilient locator; survives class and layout changes
- Dashboard heading: `getByRole('heading', { name: 'Dashboard' })` — confirms the correct page rendered, not just that navigation happened

# Wait strategy
- After clicking Sign In: `await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()` — waits for the visible result of the redirect before asserting the URL
- No fixed timeouts used anywhere

# Assertions
- `toBeVisible()` on the dashboard heading — proves the page rendered and the user is authenticated
- `toHaveURL(/\/dashboard/)` — confirms correct URL reached after redirect

# Generated test code
```js
// tests/auth/login.spec.js
import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('logs in with valid credentials and lands on the dashboard', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email').fill(process.env.TEST_USER_EMAIL);
    await page.getByLabel('Password').fill(process.env.TEST_USER_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
```

# Flakiness risks
- [MITIGATED] Post-login redirect: the `toBeVisible()` assertion on the dashboard heading acts as the readiness condition before the URL assertion — no fixed wait needed.
- [KNOWN RISK] If the application shows a loading spinner before rendering the heading, the assertion could time out in slow CI environments. Monitor on first CI run; add a `waitFor` on the spinner disappearance if it becomes an issue.

# Assumptions
- `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` environment variables are set in all environments.
- The dashboard page renders an `<h1>` or heading-role element with text `"Dashboard"`.
- The post-login URL contains `/dashboard` — assumed from current app behavior, not verified in the DOM.
- This test does not cover invalid credentials or locked accounts — those are separate scenarios.

# Known gaps
- [KNOWN GAP] Invalid credentials (wrong password) not covered in this test. Add a separate negative test if login failure behavior is business-critical.
- [KNOWN GAP] Session expiry and re-login flow not covered.
