const { test, expect } = require('@playwright/test');
let webContext;

   test.beforeAll(async ({browser}) => {
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto('/issuers/pages/login');
  
  await page.locator('text=Your Email').fill("sprint-37.2.1-issuer@username.com");
  await page.locator('//input[@type="password"]').nth(1).fill("Indexnine@123");
  //await expect(page.locator('.v-btn__content')).toBeEnabled();
  await page.locator('.v-btn__content').first().click();
  //await page.waitForLoadState('networkidle');
  await expect(page.locator('text=Dashboard')).toBeVisible();
  await context.storageState({ path: 'state.json' });
  webContext = await browser.newContext({ storageState: 'state.json' });
});
test('Validate issuer forms', async () => {

  const page = await webContext.newPage();
  await page.goto('/issuers/issuer-data/forms');
  await expect(page.locator('text=  Manage Issuer Data  ')).toBeVisible();
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.locator('text= Add Form ')).toBeVisible();
  await page.locator('//input[@type="text"]').fill('Legal - Bronze');
  await page.getByText('Legal - Bronze').click();
  await page.locator('//span[text()=" Add "]').last().click();

  //await page.getByRole('button', { name: ' Add ' }).click();
  // Add more assertions or interactions as needed
});
test('Validate opportunities', async () => {

  const page = await webContext.newPage();
  await page.goto('/issuers/opportunities');
  await expect(page.locator('text= New Opportunity ')).toBeVisible();
  
  // Add more assertions or interactions as needed
});


