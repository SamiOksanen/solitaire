import { test, expect } from '@playwright/test'

test.describe('Klondike solitaire page', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        console.log(`Running ${testInfo.title}`)
        await page.goto('http://localhost:3000/klondike/')
    })

    test('should have tableau piles dealt correctly', async ({ page }) => {
        await expect(
            page.locator('div[data-rfd-droppable-id="7"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rfd-droppable-id="7"] > div')
        ).toHaveCount(2)

        await expect(
            page.locator('div[data-rfd-droppable-id="8"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rfd-droppable-id="8"] > div')
        ).toHaveCount(3)

        await expect(
            page.locator('div[data-rfd-droppable-id="9"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rfd-droppable-id="9"] > div')
        ).toHaveCount(4)

        await expect(
            page.locator('div[data-rfd-droppable-id="10"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rfd-droppable-id="10"] > div')
        ).toHaveCount(5)

        await expect(
            page.locator('div[data-rfd-droppable-id="11"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rfd-droppable-id="11"] > div')
        ).toHaveCount(6)

        await expect(
            page.locator('div[data-rfd-droppable-id="12"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rfd-droppable-id="12"] > div')
        ).toHaveCount(7)

        await expect(
            page.locator('div[data-rfd-droppable-id="13"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rfd-droppable-id="13"] > div')
        ).toHaveCount(8)
    })

    test('should move cards from stock pile to waste pile when clicked', async ({
        page,
    }) => {
        await expect(
            page.locator('div[data-rfd-droppable-id="1"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rfd-droppable-id="1"] > div')
        ).toHaveCount(25)
        await expect(
            page.locator('div[data-rfd-droppable-id="2"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rfd-droppable-id="2"] > div')
        ).toHaveCount(1)
        await page.click('div[data-rfd-droppable-id="1"] > div:last-child')
        await expect(
            page.locator('div[data-rfd-droppable-id="1"] > div')
        ).toHaveCount(22)
        await expect(
            page.locator('div[data-rfd-droppable-id="2"] > div')
        ).toHaveCount(4)
    })
})
