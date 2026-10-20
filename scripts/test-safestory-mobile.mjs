import puppeteer from "puppeteer-core";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function testSafeStoryMobile() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto("http://localhost:3000/safe-story", { waitUntil: "networkidle0" });

  // Check if input element is visible and within viewport bounds
  const inputBounds = await page.evaluate(() => {
    const input = document.querySelector("input[placeholder*='Tulis apa yang sedang kamu rasakan']");
    const bottomNav = document.querySelector("nav");
    if (!input) return null;
    const rect = input.getBoundingClientRect();
    const navRect = bottomNav ? bottomNav.getBoundingClientRect() : null;

    return {
      inputTop: rect.top,
      inputBottom: rect.bottom,
      viewportHeight: window.innerHeight,
      navTop: navRect ? navRect.top : null,
      isCoveredByNav: navRect ? rect.bottom > navRect.top : false,
    };
  });

  console.log("SafeStory Mobile Input Bounds:", inputBounds);
  await browser.close();
}

testSafeStoryMobile().catch(console.error);
