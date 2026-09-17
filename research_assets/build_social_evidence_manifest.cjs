#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");

const ROOT = __dirname;
const SCREENSHOT_DIR = path.join(ROOT, "reference_screenshots/social_priority");
const OUTPUT_PATH = path.join(ROOT, "social_evidence_manifest.json");

function formulaUrl(formula) {
  const match = String(formula || "").match(/HYPERLINK\(\"([^\"]+)/i);
  return match ? match[1] : null;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (_) {
    return false;
  }
}

async function checkOfficialUrl(url) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36",
      },
    });
    await response.body?.cancel().catch(() => {});
    return {
      reachable: response.ok,
      http_status: response.status,
      final_url: response.url,
    };
  } catch (error) {
    return { reachable: false, error: String(error) };
  }
}

async function mapWithConcurrency(items, limit, mapper) {
  const output = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      output[index] = await mapper(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return output;
}

function sheetRecord(row) {
  return {
    id: row[0],
    product_group: row[1],
    product_or_sku: row[2],
    market: row[3],
    platform: row[4],
    brand_or_account: row[5],
    format: row[6],
    why_selected: row[7],
    first_screen_or_two_seconds: row[8],
    visual_device: row[9],
    proof_or_trust: row[10],
    cta_and_path: row[11],
    visible_metrics_sheet_snapshot: row[12],
    evidence_status: row[13],
    applicable_to_avdar: row[14],
    direct_url: formulaUrl(row[15]),
    source_snapshot_date: row[20],
    rights_and_limitations: row[21],
  };
}

function parseSheetMetricText(text) {
  const patterns = {
    views: /([\d\s]+)\s*просмотр/i,
    likes: /([\d\s]+)\s*отмет/i,
    comments: /([\d\s]+)\s*комментар/i,
    shares: /([\d\s]+)\s*репост/i,
    saves: /([\d\s]+)\s*сохран/i,
  };
  const result = {};
  for (const [key, pattern] of Object.entries(patterns)) {
    const match = String(text || "").match(pattern);
    if (match) result[key] = Number(match[1].replace(/\s/g, ""));
  }
  return result;
}

function publicRates(metrics) {
  const views = Number(metrics?.views || 0);
  if (!views) return null;
  const pct = (value) => Number(((Number(value || 0) / views) * 100).toFixed(3));
  return {
    like_rate_pct: pct(metrics.likes),
    comment_rate_pct: pct(metrics.comments),
    share_rate_pct: pct(metrics.shares),
    save_rate_pct: pct(metrics.saves),
    visible_interaction_rate_pct: pct(
      Number(metrics.likes || 0) +
        Number(metrics.comments || 0) +
        Number(metrics.shares || 0) +
        Number(metrics.saves || 0),
    ),
  };
}

function instagramScreenshotNames(id) {
  const names = {
    "IG-001": ["IG-001_gobi_thehu_origin_desktop.png", "IG-001_gobi_thehu_origin_post_crop.png"],
    "IG-003": ["IG-003_purschoen_cashmere_scarf_desktop.png", "IG-003_purschoen_cashmere_scarf_post_crop.png"],
    "IG-005": ["IG-005_nordic_socks_gift_carousel_desktop.png", "IG-005_nordic_socks_gift_carousel_post_crop.png"],
    "IG-007": ["IG-007_uldplaiden_education_reel_desktop.png", "IG-007_uldplaiden_education_reel_post_crop.png"],
    "IG-008": ["IG-008_mongolian_bts_reel_desktop.png", "IG-008_mongolian_bts_reel_post_crop.png"],
    "IG-010": ["IG-010_balmuir_throw_desktop.png", "IG-010_balmuir_throw_post_crop.png"],
    "IG-012": ["IG-012_roeckl_cross_sell_reel_desktop.png", "IG-012_roeckl_cross_sell_reel_post_crop.png"],
    "IG-015": ["IG-015_maerz_yak_material_carousel_desktop.png", "IG-015_maerz_yak_material_carousel_post_crop.png"],
  };
  return names[id] || [];
}

function instagramUiConfirmation(id) {
  const confirmations = {
    "IG-001": "Fresh logged-in page: first frame visible; 10 comments and 18 reposts visible; like/view counts hidden on this surface.",
    "IG-003": "Fresh logged-in page: first frame visible; 2 comments visible; total likes/views hidden on this surface.",
    "IG-005": "Fresh logged-in page: gift carousel first card visible; 1 comment visible; total likes hidden on this surface.",
    "IG-007": "Fresh logged-in page: educational Reel first frame visible; page states there are no comments; total likes/views hidden.",
    "IG-008": "Fresh logged-in page: BTS first frame visible; 1 comment visible; total likes/views hidden on this surface.",
    "IG-010": "Fresh logged-in page: throw carousel first card visible; 1 comment visible; total likes hidden on this surface.",
    "IG-012": "Fresh logged-in page: cross-sell Reel first frame visible; 1 repost visible; total likes/views hidden on this surface.",
    "IG-015": "Fresh logged-in page: yak-material carousel first card and the claim ‘SOFTER THAN CASHMERE’ visible; 1 comment visible; total likes hidden.",
  };
  return confirmations[id] || null;
}

async function main() {
  const [instagramSource, tiktokSource, tiktokCapture] = await Promise.all([
    fs.readFile(path.join(ROOT, "instagram_sheet_rows.json"), "utf8").then(JSON.parse),
    fs.readFile(path.join(ROOT, "tiktok_sheet_rows.json"), "utf8").then(JSON.parse),
    fs.readFile(path.join(SCREENSHOT_DIR, "tiktok_capture_results.json"), "utf8").then(JSON.parse),
  ]);

  const instagramBase = instagramSource.values.map(sheetRecord);
  const instagram = await mapWithConcurrency(instagramBase, 4, async (record) => {
    const screenshotCandidates = instagramScreenshotNames(record.id).map((name) =>
      path.join(SCREENSHOT_DIR, name),
    );
    const screenshots = [];
    for (const candidate of screenshotCandidates) {
      if (await fileExists(candidate)) screenshots.push(candidate);
    }
    return {
      ...record,
      url_verification: await checkOfficialUrl(record.direct_url),
      fresh_capture: screenshots.length
        ? {
            status: "captured from the logged-in official Instagram page",
            screenshot_paths: screenshots,
            current_visible_ui_confirmation: instagramUiConfirmation(record.id),
            interaction_policy: "read-only navigation; no likes, follows, comments, saves or messages",
          }
        : {
            status: "not captured in this priority pass",
            screenshot_paths: [],
          },
    };
  });

  const captureById = new Map(tiktokCapture.rows.map((record) => [record.id, record]));
  const tiktok = [];
  for (const row of tiktokSource.rows) {
    const sheet = sheetRecord(row);
    const fresh = captureById.get(sheet.id) || {};
    const freshMetrics = fresh.metadata?.visible_metrics || null;
    const sheetMetrics = parseSheetMetricText(sheet.visible_metrics_sheet_snapshot);
    const metricDelta = {};
    if (freshMetrics) {
      for (const [key, oldValue] of Object.entries(sheetMetrics)) {
        const newValue = freshMetrics[key];
        if (newValue != null && newValue !== oldValue) {
          metricDelta[key] = { sheet_snapshot: oldValue, fresh: newValue, delta: newValue - oldValue };
        }
      }
    }
    const screenshotPath = fresh.capture?.screenshot_path || null;
    const screenshotExists = screenshotPath ? await fileExists(screenshotPath) : false;
    tiktok.push({
      ...sheet,
      fresh_official_page_metadata: fresh.metadata || null,
      derived_public_rates: publicRates(freshMetrics),
      metric_delta_from_sheet_snapshot: metricDelta,
      metric_change_note:
        fresh.metadata?.visible_metrics
          ? "Use fresh_official_page_metadata.visible_metrics for the 15.09.2026 cut; the sheet string is retained for audit comparison."
          : "Fresh counters unavailable; retain the sheet snapshot with caveat.",
      fresh_capture: screenshotExists
        ? {
            status: fresh.capture.login_prompt_remaining
              ? "captured, but a login prompt remained; not presentation-ready"
              : "captured from the official public TikTok player",
            screenshot_path: screenshotPath,
            final_url: fresh.capture.final_url,
            source_detail_url: sheet.direct_url,
            interaction_policy: "no likes, follows, comments, saves, shares or messages; no media download",
          }
        : {
            status: "not captured in this priority pass",
            screenshot_path: null,
          },
    });
  }

  const instagramCaptured = instagram.filter((record) => record.fresh_capture.screenshot_paths.length);
  const tiktokCaptured = tiktok.filter((record) => record.fresh_capture.screenshot_path);
  const tiktokVerified = tiktok.filter((record) => record.fresh_official_page_metadata?.ok);
  const rank = (selector, limit = 8) =>
    tiktokVerified
      .map((record) => ({ id: record.id, account: record.brand_or_account, value: selector(record) }))
      .filter((entry) => Number.isFinite(entry.value))
      .sort((a, b) => b.value - a.value)
      .slice(0, limit);
  const output = {
    title: "Avdar Market — social evidence manifest",
    snapshot_date: "2026-09-15",
    language: "ru",
    summary: {
      instagram_references: instagram.length,
      tiktok_references: tiktok.length,
      instagram_screenshot_sets: instagramCaptured.length,
      tiktok_fresh_metric_records: tiktokVerified.length,
      tiktok_screenshot_sets: tiktokCaptured.length,
      presentation_priority_instagram_added_this_pass: [
        "IG-001",
        "IG-005",
        "IG-007",
        "IG-008",
        "IG-012",
        "IG-015",
      ],
      tiktok_priority_ids: ["TT12", "TT01", "TT03", "TT02", "TT04", "TT13", "TT15", "TT08"],
    },
    evidence_policy: {
      public_metrics_mean: "Visible engagement on the source at the snapshot time only.",
      public_metrics_do_not_mean: "Sales, attributed conversion, CAC or ROAS.",
      rights:
        "Screenshots are research evidence with source attribution. Do not reuse competitors' creative in advertising. Before public distribution outside a client research deck, confirm the applicable quotation/fair-use rules and any creator permissions.",
      claims:
        "Competitor product and sustainability claims remain the competitor's claims. Avdar may reuse only a creative mechanism; any material, origin, care, scarcity or performance statement needs SKU-level proof.",
    },
    tiktok_rankings: {
      by_views: rank((record) => record.fresh_official_page_metadata.visible_metrics.views),
      by_save_rate_pct: rank((record) => record.derived_public_rates?.save_rate_pct),
      by_visible_interaction_rate_pct: rank(
        (record) => record.derived_public_rates?.visible_interaction_rate_pct,
      ),
      caution:
        "Rates are descriptive only: post age, paid distribution, audience geography and denominator quality differ across sources.",
    },
    instagram,
    tiktok,
  };
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2));
  process.stdout.write(`${OUTPUT_PATH}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exit(1);
});
