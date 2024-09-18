import { Locator, Page, expect } from "playwright/test";
import { BasePage } from "./BasePage";


class ExcelPage extends BasePage {

    constructor(page: Page) {
        super(page)
    }

    private getBlankWorkbook(): Locator {
        return this.page.locator('[aria-label="Blank workbook"]')

    }

    async clickBlankWorkbook() {
        await this.getBlankWorkbook().click()
    }

}


export default ExcelPage;