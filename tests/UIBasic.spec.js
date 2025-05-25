const {test, expect} =require('@playwright/test');

test('browser context playwright test',async ({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/practice-project");



});
test.only('page playwright test',async ({page})=>
{

await page.goto("https://google.com");

console.log = (await page.title());
await expect(page).toHaveTitle("Google")

});

