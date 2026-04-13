---
name: root-cause-analysis
description: Systematically debug Playwright tests, UI failures, and automation issues by identifying the true root cause before fixing.
---

# Root Cause Analysis

## When to use
Use this skill when:
- a test is failing
- a locator stops working
- timing is unstable
- assertion is failing
- behavior is inconsistent
- root cause is unclear

---

## Steps

1. Capture failure clearly
   - error message
   - stack trace
   - failing step

2. Identify category
   - locator issue
   - timing issue
   - assertion issue
   - test data issue
   - application defect

3. Analyze difference
   - what worked before?
   - what changed?

4. Apply minimal fix
   - do not over-fix
   - avoid touching unrelated code

5. Validate
   - re-run failing test
   - check nearby flows if needed

---

## Output Format

Always return:

- Root cause
- Fix applied
- Validation result
- Remaining risk (if any)