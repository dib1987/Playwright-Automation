---
name: api-test-script-development
description: Create and improve API automation tests with strong validation, contract awareness, and maintainable structure.
---

# API Test Script Development

## When to use
Use this skill when:
- creating a new API test
- improving an existing API test
- validating request/response behavior
- reviewing API automation quality

---

## Steps

1. Understand scenario
   - endpoint
   - request type (GET/POST/PUT/DELETE)
   - expected behavior
   - auth requirement

2. Build request properly
   - reuse existing client/util if available
   - avoid duplicating headers or auth logic
   - keep payload readable

3. Validate response (layered)
   - status code
   - response body
   - business-critical fields
   - schema/structure if needed

4. Add meaningful assertions
   - validate behavior, not just presence
   - avoid weak checks like "not null"

5. Handle negative cases (if relevant)
   - invalid input
   - unauthorized access
   - error response validation

6. Ensure stability
   - no hidden dependencies
   - no random waits
   - deterministic data

---

## Output

Always provide:
- scenario covered
- request details
- validation points
- test code
- assumptions
- risks or gaps