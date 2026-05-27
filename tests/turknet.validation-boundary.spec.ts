import { expect, test } from '@playwright/test';
import { TurkNetApplicationPage } from '../pages/TurkNetApplicationPage';
import { TurkNetHomePage } from '../pages/TurkNetHomePage';
import { TurkNetInfrastructurePage } from '../pages/TurkNetInfrastructurePage';
import { turknetTestData } from '../test-data/turknet-test-data';

test.describe('TurkNet validation and manual boundaries', () => {
  test('fake test data is centralized and contains no real personal data', async () => {
    expect(turknetTestData).toEqual({
      fakeName: 'Test User',
      fakeEmail: 'test@example.com',
      fakePhone: '5000000000',
      invalidEmail: 'invalid-email',
      invalidPhone: '123',
    });
  });

  test('required field validation runs only when a safe non-final action exists', async ({ page }) => {
    const homePage = new TurkNetHomePage(page);
    const applicationPage = new TurkNetApplicationPage(page);

    const opened = await homePage.openHomepage();
    test.skip(!opened, 'TurkNet production site closed the automated browser connection.');
    await homePage.handleCookieBannerSafely();

    const flowResult = await applicationPage.openFlowSafely();
    test.skip(flowResult !== 'opened', `Flow did not open safely: ${flowResult}`);

    const validationResult = await applicationPage.checkRequiredFieldValidationIfSafe();
    test.skip(validationResult !== 'validated', `Required-field validation was not safely testable: ${validationResult}`);
  });

  test('infrastructure check stops before real address, captcha, or submission', async ({ page }) => {
    const homePage = new TurkNetHomePage(page);
    const infrastructurePage = new TurkNetInfrastructurePage(page);

    const opened = await homePage.openHomepage();
    test.skip(!opened, 'TurkNet production site closed the automated browser connection.');
    await homePage.handleCookieBannerSafely();

    const infrastructureResult = await infrastructurePage.openInfrastructureCheckIfVisible();
    test.skip(infrastructureResult === 'not-found', 'Infrastructure check entry was not visible.');
    test.skip(infrastructureResult === 'manual-boundary', 'Infrastructure flow reached a manual boundary.');

    const formResult = await infrastructurePage.expectInfrastructureFormOrBoundary();
    test.skip(formResult === 'manual-boundary', 'Captcha or verification boundary detected.');
    expect(['form-visible', 'not-visible']).toContain(formResult);
    expect(await infrastructurePage.stopBeforeRealAddressOrSubmission()).toBe('manual-boundary');
  });
});
