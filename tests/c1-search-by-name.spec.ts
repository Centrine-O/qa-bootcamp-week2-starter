import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';

// C1: searching for "pliers" shows only products with "pliers" in the name
test('C1 Search by name', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.searchFor('pliers');

  await expect.poll(() => homePage.allProductNamesContain('pliers'), { timeout: 15_000 }).toBe(true);
});
