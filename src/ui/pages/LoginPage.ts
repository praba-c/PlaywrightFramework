import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { InventoryPage } from "./InventoryPage";

export class LoginPage extends BasePage {

    readonly titleLocator = this.page.locator('.login_logo');
    readonly userNameInputField = this.page.locator('#user-name');
    readonly passwordInputField = this.page.locator('#password');
    readonly loginButton = this.page.locator('#login-button');
    readonly errorMessage = this.page.locator('.error-message-container');
    

    async isPageVisible() {
        await expect(this.titleLocator).toBeVisible()
            .catch((error) => {
                console.log('Login Page not visible');
                throw error;
            });
    }

    async login(username: string, password: string): Promise<InventoryPage> {
        await this.userNameInputField.fill(username);
        await this.passwordInputField.fill(password);
        await this.loginButton.click();
        return new InventoryPage(this.page);
    }

    async loginExpectFailure(username: string, password: string) {
        await this.userNameInputField.fill(username);
        await this.passwordInputField.fill(password);
        await this.loginButton.click();
    }

    async isErrorMessageDisplayed() {
        await expect(this.errorMessage).toBeVisible();
    }
}