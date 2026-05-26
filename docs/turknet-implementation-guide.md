# TurkNet Playwright Automation Implementation Guide

## Application Overview

Complete implementation guide for TurkNet QA automation project. Includes project structure, file creation instructions, Playwright configuration, Page Object Model design, test data strategy, and deployment instructions. All code is production-safe with clear boundaries at security barriers.

## Test Scenarios

### 1. Implementation Guide

**Seed:** `tests/seed.spec.ts`

#### 1.1. Project Setup and Configuration

**File:** `docs/turknet-implementation-guide.md`

**Steps:**
  1. Create config with: baseURL=https://www.turk.net, testDir=./tests, timeout=30s, trace=on-first-retry, screenshot=only-on-failure, video=retain-on-failure
    - expect: playwright.config.ts configured correctly
  2. Run: npm install && npx playwright install
    - expect: Node dependencies installed
  3. Create tsconfig.json with: compilerOptions for ES2020, strict mode, module resolution
    - expect: TypeScript configured
  4. Add: test (all), test:smoke (smoke only), test:ui, test:debug, test:report
    - expect: Package.json scripts added

#### 1.2. Page Object Model Files

**File:** `docs/turknet-implementation-guide.md`

**Steps:**
  1. Create base class with: goto(), handleCookieBanner(), expectPageLoaded(), common utilities
    - expect: BasePage.ts created
  2. Create with: logo, navigation, primaryCTA, packageSection, footer, methods: openApplication(), navigateToSupport(), expectations
    - expect: HomePage.ts created
  3. Create with: emailInput, phoneInput, consentCheckbox, continueButton, recaptchaFrame, methods for filling fields, STOP condition before reCAPTCHA
    - expect: ApplicationPage.ts created
  4. Create with: usernameInput, passwordInput, signInButton, rememberCheckbox, recaptchaFrame, methods to verify form structure ONLY (no login)
    - expect: LoginPage.ts created
  5. Create with: addressInput, searchButton, recaptchaFrame, methods to verify form structure ONLY (no search submission)
    - expect: InfrastructurePage.ts created
  6. Create with: supportContent, contactInfo, phoneNumber, helpLinks, expectations
    - expect: SupportPage.ts created

#### 1.3. Test Data File

**File:** `docs/turknet-implementation-guide.md`

**Steps:**
  1. Create with: FAKE test data only - emails (test@example.com, invalid-email), phones (5000000000, 123), addresses (fake placeholder), NO real data
    - expect: test-data/turknet-test-data.ts created
  2. Structure: Valid but fake data, Invalid data for boundary testing, Placeholder data for forms, Comments explaining test usage
    - expect: Data organized by category

#### 1.4. Playwright Test Files - Smoke Suite

**File:** `docs/turknet-implementation-guide.md`

**Steps:**
  1. Create: 3-4 smoke tests - homepage load, header visible, hero CTA visible, packages visible
    - expect: tests/turknet.home.spec.ts created
  2. Create: 4-5 navigation tests - navigate to infrastructure, campaigns, support, login pages
    - expect: tests/turknet.navigation.spec.ts created
  3. Create: 3-4 package tests - package section visible, package cards load, details page accessible
    - expect: tests/turknet.packages.spec.ts created
  4. Create: 2-3 login entry tests - login page loads, form structure visible, reCAPTCHA present, DO NOT LOGIN
    - expect: tests/turknet.login-entry.spec.ts created

#### 1.5. Playwright Test Files - Regression

**File:** `docs/turknet-implementation-guide.md`

**Steps:**
  1. Create: 6-8 validation tests - empty fields, invalid formats, boundary testing, STOP before submission/reCAPTCHA
    - expect: tests/turknet.validation-boundary.spec.ts created
  2. Create: 3-4 support tests - support page accessible, contact info visible, help links work
    - expect: tests/turknet.support.spec.ts created
  3. Create: 4-5 mobile tests - mobile viewport, menu opens, forms usable, content responsive
    - expect: tests/turknet.mobile.spec.ts created
  4. Create: 3-4 form tests - form structure, field validation, STOP at reCAPTCHA boundary
    - expect: tests/turknet.application-entry.spec.ts created

