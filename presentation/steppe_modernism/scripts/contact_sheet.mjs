import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const project = path.resolve(here, "..");
const slidesDir = process.argv[2] ? path.resolve(process.argv[2]) : path.join(project, "slides");
const output = process.argv[3] ? path.resolve(process.argv[3]) : path.join(project, "qa", "contact-sheet.png");
const files = (await fs.readdir(slidesDir)).filter((name) => /^(?:slide|page)-\d+\.png$/.test(name)).sort();

const thumbWidth = 384;
const thumbHeight = 216;
const labelHeight = 34;
const gap = 12;
const cols = 4;
const rows = Math.ceil(files.length / cols);
const width = cols * thumbWidth + (cols + 1) * gap;
const height = rows * (thumbHeight + labelHeight) + (rows + 1) * gap;

const composites = [];
for (let index = 0; index < files.length; index += 1) {
  const col = index % cols;
  const row = Math.floor(index / cols);
  const left = gap + col * (thumbWidth + gap);
  const top = gap + row * (thumbHeight + labelHeight + gap);
  const image = await sharp(path.join(slidesDir, files[index]))
    .resize(thumbWidth, thumbHeight, { fit: "fill" })
    .png()
    .toBuffer();
  const labelText = files[index].replace("slide-", "Слайд ").replace("page-", "Страница ").replace(".png", "");
  const label = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${thumbWidth}" height="${labelHeight}"><rect width="100%" height="100%" fill="#181918"/><text x="12" y="24" font-family="Helvetica Neue,Arial" font-size="18" fill="#f3efe7">${labelText}</text></svg>`);
  composites.push({ input: image, left, top });
  composites.push({ input: label, left, top: top + thumbHeight });
}

await fs.mkdir(path.dirname(output), { recursive: true });
await sharp({ create: { width, height, channels: 3, background: "#c9c4bb" } })
  .composite(composites)
  .png()
  .toFile(output);

console.log(output);
