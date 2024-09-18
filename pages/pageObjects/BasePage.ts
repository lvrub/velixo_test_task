import { BrowserContext } from "@playwright/test";
import { Locator, Page, expect, test } from "playwright/test";

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForTimeOut(timeout = 2000) {
        await this.page.waitForTimeout(timeout)
    }

    async waitForResponse(url: string) {
        return await this.page.waitForResponse(response => response.url().includes(url) && response.status() === 200);
    }

    async waitForPageLoading() {
        await this.page.waitForLoadState('load')
    }


    switchToNewTab(browserContext: BrowserContext): Page {
        const newPages = browserContext.pages();
        const newPage = newPages[newPages.length - 1];
        return newPage;
    }

    async pressEnterKey() {
        await this.page.keyboard.press('Enter');
    }


}