import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
    });

    test('should navigate to the About page', async ({ page }) => {
        await page.click('text=About');
        await expect(page).toHaveURL(/.*about/);
        await expect(page.locator('h1')).toHaveText('About Us');
    });

    test('should navigate to the Services page', async ({ page }) => {
        await page.click('text=Services');
        await expect(page).toHaveURL(/.*services/);
        await expect(page.locator('h1')).toHaveText('Our Services');
    });

    test('should navigate to the Contact page', async ({ page }) => {
        await page.click('text=Contact');
        await expect(page).toHaveURL(/.*contact/);
        await expect(page.locator('h1')).toHaveText('Contact Us');
    });

    test('should return to the homepage from the About page', async ({ page }) => {
        await page.click('text=About');
        await page.click('text=Home');
        await expect(page).toHaveURL(/.*\/$/);
        await expect(page.locator('h1')).toHaveText('Welcome to Our Website');
    });

    test('should check if the navigation menu is visible', async ({ page }) => {
        const navMenu = page.locator('nav');
        await expect(navMenu).toBeVisible();
    });
});