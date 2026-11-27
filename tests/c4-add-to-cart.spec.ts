import { test, expect } from '@playwright/test';

const API_URL = 'https://api.practicesoftwaretesting.com';

let cartId: string | undefined;

// Cleanup: deletes the cart even if a check in the test fails
test.afterEach(async ({ request }) => {
  if (cartId) {
    const response = await request.delete(`${API_URL}/carts/${cartId}`);
    expect(response.status()).toBe(204);
    cartId = undefined;
  }
});

// C4: create a cart (201), add a product (200), and the cart then contains it
test('C4 Add to a cart', async ({ request }) => {
  const productsResponse = await request.get(`${API_URL}/products`);
  expect(productsResponse.status()).toBe(200);
  const productId = (await productsResponse.json()).data[0].id;

  const cartResponse = await request.post(`${API_URL}/carts`);
  expect(cartResponse.status()).toBe(201);
  cartId = (await cartResponse.json()).id;

  const addResponse = await request.post(`${API_URL}/carts/${cartId}`, {
    data: { product_id: productId, quantity: 1 },
  });
  expect(addResponse.status()).toBe(200);

  const readResponse = await request.get(`${API_URL}/carts/${cartId}`);
  expect(readResponse.status()).toBe(200);
  const cart = await readResponse.json();
  expect(cart.cart_items[0].product_id).toBe(productId);
  expect(cart.cart_items[0].quantity).toBe(1);
});

// C5 (extra check): a cart id that doesn't exist returns 404
test('C5 Unknown cart', async ({ request }) => {
  const response = await request.get(`${API_URL}/carts/does-not-exist-12345`);
  expect(response.status()).toBe(404);
});
