import { chromium, expect } from "@playwright/test";
import data from "./src/data/testData.json";
import { LoginPage } from "./src/ui/pages/LoginPage";

export default async function globalSetup() {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com');
    const loginPage = new LoginPage(page);
    await loginPage.login(data.loginPage.valid.username, data.loginPage.valid.password);

    expect(await page.locator('.app_logo').textContent()).toEqual('Swag Labs');
    await context.storageState({ path: 'storage/storageState.json' });
    await browser.close();
}