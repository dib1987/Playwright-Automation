const { test, expect } = require('@playwright/test');

// Credentials sourced from environment variables
const OPENCART_EMAIL    = process.env.OPENCART_EMAIL    || "dib@gmail.com";
const OPENCART_PASSWORD = process.env.OPENCART_PASSWORD || "Rss@2020";
const CLIENT_EMAIL      = process.env.CLIENT_EMAIL      || "dibyendumondal87@gmail.com";


test('Validate section title after form submit', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/practice-project");
    await page.getByPlaceholder('Name').fill("Dibyendu Mondal");
    await page.getByPlaceholder('Email').fill(CLIENT_EMAIL);
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('.section-title.h1')).toContainText('OUR PROJECTS');
});


test('Validate Google page title', async ({ page }) => {

    await page.goto("https://google.com");
    await expect(page).toHaveTitle("Google");
});


test('Validate email field required message on empty submit', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/practice-project");
    await page.getByPlaceholder('Name').fill("Dibyendu Mondal");
    await page.getByRole('button', { name: 'Submit' }).click();

    const emailInput      = page.getByPlaceholder('Email');
    const emailValidation = await emailInput.evaluate(el => el.validationMessage);
    expect(emailValidation).toBe("Please fill out this field.");
});


test('Validate new tab opens with correct content', async ({ page, context }) => {

    await page.goto("https://rahulshettyacademy.com/");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        // TODO: Replace with getByRole('link') once the link label is confirmed
        page.locator('.header-top-link').click(),
    ]);

    await newPage.waitForLoadState();

    await expect(newPage.locator('p.hero_heading')).toContainText(/.+/);
});


test('Validate camera listing loads after login', async ({ page }) => {

    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    await page.locator('#input-email').fill(OPENCART_EMAIL);
    await page.locator('#input-password').fill(OPENCART_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('link', { name: 'Cameras' }).click();
    await expect(page.locator('.caption h4 a').first()).toBeVisible();

    const allCameras = await page.locator('.caption h4 a').allTextContents();
    expect(allCameras.length).toBeGreaterThan(0);
});
