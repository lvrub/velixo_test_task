import { Locator, Page, expect } from "playwright/test";
import { BasePage } from "./BasePage";


class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page)
    }

    private getInputEmail(): Locator {
        return this.page.locator('input[name="loginfmt"]');
    }

    private getButtonSubmit(): Locator {
        return this.page.locator('#idSIButton9');
    }

    private getInputPasssword(): Locator {
        return this.page.getByTestId('i0118');
    }

    private getButtonYesPrompt() {
        return this.page.locator('[aria-labelledby="kmsiTitle"]')
    }

    async openLoginPage(url: string) {
        await this.page.goto(url);
    }

    async fillEmail(email: string) {
        await this.getInputEmail().fill(email)
    }

    async clickButtonNext() {
        await this.getButtonSubmit().click()
    }

    async fillPassword(password: string) {
        await this.getInputPasssword().fill(password)
    }

    async clickButoonSighIn() {
        await this.getButtonSubmit().click()
    }

    async clickButtonYesPrompt() {
        await this.getButtonYesPrompt().click()
    }
}


export default LoginPage;