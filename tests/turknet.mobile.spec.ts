import { test } from '@playwright/test';
import { TurkNetHomePage } from '../pages/TurkNetHomePage';
import { TurkNetNavigationPage } from '../pages/TurkNetNavigationPage';

test.describe('TurkNet mobile experience', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test('homepage loads and primary CTA is reachable on mobile', async ({ page }) => {
    const homePage = new TurkNetHomePage(page);

    const opened = await homePage.openHomepage();
    test.skip(!opened, 'TurkNet production site closed the automated browser connection.');
    await homePage.handleCookieBannerSafely();

    await homePage.expectHomepageLoaded();
    await homePage.expectHeroOrPrimaryCtaVisible();
  });

  test('mobile menu or main navigation is accessible if visible', async ({ page }) => {
    const homePage = new TurkNetHomePage(page);
    const navigationPage = new TurkNetNavigationPage(page);

    const opened = await homePage.openHomepage();
    test.skip(!opened, 'TurkNet production site closed the automated browser connection.');
    await homePage.handleCookieBannerSafely();

    await navigationPage.expectMobileNavigationAccessible();
  });
});
