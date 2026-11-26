import { test, expect } from '@playwright/test';

const API_URL = 'https://api.practicesoftwaretesting.com';

test('GET /products returns 200 and a product total', async ({ request }) => {
  const response = await request.get(`${API_URL}/products`);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.total).toBeGreaterThan(0);
});
