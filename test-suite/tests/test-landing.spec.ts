import { test, expect } from "@playwright/test"

test('Test Landing Page', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page.getByRole('button', { name: "Start Learning..." })).toBeVisible();
    await expect(page.getByPlaceholder('Type away...')).toBeVisible();
})


test('Check empty prompt being sent to Gemini', async({ page }) => {
    await page.goto('http://localhost:5173');
    await page.getByRole('button', { name: 'Start learning...' }).click()
    await expect(page.url()).toContain('/learning')
    await expect(page.getByRole('textbox'))
})