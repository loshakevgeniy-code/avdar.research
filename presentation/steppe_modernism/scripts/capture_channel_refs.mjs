import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const project = path.resolve(import.meta.dirname, '..');
const output = path.resolve(project, '../../research_assets/reference_screenshots/channels_v16');
const targets = [
  ['DE_breuninger_cashmere.png', 'https://www.breuninger.com/de/damen/accessoires/schals-tuecher-schals/?material=kaschmir'],
  ['NL_hema_wool_socks.png', 'https://www.hema.nl/dames/beenmode/sokken/wol'],
  ['PL_modivo_cashmere.png', 'https://modivo.pl/c/kaszmirowy-szalik'],
  ['DK_illum_cashmere.png', 'https://shop.illum.dk/products/cashmerebyillum_scarf'],
  ['BE_juttu_wool_scarf.png', 'https://www.juttu.be/nl/p/selected-sjaal-tope-wool-A12JCA0031.html'],
  ['SE_ahlens_cashmere.png', 'https://www.ahlens.se/produkter/herr/halsduk-i-kashmir-hilmer-f5df5a39-4140-45c8-8403-b126cd752d56'],
  ['FI_stockmann_cashmere.png', 'https://www.stockmann.com/balmuir-helsinki-kashmirhuivi/15650379039.html'],
];
const requested = new Set(process.argv.slice(2));

await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
for (const [filename, url] of targets) {
  if (requested.size && !requested.has(filename)) continue;
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 1, locale: 'en-US' });
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
    await page.waitForTimeout(2400);
    const labels = [
      /accept all/i, /accept cookies/i, /alle akzeptieren/i, /alles accepteren/i,
      /akceptuj wszystkie/i, /accepter tout/i, /accepter et continuer/i,
      /godkänn alla/i, /hyväksy kaikki/i, /tillad alle/i,
      /ich stimme zu/i, /acceptera alla cookies/i, /endast nödvändiga cookies/i,
      /weigeren/i,
    ];
    for (const label of labels) {
      try { await page.getByRole('button', { name: label }).first().click({ timeout: 350 }); } catch {}
    }
    if (filename === 'NL_hema_wool_socks.png' && (await page.locator('body').innerText()).includes('zo te zien ben je in Duitsland')) {
      await page.mouse.click(855, 217);
    }
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(output, filename), type: 'png', animations: 'disabled' });
    console.log(JSON.stringify({ filename, status: response?.status(), title: await page.title(), url: page.url() }));
  } catch (error) {
    console.log(JSON.stringify({ filename, error: String(error).slice(0, 220) }));
  } finally {
    await page.close();
  }
}
await browser.close();
