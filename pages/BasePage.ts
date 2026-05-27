import { expect, type Locator, type Page } from '@playwright/test';

export const manualBoundaryKeywords = [
  'captcha',
  'recaptcha',
  'güvenlik kodu',
  'guvenlik kodu',
  'otp',
  'sms',
  'doğrulama kodu',
  'dogrulama kodu',
  'e-devlet',
  'edevlet',
  'ödeme',
  'odeme',
  'kimlik',
  'sözleşme onayı',
  'sozlesme onayi',
  'başvuruyu tamamla',
  'basvuruyu tamamla',
  'siparişi tamamla',
  'siparisi tamamla',
  'attack id',
  'message id',
  'client ip',
] as const;

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path = '/'): Promise<boolean> {
    try {
      await this.page.goto(path, { waitUntil: 'domcontentloaded' });
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

  async handleCookieBannerSafely(): Promise<boolean> {
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
          return true;
        }
      }
    }

    return false;
  }

  async expectPageLoaded(contentPattern: RegExp = /Turknet|TurkNet/i): Promise<void> {
    await expect(this.page.locator('body')).toContainText(contentPattern);
  }

  async safeClickIfVisible(locator: Locator): Promise<boolean> {
    if (!(await locator.isVisible().catch(() => false))) {
      return false;
    }

    await Promise.all([
      this.page.waitForLoadState('domcontentloaded').catch(() => undefined),
      locator.click(),
    ]);
    return true;
  }

  async hasTextVisible(text: string | RegExp): Promise<boolean> {
    return this.page.getByText(text).filter({ visible: true }).first().isVisible().catch(() => false);
  }

  async detectManualBoundary(extraKeywords: readonly string[] = []): Promise<boolean> {
    const bodyText = (await this.page.locator('body').innerText().catch(() => '')).toLocaleLowerCase('tr-TR');
    const keywords = [...manualBoundaryKeywords, ...extraKeywords];
    return keywords.some((keyword) => bodyText.includes(keyword.toLocaleLowerCase('tr-TR')));
  }
}