#### 1.6. Safety Boundaries Implementation

**File:** `docs/turknet-implementation-guide.md`

**Steps:**
  1. In tests: Detect reCAPTCHA iframe, log 'Test STOPPED at reCAPTCHA barrier', do NOT interact with it
    - expect: reCAPTCHA boundary implemented
  2. In tests: Verify form fields, validate inputs, STOP before clicking submit button if reCAPTCHA visible
    - expect: Form submission boundary
  3. In tests: Verify login form visible, check reCAPTCHA present, explicitly document DO NOT LOGIN, add skip comment if attempted
    - expect: Login boundary
  4. Use only fake placeholder data, never real emails, phones, addresses, IDs, or credentials
    - expect: Test data safety
  5. No data persisted after tests, no real accounts created, no real submissions
    - expect: Data cleanup

#### 1.7. Locator Strategy Implementation

**File:** `docs/turknet-implementation-guide.md`

**Steps:**
  1. Example: page.getByRole('link', { name: 'Altyapı Sorgula' }), page.getByRole('button', { name: 'Devam' })
    - expect: getByRole used for buttons/links
  2. Example: page.getByLabel('T.C. / Yabancı Kimlik No'), page.getByLabel('Şifre')
    - expect: getByLabel used for form inputs
  3. Example: page.getByText('Turknet Bireysel'), page.getByText('Kampanyalar')
    - expect: getByText used for headings/content
  4. Example: page.getByPlaceholder('e-Posta Adresi'), page.getByPlaceholder('+90 (5__) ___ __ __')
    - expect: getByPlaceholder used for form fields
  5. AVOID: XPath //a[contains()], Complex CSS '.header-nav > ul > li > a', Index-based .first()
    - expect: No XPath or brittle CSS

#### 1.8. Assertions Strategy

**File:** `docs/turknet-implementation-guide.md`

**Steps:**
  1. Use: await expect(page).toHaveTitle(), toHaveURL(), toBeVisible(), toBeEnabled()
    - expect: Web-first assertions used
  2. AVOID: page.waitForTimeout(), page.waitForLoadState(), page.waitForNavigation()
    - expect: No manual waits
  3. Use: toContainText(), getByText(), getByLabel() with assertions
    - expect: Content verification
  4. Verify validation errors appear: await expect(page.getByText(/[Ee]mail/)).toBeVisible()
    - expect: Error message verification

#### 1.9. Execution Instructions

**File:** `docs/turknet-implementation-guide.md`

**Steps:**
  1. Command: npx playwright test (runs all tests)
    - expect: All tests runnable
  2. Command: npx playwright test tests/ -g 'SM-' (runs smoke only)
    - expect: Smoke tests runnable
  3. Command: npx playwright test --ui (interactive debugging)
    - expect: UI mode available
  4. Command: npx playwright test --debug (step-through debugging)
    - expect: Debug mode available
  5. Command: npx playwright show-report (open HTML report)
    - expect: Report viewable

#### 1.10. CI/CD Integration

**File:** `docs/turknet-implementation-guide.md`

**Steps:**
  1. Create .github/workflows/playwright.yml with: install, run smoke tests, upload reports
    - expect: GitHub Actions workflow ready
  2. Run nightly smoke only on production (0 2 * * * UTC)
    - expect: Schedule defined
  3. Set retries: 1 on first run, 2 in CI on failure
    - expect: Retries configured
  4. Upload HTML report, trace files, screenshots on failure for 30 days
    - expect: Reports preserved

#### 1.11. Maintenance Guidelines

**File:** `docs/turknet-implementation-guide.md`

**Steps:**
  1. Instructions for updating locators if UI changes, handling new overlays, documenting breaking changes
    - expect: Test maintenance documented
  2. Keep test data in centralized file, document fake data usage, update if validation changes
    - expect: Data maintenance
  3. If reCAPTCHA removed, enable those tests; if new security added, document stop point
    - expect: Boundary maintenance
  4. Update this guide if test structure changes, add new test locations, document known issues
    - expect: Documentation updated
