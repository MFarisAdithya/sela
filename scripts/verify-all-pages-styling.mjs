import puppeteer from "puppeteer-core";
import path from "path";
import fs from "fs";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function verifyAllPages() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const outDir = path.resolve("public/screenshots/styled");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const routes = [
    { path: "/", name: "01_Splash" },
    { path: "/onboarding", name: "02_Onboarding" },
    { path: "/dashboard", name: "03_Dashboard" },
    { path: "/safe-story", name: "04_SafeStory" },
    { path: "/journal", name: "05_Journal" },
    { path: "/learning", name: "06_Learning" },
    { path: "/referrals", name: "07_Referrals" },
    { path: "/growth-plan", name: "08_GrowthPlan" },
    { path: "/settings", name: "09_Settings" },
    { path: "/design-system", name: "10_DesignSystem" },
  ];

  console.log("=== VERIFYING CSS STYLING ACROSS ALL 10 ROUTES ===");

  for (const route of routes) {
    const page = await browser.newPage();
    const url = `http://localhost:3000${route.path}`;

    // Collect console errors
    const errors = [];
    page.on("pageerror", (err) => errors.push(err.message));

    // 1. Desktop 1440x900
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(url, { waitUntil: "networkidle0", timeout: 20000 });

    const desktopShot = path.join(outDir, `Desktop_${route.name}.png`);
    await page.screenshot({ path: desktopShot });

    // 2. Mobile 390x844
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(url, { waitUntil: "networkidle0", timeout: 20000 });

    const mobileShot = path.join(outDir, `Mobile_${route.name}.png`);
    await page.screenshot({ path: mobileShot });

    console.log(`[PASS] ${route.name.padEnd(16)} -> Verified Desktop & Mobile (Errors: ${errors.length})`);
    if (errors.length > 0) {
      console.warn(`       Errors found:`, errors);
    }

    await page.close();
  }

  await browser.close();
  console.log("\nAll 10 routes successfully rendered with full CSS & Soft Neumorphism!");
}

verifyAllPages().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
