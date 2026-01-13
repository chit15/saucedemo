import { test, expect } from '@playwright/test';
import InventoryPage from '../../pageobjects/inventoryPage.js';
import CartPage from '../../pageobjects/cartpage.js';
import CheckoutPage from '../../pageobjects/checkoutpage.js';
import CheckoutOverviewPage from '../../pageobjects/checkoutoverviewpage.js';
import Loginpage from '../../pageobjects/loginpage.js';

test.beforeEach(async ({ page }) => {
    const loginpg = new Loginpage(page);
    await loginpg.gotoLoginpage();
    await loginpg.validateLogin('standard_user', 'secret_sauce');
});

test('Validate Checkout Overview page title and URL', async ({ page }) => {
    const inventorypg = new InventoryPage(page);
    const cartpg = new CartPage(page);
    const checkoutpg = new CheckoutPage(page);
    const overviewpg = new CheckoutOverviewPage(page);

    await inventorypg.addItemToCart('Sauce Labs Backpack');
    await inventorypg.goToCart();
    await cartpg.clickCheckout();
    await checkoutpg.submitCheckoutInformation('Chitra', 'Srivastava', '395004');

    expect(await overviewpg.getPageTitle())
        .toBe('Checkout: Overview');

    await expect(page).toHaveURL(/checkout-step-two.html/);
});

test('Validate cart item count on overview page', async ({ page }) => {
    const inventorypg = new InventoryPage(page);
    const cartpg = new CartPage(page);
    const checkoutpg = new CheckoutPage(page);
    const overviewpg = new CheckoutOverviewPage(page);

    const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

    for (const item of items) {
        await inventorypg.addItemToCart(item);
    }

    await inventorypg.goToCart();
    await cartpg.clickCheckout();
    await checkoutpg.submitCheckoutInformation('Chitra', 'Srivastava', '395004');

    expect(await overviewpg.getCartItemCount()).toBe(items.length);
});

test('Validate item total calculation', async ({ page }) => {
    const inventorypg = new InventoryPage(page);
    const cartpg = new CartPage(page);
    const checkoutpg = new CheckoutPage(page);
    const overviewpg = new CheckoutOverviewPage(page);

    await inventorypg.addItemToCart('Sauce Labs Backpack');
    await inventorypg.addItemToCart('Sauce Labs Bike Light');

    await inventorypg.goToCart();
    await cartpg.clickCheckout();
    await checkoutpg.submitCheckoutInformation('Chitra', 'Srivastava', '395004');

    const prices = await overviewpg.getItemPrices();
    const expectedItemTotal = prices.reduce((sum, price) => sum + price, 0);

    expect(await overviewpg.getItemTotalValue())
        .toBeCloseTo(expectedItemTotal, 2);
});

test('Validate tax and total calculation', async ({ page }) => {
    const inventorypg = new InventoryPage(page);
    const cartpg = new CartPage(page);
    const checkoutpg = new CheckoutPage(page);
    const overviewpg = new CheckoutOverviewPage(page);

    await inventorypg.addItemToCart('Sauce Labs Backpack');
    await inventorypg.goToCart();
    await cartpg.clickCheckout();
    await checkoutpg.submitCheckoutInformation('Chitra', 'Srivastava', '395004');

    const itemTotal = await overviewpg.getItemTotalValue();
    const tax = await overviewpg.getTaxValue();
    const total = await overviewpg.getTotalValue();

    expect(tax).toBeGreaterThan(0);
    expect(total).toBeCloseTo(itemTotal + tax, 2);
});
