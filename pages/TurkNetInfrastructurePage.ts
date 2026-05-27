import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TurkNetInfrastructurePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openInfrastructureCheckIfVisible(): Promise<'opened' | 'not-found' | 'manual-boundary'> {
    const infrastructureLink = this.page
      .getByRole('link', { name: /Altyapı Sorgula|Altyapi Sorgula|İnternet Hız Altyapı|Internet Hiz Altyapi/i })
      .filter({ visible: true })
      .first();

    if (await this.safeClickIfVisible(infrastructureLink)) {
      return (await this.detectManualBoundary(['adres'])) ? 'manual-boundary' : 'opened';
    }

    const opened = await this.goto('/internet-hiz-altyapi-sorgulama');
    if (!opened) {
      return 'not-found';
    }

    return (await this.detectManualBoundary(['adres'])) ? 'manual-boundary' : 'opened';
  }

  async expectInfrastructureFormOrBoundary(): Promise<'form-visible' | 'manual-boundary' | 'not-visible'> {
    if (await this.detectRecaptchaBoundary()) {
      return 'manual-boundary';
    }

    const formSignal = this.page
      .getByLabel(/Adres|İl|Il|İlçe|Ilce|Mahalle|Sokak/i)
      .or(this.page.getByPlaceholder(/Adres|İl|Il|İlçe|Ilce|Mahalle|Sokak/i))
      .or(this.page.getByRole('button', { name: /Sorgula|Kontrol Et|Devam/i }))
      .filter({ visible: true })
      .first();

    if (await formSignal.isVisible().catch(() => false)) {
      await expect(formSignal).toBeVisible();
      return 'form-visible';
    }

    if (await this.hasTextVisible(/Altyapı|Altyapi|Adres|Sorgula/i)) {
      return 'form-visible';
    }

    return 'not-visible';
  }

  async detectRecaptchaBoundary(): Promise<boolean> {
    return this.detectManualBoundary(['robot değilim', 'robot degilim']);
  }

  async stopBeforeRealAddressOrSubmission(): Promise<'manual-boundary'> {
    return 'manual-boundary';
  }
}
