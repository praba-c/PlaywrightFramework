import { expect } from "playwright/test";
import { BasePage } from "./BasePage";

export class OverviewPage extends BasePage {
    readonly overviewPageTitle = 'Overview';
    readonly itemPriceLabel = this.page.getByTestId('subtotal-label');
    readonly taxPriceLabel = this.page.getByTestId('tax-label');
    readonly totalPriceLabel = this.page.getByTestId('total-label');

    async isPageVisible() {
        await expect(this.page.getByText(this.overviewPageTitle)).toBeVisible();
    }

    async validatePrice() {
        const priceText = await this.itemPriceLabel.textContent();
        const price = Number(priceText?.replace(/\d+(\.\d+)/, ''));
        const taxPriceText = await this.taxPriceLabel.textContent();
        const taxPrice = Number(taxPriceText?.replace(/\d+(\.\d+)/, ''));
        const totalPriceText = await this.totalPriceLabel.textContent();
        const totalPrice = Number(totalPriceText?.replace(/\d+(\.\d+)/, ''));

        console.log(price, taxPrice, totalPrice)
    }
}