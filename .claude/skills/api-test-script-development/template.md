# Scenario
One sentence. What endpoint, what method, what business outcome is being tested.
Example: "POST /orders — verifies a new order is created and returns the order ID."

# Endpoint
- Method: GET / POST / PUT / PATCH / DELETE
- Path: /endpoint/path
- Auth required: yes / no / token type

# Request design decisions
Brief explanation of:
- which project client or helper is reused (or why none exists)
- how auth is handled
- why test data was chosen

# Validation strategy
List the assertion layers covered for this scenario:
- [x] Layer 1 — Status code: `201`
- [x] Layer 2 — Response body structure: `orderId` field present
- [x] Layer 3 — Business-critical fields: `orderId` is a non-empty string
- [ ] Layer 4 — Schema: not required for this scenario
- [ ] Layer 5 — Side effects: not verified (see gaps)

# Negative cases covered
List each negative scenario included and why it adds value:
- 400 — missing required field `productId`: validates the API rejects incomplete requests
- 401 — no auth token: validates the endpoint is protected

# Generated test code
```js
// [filename]: tests/api/[scenario].spec.js
// Paste the complete, runnable test here
```

# Assumptions
- [assumption about environment, data, schema, or API behavior]
- [each assumption that could make this test fail in a different context]

# Known risks and gaps
- [KNOWN RISK] ...
- [KNOWN GAP] ...
- State explicitly if any assertion layer was intentionally skipped and why.
