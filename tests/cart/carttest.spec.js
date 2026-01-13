import { test, expect } from '@playwright/test';
import Loginpage from '../../pageobjects/loginpage.js';
import CartPage from '../../pageobjects/cartpage.js';
import InventoryPage from '../../pageobjects/inventoryPage.js';

test.beforeEach(async ({ page }) => {
    const loginpg = new Loginpage(page);
    await loginpg.gotoLoginpage();
    await loginpg.validateLogin('standard_user', 'secret_sauce');
});

test('Verify items in cart after adding from inventory', async ({ page }) => {

    const inventorypg = new InventoryPage(page);    
    const cartpg = new CartPage(page);  
    
    // Add items to cart        
    const itemsToAdd = ['Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
    for (const item of itemsToAdd) {
        await inventorypg.addItemToCart(item);
    }               
    await inventorypg.goToCart();

    // Verify items in cart
    const cartItemCount = await cartpg.getCartItemCount();
    expect(cartItemCount).toBe(itemsToAdd.length);  
    for (const item of itemsToAdd) {
        const isPresent = await cartpg.isItemPresentInCart(item);
        expect(isPresent).toBe(true);
    }           
}); 
test('Verify checkout button navigates to checkout page', async ({ page }) => {
  
    const inventorypg = new InventoryPage(page);    
    const cartpg = new CartPage(page);  
   
    await inventorypg.addItemToCart('Sauce Labs Backpack');
    await inventorypg.goToCart();
    await cartpg.clickCheckout();
    const pageTitle = await cartpg.getCheckoutPageTitle();
    expect(pageTitle).toBe('Checkout: Your Information');

}); 
test('Verify cart is empty when no items are added', async ({ page }) => {

    const inventorypg = new InventoryPage(page);    
    const cartpg = new CartPage(page);  
    
    await inventorypg.goToCart();
    const cartItemCount = await cartpg.getCartItemCount();
    expect(cartItemCount).toBe(0); // Cart should be empty
});
