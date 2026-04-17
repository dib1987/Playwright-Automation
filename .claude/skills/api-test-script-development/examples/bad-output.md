# WHY THIS OUTPUT IS BAD
# Use this file to calibrate what NOT to produce.
# Each ❌ annotation explains the specific failure.

---

# Test for user registration
# ❌ No endpoint named. No method. No business outcome stated. The scenario is invisible.

```js
test('register user', async ({ request }) => {
  const response = await request.post('/users/register', {
    data: {
      email: 'testuser@example.com',
      password: 'Password123',    // ❌ Hardcoded password — security risk, fails in other environments
      name: 'Test User'
    }
  });

  expect(response.status()).toBe(201);   // ❌ Status-code-only assertion — this is a false pass.
                                          // The endpoint could return 201 with an empty body and
                                          // the test would pass. userId is never asserted.
});
```
# ❌ No validation strategy section — reader cannot tell which layers are covered.
# ❌ No negative cases — a registration endpoint with no 400/409 coverage is incomplete.
# ❌ Hardcoded email 'testuser@example.com' — will fail on second run due to duplicate registration.
# ❌ No assumptions section — the reader doesn't know what env vars or data are expected.
# ❌ No known risks or gaps — the author appears unaware of the missing coverage.

# Recommendation
It works.
# ❌ This is not an output contract. "It works" is not a review, rationale, or risk statement.
# ❌ No files listed. No gaps named. No prevention of future issues.

---

# CONTRAST: What the same output should look like
See examples/good-output.md for a production-grade version of this same scenario.
