import { test, expect } from '@playwright/test';
import Loginpage from '../../pageobjects/loginpage';

test('Verify login with empty data', async ({ page }) => {
    const loginpg = new Loginpage(page); 

    await loginpg.gotoLoginpage();
    await loginpg.validateLogin("","");

    // Assertion: Error message is visible
  await expect(loginpg.errormessage).toBeVisible();

  const errorText = await loginpg.getErrorMessage();
  console.log('Error Text:', errorText);

   expect(errorText).toContain('Epic sadface: Username is required');

});

test('Verify login with invalid data', async ({ page }) => {
    const loginpg = new Loginpage(page); 

    await loginpg.gotoLoginpage();
    await loginpg.validateLogin("standard","user");

    // Assertion: Error message is visible
  await expect(loginpg.errormessage).toBeVisible();

  const errorText = await loginpg.getErrorMessage();
  console.log('Error Text:', errorText);

   expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');

});

test('Verify login without password', async ({ page }) => {
    const loginpg = new Loginpage(page); 

    await loginpg.gotoLoginpage();
    await loginpg.validateLogin("standard_user","");

    // Assertion: Error message is visible
  await expect(loginpg.errormessage).toBeVisible();

  const errorText = await loginpg.getErrorMessage();
  console.log('Error Text:', errorText);

   expect(errorText).toContain('Epic sadface: Password is required');

});

test('Verify login without username', async ({ page }) => {
    const loginpg = new Loginpage(page); 

    await loginpg.gotoLoginpage();
    await loginpg.validateLogin("","secret_sauce");

    // Assertion: Error message is visible
  await expect(loginpg.errormessage).toBeVisible();

  const errorText = await loginpg.getErrorMessage();
  console.log('Error Text:', errorText);

   expect(errorText).toContain('Epic sadface: Username is required');

});

test('Verify login for lockedout user', async ({ page }) => {
    const loginpg = new Loginpage(page); 

    await loginpg.gotoLoginpage();
    await loginpg.validateLogin("locked_out_user","secret_sauce");

    // Assertion: Error message is visible
  await expect(loginpg.errormessage).toBeVisible();

  const errorText = await loginpg.getErrorMessage();
  console.log('Error Text:', errorText);

   expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');

});

test('Verify login with SQL injection', async ({ page }) => {
    const loginpg = new Loginpage(page); 

    await loginpg.gotoLoginpage();
    await loginpg.validateLogin("' OR 1=1 --", "12345");

    // Assertion: Error message is visible
  await expect(loginpg.errormessage).toBeVisible();

  const errorText = await loginpg.getErrorMessage();
  console.log('Error Text:', errorText);

   expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');

});

test('Verify login with whitespaces', async ({ page }) => {
    const loginpg = new Loginpage(page); 

    await loginpg.gotoLoginpage();
    await loginpg.validateLogin("    ", "    ");

    // Assertion: Error message is visible
  await expect(loginpg.errormessage).toBeVisible();

  const errorText = await loginpg.getErrorMessage();
  console.log('Error Text:', errorText);

   expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');

});