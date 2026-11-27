import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'url';
import path from 'path';

const pageUrl = pathToFileURL(path.join(__dirname, 'index.html')).href;

// Fixed: waits for the message to appear instead of guessing a time
test('Save shows "Saved" message', async ({ page }) => {
  await page.goto(pageUrl);
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText('Saved')).toBeVisible();
});
