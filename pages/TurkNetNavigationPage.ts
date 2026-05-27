import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

const SAFE_LINK_NAMES = [
  /Hız Testi/i,
  /Kampanyalar/i,
  /Yardım/i,
  /GigaFiber İstiyorum/i,
  /İnternet Kampanyaları/i,
];

export class TurkNetNavigationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  mainNavigationLinks(): Locator {
    return this.page
      .getByRole('link', {
        name: /Altyapı Sorgula|Abone Ol|Hız Testi|GigaFiber|Kampanyalar|Yardım/i,
      })
      .filter({ visible: true });
  }

  async expectNavigationVisible() {
    await expect(this.page.getByRole('img', { name: /Turknet/i }).first()).toBeVisible();
    await expect(this.mainNavigationLinks().first()).toBeVisible();
  }

  async expectMainNavigationVisible() {
    await this.expectNavigationVisible();
  }

  async getVisibleNavigationLinks(): Promise<string[]> {
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

  async collectVisibleNavigationLinks(): Promise<string[]> {
    return this.getVisibleNavigationLinks();
  }

  async openSafeNavigationLink(): Promise<boolean> {
    const currentUrl = this.page.url();

    for (const name of SAFE_LINK_NAMES) {
      const link = this.page.getByRole('link', { name }).filter({ visible: true }).first();
      if (await link.isVisible().catch(() => false)) {
        await this.safeClickIfVisible(link);
        await this.expectNavigationTargetLoaded(currentUrl);
        return true;
      }
    }

    return false;
  }

  async expectNavigationTargetLoaded(previousUrl?: string): Promise<void> {
    if (previousUrl) {
      await expect(this.page).not.toHaveURL(previousUrl);
    }
    await this.expectPageLoaded(/Turknet|İnternet|Fiber|Yardım|Hız|Kampanya/i);
  }

  async openMobileMenuIfVisible(): Promise<boolean> {
    const mobileMenuButton = this.page
      .getByRole('button', { name: /menü|menu|navigation|nav/i })
      .or(this.page.locator('.header-mobile svg[cursor="pointer"]').first())
      .first();

    return this.safeClickIfVisible(mobileMenuButton);
  }

  async expectMobileNavigationAccessible(): Promise<void> {
    if (await this.openMobileMenuIfVisible()) {
      await expect(this.page.getByText(/Turknet Bireysel|Altyapı Sorgula|Abone Ol|Hız Testi/i).first()).toBeVisible();
      return;
    }

    await this.expectNavigationVisible();
  }
}
