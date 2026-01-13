import BasePage from "./basePage";
class CheckoutPage extends BasePage {
    constructor(page){
        super(page);    
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');    
         // Buttons
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');

        // Error message
        this.errorMessage = page.locator('[data-test="error"]');

        // Page title
        this.pageTitle = page.locator('.title');
    }   
     // Get checkout page title
    async getPageTitle() {
        return await this.pageTitle.textContent();
    }

    // Fill checkout form
    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    // Click Continue
    async clickContinue() {
        await this.continueButton.click();
    }

    // Complete checkout info in one step
    async submitCheckoutInformation(firstName, lastName, postalCode) {
        await this.fillCheckoutInformation(firstName, lastName, postalCode);
        await this.clickContinue();
    }

    // Get error message text
    async getErrorMessage() {
        return await this.errorMessage.textContent();
    } 
}
export default CheckoutPage;