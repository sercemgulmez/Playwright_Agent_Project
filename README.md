# Playwright Agent Project

Safe Playwright TypeScript automation for testing the public TurkNet website:

```text
https://www.turk.net/
```

This project was prepared with Codex-assisted workflow and includes Page Object Model classes, test data, documentation, and safety boundaries for testing a public production website.

## Safety Note

These tests must not submit real applications, subscriptions, payment forms, customer requests, contracts, or legally binding forms.

Do not use real personal data. The test data in this repository is fake placeholder data only.

Stop manually if a flow reaches captcha, OTP, SMS verification, e-Devlet, payment, identity verification, contract approval, or final application submission.

## Setup

```bash
npm install
```

Playwright is already listed as a dev dependency. If browsers are missing locally, run:

```bash
npx playwright install
```

## Run Tests

```bash
npx playwright test
npx playwright test --ui
npx playwright test --debug
npx playwright show-report
```

Focused examples:

```bash
npx playwright test tests/turknet.home.spec.ts
npx playwright test tests/turknet.mobile.spec.ts
```

## Folder Structure

```text
pages/
  TurkNetHomePage.ts
  TurkNetNavigationPage.ts
  TurkNetApplicationPage.ts

test-data/
  turknet-test-data.ts

tests/
  turknet.home.spec.ts
  turknet.navigation.spec.ts
  turknet.application-flow.spec.ts
  turknet.mobile.spec.ts

docs/
  turknet-test-strategy.md
  turknet-agent-observations.md
```

## Test Coverage

- Homepage smoke coverage
- Brand/header/CTA/footer checks
- Safe navigation checks
- Safe application or availability flow entry checks
- Required-field validation only where non-final and safe
- Mobile viewport checks

## Codex-Assisted Workflow

Codex inspected the existing project, kept existing files unless unnecessary to remove, updated Playwright configuration, generated Page Object Model files, generated safe test data, created TurkNet tests, and documented production-site safety boundaries.

Playwright MCP browser tools were not callable from the Codex terminal session, so the implementation uses standard Playwright with conservative production-site safeguards.
