# API Test Script Development Reference

## Request Design
Prefer:
- following the existing project pattern for building requests
- reusing existing API clients, request helpers, and base specs
- explicit, readable payloads — name every field, avoid opaque objects
- isolated test setup with no dependency on prior test state

Avoid:
- duplicating headers, auth, or base URL if a shared utility exists
- mixing unrelated setup into the same test
- opaque request construction that hides what is being sent
- requests that silently depend on a previous test's created data

## Auth Handling
Prefer:
- reusing the existing auth utility or token helper
- reading credentials from environment variables
- testing auth failure (401/403) when auth is part of the business flow

Avoid:
- hardcoded tokens, API keys, or passwords in any form
- duplicating auth setup when a shared utility already handles it
- silently skipping auth validation

## Assertion Layers — Required Validation Model
Work through these layers top-down. Stop at the layer where signal is already strong enough. For business-critical flows, always reach at least Layer 3.

| Layer | What to assert | Required when |
|---|---|---|
| 1. Status code | `expect(response.status()).toBe(200)` | Always |
| 2. Response body structure | top-level fields exist, correct types | Business-critical endpoints |
| 3. Business-critical fields | exact values that prove the scenario worked | Always for meaningful flows |
| 4. Schema / contract | full shape matches expected contract | Contract-sensitive / public endpoints |
| 5. Side effects | state changed correctly (verify via GET or DB) | When the API mutates state |

Rules:
- Do not assert only the status code for business-critical flows — this is a false pass.
- Do not assert every field — focus on what proves success.
- For collections: check both presence and meaningful content.
- Prefer specific matchers: `.toBe()`, `.toEqual()`, `.toContain()` over truthy checks.

## Negative Testing
Include negative scenarios when they add real value. Required for business-critical flows.

| Scenario | Assert |
|---|---|
| Missing required field | 400 status + error message |
| Invalid field value | 400 status + specific error field |
| Unauthorized (no token) | 401 status |
| Forbidden (wrong role) | 403 status |
| Resource not found | 404 status |
| Conflict / duplicate | 409 status + error structure |

Do not add a negative case for every possible input — cover the cases that matter to the contract.

## Test Data
Prefer:
- explicit, minimal data that maps directly to the scenario
- stable values that exist in all environments (or sourced from config/fixtures)
- readable dynamic generation when uniqueness is required
- cleanup of created resources when required by the scenario

Avoid:
- hardcoded IDs that only exist in one environment
- random values without a justification
- hidden dependencies on data created by previous tests
- test data that will break if the test order changes

## Contract Awareness
Prefer:
- asserting the response shape for contract-sensitive endpoints
- flagging when a field rename or removal could break downstream consumers
- reviewing impacted tests when response structure changes

Avoid:
- silently accepting any response shape for public or consumed APIs
- asserting only on a subset of fields when the full contract matters

## Stability Rules
Prefer:
- tests that are fully independent and run in any order
- deterministic setup over workaround logic
- explicit polling with documented timeout and reason when polling is needed

Avoid:
- ordering dependencies between tests
- sleep or arbitrary timeout-based waits
- environment-specific hardcoded values (base URLs, IDs, account names)
- assumptions about pre-existing database state

## Anti-Patterns Reference

| Anti-pattern | Why it's a problem |
|---|---|
| Status-code-only assertion | Business scenario can silently break |
| Hardcoded token | Security risk, breaks in other environments |
| Hidden test ordering dependency | Causes intermittent CI failures |
| Random test data without cleanup | Pollutes environment, causes false failures |
| Asserting every response field | Brittle — breaks on harmless additions |
| sleep() in API test | Hides real timing issue, slows suite |
| Duplicate auth setup | Maintenance burden, drift risk |
