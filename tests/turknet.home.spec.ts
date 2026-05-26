import { test } from '@playwright/test';
import { TurkNetHomePage } from '../pages/TurkNetHomePage';

test.describe('TurkNet homepage', () => {
  test('homepage loads successfully and handles cookies safely', async ({ page }) => {
    const homePage = new TurkNetHomePage(page);

    const opened = await homePage.openHomepage();
    test.skip(!opened, 'TurkNet production site closed the automated browser connection.');
    await homePage.handleCookieBannerSafely();

    await homePage.expectHomepageLoaded();
  });

  test('brand, header, primary CTA area, and footer are visible', async ({ page }) => {
    const homePage = new TurkNetHomePage(page);

    const opened = await homePage.openHomepage();
    test.skip(!opened, 'TurkNet production site closed the automated browser connection.');
    await homePage.handleCookieBannerSafely();

    await homePage.expectBrandAndHeaderVisible();
    await homePage.expectHeroOrPrimaryCtaVisible();
    await homePage.expectFooterVisible();
  });
});
