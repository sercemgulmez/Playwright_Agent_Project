# TurkNet Playwright Test Plan

## Application Overview

Playwright-ready, production-safe test plan for TurkNet (https://www.turk.net). Includes smoke, navigation, package discovery, application entry (stop at reCAPTCHA), login entry (no real login), support access, validation/negative scenarios, and mobile tests. Tests use resilient locators (getByRole/getByLabel/getByText/data-testid). All forms stop before submission; fake test data only.

## Test Scenarios

### 1. TurkNet Playwright Scenarios

**Seed:** `tests/seed.spec.ts`

#### 1.1. SM-001 Homepage smoke

**File:** `docs/turknet-playwright-scenarios.md`

**Steps:**
  1. Open baseURL '/'
    - expect: Page loads with status 200
    - expect: Title contains 'Turknet'
    - expect: Primary hero section visible
  2. Verify header and navigation
    - expect: Header or primary navigation button visible
    - expect: Primary CTA (hero) visible and labeled
  3. Verify footer visible
    - expect: Footer area present with links and legal text

#### 1.2. SM-002 Header/navigation smoke

**File:** `docs/turknet-playwright-scenarios.md`

**Steps:**
  1. Open '/' and locate header navigation
    - expect: Main navigation items visible (Bireysel, Kurumsal, Yardım or equivalents)
    - expect: Navigation items are clickable
  2. Click on a safe navigation link (e.g., 'Yardım' or 'Support')
    - expect: Target page loads and URL contains expected path
    - expect: Page shows relevant header text

#### 1.3. SM-003 Package/campaign visibility

**File:** `docs/turknet-playwright-scenarios.md`

**Steps:**
  1. Open '/' and scroll to packages/campaigns area
    - expect: Package cards visible with titles/prices
    - expect: Each package card has a CTA like 'Detay' or 'Başvur' (do not submit)
  2. Click package detail CTA
    - expect: Package detail opens or modal appears
    - expect: No real application submitted; stop if application flow requires reCAPTCHA or identity verification

#### 1.4. SM-004 Application/availability flow entry (STOP at reCAPTCHA)

**File:** `docs/turknet-playwright-scenarios.md`

**Steps:**
  1. From homepage open application or availability entry
    - expect: Application form fields visible: email, phone, address or infrastructure search input
    - expect: Consent checkbox visible if applicable
  2. Enter fake test data into fields (test@example.com, 5000000000) and attempt to continue
    - expect: Client-side validation runs; success progresses to the next step OR reCAPTCHA appears
    - expect: If reCAPTCHA or OTP appears: STOP and mark test as skipped with reason 'reCAPTCHA/OTP boundary'

#### 1.5. SM-005 Login page entry (DO NOT LOGIN)

**File:** `docs/turknet-playwright-scenarios.md`

**Steps:**
  1. Navigate to customer login page from header
    - expect: Login form visible with username/email and password fields
    - expect: reCAPTCHA present or login protection noted
  2. Verify form elements but do NOT submit credentials
    - expect: Inputs exist and are enabled
    - expect: Login submit is present but test must NOT attempt authentication; mark as manual boundary

#### 1.6. SM-006 Support/help discovery

**File:** `docs/turknet-playwright-scenarios.md`

**Steps:**
  1. Open 'Yardım' or 'Support' from header or footer
    - expect: Support page loads
    - expect: Contact options, FAQs or help articles visible
    - expect: Public support content accessible without login

#### 1.7. NV-001 Empty required fields validation

**File:** `docs/turknet-playwright-scenarios.md`

**Steps:**
  1. Open application or availability form and clear required fields
    - expect: Client-side validation messages shown for required fields
    - expect: Form not submitted
  2. Verify error messages use accessible roles/labels
    - expect: Error messages visible via getByRole('alert') or similar

#### 1.8. NV-002 Invalid email and phone validation

**File:** `docs/turknet-playwright-scenarios.md`

**Steps:**
  1. Enter invalid email 'invalid-email' and phone '123' in form fields
    - expect: Validation errors appear for email and phone
    - expect: No submission occurs; errors are descriptive

#### 1.9. MB-001 Manual boundary: reCAPTCHA/OTP/Identity/Payment

**File:** `docs/turknet-playwright-scenarios.md`

**Steps:**
  1. When test reaches reCAPTCHA/OTP/payment/e-Devlet/identity verification, stop and document
    - expect: Test is skipped with clear reason
    - expect: Manual test case documented for stakeholders

#### 1.10. MB-002 Mobile homepage/menu smoke

**File:** `docs/turknet-playwright-scenarios.md`

**Steps:**
  1. Set viewport to mobile (iPhone 12) and open '/'
    - expect: Mobile menu opens, primary CTA visible
    - expect: Package cards readable and hero not broken
  2. Open mobile menu and navigate to support or packages
    - expect: Navigation functions on mobile, menu items accessible via keyboard/touch
