#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");
const { chromium } = require("playwright");

const DEFAULT_PRIORITY_IDS = ["TT12", "TT01", "TT03", "TT02", "TT04", "TT13", "TT15", "TT08"];
const PRIORITY_IDS = new Set(
  (process.env.CAPTURE_IDS || DEFAULT_PRIORITY_IDS.join(","))
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
);
const SOURCE_PATH = path.join(__dirname, "tiktok_sheet_rows.json");
const OUTPUT_DIR = path.join(__dirname, "reference_screenshots/social_priority");
const RESULT_PATH = path.join(OUTPUT_DIR, "tiktok_capture_results.json");
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36";

function formulaUrl(formula) {
  const match = String(formula || "").match(/HYPERLINK\(\"([^\"]+)/i);
  return match ? match[1] : null;
}

function scriptJson(html, scriptId) {
  const pattern = new RegExp(
    `<script[^>]+id=["']${scriptId}["'][^>]*>([\\s\\S]*?)<\\/script>`,
    "i",
  );
  const match = html.match(pattern);
  return match ? JSON.parse(match[1]) : null;
}

function itemStructFromHtml(html) {
  const hydration = scriptJson(html, "__UNIVERSAL_DATA_FOR_REHYDRATION__");
  return hydration?.__DEFAULT_SCOPE__?.["webapp.video-detail"]?.itemInfo?.itemStruct || null;
}

async function fetchMetadata(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": USER_AGENT,
        "accept-language": "en-US,en;q=0.9",
      },
      redirect: "follow",
    });
    const html = await response.text();
    const item = itemStructFromHtml(html);
    if (!item) {
      return {
        ok: false,
        http_status: response.status,
        final_url: response.url,
        error: "TikTok itemStruct is absent from official page HTML",
      };
    }
    const stats = item.statsV2 || item.stats || {};
    return {
      ok: true,
      http_status: response.status,
      final_url: response.url,
      video_id: item.id,
      author: item.author?.uniqueId || item.author?.nickname || null,
      description: item.desc || null,
      created_at: item.createTime
        ? new Date(Number(item.createTime) * 1000).toISOString()
        : null,
      duration_seconds: item.video?.duration ?? null,
      visible_metrics: {
        views: Number(stats.playCount ?? 0),
        likes: Number(stats.diggCount ?? 0),
        comments: Number(stats.commentCount ?? 0),
        shares: Number(stats.shareCount ?? 0),
        saves: Number(stats.collectCount ?? 0),
      },
      is_ad: item.isAd ?? null,
      official_cover_url_seen: item.video?.cover || null,
    };
  } catch (error) {
    return { ok: false, error: String(error) };
  }
}

async function dismissOverlays(page) {
  const dismissed = [];
  const consentControls = [
    page.getByRole("button", { name: /^(accept all|allow all|agree)$/i }),
    page.getByRole("button", { name: /^(разрешить все|принять все)$/i }),
  ];
  for (const locator of consentControls) {
    try {
      const candidate = locator.first();
      if ((await candidate.count()) && (await candidate.isVisible({ timeout: 300 }))) {
        await candidate.click({ timeout: 1500 });
        dismissed.push("cookie consent");
        await page.waitForTimeout(500);
        break;
      }
    } catch (_) {}
  }

  // TikTok frequently replaces a close icon with an explicit “Skip” action.
  // Target that exact visible label only, so we never hit a like/save/share control.
  for (let pass = 0; pass < 2; pass += 1) {
    try {
      const skip = page.getByText(/^(Пропустить|Skip)$/i, { exact: true }).first();
      if ((await skip.count()) && (await skip.isVisible({ timeout: 800 }))) {
        await skip.click({ timeout: 1500 });
        dismissed.push("login prompt via exact Skip label");
        await page.waitForTimeout(400);
        continue;
      }
    } catch (_) {}
    break;
  }
  await page.keyboard.press("Escape").catch(() => {});
  return [...new Set(dismissed)];
}

