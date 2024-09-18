import { test as baseTest , BrowserContext, Page } from "playwright/test";
import LoginPage from "../pageObjects/LoginPage";
import ExcelPage from "../pageObjects/ExcelPage";
import BookPage from '../pageObjects/BookPage';


export const test = baseTest.extend <{
  loginPage: LoginPage;
  excelPage: ExcelPage;
  bookPage: (page: Page) => BookPage;  // BookPage will be initialized with a dynamic page
  context: BrowserContext;}> ({
  
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  excelPage: async ({ page }, use) => {
    await use(new ExcelPage(page));
  },

  bookPage: async ({}, use) => {
    await use((page: Page) => new BookPage(page));
  }
  
});