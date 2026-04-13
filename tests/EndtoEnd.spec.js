const { test, expect } = require('@playwright/test');

// Credentials should be moved to environment variables or a .env file
// e.g. process.env.TEST_EMAIL / process.env.TEST_PASSWORD
const OPENCART_EMAIL    = process.env.OPENCART_EMAIL    || "dib@gmail.com";
const OPENCART_PASSWORD = process.env.OPENCART_PASSWORD || "Rss@2020";
const CLIENT_EMAIL      = process.env.CLIENT_EMAIL      || "dibyendumondal87@gmail.com";
const CLIENT_PASSWORD   = process.env.CLIENT_PASSWORD   || "Rss@2020";

test('End to End', async ({ page }) => {

    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    await page.locator('#input-email').fill(OPENCART_EMAIL);
    await page.locator('#input-password').fill(OPENCART_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    // Navigate to Cameras category
    await page.getByRole('link', { name: 'Cameras' }).click();
    await expect(page.getByRole('heading', { name: 'Cameras' })).toBeVisible();

    const targetCamera = "Nikon D300";
    await page.locator('.caption h4 a').filter({ hasText: targetCamera }).click();
    await expect(page.getByRole('heading', { name: targetCamera })).toBeVisible();

    await page.locator('#button-cart').click();

    await page.locator('#cart-total').click();
    await page.getByRole('link', { name: /checkout/i }).click();

    const quantity        = await page.locator('input[name^="quantity"]').inputValue();
    const unitPriceText   = await page.getByRole('cell', { name: /\$/ }).nth(0).textContent();
    const totalPriceText  = await page.getByRole('cell', { name: /\$/ }).nth(1).textContent();

    const unitPrice            = parseFloat(unitPriceText.replace(/[$,]/g, '').trim());
    const expectedTotalPrice   = parseFloat(quantity) * unitPrice;
    const displayedTotalPrice  = parseFloat(totalPriceText.replace(/[$,]/g, '').trim());

    expect(displayedTotalPrice).toBeCloseTo(expectedTotalPrice, 2);
});


test('Regression Test', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill(CLIENT_EMAIL);
    await page.locator('#userPassword').fill(CLIENT_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for product grid to load rather than relying on networkidle
    await expect(page.locator('.card-body').first()).toBeVisible();

    const productName = 'ZARA COAT 3';

    await page.locator('.card-body')
        .filter({ hasText: productName })
        .getByRole('button', { name: 'Add To Cart' })
        .click();

    await page.locator("[routerlink*='cart']").click();

    const checkoutButton = page.locator("li.totalRow button[type='button']");
    await expect(checkoutButton).toBeVisible();
    await expect(checkoutButton).toBeEnabled();
    await checkoutButton.click();

    // Validate navigation to checkout/payment page
    await expect(page).toHaveURL(/checkout|order/i);
});


test('Playwright special locator test', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByPlaceholder('Name').fill("Dibyendu Mondal");
    await page.getByPlaceholder('Email').fill(CLIENT_EMAIL);
    await page.getByLabel('Password').fill(CLIENT_PASSWORD);
    await page.getByLabel('Gender').selectOption('Male');
    await page.getByLabel('Employed').check();
    await page.locator("input[name='bday']").fill("1990-10-10");
    await page.getByRole('button', { name: 'Submit' }).click();

    // Validate success message is shown after form submission
    await expect(page.getByText('Success')).toBeVisible();
});
