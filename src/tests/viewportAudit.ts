import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const VIEWPORTS = [
  { width: 320, height: 640, label: "320px_Mobile_Small" },
  { width: 375, height: 667, label: "375px_iPhone_SE" },
  { width: 390, height: 844, label: "390px_iPhone_14" },
  { width: 768, height: 1024, label: "768px_Tablet_Portrait" },
  { width: 1024, height: 768, label: "1024px_Laptop_Small" },
  { width: 1440, height: 900, label: "1440px_Desktop_Wide" },
];

const ROUTES = [
  "/",
  "/onboarding",
  "/dashboard",
  "/safe-story",
  "/journal",
  "/learning",
  "/support",
  "/referrals",
  "/growth-plan",
  "/settings",
];

async function runViewportAudit() {
  console.log("=== MEMULAI AUDIT RESPONSIVE VIEWPORT FATHERCARE AI ===");
  const screenshotsDir = path.join(process.cwd(), ".test-results", "screenshots");
  fs.mkdirSync(screenshotsDir, { recursive: true });

  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });

  const summaryResults: Array<{
    route: string;
    viewport: string;
    hasHorizontalOverflow: boolean;
    scrollWidth: number;
    clientWidth: number;
  }> = [];

  for (const vp of VIEWPORTS) {
    console.log(`\nTesting Viewport: ${vp.label} (${vp.width}x${vp.height})...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();

    for (const route of ROUTES) {
      await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });

      // Evaluate horizontal overflow
      const overflowInfo = await page.evaluate(() => {
        const scrollW = document.documentElement.scrollWidth;
        const clientW = document.documentElement.clientWidth;
        return {
          scrollWidth: scrollW,
          clientWidth: clientW,
          hasOverflow: scrollW > clientW,
        };
      });

      summaryResults.push({
        route,
        viewport: vp.label,
        hasHorizontalOverflow: overflowInfo.hasOverflow,
        scrollWidth: overflowInfo.scrollWidth,
        clientWidth: overflowInfo.clientWidth,
      });

      // Capture screenshot for first 3 routes per viewport to verify visual quality
      if (route === "/" || route === "/dashboard" || route === "/safe-story") {
        const filename = `${vp.width}px_${route.replace("/", "") || "home"}.png`;
        await page.screenshot({
          path: path.join(screenshotsDir, filename),
          fullPage: false,
        });
      }
    }
    await context.close();
  }

  await browser.close();

  console.log("\n=== RINGKASAN HASIL AUDIT RESPONSIVE VIEWPORT ===");
  const failedOverflows = summaryResults.filter((r) => r.hasHorizontalOverflow);

  if (failedOverflows.length === 0) {
    console.log(`✅ SEMUA ${summaryResults.length} UJI VIEWPORT LULUS (0 Horizontal Overflow)!`);
    console.log(`Titik henti teruji: 320px, 375px, 390px, 768px, 1024px, 1440px pada 10 rute.`);
  } else {
    console.error(`❌ Ditemukan ${failedOverflows.length} masalah horizontal overflow:`);
    failedOverflows.forEach((f) =>
      console.error(`  - ${f.viewport} pada rute ${f.route}: scrollW=${f.scrollWidth} > clientW=${f.clientWidth}`)
    );
    process.exit(1);
  }
}

runViewportAudit().catch((err) => {
  console.error("Gagal menjalankan audit viewport:", err);
  process.exit(1);
});
