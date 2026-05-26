import { expect, test } from '@playwright/test';
import { TurkNetHomePage } from '../pages/TurkNetHomePage';

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

    const opened = await homePage.openHomepage();
    test.skip(!opened, 'TurkNet production site closed the automated browser connection.');
    await homePage.handleCookieBannerSafely();

    const mobileMenuButton = page
      .getByRole('button', { name: /menü|menu|navigation|nav/i })
      .or(page.locator('.header-mobile svg[cursor="pointer"]').first())
      .first();

    if (await mobileMenuButton.isVisible().catch(() => false)) {
      await mobileMenuButton.click();
      await expect(page.getByText(/Turknet Bireysel|Altyapı Sorgula|Abone Ol|Hız Testi/i).first()).toBeVisible();
      return;
    }

    await expect(page.getByRole('link', { name: /Altyapı Sorgula|Abone Ol|Hız Testi/i }).first()).toBeVisible();
  });
});
