import { test, expect } from '@playwright/test';

test('should navigate to the klondike page', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.click('text=Klondike solitaire');
    await expect(page).toHaveURL('http://localhost:3000/klondike/');
    await expect(page.locator('div[data-rbd-droppable-id="7"]')).toBeVisible();
    await expect(
        page.locator('div[data-rbd-droppable-id="7"] > div')
    ).toHaveCount(2);
    await expect(page.locator('div[data-rbd-droppable-id="13"]')).toBeVisible();
    await expect(
        page.locator('div[data-rbd-droppable-id="13"] > div')
    ).toHaveCount(8);
});
