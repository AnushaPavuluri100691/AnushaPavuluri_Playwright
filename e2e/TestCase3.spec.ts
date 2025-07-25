import {test, expect} from '@playwright/test';

// Executing the Test Case 2 to validate form submission with correct data
// Also checking 100% pass rate after 5 executions

test ('Validate submission' , async ({page}) => {

    //Step 1: Go directly to the shop page
    await page.goto('https://jupiter.cloud.planittesting.com/');
    // Click on the shop link on the navigation bar
    await page.click('text=Shop');
    // Add a delay to ensure the page loads completely
    // await page.waitForTimeout(5000);

    // Adding wait for selector as delay is failed in webkit
    await page.waitForSelector("//li[@id='product-2']//a[contains(text(),'Buy')]")

    // Step 1: Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear
    // Adding toys to the cart using a loop to ensure multiple items are added
    // For the first toy "Stuffed frog", adding 2 items using its Xpath selector
    for (let i = 0; i < 2; i++) {
    await page.locator("//li[@id='product-2']//a[@class='btn btn-success' and normalize-space()='Buy']").click();
    }
    // For the second toy "Fluffy bunny", adding 5 items using its Xpath selector
    for (let i = 0; i < 5; i++) {
    await page.locator("//li[@id='product-4']//a[@class='btn btn-success' and normalize-space()='Buy']").click();;
    }
    // For the third toy "Valentine bear", adding 3 items using its Xpath selector
    for (let i = 0; i < 3; i++) {
    await page.locator("//li[@id='product-7']//a[@class='btn btn-success' and normalize-space()='Buy']").click();
    }
    //Tried to add toys to the cart and then add quantity, but it didn't work as expected
    //await page.locator("//li[@id='product-2']//a[@class='btn btn-success' and normalize-space()='Buy']").click();
    //await page.locator("//li[@id='product-4']//a[@class='btn btn-success' and normalize-space()='Buy']").click();
    //await page.locator("//li[@id='product-7']//a[@class='btn btn-success' and normalize-space()='Buy']").click();

    //Step 2: Go to the cart page
  
    await page.waitForSelector("text=Cart");
    await page.locator("//a[@href='#/cart']").click();
    

    // Step 3: Verify the subtotal for each product is correct
    // Check the subtotal for Stuffed Frog
    await expect(page.locator("//tr[td[contains(text(), 'Stuffed Frog')]]/td[4]")).toHaveText('$21.98');
    // Check the subtotal for Fluffy Bunny
    await expect(page.locator("//tr[td[contains(text(), 'Fluffy Bunny')]]/td[4]")).toHaveText('$49.95');
    // Check the subtotal for Valentine Bear
    await expect(page.locator("//tr[td[contains(text(), 'Valentine Bear')]]/td[4]")).toHaveText('$44.97');

    // Step 4: Verify the price for each product
    // Check the price for Stuffed Frog
    await expect(page.locator("//tr[td[contains(text(), 'Stuffed Frog')]]/td[2]")).toHaveText('$10.99');
    // Check the price for Fluffy Bunny
    await expect(page.locator("//tr[td[contains(text(), 'Fluffy Bunny')]]/td[2]")).toHaveText('$9.99');
    // Check the price for Valentine Bear
    await expect(page.locator("//tr[td[contains(text(), 'Valentine Bear')]]/td[2]")).toHaveText('$14.99');
    
// Step 5: Convert subtotal text values to numbers
const getSubtotalAsNumber = (priceText: string | null) => {
  if (!priceText) throw new Error("Missing price text!");
  return parseFloat(priceText.replace('$', '').trim());
};

await page.waitForSelector("//tr[td[contains(text(), 'Stuffed Frog')]]/td[4]");
await page.waitForSelector("//tr[td[contains(text(), 'Fluffy Bunny')]]/td[4]");
await page.waitForSelector("//tr[td[contains(text(), 'Valentine Bear')]]/td[4]");

const stuffedFrogSubtotalText = await page.locator("//tr[td[contains(text(), 'Stuffed Frog')]]/td[4]").textContent();
const fluffyBunnySubtotalText = await page.locator("//tr[td[contains(text(), 'Fluffy Bunny')]]/td[4]").textContent();
const valentineBearSubtotalText = await page.locator("//tr[td[contains(text(), 'Valentine Bear')]]/td[4]").textContent();

const stuffedFrogSubtotal = getSubtotalAsNumber(stuffedFrogSubtotalText);
const fluffyBunnySubtotal = getSubtotalAsNumber(fluffyBunnySubtotalText);
const valentineBearSubtotal = getSubtotalAsNumber(valentineBearSubtotalText);

const expectedTotal = stuffedFrogSubtotal + fluffyBunnySubtotal + valentineBearSubtotal;
console.log('Expected Total:', expectedTotal.toFixed(2));

// Step 6: Verify total matches sum of subtotals
await page.waitForSelector("//strong[@class='total ng-binding']");
const displayedTotalText = await page.locator("//strong[@class='total ng-binding']").textContent();
// Function to convert string like "Total: 116.9" into number
const getPriceAsNumber = (priceText: string | null) => {
  if (!priceText) throw new Error("Missing price text!");
  const match = priceText.match(/[\d.]+/); // extracts the number part
  if (!match) throw new Error("No number found in total text!");
  return parseFloat(match[0]);
};
const displayedTotal = getPriceAsNumber(displayedTotalText);
console.log('Displayed Total Text:', displayedTotal);

//const displayedTotal = getPriceAsNumber(displayedTotalText);
expect(displayedTotal).toBeCloseTo(expectedTotal, 2);
});