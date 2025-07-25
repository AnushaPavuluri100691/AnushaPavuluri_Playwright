import {test, expect} from '@playwright/test';
//Running a test to take a screenshot of the page and save it in the folder

test ('DemoTest' , async ({page}) => {


    //this TC is failing in webkit due to timeout, hence enforcing timeout of 60 seconds to the test to override the default timeout of 30 seconds in config file
    test.setTimeout(60000);
   // Go to the website
   //wait page.goto('https://www.w3schools.com/html/html_examples.asp');
    // Wait for 5 seconds to ensure the page is fully loaded
    // await page.waitForTimeout(5000);
    // giving DOM content loaded to the page to load the page completely
    await page.goto('https://www.w3schools.com/html/html_examples.asp', {
        timeout: 60000,
        waitUntil: 'domcontentloaded' // Wait for the DOM to be fully loaded
    });
    // Set frame size to 1920x1080
    await page.setViewportSize({width: 1920, height: 1080});

    //now I am testing webpage frame size of 1920x1080
    //Take a screenshot of the page and save it in the folder
    await page.screenshot({path: './Screenshots/screenshot.png'});
});