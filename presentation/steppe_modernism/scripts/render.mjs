import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const here = path.dirname(fileURLToPath(import.meta.url));
const project = path.resolve(here, "..");
const htmlPath = process.env.AVDAR_HTML_PATH || path.join(project, "src", "index.html");
const outputDir = process.env.AVDAR_SLIDES_DIR || path.join(project, "slides");
const linkMapPath = process.env.AVDAR_LINK_MAP_PATH || path.join(project, "output", "links.json");
const requested = process.argv[2]
  ? new Set(process.argv[2].split(",").map((value) => Number(value.trim())).filter(Number.isFinite))
  : null;

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(path.dirname(linkMapPath), { recursive: true });
if (!requested) {
  const previousSlides = (await fs.readdir(outputDir)).filter((name) => /^slide-\d+\.png$/.test(name));
  await Promise.all(previousSlides.map((name) => fs.unlink(path.join(outputDir, name))));
}

const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
});
const page = await browser.newPage({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1
});

await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
await page.waitForFunction(() => window.__AVDAR_DECK_READY__ === true);
await page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all([...document.images].map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((resolve) => {
      img.addEventListener("load", resolve, { once: true });
      img.addEventListener("error", resolve, { once: true });
    });
  }));
});

const audit = await page.$$eval(".slide", (nodes) => nodes.map((node, index) => {
  const body = node.querySelector(".slide-body");
  const evidence = node.querySelector(".evidence-line");
  const brokenImages = [...node.querySelectorAll("img")]
    .filter((img) => !img.complete || img.naturalWidth === 0)
    .map((img) => img.getAttribute("src"));
  const bodyRect = body.getBoundingClientRect();
  const evidenceRect = evidence?.getBoundingClientRect();
  const descendants = [...body.querySelectorAll("*")].filter((el) => !el.matches(".cover-shade"));
  const furthestBottom = descendants.reduce((max, el) => {
    let visibleBottom = el.getBoundingClientRect().bottom;
    for (let parent = el.parentElement; parent && parent !== body; parent = parent.parentElement) {
      const style = getComputedStyle(parent);
      if (["hidden", "clip"].includes(style.overflowY)) {
        visibleBottom = Math.min(visibleBottom, parent.getBoundingClientRect().bottom);
      }
    }
    return Math.max(max, visibleBottom);
  }, bodyRect.top);
  return {
    slide: index + 1,
    bodyOverflow: Math.max(0, Math.round(furthestBottom - bodyRect.bottom)),
    evidenceCollision: evidenceRect ? Math.max(0, Math.round(furthestBottom - evidenceRect.top + 12)) : 0,
    brokenImages
  };
}));

const linkMap = await page.$$eval(".slide", (nodes) => nodes.map((node, index) => {
  const slideRect = node.getBoundingClientRect();
  const links = [...node.querySelectorAll("a[href]")].map((anchor) => {
    const rect = anchor.getBoundingClientRect();
    return {
      href: anchor.href,
      label: (anchor.textContent || anchor.querySelector("img")?.alt || "Источник").trim(),
      left: rect.left - slideRect.left,
      top: rect.top - slideRect.top,
      width: rect.width,
      height: rect.height
    };
  }).filter((item) => item.width > 0 && item.height > 0);
  return { slide: index + 1, links };
}));

await fs.writeFile(linkMapPath, `${JSON.stringify(linkMap, null, 2)}\n`, "utf8");

const slides = await page.$$(".slide");
for (let i = 0; i < slides.length; i += 1) {
  const number = i + 1;
  if (requested && !requested.has(number)) continue;
  const filename = `slide-${String(number).padStart(2, "0")}.png`;
  await slides[i].screenshot({ path: path.join(outputDir, filename), type: "png" });
}

await browser.close();

const issues = audit.filter((item) => item.bodyOverflow > 0 || item.evidenceCollision > 0 || item.brokenImages.length > 0);
console.log(JSON.stringify({
  rendered: requested ? [...requested].sort((a, b) => a - b) : slides.length,
  links: linkMap.reduce((sum, item) => sum + item.links.length, 0),
  auditIssues: issues
}, null, 2));
