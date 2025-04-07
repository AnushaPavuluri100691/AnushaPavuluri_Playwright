import { test, expect } from '@playwright/test'

import * as dotenv from 'dotenv';
dotenv.config();
//dotenv is used to load environment variables from a .env file into process.env

test('login', async ({ page }) => {
    //Testing Authentication access to a website
  await page.goto('https://danube-web.shop/')
  //creating an user account from Playwright test
  await page.getByRole('button', { name: 'Sign Up' }).click()
  // Adding Wait for the Name field explicitly
  await page.waitForSelector('#s-name');
  await page.locator('#s-name').fill('Anusha');
  await page.locator('#s-surname').fill('Test');
  // Fill required fields
  //await page.getByLabel('Name').fill('Anusha');
 //await page.getByLabel('Surname').fill('Test');
  await page.getByPlaceholder('Email').fill(process.env.USER_EMAIL as string)
  await page.getByPlaceholder('Password').fill(process.env.USER_PASSWORD as string)
  // Fill optional field
  await page.getByPlaceholder('Company').fill('Test Company Ltd');
  // Select "Myself" or "My business" – assuming these are radio buttons
  await page.getByLabel('Myself').check();
   // Check promotional emails if applicable
   // we are not checking this checkbox in the test case
   //await page.getByLabel('I would like to receive promotional emails').check();
   // Accept privacy policy (required)
  await page.getByLabel('I have read and accept the privacy policy').check();
  // Submit the form by clicking the "Register" button
  await page.getByRole('button', { name: 'Register' }).click();
  // Assertion (modify as needed based on actual post-signup behavior)
  await expect(page.getByText('Log out')).toBeVisible();
  // Logging in with the same credentials after a successful signup
  await page.getByRole('button', { name: 'Log out' }).click()
    // Wait for the login button to be visible again
  await page.getByRole('button', { name: 'Log in' }).click()
  //this test fails beacuse we have not set the environment variables for user email and password
  //hence we are setting the environment variables in the .env file
  await page.getByPlaceholder('Email').fill(process.env.USER_EMAIL as string)
  await page.getByPlaceholder('Password').fill(process.env.USER_PASSWORD as string)
  await page.getByRole('button', { name: 'Sign In' }).click()
  //await expect(page.locator('#login-message'))
    //.toContainText(`Welcome back, ${process.env.USER_EMAIL as string}`)
    //this TC will fail because the user hasnt created an account yet in the website
    //hence adding a signup steps at the beginning of the test case
    
})