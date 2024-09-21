import { Locator, Page, expect } from "playwright/test";
import { BasePage } from "./BasePage";
import { FrameLocator } from "@playwright/test";
import { strict } from "assert";


class BookPage extends BasePage {

    constructor(page: Page) {
        super(page)
    }

    private getBookFrame(): FrameLocator {
        return this.page.frameLocator('//iframe[@id="WacFrame_Excel_0"]');
    }

    private getTextEditorInput() {
        return this.getBookFrame().locator('//div[@id="formulaBarTextDivId_textElement"]');
    }

    private getSheetCanvas() {
        return this.getBookFrame().locator('//div[@id="Sheet0_0_0_1"]//canvas');
    }

    // I'm using a delay and an additional "=" sign because I've encountered cases where the first typed symbol unexpectedly disappeared.
    // Additionally, I'm waiting for a successful response in test to ensure the loading endpoint is complete (based on my research).
    async fillTextEditor(text: string) {
        await this.getTextEditorInput().pressSequentially(`=${text}`, { delay: 1000 });
    }

    async fillFirstSheetCell(text :string) {
        const boundingBox = await this.getSheetCanvas()!.boundingBox();
        if (!boundingBox) {
          throw new Error('Canvas element not found');
        }
      
        const clickX = boundingBox.x + 50;
        const clickY = boundingBox.y + 30;
      
        await this.page.mouse.click(clickX, clickY);
        await this.page.keyboard.type(text);
    }

    async getResponseBook() {
        let response = await this.waitForResponse('/SetRichTextCell?waccluster=');
        let responseData = await response.json();
       return await responseData.d.Result.CellModel.Cells[0];
    }

    async checkColumnOrder(column: number, result: { Col: number; }) {
        expect(result.Col).toEqual(column)
    }

    async checkRowOrder(row: number, result: { Row: number; }) {
        expect(result.Row).toEqual(row)
    }

    async checkCellText(text: string, result: { Text: string; }) {
        expect(result.Text).toEqual(text);
    }

}

export default  BookPage;