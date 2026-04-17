# WHY THIS OUTPUT IS BAD
# Use this file to calibrate what NOT to produce.
# Each ❌ annotation explains the specific failure.

---

# Root Cause
The test is failing because of a timing issue.
# ❌ "Timing issue" is not a root cause — it is a category.
# ❌ No evidence provided. What timed out? Which element? Which step?
# ❌ The failure was not captured — no error message, no step, no expected vs. actual.

# Fix
Increased the timeout to 10000ms.
# ❌ Increasing a timeout is a workaround for a symptom, not a fix for the root cause.
# ❌ The real question is: why is the element not ready? What readiness condition is missing?
# ❌ This fix will hide the real issue and make the test slower without making it more stable.

# Validation
The test passes now.
# ❌ "Passes now" is not a validation result. How many runs? Did adjacent tests run?
# ❌ A test that passes once after a timeout increase may still be flaky under CI load.

# No remaining risk mentioned.
# ❌ A timeout increase always carries remaining risk — the element could still time out in slow CI.
#    Remaining risk must be explicitly stated.

# No prevention recommendation.
# ❌ Without a prevention recommendation, the same pattern will recur in other tests.
#    The author has not identified what practice would prevent this failure from happening again.

---

# CONTRAST: What the same diagnosis should look like
See examples/good-output.md for a production-grade version of the same RCA.
