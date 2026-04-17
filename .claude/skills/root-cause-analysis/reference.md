# Root Cause Analysis Reference

## Failure Category Taxonomy
Classify every failure into exactly one primary category before diagnosing.
If multiple categories seem to apply, pick the one closest to the original failure trigger.

| Category | Description | First signal |
|---|---|---|
| **Locator failure** | Element cannot be found or is found incorrectly | `locator not found`, `strict mode violation`, wrong element acted on |
| **Timing failure** | Element exists but is not ready when action is taken | `element not visible`, `element not stable`, `detached`, `timeout exceeded` |
| **Assertion failure** | Element found, action succeeded, but value is wrong | `expect(...).toBe()` fails, value mismatch, URL mismatch |
| **Test data failure** | Test depends on data that doesn't exist or changed | `404`, `empty response`, assertion fails only in CI or specific env |
| **Auth / session failure** | Token expired, missing, or wrong scope | `401`, `403`, redirect to login during test |
| **Application defect** | The app itself behaves incorrectly | Failure reproducible manually, not a test code issue |
| **Environment failure** | Infrastructure, network, or config issue | Timeouts on all tests, DNS errors, missing env vars |
| **Test design failure** | Test is poorly written — ordering dep, fragile data, wrong assertion | Fails intermittently, passes locally only, assertion wrong |

## Diagnostic Questions by Category

### Locator failure
- Does the element exist in the DOM at the time of the action?
- Has the selector ever worked, or is this a new test?
- Did the DOM structure change (class rename, element moved, new wrapper)?
- Is the locator strategy too brittle (nth-child, layout-dependent)?
- Is `strict mode` firing because multiple elements match?

### Timing failure
- Is there a readiness check before the action?
- Is the element rendered but not yet visible, enabled, or stable?
- Is there an animation, loading overlay, or transition in progress?
- Did a navigation happen just before this step without a URL or visibility check?
- Does adding a brief wait make the test pass? (If yes: the timing, not the locator, is the issue)

### Assertion failure
- What was the actual value vs. expected value?
- Did the app behavior change (new text, new URL pattern, new field name)?
- Is the assertion checking a volatile value (timestamp, dynamic ID)?
- Was this assertion ever correct, or was it written wrong from the start?
- Is the element found correctly but in the wrong state (hidden, stale)?

### Test data failure
- Does the required data exist in this environment?
- Is the data created by a previous test that may not have run?
- Was a hardcoded ID or name deleted or renamed?
- Is the test environment seeded correctly?

### Auth / session failure
- Is the token expired or missing from the environment?
- Does the test correctly obtain and use the token?
- Is the auth scope correct for the actions being tested?
- Did a session cookie expire mid-test?

### Application defect
- Can the failure be reproduced manually in the same environment?
- Did a recent deployment change the behavior?
- Does the test code look correct but the app returns wrong data?
- Is the failure consistent (not intermittent)?

### Environment failure
- Are other unrelated tests also failing?
- Is the base URL, port, or service reachable?
- Are environment variables set correctly?
- Is CI configured identically to local?

### Test design failure
- Does the test pass when run in isolation but fail in suite?
- Does the test pass locally but fail in CI consistently?
- Is there a hidden dependency on a previous test's state?
- Is the assertion checking the wrong thing entirely?

## Fix Principles
- Apply the smallest fix that addresses the root cause — nothing more.
- Do not increase timeouts as a first response to timing failures — find the missing readiness condition.
- Do not remove assertions to make tests pass — fix the assertion or the underlying cause.
- Do not touch code unrelated to the identified root cause.
- If the fix is a workaround for an application defect, mark it explicitly and file a bug.

## Validation After Fix
A fix is not complete until:
- [ ] The previously failing test passes consistently (run 3x minimum for timing issues)
- [ ] Adjacent tests that share the same locator, fixture, or data still pass
- [ ] The fix does not introduce a new implicit dependency

## Prevention Recommendation Format
Every RCA output must include a prevention recommendation. Structure it as:
- **Pattern**: What type of failure was this?
- **Prevention**: What practice would prevent it recurring?
- **Applies to**: Where else in the suite could this same pattern exist?

Examples:
- Pattern: Missing readiness check after navigation → Prevention: Always assert URL or visible element after `goto()` → Applies to: all tests that navigate between pages
- Pattern: Hardcoded environment ID → Prevention: Source IDs from config/fixtures → Applies to: all tests using specific product, user, or record IDs
