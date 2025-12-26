import { test, expect } from '@playwright/test';
import Loginpage from '../../pageobjects/loginpage.js';

test('Verify login with valid credentials', async ({ page }) => {
    const loginpg = new Loginpage(page); 

    await loginpg.gotoLoginpage();
    await loginpg.validateLogin('standard_user', 'secret_sauce');
});