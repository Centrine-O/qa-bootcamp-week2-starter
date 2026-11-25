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
