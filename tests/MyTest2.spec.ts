import { test, expect } from '@playwright/test';

test.describe('SelectorsHub Main Page Tests', () => {
    test('Verify Homepage and Navigation', async ({ page }) => {
        // Navigate to the SelectorsHub homepage
        await page.goto('https://selectorshub.com/');
        
        // Verify the page title
        await expect(page).toHaveTitle(/SelectorsHub/);

        await page.waitForTimeout(5000); // Wait for 5 seconds to ensure the page is fully loaded

        // Example: Click on the 'SelectorsHub' link in the menu
        const selectorsHubLink = page.getByRole('link', { name: 'SelectorsHub' }). first();
        await expect(selectorsHubLink).toBeVisible();
        await selectorsHubLink.click();
       await expect(page).toHaveURL(/selectorshub/);

        // Example: Click on the 'Download' button
        const downloadButton = page.getByRole('link', { name: 'Download' }). first();
        await expect(downloadButton).toBeVisible();
        
        // Example: Find the 'Install' button and check its visibility
       const installButton = page.getByRole('link', { name: 'Install' }). first();
       await expect(installButton).toBeVisible();

        // Example: Click on 'Features' link
       await page.getByRole('link', { name: 'Features' }).click();
       await expect(page).toHaveURL(/features/);
    });
});

    