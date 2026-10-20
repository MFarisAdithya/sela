import puppeteer from "puppeteer-core";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
  });
  const page = await browser.newPage();
  
  page.on("response", res => {
    if (res.url().includes(".css")) {
      console.log("CSS request on /design-system:", res.url(), "Status:", res.status());
    }
  });

  console.log("Navigating to http://localhost:3000/design-system...");
  await page.goto("http://localhost:3000/design-system", { waitUntil: "networkidle0" });
  
  const styles = await page.evaluate(() => {
    const heading = document.querySelector("h1");
    const h1Style = heading ? window.getComputedStyle(heading) : null;
    const card = document.querySelector(".bg-surface");
    const cs = card ? window.getComputedStyle(card) : null;
    const body = document.body;
    return {
      bodyBg: window.getComputedStyle(body).backgroundColor,
      h1Color: h1Style ? h1Style.color : null,
      h1Font: h1Style ? h1Style.fontFamily : null,
      cardBg: cs ? cs.backgroundColor : null,
      cardShadow: cs ? cs.boxShadow : null,
      cardRadius: cs ? cs.borderRadius : null,
    };
  });
  
  console.log("Computed styles on /design-system:", styles);
  await browser.close();
}

run().catch(console.error);
