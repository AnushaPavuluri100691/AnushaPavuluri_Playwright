import { test, expect } from '@playwright/test';

test('Error disappears after entering valid input', async ({ page }) => {
  await page.goto('https://jupiter.cloud.planittesting.com/#/');
  await page.click('text=Contact');

  // Step 1: Submit with empty fields
  await page.locator('//a[@class="btn-contact btn btn-primary"]').click();

  // Step 2: Validate error appears
  const forenameError = page.locator('#forename-err');
  await expect(forenameError).toBeVisible();

  // Step 3: Fill the field
  const forenameInput = page.locator('input[placeholder="John"]');
  await forenameInput.fill('Anusha');
  await forenameInput.blur(); // triggers Angular validation

  // Step 4: Validate error disappears
  await expect(forenameError).toBeHidden(); // or use toHaveCount(0)
});