# Solitaire ♣️♦️♠️♥️

Solitaire with drag and drop, and touch support.

-   Some notes about the implementation:
    -   Uses Next.js 14 with app directory
    -   Uses @hello-pangea/dnd for drag and drop
    -   Tailwind for styling
    -   Exports to a static site
    -   Playwright for end-to-end tests

## Deployment 🚚

https://solitaire.samioksanen.fi

## CI/CD 🛠

![Production workflow](https://github.com/SamiOksanen/solitaire/actions/workflows/firebase-hosting-merge.yml/badge.svg)

GitHub Actions CI/CD with deployment to Firebase Hosting

## Development setup

Install:

-   Node.js

### Install dependencies

```bash
npm i
```

### Run the app in development mode

```bash
npm run dev
```

### Run the app in production mode

```bash
npm run build
npm run start
```

### E2E Tests

End-to-end tests are done with Playwright.

To test locally:

-   Download browsers for Playwright to use if you have not already:
    ```bash
    npx playwright install
    ```
-   Make sure your build is up and running on localhost:3000:
    ```bash
    npm run build
    npm run start
    ```
-   Run the tests:

    ```bash
    npm run test:e2e
    ```

-   To create new tests with the help of codegen, make sure your build is up and use:
    ```bash
    npx playwright codegen localhost:3000
    ```
