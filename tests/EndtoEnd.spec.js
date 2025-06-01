const { test, expect } = require('@playwright/test');

test.only('End to End', async ({ page }) => {

    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    await page.locator('#input-email').fill("dib@gmail.com");
    await page.locator('#input-password').fill("Rss@2020");
    // await page.locator('#email').fill("dibyendumondal87@gmail.com");
    await page.locator('[value="Login"]').click();
    await page.locator('li:nth-child(7) a:nth-child(1)').click();
    await page.waitForLoadState('networkidle');
    const allCameras = await page.locator('.caption h4 a').allTextContents();
    console.log(allCameras);
    // Define the mobile name you want to click
    const targetCamera = "Nikon D300";
    for (let i = 0; i < allCameras.length; i++) {
    if (allCameras[i] === targetCamera) {
        // Click the corresponding element
        await page.locator(`.caption h4 a:has-text("${targetCamera}")`).click();
        console.log(`Clicked on ${targetCamera}`);
        break; // Stop once found and clicked
    }
}
await page.locator('#button-cart').click();



await page.locator('#cart-total').click();
await page.locator('strong:has(i.fa.fa-share)').click();
// Verify Total Price 

const quantity = await page.locator('input[name^="quantity"]').inputValue();
const unitPriceText = await page.locator('#content > form > div > table > tbody > tr > td:nth-child(5)').textContent();

console.log(`Unit Price: ${unitPriceText}`);

const totalPriceText = await page.locator('#content > form > div > table > tbody > tr > td:nth-child(6)').textContent();

console.log(`Total  Price: ${totalPriceText}`);

// Convert values to numbers
const unitPrice = parseFloat(unitPriceText.replace('$', '').trim());

const expectedTotalPrice = parseFloat(quantity) * unitPrice;




console.log(`Expected Total Price: ${expectedTotalPrice}`);



const displayedTotalPrice = parseFloat(totalPriceText.replace(/[$,]/g, ''));






console.log(`Displayed Total Price: ${displayedTotalPrice}`);


// Validate the total price
if (expectedTotalPrice === displayedTotalPrice) {
    console.log("✅ Total price is correct.");
} else {
    console.log(`❌ Total price is incorrect. Expected: $${expectedTotalPrice}, Displayed: $${displayedTotalPrice}`);
}







});