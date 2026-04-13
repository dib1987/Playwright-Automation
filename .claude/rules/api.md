# API Automation Rules

## Purpose
These rules apply when creating, reviewing, or improving API automation tests.

## Core Principles
- Prefer clear, maintainable API tests over overly clever implementations
- Validate behavior that matters to the contract and business flow
- Keep tests deterministic and easy to debug
- Reuse existing request/response utilities before adding new abstractions

## Request Design
- Follow the existing project pattern for request building
- Reuse existing clients, helpers, auth utilities, and base specs where available
- Do not duplicate headers, tokens, or common setup if a shared utility already exists
- Keep test data explicit and readable
- Avoid mixing unrelated setup into the same test

## Validation Strategy
Always think in layers:
1. status code
2. response body correctness
3. business-critical field validation
4. schema or structure validation where relevant
5. side effects if the API changes state

Do not validate every field unless there is a clear reason.

## Assertions
- Assert the most important contract behavior first
- Prefer strong, meaningful assertions over many weak assertions
- Validate fields that prove the scenario worked
- Avoid vague assertions like only checking that response is not null
- If validating collections, check both presence and meaningful content where relevant

## Negative Testing
- Include negative scenarios when they add real value
- Validate proper error codes, error messages, and error structure
- Do not rely only on one error field if the API has a standard error contract
- Confirm the API fails for the right reason

## Authentication / Authorization
- Reuse existing auth flows and token utilities
- Do not hardcode credentials, secrets, or tokens
- Use environment variables or approved config mechanisms
- If auth is part of the scenario, validate both success and failure behavior when needed

## Test Data
- Keep test data purposeful and minimal
- Prefer stable, reusable data patterns over random values unless uniqueness is required
- If dynamic data is needed, make the generation readable
- Clean up created data if the scenario requires it
- Avoid hidden dependencies on existing environment state whenever possible

## Stability Rules
- Keep tests independent where practical
- Avoid ordering dependencies between tests
- Do not rely on timing hacks
- If polling or retries are needed, explain why
- Prefer deterministic setup over workaround logic

## Contract Awareness
- If the endpoint is contract-sensitive, preserve the existing response structure unless the change is intentional
- Call out breaking contract risk explicitly
- For response changes, review impacted downstream tests

## Review Rules
When reviewing API tests, focus on:
1. request clarity
2. auth handling
3. status code coverage
4. meaningful response assertions
5. schema/contract coverage
6. test data stability
7. readability and maintainability

## Anti-Patterns
- hardcoded secrets or tokens
- asserting only status code for business-critical flows
- validating too many irrelevant fields
- duplicate setup across tests
- hidden dependencies on previous tests
- vague assertions
- random waits or sleep-based API testing

## Output Expectations
When creating or reviewing API tests, always provide:
- what scenario is covered
- what is being validated
- any important assumptions
- risk or gaps if validation is partial