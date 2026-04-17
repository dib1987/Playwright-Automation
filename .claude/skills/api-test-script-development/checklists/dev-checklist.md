# API Test Development Checklist

Complete this before writing the output. Each item must be resolved — not skipped.

---

## Understanding
- [ ] I can state in one sentence what scenario this test covers
- [ ] I know the endpoint method and path
- [ ] I know what business outcome proves the test passed
- [ ] I have read existing client utilities, auth helpers, and base specs

---

## Request Design
- [ ] An existing client or helper is reused — no duplicate setup
- [ ] Auth is externalized (env var or approved utility) — no hardcoded token
- [ ] Request payload is explicit and readable
- [ ] No unrelated setup is mixed into this test

---

## Assertion Coverage
- [ ] Status code is asserted (Layer 1)
- [ ] Response body is checked beyond "not null" (Layer 2)
- [ ] At least one business-critical field is asserted with a specific value (Layer 3)
- [ ] Schema validation is included if endpoint is contract-sensitive (Layer 4)
- [ ] Side effects are verified if the API mutates state (Layer 5)

---

## Negative Testing
- [ ] I have assessed whether negative cases add real value for this scenario
- [ ] If included: error status code is asserted
- [ ] If included: error message or error structure is asserted, not just the code
- [ ] If skipped: reason is stated in Known gaps

---

## Test Data
- [ ] Test data does not depend on pre-existing environment state
- [ ] No hardcoded IDs that only exist in one environment
- [ ] Dynamic values have a clear justification
- [ ] Created resources are cleaned up if required

---

## Stability
- [ ] No sleep or timeout-based waits
- [ ] Test is fully independent and can run in any order
- [ ] No hardcoded base URLs, IDs, or environment-specific values

---

## Output Completeness
- [ ] Scenario is named (endpoint + method + business outcome)
- [ ] Locator / request decisions are explained
- [ ] Validation strategy lists which layers are covered and which are skipped
- [ ] Negative cases covered or explicitly skipped with reason
- [ ] All assumptions are stated
- [ ] All known risks and gaps are named
