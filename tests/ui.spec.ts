import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Login page visual', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveScreenshot('login.png');
  // await percySnapshot(page, 'Login Page');
});

test('Dashboard page visual', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveScreenshot('dashboard.png');
  // await percySnapshot(page, 'Dashboard Page');
});

test('Product detail visual', async ({ page }) => {
  await page.goto('/product/1');
  await expect(page).toHaveScreenshot('detail.png');
  // await percySnapshot(page, 'Detail Page');
});

