# Scenario
POST /users/register — verifies a new user account is created and returns a valid user ID and email confirmation.

# Endpoint
- Method: POST
- Path: /users/register
- Auth required: No (public registration endpoint)

# Request design decisions
- No existing API client found in the project — request built using Playwright's `request` fixture directly, following the pattern in `tests/api/login.spec.js`.
- No auth required for this endpoint.
- Test data uses a timestamp suffix to ensure email uniqueness across runs without cleanup dependency.

# Validation strategy
- [x] Layer 1 — Status code: `201`
- [x] Layer 2 — Response body structure: `userId` and `email` fields present
- [x] Layer 3 — Business-critical fields: `userId` is a non-empty string; `email` matches the registered address
- [ ] Layer 4 — Schema: not required — endpoint is internal only, not part of a public contract
- [ ] Layer 5 — Side effects: GET /users/{userId} not called to verify persistence (see gaps)

# Negative cases covered
- 400 — missing required field `email`: validates the API rejects incomplete requests and returns a readable error
- 409 — duplicate email: validates the API prevents duplicate registration with an appropriate conflict error

# Generated test code
```js
// tests/api/user-registration.spec.js
import { test, expect } from '@playwright/test';

test.describe('POST /users/register', () => {
  test('creates a new user and returns userId and email', async ({ request }) => {
    const email = `testuser+${Date.now()}@example.com`;

    const response = await request.post('/users/register', {
      data: {
        email,
        password: process.env.TEST_USER_PASSWORD,
        name: 'Test User'
      }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.userId).toBeDefined();
    expect(typeof body.userId).toBe('string');
    expect(body.userId.length).toBeGreaterThan(0);
    expect(body.email).toBe(email);
  });

  test('returns 400 when email is missing', async ({ request }) => {
    const response = await request.post('/users/register', {
      data: { password: process.env.TEST_USER_PASSWORD, name: 'Test User' }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toBeDefined();
    expect(body.error).toContain('email');
  });

  test('returns 409 when email is already registered', async ({ request }) => {
    const email = `duplicate+${Date.now()}@example.com`;

    await request.post('/users/register', {
      data: { email, password: process.env.TEST_USER_PASSWORD, name: 'Test User' }
    });

    const response = await request.post('/users/register', {
      data: { email, password: process.env.TEST_USER_PASSWORD, name: 'Test User' }
    });

    expect(response.status()).toBe(409);
  });
});
```

# Assumptions
- `TEST_USER_PASSWORD` environment variable is set in all environments.
- The API base URL is configured in `playwright.config.js` via `baseURL`.
- The `email` field in the 400 response body contains the string `"email"` — assumed from API docs, not verified against a live response.
- User records created by these tests are not cleaned up — the timestamp suffix prevents collision but leaves orphan records.

# Known risks and gaps
- [KNOWN GAP] Layer 5 (side effects) not covered — the test does not verify the created user can log in or be retrieved via GET /users/{userId}. Add in a follow-up test.
- [KNOWN RISK] Timestamp-suffixed email relies on millisecond uniqueness — parallel test runs on the same machine could theoretically collide. Acceptable for now; revisit if parallel workers are increased.
