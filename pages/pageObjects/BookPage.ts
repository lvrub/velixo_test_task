import { Locator, Page, expect } from "playwright/test";
import { BasePage } from "./BasePage";
import { FrameLocator } from "@playwright/test";
import { strict } from "assert";
import Tesseract from "tesseract.js";


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
    // Additionally, you can wait response from '/moe_status_icons.png' in test to ensure the loading endpoint is complete (based on my research).
    async fillTextEditor(text: string) {
        await this.getTextEditorInput().pressSequentially(`=${text}`, { delay: 1000 });
    }

    async fillFirstSheetCell(text :string) {
        const boundingBox = await this.getSheetCanvas()!.boundingBox();
        if (!boundingBox) {
          throw new Error('Canvas element not found');
        }
      
        const clickX = boundingBox.x + 50;
        const clickY = boundingBox.y + 10;
      
        await this.page.mouse.click(clickX, clickY);
        await this.page.keyboard.type(text);
    }

    async getResponseBook() {
        let response = await this.waitForResponse('/SetRichTextCell?waccluster=');
        let responseData = await response.json();
       return await responseData.d.Result.CellModel.Cells[0];
    }

    async verifyColumnOrder(column: number, result: { Col: number; }) {
        expect(result.Col).toEqual(column)
    }

    async verifyRowOrder(row: number, result: { Row: number; }) {
        expect(result.Row).toEqual(row)
    }

    async verifyCellText(text: string, result: { Text: string; }) {
        expect(result.Text).toEqual(text);
    }
    

    //experimental method which verifies that whole text includes expected text, it works when a date is shown fully (not masked as ########)
    async verifySheetContainsText(expectedText: string) {
        const extractedText = await this.extractTextFromCanvas();
        expect(extractedText).toContain(expectedText);
    }
    
    private async extractTextFromCanvas(): Promise<string> {
        const canvasLocator = this.getSheetCanvas();
        const canvasHandle = await canvasLocator.elementHandle();
    
        if (!canvasHandle) {
            throw new Error('Canvas element handle not found');
        }
    
        // Convert canvas to base64
        const base64Image = await canvasHandle.evaluate((canvas: HTMLCanvasElement) => {
            return canvas.toDataURL('image/png'); // Convert to base64
        });
    
        // Use Tesseract.js to extract text from the base64 image       
        const { data: { text } } = await Tesseract.recognize(base64Image, 'eng');;
        
        console.log('Extracted text:', text);
        return text;
    }

}

export default  BookPage;