async function capturePriority(browser, item) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    userAgent: USER_AGENT,
    locale: "ru-RU",
  });
  const outputPath = path.join(OUTPUT_DIR, `${item.id}_${item.slug}_official_embed.png`);
  try {
    const videoId = item.metadata?.video_id;
    const captureUrl =
      `https://www.tiktok.com/player/v1/${videoId}` +
      "?autoplay=0&loop=0&music_info=1&description=1&rel=0&native_context_menu=0";
    await page.goto(captureUrl, { waitUntil: "domcontentloaded", timeout: 45000 });
    // The official player is intentionally left untouched. Dismiss only the
    // cookie layer by its exact wording; never use a generic close selector.
    await page.waitForTimeout(4500);
    const dismissed = [];
    for (const name of [
      /^Decline optional cookies$/i,
      /^Отклонить использование дополнительных файлов cookie$/i,
    ]) {
      try {
        const decline = page.getByRole("button", { name }).first();
        if ((await decline.count()) && (await decline.isVisible({ timeout: 500 }))) {
          await decline.click({ timeout: 1500 });
          dismissed.push("optional cookies declined by exact label");
          break;
        }
      } catch (_) {}
    }
    // The player briefly confirms the cookie choice with a status toast.
    // Wait for that UI acknowledgement to disappear before capture.
    await page.waitForTimeout(4500);
    const bodyText = await page.locator("body").innerText({ timeout: 5000 }).catch(() => "");
    const hasVideoEvidence = /просмотр|views|likes|Нравится|comment|share|репост/i.test(bodyText);
    await page.screenshot({ path: outputPath, fullPage: false, animations: "disabled" });
    return {
      ok: true,
      title: await page.title(),
      final_url: page.url(),
      source_detail_url: item.url,
      dismissed,
      has_visible_metric_text: hasVideoEvidence,
      login_prompt_remaining: /Войдите в TikTok|Log in to TikTok/i.test(bodyText),
      screenshot_path: outputPath,
      screenshot_basis: "official TikTok public player for the same video id; no social interaction or media download",
    };
  } catch (error) {
    return { ok: false, final_url: page.url(), error: String(error) };
  } finally {
    await page.close();
  }
}

async function main() {
  const source = JSON.parse(await fs.readFile(SOURCE_PATH, "utf8"));
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const items = source.rows.map((row) => ({
    id: row[0],
    product_group: row[1],
    account: row[5],
    format_from_sheet: row[6],
    first_frame_from_sheet: row[8],
    url: formulaUrl(row[15]),
    slug: `${row[5]}_${row[1]}`
      .normalize("NFKD")
      .replace(/[^a-zA-Z0-9]+/g, "_")
      .replace(/^_|_$/g, "")
      .toLowerCase(),
  }));

  const metadataRows = [];
  for (const item of items) {
    metadataRows.push({ ...item, metadata: await fetchMetadata(item.url) });
  }

  const browser = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--disable-blink-features=AutomationControlled"],
  });
  for (const item of metadataRows.filter((entry) => PRIORITY_IDS.has(entry.id))) {
    item.capture = await capturePriority(browser, item);
  }
  await browser.close();

  // A filtered refresh must preserve earlier verified captures for the other
  // priority ids instead of silently dropping them from the audit file.
  try {
    const previous = JSON.parse(await fs.readFile(RESULT_PATH, "utf8"));
    const previousById = new Map(previous.rows.map((row) => [row.id, row]));
    for (const item of metadataRows) {
      if (!item.capture && previousById.get(item.id)?.capture) {
        item.capture = previousById.get(item.id).capture;
      }
    }
  } catch (_) {}

  const result = {
    snapshot_date: "2026-09-15",
    source_policy: {
      metrics: "fresh public counters parsed from the official TikTok page hydration payload",
      screenshots: "official detail pages only; no likes, follows, comments, messages or media downloads",
      interpretation: "public engagement is not sales, attributed conversion or ROAS",
    },
    rows: metadataRows,
  };
  await fs.writeFile(RESULT_PATH, JSON.stringify(result, null, 2));
  process.stdout.write(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exit(1);
});
