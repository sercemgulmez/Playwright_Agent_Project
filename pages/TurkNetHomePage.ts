import { expect, type Locator, type Page } from '@playwright/test';

export class TurkNetHomePage {
  readonly page: Page;
  readonly brandLogo: Locator;
  readonly headerLinks: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.brandLogo = page.getByRole('img', { name: /Turknet/i }).first();
    this.headerLinks = page
      .getByRole('link', {
        name: /Altyapı Sorgula|Abone Ol|Hız Testi|GigaFiber|Kampanyalar|Yardım/i,
      })
      .filter({ visible: true });
    this.footer = page.locator('footer').first();
  }

  async openHomepage(): Promise<boolean> {
    try {
      await this.page.goto('/', { waitUntil: 'domcontentloaded' });
      await this.page.waitForLoadState('domcontentloaded');
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (/ERR_CONNECTION_CLOSED|ERR_SOCKET_NOT_CONNECTED|ERR_CONNECTION_RESET|ERR_FAILED/i.test(message)) {
        return false;
      }

      throw error;
    }
  }

  async handleCookieBannerSafely() {
    const cookieActions = [
      this.page.getByRole('button', { name: /Tümünü Kabul|Kabul Et|Kabul|Accept|Tamam|Anladım/i }),
      this.page.getByRole('link', { name: /Tümünü Kabul|Kabul Et|Kabul|Accept|Tamam|Anladım/i }),
    ];

    for (const action of cookieActions) {
      const count = await action.count();
      for (let index = 0; index < count; index += 1) {
        const candidate = action.nth(index);
        if (await candidate.isVisible().catch(() => false)) {
          await candidate.click();
          return;
        }
      }
    }
  }

  async expectHomepageLoaded() {
    await expect(this.page).toHaveURL(/turk\.net\/?$/);
    await expect(this.page).toHaveTitle(/Turknet|TurkNet/i);
    await expect(this.page.locator('body')).toContainText(/Turknet/i);
  }

  async expectBrandAndHeaderVisible() {
    await expect(this.brandLogo).toBeVisible();
    await expect(this.page.getByRole('link', { name: /Altyapı Sorgula|Abone Ol|Hız Testi/i }).first()).toBeVisible();
  }

  async expectHeroOrPrimaryCtaVisible() {
    const primaryLink = this.page
      .getByRole('link', { name: /Altyapı Sorgula|Abone Ol|Hız Testi|GigaFiber|Kampanyalar/i })
      .filter({ visible: true })
      .first();

    if (await primaryLink.isVisible().catch(() => false)) {
      await expect(primaryLink).toBeVisible();
      return;
    }

    await expect(this.page.locator('body')).toContainText(/1\.000 Mbps|Fiber|Kotasız|Taahhütsüz|İnternet/i);
  }

  async expectFooterVisible() {
    if (await this.footer.isVisible().catch(() => false)) {
      await this.footer.scrollIntoViewIfNeeded();
      await expect(this.footer).toBeVisible();
      await expect(this.footer.getByText(/Copyright|Gizlilik|Mobil Uygulama|Turknet/i).first()).toBeVisible();
      return;
    }

    await expect(this.page.getByText(/Copyright|Gizlilik Koşulları|Mobil Uygulama/i).first()).toBeVisible();
  }
}
