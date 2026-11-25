import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';

test('CO-12: searching for "hammer" only shows products with hammer in the name', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.searchFor('hammer');

  await expect.poll(() => homePage.allProductNamesContain('hammer')).toBe(true);
});
