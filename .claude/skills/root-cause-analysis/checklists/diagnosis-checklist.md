# Root Cause Analysis Checklist

Complete this before writing any diagnosis output. Each item must be resolved — not skipped.

---

## Failure Capture
- [ ] I have the exact error message
- [ ] I have the exact failing step or line
- [ ] I know what the test expected vs. what actually happened
- [ ] I have read the full failing test file
- [ ] I have read related page objects, fixtures, or helpers if imported

---

## Category Classification
- [ ] I have classified the failure into exactly one primary category from reference.md
- [ ] I have not skipped this step — the category determines the diagnostic path

---

## Diagnosis — Category-Specific Questions
Complete the questions for the classified category from reference.md:

### If Locator failure:
- [ ] Does the element exist in the DOM at the time of the action?
- [ ] Did the DOM structure change?
- [ ] Is strict mode firing due to multiple matches?

### If Timing failure:
- [ ] Is there a readiness check before the failing action?
- [ ] Is an animation, overlay, or transition in progress?
- [ ] Does adding a wait make it pass? (confirms timing, not locator)

### If Assertion failure:
- [ ] What is the actual value vs. expected value?
- [ ] Did the app behavior change?
- [ ] Was this assertion ever correct?

### If Test data failure:
- [ ] Does the required data exist in this environment?
- [ ] Is the data created by a previous test?

### If Auth / session failure:
- [ ] Is the token present and valid?
- [ ] Is the scope correct?

### If Application defect:
- [ ] Can the failure be reproduced manually?
- [ ] Did a recent deployment change the behavior?

### If Environment failure:
- [ ] Are other unrelated tests also failing?
- [ ] Are environment variables set correctly?

### If Test design failure:
- [ ] Does the test pass in isolation but fail in suite?
- [ ] Is there a hidden ordering dependency?

---

## Root Cause Confidence
- [ ] The root cause is a specific, evidenced claim — not a hypothesis list
- [ ] I can point to the exact code, selector, or data that caused the failure
- [ ] I have not concluded "application defect" without manually reproducing the failure

---

## Fix Scope
- [ ] The fix targets only the root cause — no unrelated changes
- [ ] I have not increased a timeout as a first response to a timing failure
- [ ] I have not removed an assertion to make the test pass

---

## Validation
- [ ] The fix was tested — the previously failing test now passes
- [ ] For timing issues: run 3x minimum to confirm stability
- [ ] Adjacent tests sharing the same locator, fixture, or data were checked

---

## Output Completeness
- [ ] Failure is fully captured (step, error, expected vs. actual)
- [ ] Category is named
- [ ] Root cause is stated as an evidenced claim
- [ ] Evidence is listed as observable facts
- [ ] Fix is described with before/after code where applicable
- [ ] Validation result is stated
- [ ] Remaining risk is stated (or "None identified")
- [ ] Prevention recommendation is included
