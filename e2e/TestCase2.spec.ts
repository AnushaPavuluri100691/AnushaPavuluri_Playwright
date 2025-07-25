import {test, expect} from '@playwright/test';

// Executing the Test Case 2 to validate form submission with correct data
// Also checking 100% pass rate after 5 executions

test ('Validate submission' , async ({page}) => {

    //Step 1: From the home page go to contact page
    // Navigate to the page
    await page.goto('https://jupiter.cloud.planittesting.com/#/');
    // Click on the contacts link on the navigation bar
    await page.click('text=Contact');
    // Add a delay to ensure the page loads completely
    await page.waitForTimeout(5000);

    //Step 2: Populate mandatory fields
    // Fill in the mandatory fields with valid data
    await page.locator('input[placeholder="John"]').fill('Anusha');
    await page.locator('input[placeholder="Example"]').fill('Doe');
    await page.locator('input[placeholder="john.example@planit.net.au"]').fill('Anusha@example.com');
    await page.locator('input[placeholder="02 1234 5678"]').fill('');
    await page.locator('textarea[placeholder="Tell us about it.."]').fill('Trying to enter a message');

    // Step 3: Click submit button
    // Click on the submit button
    await page.locator('//a[@class="btn-contact btn btn-primary"]').click();

    // Step 4: Verify success message
    // Add a delay to ensure the success message is displayed
    await page.waitForTimeout(10000);
    // Check if the success message is displayed
    await expect(page.locator('text= we appreciate your feedback.')).toBeVisible();
    
});