import { Locator, Page } from "@playwright/test";

export class BasePage {

    constructor(readonly page: Page) { }

    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }
}