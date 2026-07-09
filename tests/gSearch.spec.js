const {test, expect} = require('@playwright/test');



test('Google suggestions select second option', async ({ page }) => {
  await page.goto('https://www.google.com/', { waitUntil: 'domcontentloaded' });

  const searchBox = page.locator('textarea[name="q"]');
  await expect(searchBox).toBeVisible();
  await searchBox.click();
  await searchBox.fill('Playwright automation');

  const suggestionOptions = page.locator('[role="listbox"] [role="option"]');
  await expect(suggestionOptions.first()).toBeVisible({ timeout: 10000 });
  const optionCount = await suggestionOptions.count();
  expect(optionCount).toBeGreaterThan(1);

  await suggestionOptions.nth(1).click();
  //await expect(searchBox).toBeVisible();
});


