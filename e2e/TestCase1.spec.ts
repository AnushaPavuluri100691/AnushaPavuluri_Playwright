import {test, expect} from '@playwright/test'

//Executing the Test Case 1 to trigger error message when the user tries to click on the submit button without entering any data in the input field

test ('Validate error' , async ({page}) => {
    // Step 1: From the home page go to contact page
    // Navigate to the page
    await page.goto('https://jupiter.cloud.planittesting.com/#/');
    // Click on the contacts link on the navigation bar
    await page.click('text=Contact');
    // Add a delay to ensure the page loads completely
    await page.waitForTimeout(5000);

    // Step 2: Click submit button
    // Click on the submit button without entering any data
    // await page.locator('button:has-text("Submit")').click();
    // Trying another way to click the submit button
    // await page.locator('button.btn-contact').click();
    // Add a delay to ensure the error messages are displayed
    // await page.waitForTimeout(5000);
    // Headed mode shows Submit button is not clickable, trying with XPath selector
    await page.locator('//a[@class="btn-contact btn btn-primary"]').click();

    // Step 3: Verify error messages
    // Check if the error message is displayed near the text input field
    await expect(page.locator('text=Forename is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Message is required')).toBeVisible();


    // Step 4: Populate mandatory fields
    // Fill in the mandatory fields with valid data
    await page.locator('input[placeholder="John"]').fill('Anusha');
    await expect(page.locator('text=Forename is required')).toBeHidden();
    await page.locator('input[placeholder="Example"]').fill('Doe');
    await page.locator('input[placeholder="john.example@planit.net.au"]').fill('Anusha@example.com');
    await expect(page.locator('text=Email is required')).toBeHidden();
    await page.locator('input[placeholder="02 1234 5678"]').fill('');
    await page.locator('textarea[placeholder="Tell us about it.."]').fill('Trying to enter a message');
    await expect(page.locator('text=Message is required')).toBeHidden();
    
});
