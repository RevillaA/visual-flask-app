const { test } = require('@playwright/test');
const percySnapshot = require('@percy/playwright');

test('Login page snapshot', async ({ page }) => {
  await page.goto('http://127.0.0.1:5000/login');
  await percySnapshot(page, 'Login Page');
});

test('Dashboard page snapshot', async ({ page }) => {
  await page.goto('http://127.0.0.1:5000/dashboard');
  await percySnapshot(page, 'Dashboard Page');
});

test('Detail page snapshot', async ({ page }) => {
  await page.goto('http://127.0.0.1:5000/detail/1');
  await percySnapshot(page, 'Detail Page');
});
