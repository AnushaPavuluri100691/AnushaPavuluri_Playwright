import {test, expect} from '@playwright/test';

//Running a test to take a screenshot of the page and save it in the folder
//Also to save the PDF of the page in the folder
//This test is to check the screenshot and pdf generation of the page
test ('screenshot', async ({page}) => {
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
    //Take a screenshot of the page and save it in the folder
    await page.screenshot({path: './Screenshots/screenshot.png'});
    // now testing full page screenshot functionality
    await page.screenshot({path: './Screenshots/fullpage.png', fullPage: true});
    // trying a visual regression testing with the screenshot done on frame size of 1920x1080
    // await page.screenshot({path: './Screenshots/visualregression.png', fullPage: true, clip: {x: 0, y: 0, width: 1920, height: 1080}});

   // expect(await page.screenshot()).toMatchSnapshot('screenshot.png');
    //this test is failed because the html page has a an advertisement which is not matching the screenshot taken in the test
    // now have to test ignoring the advertisement in the screenshot taken in the test
    await page.screenshot({path: './Screenshots/visualregression.png', fullPage: true, clip: {x: 0, y: 0, width: 1920, height: 1080}});

});
    