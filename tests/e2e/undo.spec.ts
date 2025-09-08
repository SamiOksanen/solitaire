import { test, expect } from '@playwright/test'

test.describe('Undo functionality', () => {
    test('should show undo button in Klondike', async ({ page }) => {
        await page.goto('http://localhost:3000/klondike/')

        // Check that undo button is visible
        await expect(page.locator('button:has-text("Undo")')).toBeVisible()

        // Undo button should be disabled initially (no moves made yet)
        await expect(page.locator('button:has-text("Undo")')).toBeDisabled()
    })

    test('should show undo button in Spider Solitaire', async ({ page }) => {
        await page.goto('http://localhost:3000/spider/')

        // Check that undo button is visible
        await expect(page.locator('button:has-text("Undo")')).toBeVisible()

        // Undo button should be disabled initially (no moves made yet)
        await expect(page.locator('button:has-text("Undo")')).toBeDisabled()
    })

    test('should enable undo button after stock pile click in Klondike', async ({
        page,
    }) => {
        await page.goto('http://localhost:3000/klondike/')

        // Initially undo should be disabled
        await expect(page.locator('button:has-text("Undo")')).toBeDisabled()

        // Click stock pile to make a move
        await page.click('div[data-rfd-droppable-id="1"] > div:last-child')

        // Now undo button should be enabled
        await expect(page.locator('button:has-text("Undo")')).toBeEnabled()
    })

    test('should enable undo button after stock pile click in Spider Solitaire', async ({
        page,
    }) => {
        await page.goto('http://localhost:3000/spider/')

        // Initially undo should be disabled
        await expect(page.locator('button:has-text("Undo")')).toBeDisabled()

        // Click stock pile to make a move
        await page.click('div[data-rfd-droppable-id="10"] > div:last-child')

        // Now undo button should be enabled
        await expect(page.locator('button:has-text("Undo")')).toBeEnabled()
    })

    test('should revert move when undo is clicked in Klondike', async ({
        page,
    }) => {
        await page.goto('http://localhost:3000/klondike/')

        // Check initial stock pile count
        await expect(
            page.locator('div[data-rfd-droppable-id="1"] > div')
        ).toHaveCount(25)
        await expect(
            page.locator('div[data-rfd-droppable-id="2"] > div')
        ).toHaveCount(1)
        const initialStockCount = await page
            .locator('div[data-rfd-droppable-id="1"] > div')
            .count()
        const initialWasteCount = await page
            .locator('div[data-rfd-droppable-id="2"] > div')
            .count()

        // Click stock pile to make a move
        await page.click('div[data-rfd-droppable-id="1"] > div:last-child')

        // Verify the move was made
        await expect(
            page.locator('div[data-rfd-droppable-id="1"] > div')
        ).toHaveCount(initialStockCount - 3)
        await expect(
            page.locator('div[data-rfd-droppable-id="2"] > div')
        ).toHaveCount(initialWasteCount + 3)

        // Click undo
        await page.click('button:has-text("Undo")')

        // Verify the move was reverted
        await expect(
            page.locator('div[data-rfd-droppable-id="1"] > div')
        ).toHaveCount(initialStockCount)
        await expect(
            page.locator('div[data-rfd-droppable-id="2"] > div')
        ).toHaveCount(initialWasteCount)

        // Undo button should be disabled again
        await expect(page.locator('button:has-text("Undo")')).toBeDisabled()
    })

    test('should revert move when undo is clicked in Spider Solitaire', async ({
        page,
    }) => {
        await page.goto('http://localhost:3000/spider/')

        // Check initial stock pile count and tableau piles
        await expect(
            page.locator('div[data-rfd-droppable-id="10"] > div')
        ).toHaveCount(52)
        const initialStockCount = await page
            .locator('div[data-rfd-droppable-id="10"] > div')
            .count()

        // Click stock pile to make a move
        await page.click('div[data-rfd-droppable-id="10"] > div:last-child')

        // Verify the move was made (stock pile should have fewer cards)
        await expect(
            page.locator('div[data-rfd-droppable-id="10"] > div')
        ).toHaveCount(initialStockCount - 10)

        // Click undo
        await page.click('button:has-text("Undo")')

        // Verify the move was reverted
        await expect(
            page.locator('div[data-rfd-droppable-id="10"] > div')
        ).toHaveCount(initialStockCount)

        // Undo button should be disabled again
        await expect(page.locator('button:has-text("Undo")')).toBeDisabled()
    })
})
