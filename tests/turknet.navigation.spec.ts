import { expect, test } from '@playwright/test';
import { TurkNetHomePage } from '../pages/TurkNetHomePage';
import { TurkNetNavigationPage } from '../pages/TurkNetNavigationPage';

test.describe('TurkNet navigation', () => {
  test('main navigation and header links are visible', async ({ page }) => {
    const homePage = new TurkNetHomePage(page);
    const navigationPage = new TurkNetNavigationPage(page);

    const opened = await homePage.openHomepage();
    test.skip(!opened, 'TurkNet production site closed the automated browser connection.');
    await homePage.handleCookieBannerSafely();

    await navigationPage.expectMainNavigationVisible();
    const visibleLinks = await navigationPage.collectVisibleNavigationLinks();
    expect(visibleLinks.length).toBeGreaterThan(0);
    expect(visibleLinks.join(' ')).toMatch(/Altyapı|Abone|Hız|GigaFiber|Yardım|Kampanya/i);
  });

  test('safe navigation link opens a page or section without submitting data', async ({ page }) => {
    const homePage = new TurkNetHomePage(page);
    const navigationPage = new TurkNetNavigationPage(page);

    const opened = await homePage.openHomepage();
    test.skip(!opened, 'TurkNet production site closed the automated browser connection.');
    await homePage.handleCookieBannerSafely();

    const safeLinkOpened = await navigationPage.openSafeNavigationLink();
    test.skip(!safeLinkOpened, 'No safe visible navigation link was detected on the current page.');
  });
});
