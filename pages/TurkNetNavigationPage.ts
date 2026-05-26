import { expect, type Locator, type Page } from '@playwright/test';

const SAFE_LINK_NAMES = [
  /Hız Testi/i,
  /Kampanyalar/i,
  /Yardım/i,
  /GigaFiber İstiyorum/i,
  /İnternet Kampanyaları/i,
];

export class TurkNetNavigationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  mainNavigationLinks(): Locator {
    return this.page
      .getByRole('link', {
        name: /Altyapı Sorgula|Abone Ol|Hız Testi|GigaFiber|Kampanyalar|Yardım/i,
      })
      .filter({ visible: true });
  }

  async expectMainNavigationVisible() {
    await expect(this.page.getByRole('img', { name: /Turknet/i }).first()).toBeVisible();
    await expect(this.mainNavigationLinks().first()).toBeVisible();
  }

  async collectVisibleNavigationLinks(): Promise<string[]> {
    const links = await this.page.getByRole('link').evaluateAll((elements) =>
      elements
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        })
        .map((element) => element.textContent?.trim() ?? '')
        .filter(Boolean),
    );

    return Array.from(new Set(links));
  }

  async openSafeNavigationLink(): Promise<boolean> {
    const currentUrl = this.page.url();

    for (const name of SAFE_LINK_NAMES) {
      const link = this.page.getByRole('link', { name }).filter({ visible: true }).first();
      if (await link.isVisible().catch(() => false)) {
        await Promise.all([
          this.page.waitForLoadState('domcontentloaded').catch(() => undefined),
          link.click(),
        ]);
        await expect(this.page).not.toHaveURL(currentUrl);
        await expect(this.page.locator('body')).toContainText(/Turknet|İnternet|Fiber|Yardım|Hız/i);
        return true;
      }
    }

    return false;
  }
}
