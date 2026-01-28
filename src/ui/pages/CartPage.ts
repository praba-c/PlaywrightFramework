import { expect } from "playwright/test";
import { BasePage } from "./BasePage";
import { CheckoutPage } from "./CheckoutPage";

export class CartPage extends BasePage{

    readonly cartPageTitle = 'Your Cart';
    private removeButton(productKey: string) {
        const key = productKey.toLowerCase().replace(/\s+/, '-');
        return this.page.getByTestId(`remove-sauce-labs-${key}`);
    }
    readonly cartIconQuantity = this.page.getByTestId('shopping-cart-badge');
    readonly checkoutButton = this.page.getByTestId('checkout');

    async isPageVisible() {
        await expect(this.page.getByText(this.cartPageTitle)).toBeVisible();
    }

    async removeProductFromTheCart(products: string[]) { 
        for (const product of products) {
            await this.removeButton(product).click();
        }
    }

    async verifyCartIconQuantity(count: number) {
        await expect(this.cartIconQuantity).toHaveText(count.toString());
    }

    async clickOnCheckoutButton(): Promise<CheckoutPage> {
        await this.checkoutButton.click();
        return new CheckoutPage(this.page);
    }
}