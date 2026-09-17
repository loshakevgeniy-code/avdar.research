import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const project = path.resolve(import.meta.dirname, '..');
const output = path.resolve(project, '../../research_assets/reference_screenshots/sites_priority');
const targets = [
  ['WEB-036_wuth_cashmere_dk_2026-09-16.png', 'https://www.wuthcopenhagen.com/en/products/classic-knitted-cashmere-scarf'],
  ['WEB-037_sukkamestarit_tara_fi_2026-09-16.png', 'https://sukkamestarit.com/en-eu/products/tara-ankle-socks-merino-wool'],
];

await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 1 });
for (const [filename, url] of targets) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2300);
    for (const label of ['Accept all', 'Accept All', 'Afvis', 'Reject all', 'Close']) {
      try { await page.getByText(label, { exact: true }).click({ timeout: 500 }); } catch {}
    }
    await page.evaluate(() => {
      for (const el of document.querySelectorAll('body *')) {
        const box = el.getBoundingClientRect();
        if (getComputedStyle(el).position === 'fixed' && box.width > 300 && box.height > 100) el.remove();
      }
    });
    await page.screenshot({ path: path.join(output, filename), type: 'png' });
    console.log(JSON.stringify({ filename, url, title: await page.title(), status: 'ok' }));
  } catch (error) {
    console.log(JSON.stringify({ filename, url, status: 'error', message: String(error).slice(0, 180) }));
  }
}
await browser.close();
