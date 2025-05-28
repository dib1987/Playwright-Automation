const { test, expect } = require('@playwright/test');

test('Validate if text is present on the Practice page', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/practice-project");
    await page.locator('#name').fill("Dibyendu Mondal");
    await page.locator('#email').fill("dibyendumondal87@gmail.com");
    await page.locator('#form-submit').click();
    console.log = (await page.locator('.section-title.h1'));
    const actualText = await page.locator('.section-title.h1').textContent();
    await expect(actualText).toContain('OUR PROJECTS');

});
test('page playwright test', async ({ page }) => {

    await page.goto("https://google.com");

    console.log = (await page.title());
    await expect(page).toHaveTitle("Google")

});

test('Validate Negative Scenario  present on the Practice page', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/practice-project");
    await page.locator('#name').fill("Dibyendu Mondal");
    // await page.locator('#email').fill("dibyendumondal87@gmail.com");
    await page.locator('#form-submit').click();
    const emailInput = await page.locator('#email');
    const emailValidation = await emailInput.evaluate(el => el.validationMessage);
    console.log(`Email Field Validation Message: ${emailValidation}`);
    expect(emailValidation).toBe("Please fill out this field.");

});

test.only('Validate New Tab Window', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/");
    const documentLink = page.locator('.header-top-link');

    const [newpage] = await Promise.all([

        context.waitForEvent('page'),
        documentLink.click(),
    ]

    )



    const text = await newpage.locator('#hero_section > div > div.hero_first_div > p.hero_heading').textContent();
    console.log(text);


});

test('Validate multiple element', async ({ page }) => {

    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    await page.locator('#input-email').fill("dib@gmail.com");
    await page.locator('#input-password').fill("Rss@2020");
    // await page.locator('#email').fill("dibyendumondal87@gmail.com");
    await page.locator('[value="Login"]').click();
    await page.locator('li:nth-child(7) a:nth-child(1)').click();
    await page.waitForLoadState('networkidle');
    const allMobiles = await page.locator('.caption h4 a').allTextContents();
    console.log(allMobiles);
});


