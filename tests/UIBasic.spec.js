const {test, expect} =require('@playwright/test');

test('Validate if text is present on the Practice page',async ({browser})=>
{
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
test('page playwright test',async ({page})=>
{

await page.goto("https://google.com");

console.log = (await page.title());
await expect(page).toHaveTitle("Google")

});

test.only('Validate Negative Scenario  present on the Practice page',async ({browser})=>
{
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
