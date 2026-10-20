import puppeteer from "puppeteer-core";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const ARTIFACT_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\0bb96566-b8c2-4336-b95f-c0a62309be5d\\screenshots";

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
  });

  const pagesToCapture = [
    { name: "Audit_Desktop_Dashboard", url: "http://localhost:3000/dashboard", width: 1440, height: 900 },
    { name: "Audit_Mobile_Dashboard", url: "http://localhost:3000/dashboard", width: 390, height: 844, isMobile: true },
    { name: "Audit_Desktop_SafeStory_Demo", url: "http://localhost:3000/safe-story", width: 1440, height: 900 },
    { name: "Audit_Mobile_SafeStory_Demo", url: "http://localhost:3000/safe-story", width: 390, height: 844, isMobile: true },
    { name: "Audit_Desktop_Journal", url: "http://localhost:3000/journal", width: 1440, height: 900 },
    { name: "Audit_Desktop_Learning", url: "http://localhost:3000/learning", width: 1440, height: 900 },
    { name: "Audit_Desktop_Referrals", url: "http://localhost:3000/referrals", width: 1440, height: 900 },
  ];

  for (const item of pagesToCapture) {
    const page = await browser.newPage();
    await page.setViewport({
      width: item.width,
      height: item.height,
      isMobile: !!item.isMobile,
      hasTouch: !!item.isMobile,
    });
    await page.goto(item.url, { waitUntil: "networkidle0" });
    const filePath = path.join(ARTIFACT_DIR, `${item.name}.png`);
    await page.screenshot({ path: filePath, fullPage: false });
    console.log(`Saved screenshot: ${item.name}.png`);
    await page.close();
  }

  await browser.close();
}

capture();
