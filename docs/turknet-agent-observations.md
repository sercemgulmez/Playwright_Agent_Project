# TurkNet Agent Observations

## MCP Availability

Playwright MCP browser tools were not available as callable tools to Codex in this terminal-based session. The workspace has VS Code MCP configuration files, but Codex could not invoke the VS Code Playwright MCP browser tools directly.

Implementation therefore continued with standard Playwright TypeScript code and safe static inspection of the public TurkNet homepage HTML.

## Intended Exploration Areas

The test project is designed for these safe exploration areas:

- `https://www.turk.net/` homepage
- Header navigation links
- Safe informational pages such as speed test, campaigns, help, or GigaFiber information
- Application or availability CTA entry point, stopping before any final submission or verification
- Mobile homepage and mobile menu behavior

## Cookie and Banner Behavior Assumption

Cookie/banner behavior can change over time. The page object includes a safe helper that looks for common accept/acknowledge actions such as `Tümünü Kabul`, `Kabul Et`, `Kabul`, `Accept`, `Tamam`, or `Anladım` and clicks only if such a visible control exists.

If a banner has more granular privacy controls, those deeper preferences should be reviewed manually.

## Captcha, OTP, Payment, e-Devlet, and Manual Boundaries

Automation must stop if the page shows or requests:

- Captcha or bot protection
- OTP, SMS, or verification code
- e-Devlet login or identity verification
- Payment or billing details
- Contract approval
- Final application or subscription submission

The suite explicitly treats these as manual-only boundaries and avoids bypassing or completing them.

## Locator Strategy

The implementation favors resilient Playwright locators:

- `getByRole`
- `getByText`
- `getByLabel`
- `getByPlaceholder`
- Visible filtering where useful

XPath is avoided. CSS selectors are used only as fallbacks for site elements that do not expose accessible names, such as the current mobile menu icon.

## Risks With Testing a Public Production Website

Public production sites are not stable test fixtures. Risks include:

- Marketing copy, CTAs, and campaign pages changing without notice
- Cookie banner behavior changing by region or consent state
- Bot/rate-limit/security controls affecting automated browser traffic
- Browser automation traffic receiving closed socket responses while non-browser HTTP checks still succeed
- A/B tests and personalization changing visible text or layout
- Application flows changing validation, verification, or legal boundaries

Keep this suite conservative. Prefer smoke coverage and manual review for legally sensitive or customer-impacting flows.
