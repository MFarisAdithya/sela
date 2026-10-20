import puppeteer from "puppeteer-core";
import path from "path";
import fs from "fs";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const outDir = path.resolve("public/screenshots");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const pagesToTest = [
    { name: "Root_Splash", url: "http://localhost:3000/" },
    { name: "Design_System", url: "http://localhost:3000/design-system" },
    { name: "Dashboard", url: "http://localhost:3000/dashboard" },
  ];

  for (const pageInfo of pagesToTest) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    console.log(`Navigating to ${pageInfo.url}...`);
    await page.goto(pageInfo.url, { waitUntil: "networkidle0", timeout: 30000 });
    
    // Check computed styles of body and main container
    const styles = await page.evaluate(() => {
      const body = document.body;
      const computedBody = window.getComputedStyle(body);
      const heading = document.querySelector("h1");
      const computedH1 = heading ? window.getComputedStyle(heading) : null;
      const button = document.querySelector("button, a[href*='onboarding'], a[href*='dashboard']");
      const computedBtn = button ? window.getComputedStyle(button) : null;
      
      return {
        bodyBg: computedBody.backgroundColor,
        bodyColor: computedBody.color,
        h1Color: computedH1 ? computedH1.color : null,
        h1FontSize: computedH1 ? computedH1.fontSize : null,
        btnBg: computedBtn ? computedBtn.backgroundColor : null,
        btnBoxShadow: computedBtn ? computedBtn.boxShadow : null,
        btnBorderRadius: computedBtn ? computedBtn.borderRadius : null,
      };
    });

    console.log(`Computed styles for ${pageInfo.name}:`, styles);

    const shotPath = path.join(outDir, `Fix_CSS_${pageInfo.name}.png`);
    await page.screenshot({ path: shotPath, fullPage: true });
    console.log(`Saved screenshot to ${shotPath}`);

    // Also mobile viewport
    await page.setViewport({ width: 390, height: 844 });
    const mobileShotPath = path.join(outDir, `Fix_CSS_${pageInfo.name}_mobile.png`);
    await page.screenshot({ path: mobileShotPath, fullPage: true });
    console.log(`Saved mobile screenshot to ${mobileShotPath}`);

    await page.close();
  }

  await browser.close();
  console.log("Capture finished successfully!");
}

capture().catch(err => {
  console.error("Capture error:", err);
  process.exit(1);
});
