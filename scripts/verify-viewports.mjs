import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const viewports = [
  { width: 320, height: 568, name: "320-iphone5" },
  { width: 375, height: 667, name: "375-iphone8" },
  { width: 390, height: 844, name: "390-iphone14" },
  { width: 768, height: 1024, name: "768-ipad-portrait" },
  { width: 1024, height: 768, name: "1024-laptop-compact" },
  { width: 1440, height: 900, name: "1440-desktop-hd" },
];

const pagesToTest = [
  { url: "http://localhost:3000", label: "Splash" },
  { url: "http://localhost:3000/dashboard", label: "Dashboard" },
  { url: "http://localhost:3000/design-system", label: "DesignSystem" },
];

async function runVerification() {
  const outputDir = path.resolve("public/screenshots");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("Launching Microsoft Edge for automated viewport testing...");
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();
  const results = [];

  for (const pageInfo of pagesToTest) {
    console.log(`\nTesting Page: ${pageInfo.label} (${pageInfo.url})`);
    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto(pageInfo.url, { waitUntil: "networkidle0" });

      // Check horizontal overflow
      const overflow = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        };
      });

      const screenshotFile = `${pageInfo.label}_${vp.name}.png`;
      const screenshotPath = path.join(outputDir, screenshotFile);
      await page.screenshot({ path: screenshotPath, fullPage: false });

      const passed = !overflow.hasHorizontalScroll;
      results.push({
        page: pageInfo.label,
        viewport: vp.width,
        name: vp.name,
        scrollWidth: overflow.scrollWidth,
        clientWidth: overflow.clientWidth,
        hasHorizontalScroll: overflow.hasHorizontalScroll,
        passed,
        screenshot: screenshotFile,
      });

      console.log(
        ` [${passed ? "PASS" : "FAIL"}] Viewport ${vp.width}x${vp.height} (${vp.name}) - scrollWidth: ${overflow.scrollWidth}, clientWidth: ${overflow.clientWidth}`
      );
    }
  }

  await browser.close();

  console.log("\nSummary of Viewport Tests:");
  const allPassed = results.every((r) => r.passed);
  console.log(`Total tests: ${results.length}, Passed: ${results.filter((r) => r.passed).length}, Failed: ${results.filter((r) => !r.passed).length}`);

  if (!allPassed) {
    console.error("Some viewport tests failed due to horizontal overflow!");
    process.exit(1);
  } else {
    console.log("All viewports passed zero-horizontal-overflow check!");
  }
}

runVerification().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
