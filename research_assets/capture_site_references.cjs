#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");
const { chromium, devices } = require("playwright");

const OVERLAY_ACTIONS = [
  // Keep the existing Europe/EUR storefront when a geo prompt appears.
  { label: "No, stay in Europe / EUR", pattern: /^no,?\s*stay in europe\s*\/\s*eur$/i },
  // Exact labels seen on the priority sites.
  { label: "Tillad alle", pattern: /^tillad alle$/i },
  { label: "OK", pattern: /^ok$/i },
  { label: "Accept", pattern: /^accept$/i },
  { label: "Acceptera alla cookies", pattern: /^acceptera alla cookies$/i },
  // Klaviyo newsletter interstitials appear several seconds after consent.
  { label: "Close dialog", pattern: /^close dialog$/i },
  { label: "Ellers tak", pattern: /^ellers tak$/i },
  // Common consent variants used by the rest of the manifest.
  { label: "Accept all", pattern: /^accept all$/i },
  { label: "Accept all cookies", pattern: /^accept all cookies$/i },
  { label: "Accept cookies", pattern: /^accept cookies$/i },
  { label: "Allow all", pattern: /^allow all$/i },
  { label: "Agree", pattern: /^agree$/i },
  { label: "Alle akzeptieren", pattern: /^alle akzeptieren$/i },
  { label: "Akzeptieren", pattern: /^akzeptieren$/i },
  { label: "Accepteren", pattern: /^accepteren$/i },
  { label: "Alles toestaan", pattern: /^alles toestaan$/i },
  { label: "Accepter alle", pattern: /^accepter alle$/i },
  { label: "Acceptera alla", pattern: /^acceptera alla$/i },
  { label: "Acceptér alle", pattern: /^acceptér alle$/i },
  { label: "Godkänn alla", pattern: /^godkänn alla$/i },
  { label: "Akceptuj wszystkie", pattern: /^akceptuj wszystkie$/i },
  { label: "Hyväksy kaikki", pattern: /^hyväksy kaikki$/i },
];

async function clickVisibleControl(root, pattern) {
  const locators = [
    root.getByRole("button", { name: pattern }),
    root.getByRole("link", { name: pattern }),
    root.locator("button, [role='button'], a").filter({ hasText: pattern }),
  ];

  // Inputs expose their label through value rather than text; role lookup above
  // normally catches them, with an explicit value fallback below.
  for (const locator of locators) {
    const count = Math.min(await locator.count().catch(() => 0), 8);
    for (let index = 0; index < count; index += 1) {
      const control = locator.nth(index);
      try {
        if (await control.isVisible({ timeout: 350 })) {
          await control.click({ timeout: 2500 });
          return true;
        }
      } catch (_) {}
    }
  }

  const inputs = root.locator("input[type='button'], input[type='submit']");
  const inputCount = Math.min(await inputs.count().catch(() => 0), 8);
  for (let index = 0; index < inputCount; index += 1) {
    const control = inputs.nth(index);
    try {
      const value = (await control.getAttribute("value")) || "";
      if (pattern.test(value.trim()) && (await control.isVisible({ timeout: 350 }))) {
        await control.click({ timeout: 2500 });
        return true;
      }
    } catch (_) {}
  }
  return false;
}

async function dismissVisibleOverlays(page) {
  const dismissed = [];
  // Some sites show a cookie layer and then a region layer (or vice versa).
  for (let pass = 0; pass < 4; pass += 1) {
    let clicked = false;
    for (const action of OVERLAY_ACTIONS) {
      const roots = [page, ...page.frames().filter((frame) => frame !== page.mainFrame())];
      for (const root of roots) {
        if (await clickVisibleControl(root, action.pattern)) {
          dismissed.push(action.label);
          clicked = true;
          await page.waitForTimeout(600);
          break;
        }
      }
      if (clicked) break;
    }
    if (!clicked) break;
  }
  return dismissed;
}

