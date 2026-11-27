import { test, expect } from '@playwright/test';

const API_URL = 'https://api.practicesoftwaretesting.com';

let cartId: string | undefined;

// Cleanup: deletes any cart a test created, even if the test fails
test.afterEach(async ({ request }) => {
  if (cartId) {
    const response = await request.delete(`${API_URL}/carts/${cartId}`);
    expect(response.status()).toBe(204);
    cartId = undefined;
  }
});

// Test one: creates a cart, adds a product, checks the response fields
test('creating a cart and adding a product returns the right fields', async ({ request }) => {
  const productsResponse = await request.get(`${API_URL}/products`);
  const products = await productsResponse.json();
  const productId = products.data[0].id;

  const cartResponse = await request.post(`${API_URL}/carts`);
  expect(cartResponse.status()).toBe(201);
  cartId = (await cartResponse.json()).id;

  const addResponse = await request.post(`${API_URL}/carts/${cartId}`, {
    data: { product_id: productId, quantity: 1 },
  });
  expect(addResponse.status()).toBe(200);
  expect((await addResponse.json()).result).toBe('item added or updated');

  const readResponse = await request.get(`${API_URL}/carts/${cartId}`);
  expect(readResponse.status()).toBe(200);
  const cart = await readResponse.json();
  expect(cart.id).toBe(cartId);
  expect(cart.cart_items[0].product_id).toBe(productId);
  expect(cart.cart_items[0].quantity).toBe(1);
});

// Test two: a cart id that doesn't exist returns 404
test('requesting a cart that does not exist returns 404', async ({ request }) => {
  const response = await request.get(`${API_URL}/carts/does-not-exist-12345`);

  expect(response.status()).toBe(404);
  expect((await response.json()).message).toBe('Requested item not found');
});
