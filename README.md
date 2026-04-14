# TodoItemCard

Two versions of the same Todo Item Card live in this repository:
- a basic static version for quick browser viewing
- a test-enabled version with Vite, Vitest, and Cypress

This setup lets you keep a simple HTML/CSS/JS card while also maintaining a modern testing workflow for quality checks.

## Project Structure

- `TodoItemCard/`
  - Basic static files: `index.html`, `style.css`, `script.js`
  - Quickest way to view: open `index.html` directly in your browser
- `TodoItemCard_With_Tests/`
  - Same card behavior, organized for local dev and testing
  - Uses Vite dev server + Vitest unit tests + Cypress E2E tests

## Run Locally

### 1) Basic static version (`TodoItemCard`)

No install required. Open `index.html` in your browser.

### 2) Test-enabled version (`TodoItemCard_With_Tests`)

From inside `TodoItemCard_With_Tests`:

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Run Tests (`TodoItemCard_With_Tests`)

From inside `TodoItemCard_With_Tests`:

- Unit tests (Vitest, watch mode):

```bash
npm run test
```

- Unit tests (single run):

```bash
npm run test:run
```

- Cypress interactive mode:

```bash
npm run cypress:open
```

- Cypress headless mode (requires dev server running):

```bash
npm run cypress:run
```

- One-command E2E CI flow (starts server and runs Cypress):

```bash
npm run cypress:ci
```

## Decisions Made

- **Vanilla UI first:** The card is built with semantic HTML, CSS, and plain JS to keep the component easy to inspect and framework-independent.
- **Two-folder approach:** A basic folder keeps the quick static version; `TodoItemCard_With_Tests` adds tooling and tests without forcing that complexity into the basic version.
- **Testability via module split:** The test-enabled version separates pure date/time logic from DOM wiring so logic can be unit-tested reliably.
- **Stable test selectors:** Required `data-testid` attributes are kept explicit to support predictable automated tests.
- **Accessibility-aware updates:** Time hint updates and semantic elements improve clarity and assistive-tech friendliness.

## Trade-offs

- **Direct file open vs dev server:** Opening `index.html` directly is simple, but module behavior is most reliable when served through Vite (`npm run dev`).
- **More tooling in tested folder:** Better reliability and automation come with extra setup (`npm install`, config files, test runners).
- **Fast unit tests vs realistic browser tests:** Vitest is quick for logic checks; Cypress is slower but validates real browser behavior and interactions.

## Deployment

`TodoItemCard_With_Tests` will be deployed on Vercel.

Vercel URL: `<add-after-deploy>`
