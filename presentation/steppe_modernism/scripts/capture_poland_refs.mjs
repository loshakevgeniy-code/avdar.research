import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const project = path.resolve(import.meta.dirname, '..');
const output = path.resolve(project, '../../research_assets/reference_screenshots/sites_priority');
const targets = [
  ['WEB-038_wolczanka_cashmere_pl_2026-09-17.png', 'https://wolczanka.pl/kremowy-szal-w%C3%B3lczanka-57540-1'],
  ['WEB-039_patrizia_cashmere_pl_2026-09-17.png', 'https://patrizia.aryton.pl/p/26186-szal-z-kaszmiru.html'],
  ['WEB-041_mongolian_cashmere_pl_2026-09-17.png', 'https://mongolian.pl/mezczyzna/dodatki-zimowe/szalik-z-kaszmiru-100-468'],
];

await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 950 },
  deviceScaleFactor: 1,
  locale: 'pl-PL',
});

for (const [filename, url] of targets) {
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });
    await page.waitForTimeout(3500);
    for (const label of ['Akceptuję', 'Akceptuj', 'Akceptuj wszystkie', 'Zgadzam się', 'Odrzuć', 'Odrzuć wszystkie', 'Accept all', 'Reject all']) {
      try { await page.getByRole('button', { name: label, exact: true }).click({ timeout: 350 }); } catch {}
    }
    await page.screenshot({ path: path.join(output, filename), type: 'png' });
    console.log(JSON.stringify({ filename, url, status: response?.status(), title: await page.title() }));
  } catch (error) {
    console.log(JSON.stringify({ filename, url, error: String(error).slice(0, 220) }));
  }
}

await browser.close();
