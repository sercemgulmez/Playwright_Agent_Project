import { expect, test } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

test.describe('TurkNet packages and product pages', () => {
  test('safe public package or campaign page can be observed without form submission', async ({ page }) => {
    const basePage = new BasePage(page);

    const opened = await basePage.goto('/internet-kampanyalari');
    test.skip(!opened, 'TurkNet production site closed the automated browser connection.');
    await basePage.handleCookieBannerSafely();

    await basePage.expectPageLoaded(/Turknet|Kampanya|İnternet|Paket|Fiber/i);
    expect(await basePage.detectManualBoundary()).toBe(false);
  });
});
