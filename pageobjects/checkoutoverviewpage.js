import BasePage from '../pageobjects/basePage.js';

class CheckoutOverviewPage extends BasePage {
    constructor(page) {
        super(page);

        // Page title
        this.pageTitle = page.locator('.title');

        // Cart items
        this.cartItems = page.locator('.cart_item');
        this.itemPrices = page.locator('.inventory_item_price');

        // Summary values
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');

        // Buttons
        this.finishButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
    }

    async getPageTitle() {
        return await this.pageTitle.textContent();
    }

    async getCartItemCount() {
        return await this.cartItems.count();
    }

    async getItemPrices() {
        const prices = [];
        const count = await this.itemPrices.count();

        for (let i = 0; i < count; i++) {
            const priceText = await this.itemPrices.nth(i).textContent();
            prices.push(parseFloat(priceText.replace('$', '')));
        }
        return prices;
    }

    async getItemTotalValue() {
        const text = await this.itemTotal.textContent();
        return parseFloat(text.replace('Item total: $', ''));
    }

    async getTaxValue() {
        const text = await this.tax.textContent();
        return parseFloat(text.replace('Tax: $', ''));
    }

    async getTotalValue() {
        const text = await this.total.textContent();
        return parseFloat(text.replace('Total: $', ''));
    }
}

export default CheckoutOverviewPage;