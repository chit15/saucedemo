import BasePage from '../pageobjects/basePage.js';

class Loginpage extends BasePage {
    constructor(page){
        super(page);
        this.username = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.submitbutton = page.locator('[data-test="login-button"]');
        this.errormessage = page.locator('[data-test="error"]');
    }

    async gotoLoginpage()
    {
        await this.open('/');
    }

     async validateLogin(username, password)
    {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.submitbutton.click();
    }

    async getErrorMessage() {
    return await this.errormessage.textContent();
  }
}

export default Loginpage;