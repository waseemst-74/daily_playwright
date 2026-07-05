// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

test.only('@Sanity demo Trellis two', async ({ page }) => {
 
  await page.goto('https://uat.trellisplatform.com/');
  await expect(page).toHaveTitle("Trellis");  
  await page.locator('text=Issuer Login').click();
  //await page.waitForLoadState('networkidle');
  await page.locator('text=Your Email').fill("sprint-37.2.1-issuer@username.com");
  await page.locator('//input[@type="password"]').nth(1).fill("Indexnine@123");
  //await expect(page.locator('.v-btn__content')).toBeEnabled();
  await page.locator('.v-btn__content').first().click();
  //await page.waitForLoadState('networkidle');
  await expect(page.locator('text=Dashboard')).toBeVisible();
  //await page.locator('.v-responsive__content').nth(2).click();
  //await page.getByText('Profile').click();
  
  //const filePath = path.join(process.cwd(),'test-data','q2.png');
  //await page.getByText(' Change Image ').setInputFiles(filePath);
  //await page.getByRole('button', { name: ' Change Image ' }).setInputFiles(filePath);

  //await page.locator("//button[@type='button']").nth(4).setInputFiles(filePath);
  //await page.locator('input[type="file"]').setInputFiles(filePath);
 

});
