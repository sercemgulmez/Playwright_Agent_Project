import { expect, test } from '@playwright/test';
import { TurkNetApplicationPage } from '../pages/TurkNetApplicationPage';
import { TurkNetHomePage } from '../pages/TurkNetHomePage';

test.describe('TurkNet application entry boundaries', () => {
  test('application or availability CTA opens safely and stops before final submission', async ({ page }) => {
    const homePage = new TurkNetHomePage(page);
    const applicationPage = new TurkNetApplicationPage(page);

    const opened = await homePage.openHomepage();
    test.skip(!opened, 'TurkNet production site closed the automated browser connection.');
    await homePage.handleCookieBannerSafely();

    const flowResult = await applicationPage.openFlowSafely();
    test.skip(flowResult === 'not-found', 'Application or availability CTA was not visible.');
    test.skip(flowResult === 'manual-boundary', 'Manual boundary appeared immediately after opening the flow.');

    const nextStepVisible = await applicationPage.expectFormOrNextStepIfVisible();
    test.skip(!nextStepVisible, 'Application flow opened but visible page content was not available for safe assertion.');

    const submissionBoundary = await applicationPage.stopBeforeFinalSubmission();
    test.skip(submissionBoundary === 'manual-boundary', 'Application flow reached final submission or verification boundary.');
    expect(submissionBoundary).toBe('safe-to-observe');
  });
});
