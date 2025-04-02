import {test, expect} from '@playwright/test';

test ('MyTest1', async ({page}) => {
    // Go to the website
    await page.goto('https://ultimateqa.com/automation');
    //await timeout(5000); // Wait for 5 seconds to ensure the page is fully loaded
    // Wait for the page to load completely
    
    // Check if the title is correct
    const title = await page.title();
    expect(title).toBe('Automation Practice - Ultimate QA');
    
    // Check if the heading is correct
    const heading = await page.locator('h1').textContent(); // Adjust the tag as needed
    expect(heading).toContain('Automation Practice');
    
    // Check if the link is correct
   // const link = await page.locator('a').getAttribute('href');
  //  expect(link).toBe('https://www.iana.org/domains/example');
    });