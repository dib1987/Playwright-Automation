# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose
Playwright-based UI automation test suite targeting practice/demo sites (rahulshettyacademy.com, naveenautomationlabs.com/opencart).

## Commands
- Install: `npm install`
- Run all tests: `npx playwright test`
- Run one file: `npx playwright test tests/<file-name>`
- Run headed: `npx playwright test --headed`
- Run debug: `npx playwright test --debug`
- Run single test by name: `npx playwright test -g "test name"`
- View report: `npx playwright show-report`

## Config Defaults (playwright.config.js)
- Browser: Chromium only (headless: false, screenshot: on, trace on-first-retry)
- No parallelism, no retries configured
- Reporter: HTML

## Test Architecture
All tests are in `tests/` as CommonJS `.spec.js` files using `require('@playwright/test')`.

**Test files and what they cover:**
- `EndtoEnd.spec.js` — login → add to cart → checkout flows (OpenCart, rahulshetty client app, form submit)
- `UIBasic.spec.js` — page title, form validation, new tab handling, camera listing after login
- `VerifyAlertPopUp.spec.js` — `page.on('dialog')` handler pattern for browser alerts
- `VerifyMouseHover.spec.js` — hover interaction with `.mouse-hover-content` menu
- `VerifyElementDiaplayHidden.spec.js` — show/hide element visibility (missing `expect` assertions — known gap)

## Credentials Pattern
Tests read credentials from env vars with hardcoded fallbacks:
```js
const EMAIL = process.env.OPENCART_EMAIL || "dib@gmail.com";
```
New tests must follow this pattern — env var first, fallback only for local dev.

## Locator Priority
Follow this order (from `.claude/rules/ui.md`):
1. `getByRole()` — preferred
2. `getByLabel()`, `getByPlaceholder()`, `getByText()`
3. CSS selectors (stable ones like `#input-email`)
4. XPath — last resort only

## Known Anti-Patterns to Avoid
- `isVisible()` / `isHidden()` without `await expect()` — these are queries, not assertions (see `VerifyElementDiaplayHidden.spec.js`)
- `page.click()` shorthand — prefer `page.locator(...).click()` for clarity
- `console.log` left in finished tests

## Modular Rules
- `.claude/rules/testing.md` — test validation rules
- `.claude/rules/ui.md` — locator strategy, waiting, assertions
- `.claude/rules/api.md` — API test rules (if extended)
- `.claude/rules/git.md` — commit hygiene
- `.claude/rules/security.md` — credential handling

## Output Contract
Always provide: summary of changes, files modified, tests executed, and any risks or gaps.
