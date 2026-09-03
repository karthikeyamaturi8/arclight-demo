# playwright-lite JSON test format

A minimal declarative format for driving Playwright from a JSON file instead
of writing `.spec.js` files by hand. One JSON file = one suite.

```json
{
  "baseUrl": "http://localhost:5174",
  "tests": [
    {
      "name": "human readable test name",
      "steps": [
        { "action": "goto", "path": "/" }
      ]
    }
  ]
}
```

## Top-level fields

| field     | type   | required | description                                  |
|-----------|--------|----------|-----------------------------------------------|
| `baseUrl` | string | no       | Prefixed to any `path` used in a step. Can be overridden with `--base-url` on the CLI or the `BASE_URL` env var. |
| `tests`   | array  | yes      | List of test objects, run in order.          |

## Test object

| field   | type   | required | description                          |
|---------|--------|----------|---------------------------------------|
| `name`  | string | yes      | Shown in the console report.          |
| `steps` | array  | yes      | Step objects, run in order, in a fresh browser context per test. |

## Step actions

Every step has an `"action"` field. Supported actions:

| action         | fields                          | what it does |
|----------------|----------------------------------|--------------|
| `goto`         | `path` (or `url`)                | Navigates to `baseUrl + path`, or `url` directly. |
| `click`        | `selector`                       | Clicks the first element matching the selector. |
| `fill`         | `selector`, `value`              | Fills an input/textarea. |
| `press`        | `selector`, `key`                | Presses a keyboard key while the selector is focused. |
| `hover`        | `selector`                       | Hovers over an element. |
| `expectText`   | `selector`, `text`               | Asserts the element's text **contains** `text`. |
| `expectVisible`| `selector`                       | Asserts the element is visible. |
| `expectHidden` | `selector`                       | Asserts the element is not visible / not present. |
| `expectURL`    | `path` (or `url`)                | Asserts the current page URL matches. |
| `expectCount`  | `selector`, `count`              | Asserts the number of matching elements equals `count`. |
| `waitFor`      | `selector`, `state` (optional, default `visible`) | Waits for an element to reach a state (`visible`, `hidden`, `attached`, `detached`). |
| `screenshot`   | `path`                           | Saves a screenshot to the given file path. |

Selectors are plain Playwright/CSS selectors — `data-testid` attributes in
the demo components (`[data-testid="page-home"]`, `text=About`, etc.) are the
recommended way to target elements so tests don't break when copy changes.

## Running it

```bash
npm install
npm run dev            # serves the app on http://localhost:5173
npm run test:lite      # in a second terminal, runs tests/site.spec.json
```

The runner is `scripts/run-playwright-lite.mjs`. It requires the `playwright`
package (already in `devDependencies`) and its Chromium browser binary
(`npx playwright install chromium`, one-time setup, needs network access to
download the browser).
