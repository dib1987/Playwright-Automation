# WHY THIS OUTPUT IS BAD
# Use this file to calibrate what NOT to produce.
# Each ❌ annotation explains the specific failure.

---

# Summary
The test is bad and should be rewritten.
# ❌ No scenario is named. No verdict is given. No specific risk is identified.
# ❌ "Bad and should be rewritten" is an opinion without evidence — unusable as PR feedback.

# Findings
- Locators are not good
- Waits are not good
- Assertions are weak
# ❌ No category structure (locator / wait / assertion / readability / flakiness).
# ❌ No code references — the reviewer cannot find what line to fix.
# ❌ No severity signal — everything looks equally bad.
# ❌ No explanation of WHY each thing is a problem.

# Recommendation
Use better locators and make code cleaner.
# ❌ No concrete steps. What locator? Replace with what?
# ❌ No code example showing the improvement.
# ❌ No "must fix vs. optional" distinction — the author doesn't know where to start.
# ❌ No scope or gaps section — the reviewer doesn't know what was skipped.

---

# CONTRAST: What the same review should look like
See examples/good-output.md for a production-grade version of the same review.
