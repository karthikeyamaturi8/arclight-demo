# Arclight demo (Vite + React + react-router)

Three-page demo site used to try out a "playwright-lite" declarative JSON
test format.

```
src/
  components/Navbar.jsx     nav bar, active-link styling
  components/Footer.jsx
  pages/Home.jsx
  pages/About.jsx
  pages/Contact.jsx         controlled form with validation states
tests/
  playwright-lite.schema.md format reference
  site.spec.json            the actual test suite
scripts/
  run-playwright-lite.mjs   JSON -> Playwright runner
```

## Setup

```bash
npm install
npx playwright install chromium   # one-time browser download
```

## Run the app

```bash
npm run dev
# -> http://localhost:5174
```

## Run the tests (in a second terminal, app must be running)

```bash
npm run test:lite
```

Each JSON test in `tests/site.spec.json` runs in its own browser context
against `[data-testid]` hooks in the components, so page copy can change
without breaking selectors. See `tests/playwright-lite.schema.md` for the
full list of supported step actions (`goto`, `click`, `fill`, `expectText`,
`expectURL`, `expectCount`, etc.) and how to add new tests.
