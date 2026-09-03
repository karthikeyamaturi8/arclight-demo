#!/usr/bin/env node
// playwright-lite runner: executes a declarative JSON test spec with Playwright.
// Usage: node scripts/run-playwright-lite.mjs tests/site.spec.json [--headed] [--base-url http://localhost:5173]

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

function parseArgs(argv) {
  const args = { specPath: null, headed: false, baseUrl: null }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--headed') args.headed = true
    else if (a === '--base-url') args.baseUrl = argv[++i]
    else if (!args.specPath) args.specPath = a
  }
  return args
}

function resolveUrl(baseUrl, step) {
  if (step.url) return step.url
  if (!baseUrl) throw new Error(`step needs "url" or a top-level "baseUrl" to resolve "path": ${step.path}`)
  return baseUrl.replace(/\/$/, '') + (step.path ?? '')
}

async function runStep(page, baseUrl, step) {
  switch (step.action) {
    case 'goto':
      await page.goto(resolveUrl(baseUrl, step))
      return

    case 'click':
      await page.locator(step.selector).first().click()
      return

    case 'fill':
      await page.locator(step.selector).first().fill(step.value ?? '')
      return

    case 'press':
      await page.locator(step.selector).first().press(step.key)
      return

    case 'hover':
      await page.locator(step.selector).first().hover()
      return

    case 'expectText': {
      const text = (await page.locator(step.selector).first().innerText()).trim()
      if (!text.includes(step.text)) {
        throw new Error(`expectText: "${step.selector}" was "${text}", expected to contain "${step.text}"`)
      }
      return
    }

    case 'expectVisible': {
      const visible = await page.locator(step.selector).first().isVisible()
      if (!visible) throw new Error(`expectVisible: "${step.selector}" is not visible`)
      return
    }

    case 'expectHidden': {
      const count = await page.locator(step.selector).count()
      const visible = count > 0 && (await page.locator(step.selector).first().isVisible())
      if (visible) throw new Error(`expectHidden: "${step.selector}" is visible`)
      return
    }

    case 'expectURL': {
      const current = new URL(page.url())
      const expected = step.url ?? step.path
      const actual = step.url ? current.href : current.pathname
      if (actual !== expected) {
        throw new Error(`expectURL: current is "${actual}", expected "${expected}"`)
      }
      return
    }

    case 'expectCount': {
      const count = await page.locator(step.selector).count()
      if (count !== step.count) {
        throw new Error(`expectCount: "${step.selector}" found ${count}, expected ${step.count}`)
      }
      return
    }

    case 'waitFor':
      await page.locator(step.selector).first().waitFor({ state: step.state ?? 'visible' })
      return

    case 'screenshot':
      await page.screenshot({ path: step.path })
      return

    default:
      throw new Error(`unknown action "${step.action}"`)
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!args.specPath) {
    console.error('Usage: node scripts/run-playwright-lite.mjs <spec.json> [--headed] [--base-url <url>]')
    process.exit(1)
  }

  const raw = await readFile(path.resolve(args.specPath), 'utf-8')
  const spec = JSON.parse(raw)
  const baseUrl = args.baseUrl ?? process.env.BASE_URL ?? spec.baseUrl ?? null

  const browser = await chromium.launch({ headless: !args.headed })
  let passed = 0
  let failed = 0
  const failures = []

  for (const test of spec.tests) {
    const context = await browser.newContext()
    const page = await context.newPage()
    try {
      for (const [i, step] of test.steps.entries()) {
        try {
          await runStep(page, baseUrl, step)
        } catch (err) {
          err.stepIndex = i
          throw err
        }
      }
      console.log(`  \u2713 ${test.name}`)
      passed++
    } catch (err) {
      console.log(`  \u2717 ${test.name}`)
      console.log(`      step ${err.stepIndex ?? '?'}: ${err.message}`)
      failed++
      failures.push({ test: test.name, message: err.message })
    } finally {
      await context.close()
    }
  }

  await browser.close()

  console.log('')
  console.log(`${passed} passed, ${failed} failed (${spec.tests.length} total)`)
  if (failed > 0) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
