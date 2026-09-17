import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const project = path.resolve(import.meta.dirname, '..');
const output = path.resolve(project, '../../research_assets/reference_screenshots/sites_crossborder');
const targets = [
  ['DE_falconeri_cashmere_scarf.png', 'https://www.falconeri.com/de/product/kaschmirschal-UZ00056.html'],
  ['NL_falconeri_cashmere_scarf.png', 'https://www.falconeri.com/nl/product/cashmere_scarf-UZ00056.html'],
  ['NL_gobi_country_scarf.png', 'https://www.gobicashmere.com/nl-nl/products/cashmere-jersey-knit-scarf-black'],
  ['PL_falconeri_cashmere_scarves.png', 'https://www.falconeri.com/pl/product/kaszmirowy_szalik-UZ00056.html'],
  ['DK_falconeri_cashmere_scarf.png', 'https://www.falconeri.com/dk/product/cashmere_scarf-UZ00056.html'],
  ['DK_uniqlo_cashmere_scarf.png', 'https://www.uniqlo.com/dk/en/products/E486760-000/00?colorDisplayCode=62'],
  ['BE_uniqlo_cashmere_scarf.png', 'https://www.uniqlo.com/be/en/products/E486760-000/00?colorDisplayCode=62'],
  ['BE_asket_cashmere_wool_scarf.png', 'https://www.asket.com/en-be/cashmere-wool-scarf-grey-melange'],
  ['SE_falconeri_cashmere_scarves.png', 'https://www.falconeri.com/se/product/cashmere_scarf-UZ00056.html'],
  ['SE_uniqlo_cashmere_scarf.png', 'https://www.uniqlo.com/se/en/products/E486760-000/00?colorDisplayCode=62'],
  ['FI_uniqlo_cashmere_scarf.png', 'https://www.uniqlo.com/eu-fi/en/products/E486760-000/00?colorDisplayCode=62'],
];
const requested = new Set(process.argv.slice(2));

await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

for (const [filename, url] of targets) {
  if (requested.size && !requested.has(filename)) continue;
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });
    await page.waitForTimeout(2400);
    for (const label of ['Accept all', 'Accept All', 'Accept all cookies', 'Allow all', 'Reject all', 'Agree and continue', 'Alle akzeptieren', 'Alle Cookies akzeptieren', 'Alles accepteren', 'Akceptuj wszystkie', 'Godkänn alla', 'Hyväksy kaikki', 'Accepter tous']) {
      try { await page.getByRole('button', { name: label, exact: true }).click({ timeout: 250 }); } catch {}
    }
    for (const label of ['ACCEPT ALL COOKIES', 'Accept All Cookies', 'Akceptuj wszystkie pliki cookie', 'Afwijzen', 'Hylkää', 'Reject All']) {
      try { await page.getByRole('button', { name: label, exact: true }).click({ timeout: 250 }); } catch {}
    }
    try { await page.getByRole('button', { name: /YES\. CONTINUE TO UNIQLO/i }).click({ timeout: 1000 }); } catch {}
    try { await page.getByText(/YES\. CONTINUE TO UNIQLO/i).last().click({ timeout: 1000 }); } catch {}
    if (page.url().includes('uniqlo.com')) {
      await page.evaluate(() => {
        const matches = [...document.querySelectorAll('button, a, [role="button"]')];
        matches.find((node) => /YES\.\s*CONTINUE TO UNIQLO/i.test(node.textContent || ''))?.click();
      });
      await page.waitForTimeout(500);
      try { await page.getByRole('button', { name: 'Reject All', exact: true }).click({ timeout: 500 }); } catch {}
    }
    try { await page.getByRole('button', { name: /Accept all cookies|Akceptuj wszystkie pliki cookie|Reject all|Hylkää/i }).first().click({ timeout: 500 }); } catch {}
    await page.waitForTimeout(1200);
    if (page.url().includes('falconeri.com/de/') && (await page.locator('body').innerText()).includes('Alle Cookies akzeptieren')) {
      await page.mouse.click(1320, 831);
      await page.waitForTimeout(500);
    }
    if (page.url().includes('asket.com/en-be/') && (await page.locator('body').innerText()).includes('Stay on Belgium')) {
      try { await page.getByText('Stay on Belgium', { exact: true }).click({ timeout: 1000 }); } catch { await page.mouse.click(1192, 798); }
      await page.waitForTimeout(500);
    }
    if (page.url().includes('uniqlo.com') && (await page.locator('body').innerText()).includes("You're visiting the UNIQLO")) {
      await page.mouse.click(855, 548);
      await page.waitForTimeout(450);
    }
    if (page.url().includes('uniqlo.com') && (await page.locator('body').innerText()).includes('Get help with finding your size.')) {
      await page.mouse.click(1258, 440);
      await page.waitForTimeout(180);
    }
    const clip = filename === 'DK_falconeri_cashmere_scarf.png' || filename === 'SE_falconeri_cashmere_scarves.png'
      ? { x: 0, y: 0, width: 1090, height: 720 }
      : undefined;
    await page.screenshot({ path: path.join(output, filename), type: 'png', ...(clip ? { clip } : {}) });
    console.log(JSON.stringify({ filename, status: response?.status(), title: await page.title(), url: page.url() }));
  } catch (error) {
    console.log(JSON.stringify({ filename, error: String(error).slice(0, 250) }));
  }
}

await browser.close();
