import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const root = path.resolve(import.meta.dirname, '../../..');
const out = path.join(root, 'research_assets/reference_screenshots/sites_priority');
const targets = [
  ['WEB-031_roeckl_cashmere_de_2026-09-16.png', 'https://roeckl.com/de/business-cashmere-schal-30x180-black'],
  ['WEB-032_carebyme_throw_dk_2026-09-16.png', 'https://carebyme.dk/products/susan-throw'],
  ['WEB-033_lapuan_blanket_fi_2026-09-16.png', 'https://lapuankankurit.fi/shop/wool-blankets-cushion-covers/camp-wool-blanket-black-light-grey-150-x-200-cm/'],
];

await fs.mkdir(out, {recursive:true});
const browser = await chromium.launch({headless:true, executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page = await browser.newPage({viewport:{width:1440,height:950},deviceScaleFactor:1});
for (const [name,url] of targets) {
  try {
    await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
    await page.waitForTimeout(2200);
    for (const label of ['Alle Cookies ablehnen','Afvis']) {
      try { await page.getByText(label,{exact:true}).click({timeout:1200}); } catch {}
    }
    await page.waitForTimeout(700);
    await page.evaluate(() => {
      for (const el of document.querySelectorAll('body *')) {
        const rect = el.getBoundingClientRect();
        if (getComputedStyle(el).position === 'fixed' && rect.width > 300 && rect.height > 100) el.remove();
      }
    });
    await page.screenshot({path:path.join(out,name),type:'png'});
    console.log(JSON.stringify({name,url,title:await page.title(),status:'ok'}));
  } catch(e) {console.log(JSON.stringify({name,url,status:'error',message:String(e).slice(0,250)}));}
}
await browser.close();
