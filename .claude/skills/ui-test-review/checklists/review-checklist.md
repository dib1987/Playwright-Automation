# UI Test Review Checklist

Complete this before writing the review output. Each item must be resolved — not skipped.

---

## Understanding
- [ ] I can state in one sentence what scenario this test covers
- [ ] I know what user-visible outcome proves the test passed
- [ ] I have identified all files that directly influence this test (page objects, fixtures, helpers)

---

## Locators
- [ ] All locators use the preferred strategy (role > label > placeholder > text > CSS > XPath)
- [ ] No nth-child or positional selectors present
- [ ] No selectors tied to layout structure rather than meaning
- [ ] No class names that could be generated or changed by a build tool
- [ ] Repeated selectors are extracted or noted as [OPTIONAL] improvement

---

## Waits
- [ ] No `waitForTimeout()` or hardcoded sleep present
- [ ] Every state transition (click, submit, navigation) has an explicit readiness condition
- [ ] No action is taken immediately after page load or navigation without a visibility check
- [ ] Any polling or retry logic is justified and documented

---

## Assertions
- [ ] At least one assertion proves the business outcome (not just DOM presence)
- [ ] Assertions use `expect()` with meaningful matchers (`toBeVisible`, `toHaveText`, `toHaveURL`)
- [ ] No assertion checks only that an element exists when stronger state is available
- [ ] No assertion checks volatile or implementation-detail fields without justification

---

## Maintainability
- [ ] Test name clearly describes the scenario
- [ ] Arrange / act / assert flow is readable and logically separated
- [ ] No mixed concerns within a single test block
- [ ] Helper names have obvious, single responsibility

---

## Flakiness
- [ ] No timing dependency after click, submit, or navigation
- [ ] No detached element risk from stale locator references
- [ ] No dependency on test execution order
- [ ] No dependency on environment-specific data (accounts, dates, feature flags)
- [ ] No state leakage risk (shared cookies, localStorage, DB records)

---

## Severity Classification
Before writing findings, classify each issue:
- [MUST FIX] — will cause flakiness or false pass/fail in CI
- [RISKY] — fragile, should be fixed, can be tracked as follow-up
- [OPTIONAL] — readability or style, no stability impact

---

## Output Completeness
- [ ] Summary names the scenario, verdict, and top risk
- [ ] Every finding includes the exact selector, line, or code block it refers to
- [ ] Improved code snippet is included for every [MUST FIX] item
- [ ] Scope and gaps section lists what was and was not reviewed
- [ ] Assumptions are stated explicitly
