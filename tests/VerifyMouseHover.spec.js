const { test, expect } = require('@playwright/test')

test('Mouse Hover', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

    await page.hover('#mousehover')

    const hoverMenu = page.locator('.mouse-hover-content')
    await hoverMenu.waitFor({ state: 'visible' })

    await hoverMenu.locator('a', { hasText: 'Top' }).click()

    const text = await hoverMenu.textContent()
    console.log(text)

    expect(text).toContain('Top')
})
