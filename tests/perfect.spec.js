import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const authFile = path.join(process.cwd(), 'storageState.json');

if (!fs.existsSync(authFile)) {
  fs.writeFileSync(authFile, JSON.stringify({ cookies: [], origins: [] }));
}

test.use({ storageState: authFile });

test.beforeAll(async ({ browser }) => {
  // ✅ Runs once before all tests
  // Perform login and save storage state
  console.log('Setting up authentication...');
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('/issuers/pages/login'); // baseURL is applied automatically
   await page.locator('text=Your Email').fill("sprint-37.2.1-issuer@username.com");
  await page.locator('//input[@type="password"]').nth(1).fill("Indexnine@123");
  //await expect(page.locator('.v-btn__content')).toBeEnabled();
  await page.locator('.v-btn__content').first().click();
  //await page.waitForLoadState('networkidle');
  await expect(page.locator('text=Dashboard')).toBeVisible();

  // Save storage state to file
  await context.storageState({ path: authFile });
  await context.close();
});

test.afterAll(async () => {
  // ✅ Runs once after all tests
  console.log('Cleaning up global resources...');
});

test.beforeEach(async ({ page }) => {
  // ✅ Runs before each test
  // Navigate to baseURL before each test
  console.log('Navigating to base URL...');
  await page.goto('/');
});

test.afterEach(async ({ page }, testInfo) => {
  // ✅ Runs after each test
  console.log(`Finished test: ${testInfo.title} with status ${testInfo.status}`);
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
  }
});

test('dashboard loads correctly', async ({ page }) => {
  await page.goto('/issuers/issuer-data/forms');   // ✅ relative path
  await expect(page.locator('.action')).toHaveText('Action');
});

test('profile page loads correctly', async ({ page }) => {
  await page.goto('/issuers/issuer-data/dataroom');     // ✅ relative path
 await expect(page.getByText('All Documents')).toHaveText('All Documents');

});
