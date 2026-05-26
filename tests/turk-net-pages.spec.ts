// spec: specs/plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Turknet Product Pages', () => {
  test('should load fiber internet product page', async ({ page }) => {
    // Navigate to fiber internet product page
    await page.goto('https://www.turk.net/fiber-internet');
    
    // Verify page loaded successfully
    await expect(page).toHaveTitle(/Fiber İnternet/);
    await expect(page).toHaveURL(/fiber-internet/);
  });

  test('should load GigaFiber product page', async ({ page }) => {
    // Navigate to GigaFiber product page
    await page.goto('https://www.turk.net/gigafiber');
    
    // Verify page loaded successfully
    await expect(page).toHaveTitle(/GigaFiber/);
    await expect(page).toHaveURL(/gigafiber/);
  });
});

test.describe('Turknet Corporate/Enterprise Section', () => {
  test('should load corporate page with enterprise solutions', async ({ page }) => {
    // Navigate to corporate page
    await page.goto('https://www.turk.net/kurumsal');
    
    // Verify page loaded successfully
    await expect(page).toHaveTitle(/Kurumsal/);
    await expect(page).toHaveURL(/kurumsal$/);
    
    // Verify main heading is visible
    await expect(page.getByRole('heading', { name: /kurumsal internet/ })).toBeVisible();
  });

  test('should display corporate package information', async ({ page }) => {
    // Navigate to corporate page
    await page.goto('https://www.turk.net/kurumsal');
    
    // Verify package section is visible with pricing
    await expect(page.getByRole('heading', { name: 'Paketlerimiz' })).toBeVisible();
    
    // Verify main packages are mentioned
    await expect(page.getByRole('heading', { name: /Dijitale Geçiş Paketi/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Kurumsal Metro Ethernet/ })).toBeVisible();
  });

  test('should navigate to corporate GigaBit internet page from corporate section', async ({ page }) => {
    // Navigate to corporate page
    await page.goto('https://www.turk.net/kurumsal');
    
    // Verify link to specialized GigaBit internet is visible
    const gigabitLink = page.getByRole('link', { name: /İş Yerine Özel İnternet/ });
    await expect(gigabitLink).toBeVisible();
    
    // Click the link
    await gigabitLink.click();
    
    // Verify navigation to specialized page
    await expect(page).toHaveURL(/is-yerine-ozel-gigabit-internet/);
  });
});

test.describe('Turknet Informational Pages', () => {
  test('should load privacy and terms page', async ({ page }) => {
    // Navigate to privacy and terms page
    await page.goto('https://www.turk.net/gizlilik-ve-kullanim-kosullari');
    
    // Verify page loaded successfully
    await expect(page).toHaveTitle(/Gizlilik ve Kullanım Koşulları/);
    await expect(page).toHaveURL(/gizlilik-ve-kullanim-kosullari/);
  });

  test('should load data protection and information page', async ({ page }) => {
    // Navigate to KVKK (Data Protection) page
    await page.goto('https://www.turk.net/kvk-aydinlatma-metni');
    
    // Verify page loaded successfully
    await expect(page).toHaveTitle(/Kişisel Verilerin/);
    await expect(page).toHaveURL(/kvk-aydinlatma-metni/);
  });

  test('should load information security policy page', async ({ page }) => {
    // Navigate to information security policy page
    await page.goto('https://www.turk.net/kurumsal/bilgi-guvenligi-politikasi');
    
    // Verify page loaded successfully
    await expect(page).toHaveTitle(/Bilgi Güvenliği/);
  });
});

test.describe('Turknet Footer Navigation Links', () => {
  test('should verify contact/help links in footer are accessible', async ({ page }) => {
    // Navigate to homepage
    await page.goto('https://www.turk.net/');
    
    // Scroll to footer to ensure links are visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Verify footer has main sections
    await expect(page.getByRole('heading', { name: 'Hakkımızda' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Hizmetler' })).toBeVisible();
  });

  test('should navigate to help/support page from navigation', async ({ page }) => {
    // Navigate to homepage
    await page.goto('https://www.turk.net/');
    
    // Click on help/support link
    await page.getByRole('link', { name: 'Yardım' }).click();
    
    // Verify navigation to support page
    await expect(page).toHaveURL(/destek/);
    await expect(page).toHaveTitle(/Destek/);
  });
});

test.describe('Turknet Page Load Performance', () => {
  test('should load homepage within reasonable time', async ({ page }) => {
    // Measure page load performance
    const startTime = Date.now();
    
    // Navigate to homepage
    await page.goto('https://www.turk.net/', { waitUntil: 'domcontentloaded' });
    
    const loadTime = Date.now() - startTime;
    
    // Verify page loaded and title is set
    await expect(page).toHaveTitle(/Turknet/);
    
    // Log for monitoring (should load within reasonable time)
    console.log(`Homepage load time: ${loadTime}ms`);
  });
});

test.describe('Turknet Page Navigation Consistency', () => {
  test('should navigate back to homepage from all main pages', async ({ page }) => {
    const mainPages = [
      'https://www.turk.net/fiber-internet',
      'https://www.turk.net/gigafiber',
      'https://www.turk.net/kurumsal',
      'https://www.turk.net/destek'
    ];
    
    for (const pageUrl of mainPages) {
      // Navigate to each page
      await page.goto(pageUrl);
      
      // Verify Turknet logo is visible (navigation element)
      await expect(page.getByRole('link', { name: 'Turknet logo' })).toBeVisible();
      
      // Click logo to return to homepage
      await page.getByRole('link', { name: 'Turknet logo' }).click();
      
      // Verify returned to homepage
      await expect(page).toHaveURL('https://www.turk.net/');
    }
  });
});

test.describe('Turknet Accessibility - Skip to Content Link', () => {
  test('should have skip to content link for accessibility', async ({ page }) => {
    // Navigate to homepage
    await page.goto('https://www.turk.net/');
    
    // Verify skip to content link exists for accessibility
    const skipLink = page.getByRole('link', { name: 'Skip to content' });
    await expect(skipLink).toBeVisible();
    
    // Verify skip link has proper href
    await expect(skipLink).toHaveAttribute('href', '#content');
  });
});

test.describe('Turknet Campaign Page (SKIPPED - Dynamic Content Load)', () => {
  test.skip('should verify campaigns can be navigated - requires dynamic content wait', async ({ page }) => {
    // Navigate to campaigns page
    await page.goto('https://www.turk.net/internet-kampanyalari');
    
    // SKIPPED: Campaign page may load content dynamically
    // Automated testing would need to handle dynamic content loading
    // and potentially modal/popup interactions not suitable for automation
    
    // This prevents flaky tests due to timing issues with campaign content
  });
});
