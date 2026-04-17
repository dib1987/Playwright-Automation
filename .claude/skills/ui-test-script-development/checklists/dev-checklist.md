# UI Test Development Checklist

Complete this before writing the output. Each item must be resolved — not skipped.

---

## Understanding
- [ ] I can state in one sentence what user flow this test covers
- [ ] I know what user-visible outcome proves the test passed
- [ ] I have identified all pages involved
- [ ] I have read related page objects, fixtures, or helpers if they exist

---

## Locators
- [ ] Every locator uses the highest-priority strategy available (role > label > placeholder > text > CSS > XPath)
- [ ] No nth-child, positional, or layout-dependent selectors
- [ ] No class names that could be generated or changed by a build tool
- [ ] Every locator choice is documented in the output with a reason

---

## Waits
- [ ] No `waitForTimeout()` or hardcoded sleep
- [ ] Every state transition (click, submit, navigation) has an explicit readiness condition
- [ ] No action is taken immediately after page load or navigation without a visibility or URL check

---

## Assertions
- [ ] At least one assertion proves the business outcome (not just DOM presence)
- [ ] Assertions use meaningful Playwright matchers (`toBeVisible`, `toHaveText`, `toHaveURL`)
- [ ] No assertion checks only that an element exists when stronger state is available
- [ ] No assertion checks CSS class or implementation details

---

## Structure
- [ ] Test name describes the scenario, not the implementation
- [ ] Arrange / act / assert flow is visible and logically separated
- [ ] Steps are sequential and readable — no excessive chaining

---

## Flakiness
- [ ] Every state transition has a readiness condition
- [ ] No locator depends on DOM position or layout structure
- [ ] No dependency on previous test state (cookies, localStorage, DB data)
- [ ] Potential animation or overlay risks are identified and mitigated or flagged

---

## Output Completeness
- [ ] Scenario is named (user flow + success outcome)
- [ ] User flow steps are listed
- [ ] Every key locator decision is explained
- [ ] Wait strategy is described for each state transition
- [ ] All assertions are listed with what they prove
- [ ] Flakiness risks are named (mitigated or as known risks)
- [ ] All assumptions are stated
- [ ] All known gaps are named
