# CLAUDE.md

## Repository Purpose
This repository is used for Playwright-based UI automation testing.

Primary goals:
- reliable UI automation
- readable test code
- maintainable selectors
- minimal flaky behavior
- clear debugging and validation

## Architecture Snapshot
- Framework: Playwright
- Language: JavaScript
- Test folder: `tests/`
- Example test folder: `tests-examples/`
- Config file: `playwright.config.js`
- Dependency management: `package.json`

## Canonical Commands
- Install dependencies: `npm install`
- Run all tests: `npx playwright test`
- Run one test file: `npx playwright test tests/<file-name>`
- Run headed mode: `npx playwright test --headed`
- Run debug mode: `npx playwright test --debug`
- Show HTML report: `npx playwright show-report`

## Execution Workflow
For any non-trivial task:
1. Understand the test requirement clearly
2. Inspect existing Playwright test style first
3. Make the smallest safe change
4. Prefer stable locators and clear assertions
5. Validate using the smallest relevant test run
6. Report summary, validation, and risk

## Coding Principles
- Follow existing Playwright patterns first
- Prefer readable code over clever code
- Avoid touching unrelated files
- Keep test logic simple and maintainable
- Prefer stable selectors over brittle selectors
- Avoid hardcoded waits

## Testing Rules
- Every test change should consider regression impact
- Bug fixes should include regression coverage when practical
- Do not ignore failing tests without explanation
- Always state what was tested and what was not tested

## Safety Rules
- Never expose credentials, tokens, or secrets
- Never remove assertions just to make tests pass
- Never use unnecessary waits to hide timing issues
- Ask before destructive or risky changes

## Output Contract
Always provide:
1. Summary of changes
2. Files modified
3. Tests executed
4. Risks, assumptions, or gaps

## Modular Guidance
See:
- `.claude/rules/testing.md`
- `.claude/rules/ui.md`
- `.claude/rules/git.md`
- `.claude/rules/security.md`