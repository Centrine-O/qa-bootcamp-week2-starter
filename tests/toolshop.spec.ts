import { test, expect } from '@playwright/test';

const BASE_URL = 'https://practicesoftwaretesting.com';

test('home page has the expected title', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v9.9');
});

test('searching for pliers only returns pliers', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole('textbox', { name: 'Search' }).fill('pliers');
  await page.getByRole('button', { name: 'Search' }).click();

  const productNames = page.getByRole('heading', { level: 5 });

  await expect
    .poll(async () => {
      const names = await productNames.allTextContents();
      return names.length > 0 && names.every((name) => name.toLowerCase().includes('pliers'));
    })
    .toBe(true);
});

test('invalid login shows an error message', async ({ page }) => {
  await page.goto(`${BASE_URL}/auth/login`);

  await page.getByLabel('Email address').fill('nobody@example.com');
  await page.getByRole('textbox', { name: 'Password *' }).fill('WrongPassword123!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid email or password')).toBeVisible();
});
