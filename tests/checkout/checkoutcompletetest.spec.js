import { test, expect } from '@playwright/test';
import Loginpage from '../../pageobjects/loginpage.js';
import InventoryPage from '../../pageobjects/inventoryPage.js';
import CartPage from '../../pageobjects/cartpage.js';
import CheckoutPage from '../../pageobjects/checkoutpage.js';
import CheckoutOverviewPage from '../../pageobjects/checkoutoverviewpage.js';
import CheckoutCompletePage from '../../pageobjects/checkoutcompletepage.js';

test('Verify order completes successfully', async ({ page }) => {
    const loginpg = new Loginpage(page);
    const inventorypg = new InventoryPage(page);
    const cartpg = new CartPage(page);
    const checkoutpg = new CheckoutPage(page);
    const overviewpg = new CheckoutOverviewPage(page);
    const completepg = new CheckoutCompletePage(page);

    await loginpg.gotoLoginpage();
    await loginpg.validateLogin('standard_user', 'secret_sauce');

    await inventorypg.addItemToCart('Sauce Labs Backpack');
    await inventorypg.goToCart();

    await cartpg.clickCheckout();
    await checkoutpg.submitCheckoutInformation('Chitra', 'Srivastava', '395004');

    // Click Finish on overview page
    await overviewpg.finishButton.click();

    // Validations on complete page
    expect(await completepg.getPageTitle()).toBe('Checkout: Complete!');
    expect(await completepg.getCompleteHeader()).toBe('Thank you for your order!');
    expect(await completepg.getCompleteText()).toContain('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

    // Go back home
    await completepg.clickBackHome();
    await expect(page).toHaveURL(/inventory.html/);
});