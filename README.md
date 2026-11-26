# Toolshop test suite

Playwright UI and API tests for practicesoftwaretesting.com.

## Run it in three steps

1. Install: `npm install`, then `npx playwright install chromium`
2. Copy the env file: `cp .env.example .env`
3. Run the tests: `npm test`

## What's in the suite

- `tests/toolshop.spec.ts`: UI tests for the page title, the pliers search and an invalid login
- `tests/search-hammer.spec.ts`: the hammer search (CO-12), written with a page object
- `pages/home-page.ts`: the page object for the Toolshop home page
- `tests/api-products.spec.ts`: API test for GET /products
- `tests/api-cart.spec.ts`: API tests to create a cart and add a product, and to check an unknown cart gives a 404. Any cart a test creates is deleted afterwards, even if the test fails.

The tests use the live Toolshop site, so they need an internet connection. If the API is down, the API tests will fail with a 404 on every path.

# QA Bootcamp – Week 2

Playwright and TypeScript practice for the Toolshop test suite.

## Getting started

```bash
npm install
npx playwright test     # run the Playwright suite
npx tsc --noEmit        # type-check everything under src/
```

## Week 2 – Day 6: TypeScript basics

**`src/ts-basics/`** — one file per topic from the TypeScript video, each runnable on its own: types (`first.ts`), tuples, functions, objects, type aliases, union types and optional chaining.

```bash
npx tsx src/ts-basics/union-types.ts
```

**`src/profile-validator.ts`** — a small validator for Toolshop shopper profiles. `settings` is optional, because the API doesn't always send it, so `isNotified()` returns `false` when either `settings` or `notifications` is missing, instead of crashing. It prints four shoppers covering alerts on, no settings at all, empty settings, and alerts deliberately off.

```bash
npx tsx src/profile-validator.ts
```

Expected output:

```
#101 wanjiku_tools: gets alerts 🔔
#102 otieno_diy: no alerts 🔕
#103 achieng_builds: no alerts 🔕
#104 kamau_pliers: no alerts 🔕
```

`tsconfig.json` sets `moduleDetection: "force"` so each practice file gets its own scope. Without it, the files share one global scope and the `employee` declared in both `objects.ts` and `type-aliases.ts` collides.
