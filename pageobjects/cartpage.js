import BasePage from '../pageobjects/basePage.js'
class CartPage extends BasePage {
    constructor(page){
        super(page);
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.pageTitle = page.locator('.title');
    }
    // Get number of items in cart
    async getCartItemCount() {
        return await this.cartItems.count();
    }

    // Verify item exists in cart
    async isItemPresentInCart(itemName) {
        const item = this.cartItems.filter({ hasText: itemName });
        return await item.count() > 0;
    }  

     // Click checkout
    async clickCheckout() {
        await this.checkoutButton.click();
    }
    async getCheckoutPageTitle() {
    return await this.page.locator('.title').textContent();
}
}
export default CartPage;