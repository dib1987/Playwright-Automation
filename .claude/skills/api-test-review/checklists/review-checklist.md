# API Test Review Checklist

Complete this before writing the review output. Each item must be resolved — not skipped.

---

## Understanding
- [ ] I can state in one sentence what scenario this test covers
- [ ] I know what endpoint is being tested (method + path)
- [ ] I know what business outcome proves the test passed
- [ ] I have identified all files that directly influence this test (clients, helpers, auth utilities, base specs)

---

## Request Design
- [ ] The request follows the existing project pattern
- [ ] Existing client, helper, or base spec is reused — no duplicate setup
- [ ] Request construction is clear and readable — no opaque chaining
- [ ] Test data is explicit and minimal
- [ ] No unrelated setup is mixed into this test block

---

## Auth Handling
- [ ] No hardcoded credentials, tokens, API keys, or secrets present
- [ ] Auth uses environment variables or an approved config mechanism
- [ ] If a shared auth utility exists, it is reused — not duplicated
- [ ] Auth failure scenario is covered if auth is part of the business flow

---

## Assertion Quality
- [ ] Status code is asserted
- [ ] Response body is checked beyond just "not null" or "exists"
- [ ] At least one assertion proves the business outcome (field value, state change, resource created)
- [ ] Assertions use specific matchers — not just truthy checks
- [ ] For collections: both presence and meaningful content are checked
- [ ] Schema or contract is validated for contract-sensitive endpoints
- [ ] Side effects are verified if the API mutates state

---

## Negative Testing
- [ ] At least one error scenario is covered if the flow is business-critical
- [ ] Error status code is asserted
- [ ] Error message or error structure is asserted — not just the status code
- [ ] The API is confirmed to fail for the right reason

---

## Test Data
- [ ] Test data does not depend on pre-existing environment state
- [ ] Dynamic values have a clear justification
- [ ] Created resources are cleaned up if required
- [ ] No hidden ordering dependency on a previous test's data

---

## Contract Awareness
- [ ] Response structure is validated for contract-sensitive endpoints
- [ ] Any field removal or rename risk is explicitly flagged
- [ ] Downstream impact is noted if response shape changes

---

## Stability
- [ ] No sleep-based or timeout-based waits present
- [ ] Tests can run independently in any order
- [ ] No hardcoded base URLs, IDs, or environment-specific values
- [ ] If polling is used, the reason is documented

---

## Severity Classification
Before writing findings, classify each issue:
- [MUST FIX] — security risk, hardcoded secret, broken assertion, or false pass/fail in CI
- [RISKY] — fragile under data or environment variation, should be tracked as follow-up
- [OPTIONAL] — readability or style, no stability or correctness impact

---

## Output Completeness
- [ ] Summary names the endpoint/scenario, verdict, and top risk
- [ ] Every finding includes the exact line, field, or code block it refers to
- [ ] Improved code snippet is included for every [MUST FIX] item
- [ ] Scope and gaps section lists what was and was not reviewed
- [ ] Assumptions are stated explicitly
