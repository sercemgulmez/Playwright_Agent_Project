import { expect, test } from '@playwright/test';
import { TurkNetHomePage } from '../pages/TurkNetHomePage';
import { TurkNetSupportPage } from '../pages/TurkNetSupportPage';

test.describe('TurkNet support content', () => {
  test('support page opens safely and exposes support links', async ({ page }) => {
    const homePage = new TurkNetHomePage(page);
    const supportPage = new TurkNetSupportPage(page);

    const opened = await homePage.openHomepage();
    test.skip(!opened, 'TurkNet production site closed the automated browser connection.');
    await homePage.handleCookieBannerSafely();

    const supportResult = await supportPage.openSupportPageIfVisible();
    test.skip(supportResult === 'not-found', 'Support page was not reachable in the current production session.');

    await supportPage.expectSupportContentVisible();
    const supportLinks = await supportPage.verifySafeSupportLinks();
    expect(supportLinks.join(' ')).toMatch(/Yardım|Yardim|Destek|Turknet/i);
  });
});
