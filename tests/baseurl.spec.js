const { test, expect } = require('@playwright/test');



const targetEnvironment = (process.env.TARGET_ENV || process.env.ENV || 'UAT').toUpperCase();
const baseURL = process.env.PLAYWRIGHT_BASE_URL || (targetEnvironment === 'QA'
  ? 'https://qa.trellisplatform.com'
  : 'https://uat.trellisplatform.com');

test.use({ baseURL });

let webContext;

   test.beforeAll(async ({browser}) => {
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto('/digital-locker/pages/login');
  
  await page.locator('text=Your Email').fill("sprint-37.2-david@username.com");
  await page.locator('//input[@type="password"]').nth(1).fill("Indexnine@123");
  //await expect(page.locator('.v-btn__content')).toBeEnabled();
  await page.locator('.v-btn__content').first().click();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('text= Investments')).toBeVisible();
  await context.storageState({ path: 'state.json' });
  webContext = await browser.newContext({ storageState: 'state.json' });
});
test('Validate issuer forms', async () => {

  const page = await webContext.newPage();
  await page.goto('/digital-locker/opportunities');
  await expect(page.locator('text=Discover New Opportunities')).toBeVisible();
  
});



