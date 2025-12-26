import { test, expect } from '@playwright/test';
import Loginpage from '../../pageobjects/loginpage.js';

// 🧪 All negative login test data in one place
const negativeLoginData = [
  {
    name: 'empty username & password',
    username: '',
    password: '',
    expectedError: 'Epic sadface: Username is required',
  },
  {
    name: 'invalid username & password',
    username: 'standard',
    password: 'user',
    expectedError: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'missing password',
    username: 'standard_user',
    password: '',
    expectedError: 'Epic sadface: Password is required',
  },
  {
    name: 'missing username',
    username: '',
    password: 'secret_sauce',
    expectedError: 'Epic sadface: Username is required',
  },
  {
    name: 'locked out user',
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectedError: 'Epic sadface: Sorry, this user has been locked out.',
  },
  {
    name: 'username with spaces',
    username: '   ',
    password: 'secret_sauce',
    expectedError: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'password with spaces',
    username: 'standard_user',
    password: '   ',
    expectedError: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'SQL injection attempt',
    username: "' OR 1=1 --",
    password: 'anything',
    expectedError: 'Epic sadface: Username and password do not match any user in this service',
  },
];


// 🧪 Data-driven negative test suite
test.describe('Negative Login Scenarios - Saucedemo', () => {

  for (const data of negativeLoginData) {

    test(`Verify login failure: ${data.name}`, async ({ page }) => {

      const loginpg = new Loginpage(page);

      // Go to login page
      await loginpg.gotoLoginpage();

      // Perform login
      await loginpg.validateLogin(data.username, data.password);

      // Assert error message visible
      await expect(loginpg.errormessage).toBeVisible({ timeout: 3000 });

      // Get error text
      const errorText = await loginpg.getErrorMessage();
      console.log(`Error for "${data.name}":`, errorText);

      // Assert error message content
      expect(errorText.trim()).toContain(data.expectedError);
    });
  }

});
