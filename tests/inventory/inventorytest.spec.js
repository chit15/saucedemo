import { test, expect } from '@playwright/test';
import Loginpage from '../../pageobjects/loginpage.js';
import InventoryPage from '../../pageobjects/inventoryPage.js';

test('Verify inventory page item count after login', async ({ page }) => {
    const loginpg = new Loginpage(page); 
    const inventorypg = new InventoryPage(page);    
    await loginpg.gotoLoginpage();
    await loginpg.validateLogin('standard_user', 'secret_sauce');
    await inventorypg.gotoInventoryPage();
    const itemCount = await inventorypg.getInventoryItemCount();
    expect(itemCount).toBe(6); // Assuming there should be 6 items in the inventory
    await inventorypg.addItemToCart('Sauce Labs Bike Light');
});

test('Verify navigation to cart from inventory page', async ({ page }) => {
    const loginpg = new Loginpage(page); 
    const inventorypg = new InventoryPage(page);    
    await loginpg.gotoLoginpage();
    await loginpg.validateLogin('standard_user', 'secret_sauce');
    await inventorypg.gotoInventoryPage();
    await inventorypg.goToCart();
    const pageTitle = await inventorypg.getPageTitle();
    expect(pageTitle).toBe('Your Cart'); // Assuming the cart page title is 'Your Cart'
});     
