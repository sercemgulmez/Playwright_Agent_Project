# POM Audit & Refactor Plan

## Application Overview

POM Audit & Refactor Plan for TurkNet Playwright QA Automation Framework.
This plan guides inspection, evaluation, refactor, and validation of the Page Object Model (POM) and its usage in tests, ensuring production-safe boundaries remain enforced.

## Test Scenarios

### 1. POM Audit & Refactor Suite

**Seed:** `tests/seed.spec.ts`

#### 1.1. Inspect repository POM files and structure

**File:** `docs/pom-audit-test-plan.md`

**Steps:**
  1. List files and folders to inspect: pages/, tests/, test-data/, playwright.config.ts, README.md, docs/
    - expect: All listed paths exist and are accessible from workspace
  2. Open pages/ and enumerate files. Check for BasePage.ts, HomePage.ts or TurkNetHomePage.ts, NavigationPage.ts, ApplicationPage.ts, LoginPage.ts, InfrastructurePage.ts, SupportPage.ts
    - expect: Presence or absence of each expected page file recorded
  3. Open tests/ and list test files. Compare names with preferred final naming convention
    - expect: Mapping of existing test files to preferred names created
  4. Open test-data/turknet-test-data.ts and verify only fake placeholder data is present
    - expect: Only test@example.com, Test User, 5000000000, invalid-email, 123 or other fake data; no real personal data
  5. Open playwright.config.ts and tsconfig.json and verify Playwright config references pages and tests folders
    - expect: Configurations reference correct paths and are TypeScript-valid

#### 1.2. Evaluate each Page Object file for quality and safety

**File:** `docs/pom-audit-test-plan.md`

**Steps:**
  1. For each page object file found, confirm: exports a class, constructor receives Page, locators centralized, reusable actions and assertions present
    - expect: Each file exports a class and uses constructor(page: Page) pattern where applicable
  2. Check for use of resilient locators (getByRole, getByLabel, getByText, getByPlaceholder, data-testid). Flag any XPath or brittle CSS selectors
    - expect: Locator quality assessed; list of brittle locators to refactor created
  3. Search for unsafe actions (form submission, doRealLogin, callExternalPayment) and ensure they are either absent or explicitly prevented/skipped with comments
    - expect: Unsafe actions either removed, commented as manual boundaries, or guarded with detectManualBoundary() and test.skip reasons

#### 1.3. Standardize naming and POM structure

**File:** `docs/pom-audit-test-plan.md`

**Steps:**
  1. If pages use mixed names (HomePage.ts vs TurkNetHomePage.ts), create a migration mapping and propose renames to preferred final structure
    - expect: Migration map created; no duplicate classes introduced
  2. Define BasePage responsibilities and required utility methods (constructor, goto, handleCookieBannerSafely, expectPageLoaded, safeClickIfVisible, hasTextVisible, detectManualBoundary)
    - expect: BasePage responsibilities documented; any missing utilities flagged for implementation

#### 1.4. Refactor tests to use Page Objects

**File:** `docs/pom-audit-test-plan.md`

**Steps:**
  1. Inspect each test file to ensure they import and use page objects for interactions rather than raw selectors. Note tests that use raw selectors extensively
    - expect: List of tests needing refactor created
  2. For each test needing refactor, outline minimal changes to replace raw selectors with POM methods. Preserve test intent and assertions
    - expect: Refactor plan per test with file/line references and recommended POM methods

#### 1.5. Validate test data usage and safety

**File:** `docs/pom-audit-test-plan.md`

**Steps:**
  1. Confirm all tests import test-data/turknet-test-data.ts instead of hard-coded values. Flag any tests with hard-coded personal data
    - expect: All hard-coded real data flagged; replacement with test data recommended
  2. Ensure test-data contains only fake values and update if any real-looking values found
    - expect: test-data validated as safe or updated to placeholders

#### 1.6. Update documentation: POM Architecture section

**File:** `docs/pom-audit-test-plan.md`

**Steps:**
  1. Draft a short README section 'Page Object Model Architecture' describing POM location, responsibilities, and manual boundary enforcement
    - expect: README update text prepared and ready to commit

#### 1.7. Run validation: npm test and security check

**File:** `docs/pom-audit-test-plan.md`

**Steps:**
  1. Run npm test in the workspace and capture results. If failures are due to imports/config/locators, fix only safe issues as described and rerun
    - expect: Tests run: expected 7 PASSED, 3 SKIPPED; or detailed failure log if different
  2. Run npm run security:check and record result
    - expect: security:check passes with no secrets detected
  3. If HTML report generation is required, run npm run test:report to produce the report and stop server after confirmation
    - expect: HTML report generated and available under playwright-report/ or similar
