# API Test Review Reference

## Request Design
Prefer:
- following the existing project pattern for building requests
- reusing existing clients, helpers, auth utilities, and base specs
- explicit, readable test data over dynamic or generated values
- isolated setup — no shared state between unrelated tests

Avoid:
- duplicating headers, tokens, or common setup if a shared utility already exists
- mixing unrelated setup into the same test block
- requests that depend on the side effects of a previous test
- opaque request construction that hides what is being sent

## Auth Handling
Prefer:
- reusing existing auth flows and token utilities
- environment variables or approved config for credentials
- testing auth failure scenarios where auth is part of the business flow

Avoid:
- hardcoded credentials, tokens, or API keys in any form — this is always [MUST FIX]
- duplicating auth setup when a shared utility already handles it
- tests that silently skip auth validation

## Assertion Quality — Validation Layers
Always think in layers and work top-down. Stop at the layer where the signal is already strong enough.

| Layer | What to assert | When required |
|---|---|---|
| 1. Status code | `expect(response.status()).toBe(200)` | Always |
| 2. Response body structure | top-level fields exist, correct types | For business-critical endpoints |
| 3. Business-critical fields | exact values that prove the scenario worked | Always for meaningful flows |
| 4. Schema / contract | full shape matches expected contract | For contract-sensitive endpoints |
| 5. Side effects | state changed correctly (DB, downstream call) | When the API mutates state |

Do not validate every field. Focus on what proves the scenario worked.

Prefer:
- high-signal assertions tied to the business outcome
- checking both presence and meaningful content for collections
- asserting the most critical contract behavior first

Avoid:
- asserting only the status code for business-critical flows
- vague assertions (response is not null, body exists)
- asserting too many volatile or irrelevant fields
- checking implementation details instead of business outcomes

## Negative Testing
Prefer:
- validating the correct error status code
- validating the error message or error structure, not just the code
- confirming the API fails for the right reason (not just that it fails)
- covering auth failure, missing required fields, invalid input, and out-of-range values

Avoid:
- relying on only one error field if the API has a standard error contract
- skipping negative scenarios for business-critical flows
- testing only happy paths

## Test Data
Prefer:
- purposeful, minimal test data that directly supports the scenario
- stable, reusable data patterns over random values unless uniqueness is required
- readable dynamic data generation when randomness is necessary
- cleanup of created resources when the test requires it

Avoid:
- test data that depends on existing environment state (specific user IDs, pre-seeded records)
- random values without a clear reason
- data setup that creates hidden ordering dependencies
- test data that will break if run in a different environment

## Contract Awareness
Prefer:
- protecting the response structure for contract-sensitive endpoints
- explicitly flagging when a change could break downstream consumers
- reviewing impacted tests when response fields are added or removed

Avoid:
- silently changing response field assertions without calling out contract impact
- ignoring response structure for public or consumed APIs
- asserting only on a subset of fields when the full contract matters

## Stability Rules
Prefer:
- independent tests that can run in any order
- deterministic setup over workaround logic
- explicit polling with a timeout and a clear reason when polling is genuinely needed

Avoid:
- tests that depend on execution order
- `sleep` or arbitrary timeout-based waits in API tests
- hidden dependencies on previous test state
- environment-specific assumptions (specific IDs, hardcoded base URLs without config)

## Severity Classification
Use these labels consistently in every review:

| Label | Meaning |
|---|---|
| [MUST FIX] | Security risk, broken assertion, hardcoded secret, or false pass/fail in CI. Fix before merge. |
| [RISKY] | Fragile under data or environment variation. Should be fixed, can be tracked as follow-up. |
| [OPTIONAL] | Readability or style improvement. No stability or correctness impact. |

## Review Mindset
Always separate:
- what is acceptable now
- what is risky under different data or CI environments
- what must change before merge
- what can be a tracked follow-up

Prefer:
- minimal safe improvements first
- PR-safe advice that doesn't require a full rewrite
- production-grade reasoning over style nitpicks
- naming the exact line, field, or code block — never give vague feedback
