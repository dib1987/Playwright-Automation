const {test} = require ('@playwright/test')

test('Alert Pop Up', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    page.on('dialog', async (dialog) => {
        console.log('Dialog message:', dialog.message())
        await dialog.accept()
    })
    await page.click('#confirmbtn')
}
)
