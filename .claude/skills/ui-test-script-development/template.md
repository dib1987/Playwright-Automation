# Scenario
One sentence. What user flow is being automated and what visible outcome proves it succeeded.
Example: "User logs in with valid credentials and lands on the dashboard."

# User flow steps
Numbered list of what the user does. One action per step.
1. Navigate to /login
2. Enter username
3. Enter password
4. Click Sign In
5. Dashboard is visible

# Locator decisions
For each key element, state the locator chosen and why:
- Username input: `getByLabel('Username')` — label is stable and semantic
- Password input: `getByLabel('Password')` — same
- Submit button: `getByRole('button', { name: 'Sign In' })` — role + name is most resilient
- Dashboard heading: `getByRole('heading', { name: 'Dashboard' })` — confirms successful navigation

# Wait strategy
Describe the readiness condition used after each state transition:
- After clicking Sign In: `await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()`
- No hardcoded waits used.

# Assertions
List each assertion and what it proves:
- `toBeVisible()` on the dashboard heading — proves navigation succeeded and user is authenticated
- `toHaveURL(/dashboard/)` — confirms correct URL reached

# Generated test code
```js
// [filename]: tests/[feature]/[scenario].spec.js
// Paste the complete, runnable test here
```

# Flakiness risks
- [RISK] ...
- [MITIGATED] Describe what was done to reduce the risk.

# Assumptions
- [assumption about DOM structure, app behavior, or environment]
- [each assumption that could make this test fail in a different context]

# Known gaps
- [KNOWN GAP] ...
- State explicitly if any flow branch was intentionally excluded and why.
