class BasePage {
    constructor(page) {
        this.page = page;
        this.baseURL = 'https://www.saucedemo.com'; // Set URL here
    }

    async open(path = '/') {
        await this.page.goto(this.baseURL + path);
    }
}

export default BasePage;