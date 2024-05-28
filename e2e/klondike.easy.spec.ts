import { test, expect } from '@playwright/test'

test.describe('Klondike solitaire easy page', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        console.log(`Running ${testInfo.title}`)
        await page.goto('http://localhost:3000/klondike/easy/')
    })

    test('should have tableau piles dealt correctly', async ({ page }) => {
        await expect(
            page.locator('div[data-rbd-droppable-id="7"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rbd-droppable-id="7"] > div')
        ).toHaveCount(2)

        await expect(
            page.locator('div[data-rbd-droppable-id="8"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rbd-droppable-id="8"] > div')
        ).toHaveCount(3)

        await expect(
            page.locator('div[data-rbd-droppable-id="9"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rbd-droppable-id="9"] > div')
        ).toHaveCount(4)

        await expect(
            page.locator('div[data-rbd-droppable-id="10"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rbd-droppable-id="10"] > div')
        ).toHaveCount(5)

        await expect(
            page.locator('div[data-rbd-droppable-id="11"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rbd-droppable-id="11"] > div')
        ).toHaveCount(6)

        await expect(
            page.locator('div[data-rbd-droppable-id="12"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rbd-droppable-id="12"] > div')
        ).toHaveCount(7)

        await expect(
            page.locator('div[data-rbd-droppable-id="13"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rbd-droppable-id="13"] > div')
        ).toHaveCount(8)
    })

    test('should move a card from stock pile to waste pile when clicked', async ({
        page,
    }) => {
        await expect(
            page.locator('div[data-rbd-droppable-id="1"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rbd-droppable-id="1"] > div')
        ).toHaveCount(25)
        await expect(
            page.locator('div[data-rbd-droppable-id="2"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rbd-droppable-id="2"] > div')
        ).toHaveCount(1)
        await page.click('div[data-rbd-droppable-id="1"] > div:last-child')
        await expect(
            page.locator('div[data-rbd-droppable-id="1"] > div')
        ).toHaveCount(24)
        await expect(
            page.locator('div[data-rbd-droppable-id="2"] > div')
        ).toHaveCount(2)
    })
})
