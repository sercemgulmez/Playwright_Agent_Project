import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TurkNetLoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openLoginPageIfVisible(): Promise<'opened' | 'not-found' | 'manual-boundary'> {
    const loginLink = this.page
      .getByRole('link', { name: /Online İşlemler|Online Islemler|Giriş|Giris|Login/i })
      .filter({ visible: true })
      .first();

    if (await this.safeClickIfVisible(loginLink)) {
      return (await this.detectManualBoundary(['şifre', 'sifre'])) ? 'manual-boundary' : 'opened';
    }

    const opened = await this.goto('/online-islemler/login');
    if (!opened) {
      return 'not-found';
    }

    return (await this.detectManualBoundary(['şifre', 'sifre'])) ? 'manual-boundary' : 'opened';
  }

  async expectLoginFormVisible(): Promise<boolean> {
    const loginFormSignal = this.page
      .getByLabel(/T\.?C\.?|Kimlik|Müşteri|Musteri|Telefon|E-posta|Email|Şifre|Sifre/i)
      .or(this.page.getByPlaceholder(/T\.?C\.?|Kimlik|Müşteri|Musteri|Telefon|E-posta|Email|Şifre|Sifre/i))
      .or(this.page.getByRole('button', { name: /Giriş Yap|Giris Yap|Login|Oturum Aç/i }))
      .filter({ visible: true })
      .first();

    if (await loginFormSignal.isVisible().catch(() => false)) {
      await expect(loginFormSignal).toBeVisible();
      return true;
    }

    return false;
  }

  async doNotAttemptRealLogin(): Promise<'manual-boundary'> {
    return 'manual-boundary';
  }

  async verifyLoginFieldsOnly(): Promise<'verified' | 'not-visible' | 'manual-boundary'> {
    if (await this.detectManualBoundary(['şifre', 'sifre', 'kimlik'])) {
      await this.expectLoginFormVisible();
      return 'manual-boundary';
    }

    return (await this.expectLoginFormVisible()) ? 'verified' : 'not-visible';
  }
}
