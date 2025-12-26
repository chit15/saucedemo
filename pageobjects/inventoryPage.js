import BasePage from '../pageobjects/basePage.js'
class InventoryPage extends BasePage {
    constructor(page){
        super(page);
        this.inventoryItems = page.locator('.inventory_item');
        this.cartButton = page.locator('.shopping_cart_link');
        this.pageTitle = page.locator('.title');
       
    }
    async gotoInventoryPage()
    {
        await this.open('/inventory.html');
    }           
    async getInventoryItemCount() {
        return await this.inventoryItems.count();
    }  
    
    async addItemToCart(itemName) {
        const formattedName = itemName.toLowerCase().replaceAll(' ', '-');

        const addToCartButton = this.page.locator(
            `[data-test="add-to-cart-${formattedName}"]`
        );

        await addToCartButton.click();
    }
    async goToCart() {
        await this.cartButton.click();
    }
    async getPageTitle() {
        return await this.pageTitle.textContent();
    }
}
export default InventoryPage;