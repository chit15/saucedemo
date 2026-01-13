import BasePage from '../pageobjects/basePage.js';

class CheckoutCompletePage extends BasePage {
    constructor(page) {
        super(page);

        this.pageTitle = page.locator('.title');
        this.completeHeader = page.locator('.complete-header');
        this.completeText = page.locator('.complete-text');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async getPageTitle() {
        return await this.pageTitle.textContent();
    }

    async getCompleteHeader() {
        return await this.completeHeader.textContent();
    }

    async getCompleteText() {
        return await this.completeText.textContent();
    }

    async clickBackHome() {
        await this.backHomeButton.click();
    }
}

export default CheckoutCompletePage;