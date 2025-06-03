const { test, expect } = require('@playwright/test');

test('End to End', async ({ page }) => {

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


test.only('Regression Test', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill("dibyendumondal87@gmail.com");
    await page.locator('#userPassword').fill("Rss@2020");
    // await page.locator('#email').fill("dibyendumondal87@gmail.com");
    await page.locator('[value="Login"]').click();
    await page.waitForLoadState('networkidle');
    // Find all product titles
    const productElements = page.locator('.card-body h5 b');
    const allProducts = await productElements.allTextContents();

    console.log(allProducts);
    
    // Define the product to select
    const productName = 'ZARA COAT 3'; // Change dynamically if needed

    // Find the index of the required product
    const productIndex = allProducts.findIndex(title => title.includes(productName));

    if (productIndex !== -1) {
        // Select the corresponding "Add To Cart" button and click it
        const addToCartButtons = page.locator('.card-body button:has-text("Add To Cart")');
        await addToCartButtons.nth(productIndex).click(); // Click on the correct button
        console.log(`Added "${productName}" to the cart.`);
    } else {
        throw new Error(`Product "${productName}" not found.`);
    }
});







