import { test, expect } from '@playwright/test'

test.describe('Spider solitaire page', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        console.log(`Running ${testInfo.title}`)
        await page.goto('http://localhost:3000/spider/')
    })

    test('should have tableau piles dealt correctly', async ({ page }) => {
        for (const i of Array.from(Array(4).keys())) {
            await expect(
                page.locator(`div[data-rfd-droppable-id="${i}"] > div`)
            ).toHaveCount(7)
        }
        for (const i of Array.from(Array(6).keys())) {
            await expect(
                page.locator(`div[data-rfd-droppable-id="${i + 4}"] > div`)
            ).toHaveCount(6)
        }
        await expect(
            page.locator('div[data-rfd-droppable-id="10"] > div')
        ).toHaveCount(52)
    })

    test('should move cards from stock pile to tableau piles when clicked', async ({
        page,
    }) => {
        await expect(
            page.locator('div[data-rfd-droppable-id="10"]')
        ).toBeVisible()
        await expect(
            page.locator('div[data-rfd-droppable-id="10"] > div')
        ).toHaveCount(52)

        await page.click('div[data-rfd-droppable-id="10"] > div:last-child')
        for (const i of Array.from(Array(4).keys())) {
            await expect(
                page.locator(`div[data-rfd-droppable-id="${i}"] > div`)
            ).toHaveCount(8)
        }
        for (const i of Array.from(Array(6).keys())) {
            await expect(
                page.locator(`div[data-rfd-droppable-id="${i + 4}"] > div`)
            ).toHaveCount(7)
        }
        await expect(
            page.locator('div[data-rfd-droppable-id="10"] > div')
        ).toHaveCount(42)

        await page.click('div[data-rfd-droppable-id="10"] > div:last-child')
        for (const i of Array.from(Array(4).keys())) {
            await expect(
                page.locator(`div[data-rfd-droppable-id="${i}"] > div`)
            ).toHaveCount(9)
        }
        for (const i of Array.from(Array(6).keys())) {
            await expect(
                page.locator(`div[data-rfd-droppable-id="${i + 4}"] > div`)
            ).toHaveCount(8)
        }
        await expect(
            page.locator('div[data-rfd-droppable-id="10"] > div')
        ).toHaveCount(32)
    })
})
