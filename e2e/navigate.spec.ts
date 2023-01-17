import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        console.log(`Running ${testInfo.title}`);
        await page.goto('http://localhost:3000/');
    });

    test('should navigate to the klondike page', async ({ page }) => {
        await page.click('text=Klondike solitaire');
        await expect(page).toHaveURL('http://localhost:3000/klondike/');
        await expect(
            page.locator('div[data-rbd-droppable-id="7"]')
        ).toBeVisible();
    });
});
