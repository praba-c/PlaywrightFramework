import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { OverviewPage } from "./OverviewPage";

export class CheckoutPage extends BasePage {
    readonly checkoutPageTitle = 'Checkout';
    readonly firstNameInputField = this.page.getByTestId('firstName');
    readonly lastNameInputField = this.page.getByTestId('lastName');
    readonly zipCodeInputField = this.page.getByTestId('postalCode');
    readonly continueButton = this.page.getByTestId('continue');
    readonly errorMessage = this.page.getByTestId('error');

    async isPageVisible() {
        await expect(this.page.getByText(this.checkoutPageTitle)).toBeVisible();
    }

    async fillDetails(checkoutPage: { firstName: string; lastName: string; zipCode: string; }) {
        await this.firstNameInputField.fill(checkoutPage.firstName);
        await this.lastNameInputField.fill(checkoutPage.lastName);
        await this.zipCodeInputField.fill(checkoutPage.zipCode);
    }

    async clickOnContinueButton(): Promise<OverviewPage> {
        await this.continueButton.click();
        return new OverviewPage(this.page);
    }

    async isErrorMessageDisplayed() {
        await expect(this.errorMessage).toBeVisible();
    }
}