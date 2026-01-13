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

test('Verify error when First Name is missing', async ({ page }) => {
    const inventorypg = new InventoryPage(page);
    const cartpg = new CartPage(page);
    const checkoutpg = new CheckoutPage(page);

    await inventorypg.addItemToCart('Sauce Labs Backpack');
    await inventorypg.goToCart();
    await cartpg.clickCheckout();

    await checkoutpg.submitCheckoutInformation('', 'Srivastava', '395004');

    expect(await checkoutpg.getErrorMessage())
        .toBe('Error: First Name is required');
});
test('Verify error when Last Name is missing', async ({ page }) => {
    const inventorypg = new InventoryPage(page);
    const cartpg = new CartPage(page);
    const checkoutpg = new CheckoutPage(page);

    await inventorypg.addItemToCart('Sauce Labs Backpack');
    await inventorypg.goToCart();
    await cartpg.clickCheckout();

    await checkoutpg.submitCheckoutInformation('Chitra', '', '395004');

    expect(await checkoutpg.getErrorMessage())
        .toBe('Error: Last Name is required');
});
test('Verify error when Postal code is missing', async ({ page }) => {
    const inventorypg = new InventoryPage(page);
    const cartpg = new CartPage(page);
    const checkoutpg = new CheckoutPage(page);

    await inventorypg.addItemToCart('Sauce Labs Backpack');
    await inventorypg.goToCart();
    await cartpg.clickCheckout();

    await checkoutpg.submitCheckoutInformation('Chitra', 'Sri', '');

    expect(await checkoutpg.getErrorMessage())
        .toBe('Error: Postal Code is required');
});

test('Verify error when all data is missing', async ({ page }) => {
    const inventorypg = new InventoryPage(page);
    const cartpg = new CartPage(page);
    const checkoutpg = new CheckoutPage(page);

    await inventorypg.addItemToCart('Sauce Labs Backpack');
    await inventorypg.goToCart();
    await cartpg.clickCheckout();

    await checkoutpg.submitCheckoutInformation('', '', '');

    expect(await checkoutpg.getErrorMessage()).toBe('Error: First Name is required');
});