async function watchForLateOverlays(page, timeoutMs = 8000) {
  const dismissed = [];
  const deadline = Date.now() + timeoutMs;
  let closedInterstitial = false;
  let quietPassesAfterClose = 0;
  while (Date.now() < deadline) {
    await page.waitForTimeout(500);
    const pass = await dismissVisibleOverlays(page);
    dismissed.push(...pass);
    if (pass.some((label) => label === "Close dialog" || label === "Ellers tak")) {
      closedInterstitial = true;
      quietPassesAfterClose = 0;
    } else if (closedInterstitial) {
      quietPassesAfterClose += 1;
      if (quietPassesAfterClose >= 2) break;
    }
  }
  return dismissed;
}

async function capture(context, item, outDir, suffix) {
  const page = await context.newPage();
  try {
    await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(1500);
    const dismissed = await dismissVisibleOverlays(page);
    // Poll instead of waiting for network-idle: ecommerce trackers may never idle,
    // while Klaviyo and geo layers can appear several seconds after DOMContentLoaded.
    dismissed.push(...(await watchForLateOverlays(page)));
    // Les Soeurs opens a separate, unlabelled newsletter modal after cookie consent.
    // Its visible close icon is at the upper-right of the modal on the mobile viewport.
    if (item.id === "WEB-033" && page.viewportSize()?.width <= 430) {
      await page.mouse.click(353, 136).catch(() => {});
      await page.waitForTimeout(500);
    }
    await page.evaluate(() => document.fonts?.ready).catch(() => {});
    const topPath = path.join(outDir, `${item.id}_${item.slug}_${suffix}_top.png`);
    const fullPath = path.join(outDir, `${item.id}_${item.slug}_${suffix}_full.png`);
    await page.screenshot({ path: topPath, fullPage: false, animations: "disabled" });
    await page.screenshot({ path: fullPath, fullPage: true, animations: "disabled" });
    return {
      ok: true,
      title: await page.title(),
      finalUrl: page.url(),
      dismissed: [...new Set(dismissed)],
      topPath,
      fullPath,
    };
  } catch (error) {
    return { ok: false, error: String(error), finalUrl: page.url() };
  } finally {
    await page.close();
  }
}

async function main() {
  const manifestPath = process.argv[2];
  const outDir = process.argv[3];
  const requestedIds = process.argv[4]
    ? new Set(process.argv[4].split(",").map((value) => value.trim()).filter(Boolean))
    : null;
  if (!manifestPath || !outDir) {
    throw new Error(
      "Usage: capture_site_references.cjs <manifest.json> <output-dir> [WEB-001,WEB-002]"
    );
  }

  const items = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  const selectedItems = requestedIds ? items.filter((item) => requestedIds.has(item.id)) : items;
  if (requestedIds) {
    const foundIds = new Set(selectedItems.map((item) => item.id));
    const missingIds = [...requestedIds].filter((id) => !foundIds.has(id));
    if (missingIds.length) throw new Error(`Unknown manifest IDs: ${missingIds.join(", ")}`);
  }
  await fs.mkdir(outDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath:
      process.env.CHROME_EXECUTABLE ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--disable-blink-features=AutomationControlled"],
  });
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const mobile = await browser.newContext({ ...devices["iPhone 13"] });
  const results = [];

  for (const item of selectedItems) {
    const desktopResult = await capture(desktop, item, outDir, "desktop");
    const mobileResult = await capture(mobile, item, outDir, "mobile");
    results.push({ ...item, desktop: desktopResult, mobile: mobileResult });
  }

  await desktop.close();
  await mobile.close();
  await browser.close();
  const resultsPath = path.join(outDir, "capture_results.json");
  let savedResults = results;
  if (requestedIds) {
    let previousResults = [];
    try {
      previousResults = JSON.parse(await fs.readFile(resultsPath, "utf8"));
    } catch (_) {}
    const refreshedById = new Map(results.map((result) => [result.id, result]));
    const previousById = new Map(previousResults.map((result) => [result.id, result]));
    savedResults = items
      .map((item) => refreshedById.get(item.id) || previousById.get(item.id))
      .filter(Boolean);
  }
  await fs.writeFile(resultsPath, JSON.stringify(savedResults, null, 2));
  process.stdout.write(JSON.stringify(results, null, 2));
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exit(1);
});
