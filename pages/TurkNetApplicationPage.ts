import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

const CTA_NAMES = [
  /Altyapı Sorgula/i,
  /Abone Ol/i,
  /Başvur|Basvur/i,
  /Hemen Başvur|Hemen Basvur/i,
  /Paketleri İncele|Paketleri Incele/i,
  /GigaFiber İstiyorum/i,
];

export class TurkNetApplicationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async findApplicationEntry(): Promise<Locator | null> {
    for (const name of CTA_NAMES) {
      const link = this.page.getByRole('link', { name }).filter({ visible: true }).first();
      if (await link.isVisible().catch(() => false)) {
        return link;
      }

      const button = this.page.getByRole('button', { name }).filter({ visible: true }).first();
      if (await button.isVisible().catch(() => false)) {
        return button;
      }
    }

    return null;
  }

  async openFlowSafely(): Promise<'opened' | 'not-found' | 'manual-boundary'> {
    const entry = await this.findApplicationEntry();
    if (!entry) {
      return 'not-found';
    }

    await Promise.all([
      this.page.waitForLoadState('domcontentloaded').catch(() => undefined),
      entry.click(),
    ]);

    if (await this.hasManualBoundary()) {
      return 'manual-boundary';
    }

    return 'opened';
  }

  async expectFormOrNextStepIfVisible(): Promise<boolean> {
    const body = this.page.locator('body');
    const text = await body.innerText().catch(() => '');
    if (!text.trim()) {
      return false;
    }

    await expect(body).toContainText(/Turknet|İnternet|Altyapı|Adres|Telefon|Başvur|Abone|Paket/i);
    return true;
  }

  async findVisibleFormFields(): Promise<Locator[]> {
    const fields = [
      this.page.getByLabel(/Ad|Soyad|E-posta|Email|Telefon|Adres|İl|İlçe/i).first(),
      this.page.getByPlaceholder(/Ad|Soyad|E-posta|Email|Telefon|Adres|İl|İlçe/i).first(),
      this.page.locator('input:visible, textarea:visible, select:visible').first(),
    ];

    const visibleFields: Locator[] = [];
    for (const field of fields) {
      if (await field.isVisible().catch(() => false)) {
        visibleFields.push(field);
      }
    }

    return visibleFields;
  }

  async checkRequiredFieldValidationIfSafe() {
    if (await this.hasManualBoundary()) {
      return 'manual-boundary' as const;
    }

    const fields = await this.findVisibleFormFields();
    if (fields.length === 0) {
      return 'no-form' as const;
    }

    const nonFinalButton = this.page
      .getByRole('button', { name: /Devam|Sorgula|Kontrol Et|İleri/i })
      .filter({ visible: true })
      .first();

    if (!(await nonFinalButton.isVisible().catch(() => false))) {
      return 'no-safe-validation-action' as const;
    }

    await nonFinalButton.click();
    await expect(this.page.locator('body')).toContainText(/zorunlu|gerekli|hatalı|geçersiz|eksik|telefon|adres|e-posta/i);
    return 'validated' as const;
  }

  async hasManualBoundary(): Promise<boolean> {
    return this.detectManualBoundary();
  }

  async stopBeforeFinalSubmission(): Promise<'manual-boundary' | 'safe-to-observe'> {
    if (await this.hasManualBoundary()) {
      return 'manual-boundary';
    }

    const finalSubmit = this.page
      .getByRole('button', { name: /Başvuruyu Tamamla|Siparişi Tamamla|Ödeme Yap|Onayla|Gönder/i })
      .filter({ visible: true })
      .first();

    if (await finalSubmit.isVisible().catch(() => false)) {
      return 'manual-boundary';
    }

    return 'safe-to-observe';
  }
}
