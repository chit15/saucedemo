import { test, expect } from '@playwright/test';
import Loginpage from '../../pageobjects/loginpage.js';
import CartPage from '../../pageobjects/cartpage.js';
import InventoryPage from '../../pageobjects/inventoryPage.js';
import CheckoutPage from '../../pageobjects/checkoutpage.js';

test.beforeEach(async ({ page }) => {
    const loginpg = new Loginpage(page);
    await loginpg.gotoLoginpage();
    await loginpg.validateLogin('standard_user', 'secret_sauce');
});

test('Verify user can enter checkout information', async ({ page }) => {
    const inventorypg = new InventoryPage(page);
    const cartpg = new CartPage(page);
    const checkoutpg = new CheckoutPage(page);

    await inventorypg.addItemToCart('Sauce Labs Backpack');
    await inventorypg.goToCart();
    await cartpg.clickCheckout();

    expect(await checkoutpg.getPageTitle())
        .toBe('Checkout: Your Information');

    await checkoutpg.submitCheckoutInformation(
        'Chitra',
        'Srivastava',
        '395004'
    );
});