const {test, expect} = require('@playwright/test');

test('Flipkart Search Test', async ({ page }) => {
  // Navigate to Flipkart
  await page.goto('https://www.flipkart.com/');
  await expect(page).toHaveTitle(/Online Shopping Site for Mobiles, Electronics/i);
  await page.locator('.b3wTlE').click(); //code to close the login popup
  

  const electronicsLink = page.getByRole('link', { name: 'Electronics' });
  await expect(electronicsLink).toBeVisible();
  await electronicsLink.click();

  const audioLink = page.locator('a', { hasText: 'Audio' });
  await expect(audioLink).toBeVisible();
  await audioLink.click();
  await page.waitForLoadState('networkidle');
  const MotoProducts = await page.locator(':has-text("Limited time dealss")');
  const count = await MotoProducts.count();
  console.log(`Number of Moto products found: ${count}`);
});


