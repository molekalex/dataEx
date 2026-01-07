const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.cinecolombia.com/medellin');
  await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
  await page.getByRole('link', { name: 'Comidas' }).click();
  await page.getByRole('link', { name: 'Juan Valdez' }).click();
  await page.getByRole('link', { name: 'Café Empacado' }).click();
  await page.getByRole('article').locator('img').click();
  // await expect(page.getByRole('article').locator('img')).toBeVisible();
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();