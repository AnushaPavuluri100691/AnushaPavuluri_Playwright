import {test, expect} from '@playwright/test'

//Running a basic navigation test to a page

test ('Basic Navigation', async ({page}) => {
    //even after adding DOM and extra timeout, the test is failing Firefox but passing in Chrome and webkit
    //Hence adding global timeout of 60 seconds to the test to override the default timeout of 30 seconds in config file
    test.setTimeout(60000); 
    //Go to the website
    await page.goto ('https://www.w3schools.com/html/html_examples.asp', {
        // This test is passed in webkit but failing in Chrome and Firefox, hence adding DOM and extra timeout
        timeout: 60000, 
        waitUntil: 'domcontentloaded' // Wait for the DOM to be fully loaded
    });
    //Wait for 5 seconds to ensure the page is fully loaded
    //await page.waitForTimeout(5000);
    // Go to the website with extended timeout and optimized loading strategy

    //Check if the link is correct
    const url = await page.url ();
    expect (url).toBe ('https://www.w3schools.com/html/html_examples.asp');
    //Checking the title of the page
    const title = await page.title ();
    expect (title).toBe ('HTML Examples');
    //Check if the heading is correct
    //const heading = await page.getByRole({'heading',{name:'HTML Basic' });
    const heading = await page.getByRole('heading', { name: 'HTML Basic' }); 
    await expect(heading).toBeVisible();
    //await expect(heading).toBeVisible();
    });