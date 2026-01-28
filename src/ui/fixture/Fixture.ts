import { test as base } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";

type MyFixture = {
    inventoryPage: InventoryPage;
}

export const test = base.extend<MyFixture>({
    inventoryPage: async ({ page }, use) => {
        await page.goto('/inventory.html');

        const inventoryPage = new InventoryPage(page);
        await inventoryPage.isPageVisible();

        await use(inventoryPage);

        await page.close()
    }
})