import DateTime from '../utils/DateTime';
import { test } from '../pages/pageFixtures/pages.ts';

const email = process.env.EMAIL as string;
const password = process.env.PASSWORD as string;

test.beforeEach(async ({ loginPage, baseURL }) => {

    await loginPage.openLoginPage(`${baseURL}/launch/Excel/`);
    await loginPage.fillEmail(email)
    await loginPage.clickButtonNext()
    await loginPage.fillPassword(password)
    await loginPage.clickButoonSighIn()
    await loginPage.waitForPageLoading();
    await loginPage.clickButtonYesPrompt() // prompt with text to not log out during a time

})

test('Verify today functionin in Excel', async ({ excelPage, bookPage, context, page }) => {

    await excelPage.clickBlankWorkbook()

    const newPage = excelPage.switchToNewTab(context);
    let createdBookPage = bookPage(newPage);

    await createdBookPage.waitForResponse('/moe_status_icons.png');
    await createdBookPage.fillFirstSheetCell('=TODAY()'); // or use await createdBookPage.fillTextEditor('=TODAY()');
    await createdBookPage.pressEnterKey()
    // I invoke data from response end-point which returns results for specific cell and verify result for cell's row and column and  today date.
    let results = await createdBookPage.getResponseBook();
    console.log(results)
    createdBookPage.checkRowOrder(1, results);
    createdBookPage.checkColumnOrder(1, results);
    createdBookPage.checkCellText(DateTime.getTodayDate(), results)
});