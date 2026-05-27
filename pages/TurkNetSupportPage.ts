import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TurkNetSupportPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openSupportPageIfVisible(): Promise<'opened' | 'not-found'> {
    const supportLink = this.page
      .getByRole('link', { name: /Yardım|Yardim|Destek|Sıkça Sorulan|Sikca Sorulan/i })
      .filter({ visible: true })
      .first();

    if (await this.safeClickIfVisible(supportLink)) {
      return 'opened';
    }

    return (await this.goto('/destek')) ? 'opened' : 'not-found';
  }

  async expectSupportContentVisible(): Promise<void> {
    await this.expectPageLoaded(/Yardım|Yardim|Destek|Sıkça|Sikca|Sorular|Turknet/i);
  }

  async verifySafeSupportLinks(): Promise<string[]> {
    const links = await this.page.getByRole('link').evaluateAll((elements) =>
      elements
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        })
        .map((element) => element.textContent?.trim() ?? '')
        .filter(Boolean),
    );

    const uniqueLinks = Array.from(new Set(links));
    expect(uniqueLinks.length).toBeGreaterThan(0);
    return uniqueLinks;
  }
}
