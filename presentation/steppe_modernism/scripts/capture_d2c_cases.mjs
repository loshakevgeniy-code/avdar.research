import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = path.dirname(fileURLToPath(import.meta.url));
const project = path.resolve(here, '../../..');
const output = path.join(project, 'research_assets/reference_screenshots/d2c_cases');
const cases = [
  {
    name: 'quince_cashmere_site.png',
    url: 'https://www.quince.com/women/cashmere/cashmere-crewneck-sweater?color=heather-grey',
  },
  {
    name: 'soxs_wool_socks_site.png',
    url: 'https://soxs.co/de/',
  },
];

await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
});

for (const item of cases) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    locale: 'en-US',
  });
  try {
    const response = await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(3500);
    if (item.name.startsWith('soxs_')) {
      await page.getByRole('button', { name: 'Deny' }).click({ timeout: 3000 }).catch(() => {});
      await page.waitForTimeout(700);
    }
    const file = path.join(output, item.name);
    await page.screenshot({ path: file, fullPage: false });
    console.log(JSON.stringify({ name: item.name, status: response?.status(), title: await page.title(), url: page.url(), file }));
  } catch (error) {
    console.error(JSON.stringify({ name: item.name, error: String(error) }));
  } finally {
    await page.close();
  }
}

await browser.close();
