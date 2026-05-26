# TurkNet Playwright Test Strategy

## Scope

This project provides safe Playwright TypeScript smoke and regression coverage for the public TurkNet website at `https://www.turk.net/`.

The automated scope is intentionally limited to non-destructive website behavior:

- Homepage availability and core brand/header/footer signals
- Main navigation visibility and one safe navigation click
- Entry into application or availability flows without final submission
- Safe required-field validation only when the page exposes a clearly non-final action
- Mobile homepage and navigation accessibility

## Smoke Tests

- Homepage loads with a TurkNet title and visible TurkNet page content.
- Brand/logo area is visible.
- Header navigation or primary links are visible.
- Primary CTA or hero area is detectable.
- Footer/legal/mobile app content is visible.

## Regression Tests

- Main navigation links remain discoverable.
- Safe navigation links such as speed test, campaigns, help, or GigaFiber informational pages open without submitting data.
- Application/availability entry points still load a next page or visible next step.
- Mobile viewport can load the homepage and expose a menu or main navigation links.

## Negative Validation Tests

The suite may click a safe non-final validation action such as `Devam`, `Sorgula`, `Kontrol Et`, or `İleri` with empty fields only when no manual boundary is visible.

The test expects validation copy such as required, missing, invalid, phone, address, or email messages. It does not enter real personal information and does not complete an application.

## Mobile Tests

Mobile coverage uses a browser context with a 390x844 viewport, touch enabled, and mobile behavior enabled.

The current mobile scope checks:

- Homepage load
- Primary CTA visibility or reachability
- Mobile menu or visible main navigation accessibility

## Manual-Only Scenarios

The following flows are manual boundaries and must not be automated against production:

- Captcha or bot protection
- OTP, SMS, or phone verification
- e-Devlet or identity verification
- Payment or billing flows
- Contract approval
- Final application, subscription, customer request, or legally binding submission
- Any flow that asks for real Turkish ID number, real phone number, real address, customer number, or credentials

## Out-of-Scope Items

- Performance or load testing
- Full application completion
- Payment authorization
- Identity verification
- Captcha bypassing
- Rate-limit or security-control bypassing
- Testing every footer or external social link

## Safety Boundaries

Automation uses fake placeholder data only. The suite must stop before final submission and treats captcha, OTP, e-Devlet, payment, identity, and contract approval as manual-only boundaries.

When a boundary appears, document it and skip deeper automation instead of attempting to bypass it.

If the public production site closes automated browser connections, tests skip the affected browser scenarios instead of bypassing bot protection or security controls.

## How to Run Tests

```bash
npm install
npx playwright test
npx playwright test --ui
npx playwright test --debug
npx playwright show-report
```

For focused runs:

```bash
npx playwright test tests/turknet.home.spec.ts
npx playwright test tests/turknet.application-flow.spec.ts
```
