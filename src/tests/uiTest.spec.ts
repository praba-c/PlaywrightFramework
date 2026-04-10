import { test } from "../ui/fixture/Fixture";
import testData from "../data/testData.json";
import { LoginPage } from "../ui/pages/LoginPage";

test.describe('UI', () => {

    test.use({
        baseURL: 'https://www.saucedemo.com',
        storageState: 'storage/storageState.json'
    });
    test('Login with Valid username', async ({ page }) => {

        await page.goto('https://www.saucedemo.com');
        const loginPage = new LoginPage(page);
        await loginPage.isPageVisible();

        const inventoryPage = await loginPage.login(testData.loginPage.valid.username, testData.loginPage.valid.password);
        await inventoryPage.isPageVisible();
    });

    test('Login with Invalid username', async ({ page }) => {

        await page.goto('https://www.saucedemo.com');
        const loginPage = new LoginPage(page);
        await loginPage.isPageVisible();
        await loginPage.loginExpectFailure(testData.loginPage.invalid.username, testData.loginPage.invalid.password);
        await loginPage.isErrorMessageDisplayed();
    });

    test('Sort products', async ({ inventoryPage }) => {
        await inventoryPage.sort(testData.inventoryPage.sortOption);
        await inventoryPage.verifyProductsAreSorted();
    });

    test('Add a product to the cart', async ({ inventoryPage }) => {
        const product: string[] = [];
        product.push(testData.inventoryPage.product);
        await inventoryPage.addProductToTheCart(product);
        await inventoryPage.verifyCartIconQuantity(1);
    });

    test('Add multiple products to the cart', async ({ inventoryPage }) => {
        const products = testData.inventoryPage.products;
        await inventoryPage.addProductToTheCart(products);
        await inventoryPage.verifyCartIconQuantity(products.length);
    });

    test('Remove product from the cart', async ({ inventoryPage }) => {
        const products = testData.inventoryPage.products;
        await inventoryPage.addProductToTheCart(products);
        const cartPage = await inventoryPage.clickOnCartIcon();
        await cartPage.isPageVisible();
        const removeProducts = testData.inventoryPage.removeProducts;
        await cartPage.removeProductFromTheCart(removeProducts);
        await cartPage.verifyCartIconQuantity(products.length - removeProducts.length);
    });

    test('Verify cart icon quantity changes in inventory page', async ({ inventoryPage }) => {
        const products = testData.inventoryPage.products;
        await inventoryPage.addProductToTheCart(products);
        const cartPage = await inventoryPage.clickOnCartIcon();
        await cartPage.isPageVisible();
        const removeProducts = (testData.inventoryPage.removeProducts)
        await cartPage.removeProductFromTheCart(removeProducts);
        await inventoryPage.verifyCartIconQuantity(products.length - removeProducts.length);
    });

    test('Checkout', async ({ inventoryPage }) => {
        const products = testData.inventoryPage.products;
        await inventoryPage.addProductToTheCart(products);
        const cartPage = await inventoryPage.clickOnCartIcon();
        await cartPage.isPageVisible();
        const checkoutPage = await cartPage.clickOnCheckoutButton();
        await checkoutPage.isPageVisible();
        await checkoutPage.fillDetails(testData.checkoutPage);
        const overviewPage = await checkoutPage.clickOnContinueButton();
        await overviewPage.isPageVisible();
    });

    test('Checkout without filling details', async ({ inventoryPage }) => {
        const products = testData.inventoryPage.products;
        await inventoryPage.addProductToTheCart(products);
        const cartPage = await inventoryPage.clickOnCartIcon();
        await cartPage.isPageVisible();
        const checkoutPage = await cartPage.clickOnCheckoutButton();
        await checkoutPage.isPageVisible();
        await checkoutPage.clickOnContinueButton();
        await checkoutPage.isErrorMessageDisplayed();
    });
});

