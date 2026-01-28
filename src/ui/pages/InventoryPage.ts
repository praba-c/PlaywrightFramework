import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CartPage } from "./CartPage";

export class InventoryPage extends BasePage {

    readonly inventoryTitle = "Products";
    readonly sortContainer = this.page.locator('.product_sort_container');
    readonly productNameList = this.page.getByTestId('inventory-item-name');
    readonly productPriceList = this.page.getByTestId('inventory-item-price');
    private actualOrder: any = [];
    private expectedOrder: any = [];
    private addToCart(productKey: string) {
        const key = productKey.toLowerCase().replace(/\s+/g, '-');
        return this.page.getByTestId(`add-to-cart-sauce-labs-${key}`)
    }
    readonly addToCartButton = this.page.getByText('Add to cart');
    readonly cartIconQuantity = this.page.getByTestId('shopping-cart-badge');
    readonly cartIconLocator = this.page.getByTestId('shopping-cart-link');

    async isPageVisible() {
        await expect(this.page.getByText(this.inventoryTitle)).toBeVisible();
    }

    async sort(option: string) {
        await this.sortContainer.selectOption({ label: option });

        if (option.includes('Name')) {
            this.actualOrder = await this.productNameList.allTextContents();
            this.expectedOrder = option.includes('A to Z') ? [...this.actualOrder].sort((a, b) => a.localeCompare(b))
                : [...this.actualOrder].sort((a, b) => b.localeCompare(a));
        } else {
            const priceText = await this.productPriceList.allTextContents();
            this.actualOrder = priceText.map(p => Number(p.replace('$', '')));
            this.expectedOrder = option.includes('low to high') ? [...this.actualOrder].sort((a, b) => a - b)
                : [...this.actualOrder].sort((a, b) => b - a)
        }
    }

    async verifyProductsAreSorted() {
        expect(this.expectedOrder).toEqual(this.actualOrder);
    }

    async addProductToTheCart(productName: string[]) {
        for (const product of productName) {
            await this.addToCart(product).click();
        }
    }

    async verifyCartIconQuantity(count: number) {
        await expect(this.cartIconQuantity).toHaveText(count.toString());
    }

    async clickOnCartIcon(): Promise<CartPage> {
        await this.cartIconLocator.click();
        return new CartPage(this.page);
    }
}