# WHY THIS OUTPUT IS BAD
# Use this file to calibrate what NOT to produce.
# Each ❌ annotation explains the specific failure.

---

# Summary
The test looks fine but could be better.
# ❌ No endpoint named. No verdict. No specific risk identified.
# ❌ "Could be better" is useless as PR feedback — it tells the author nothing actionable.

# Findings
- The token seems hardcoded, maybe use env vars
- Assertions could be stronger
- Test data might be environment-specific
# ❌ No severity labels — the author cannot tell what must be fixed vs. what is optional.
# ❌ "Seems hardcoded" and "might be" are hedged. If it is hardcoded, say so and tag it [MUST FIX].
# ❌ "Assertions could be stronger" — stronger how? Which assertion? What is missing?
# ❌ No code references — the author cannot find what line to fix.
# ❌ No assertion layer analysis — which layers are covered and which are missing?
# ❌ No negative testing gap mentioned.

# Recommendation
Clean up the auth and make assertions more complete.
# ❌ No concrete steps. Replace with what? Add what assertion?
# ❌ No code snippet showing the improvement.
# ❌ No "must fix before merge vs. optional" distinction.
# ❌ No scope or gaps section — the reviewer doesn't know what files were read or skipped.
# ❌ No assumptions stated — the author cannot judge whether the advice applies to their setup.

---

# CONTRAST: What the same review should look like
See examples/good-output.md for a production-grade version of the same review.
