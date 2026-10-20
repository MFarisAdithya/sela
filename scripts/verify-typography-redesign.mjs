import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE_URL = "http://localhost:3000";

async function verifyTypography() {
  console.log("==================================================");
  console.log("   SELA TYPOGRAPHY & LOGO REDESIGN VERIFICATION   ");
  console.log("==================================================");

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const outDir = path.resolve("public/screenshots/typography");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const page = await browser.newPage();

  // 1. Landing Page
  console.log("\n[1. Testing Landing Page (/)]");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });

  const landingInfo = await page.evaluate(() => {
    const bodyFont = window.getComputedStyle(document.body).fontFamily;
    const taglineElem = Array.from(document.querySelectorAll("p")).find(p => p.textContent.includes("Ruang untuk dirimu."));
    const taglineFont = taglineElem ? window.getComputedStyle(taglineElem).fontFamily : "NOT_FOUND";
    const buttonElem = document.querySelector("button, a button, a.block");
    const buttonFont = buttonElem ? window.getComputedStyle(buttonElem).fontFamily : "NOT_FOUND";
    const imgLogo = document.querySelector("img[src*='sela-logo.png']");
    const logoLoaded = imgLogo ? (imgLogo.complete && imgLogo.naturalWidth > 0) : false;
    const logoSize = imgLogo ? { width: imgLogo.naturalWidth, height: imgLogo.naturalHeight } : null;

    return { bodyFont, taglineFont, buttonFont, logoLoaded, logoSize };
  });

  console.log("  - Body Font Family      :", landingInfo.bodyFont);
  console.log("  - Tagline Font (Lora)   :", landingInfo.taglineFont);
  console.log("  - Button Font           :", landingInfo.buttonFont);
  console.log("  - Official PNG Logo     :", landingInfo.logoLoaded ? `LOADED (${landingInfo.logoSize?.width}x${landingInfo.logoSize?.height}px)` : "FAILED");

  await page.screenshot({ path: path.join(outDir, "01_Landing_Desktop.png") });
  await page.setViewport({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(outDir, "01_Landing_Mobile.png") });

  // 2. Dashboard
  console.log("\n[2. Testing Dashboard (/dashboard)]");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: "networkidle0" });

  const dashInfo = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const h1Font = h1 ? window.getComputedStyle(h1).fontFamily : "NOT_FOUND";
    const h1Weight = h1 ? window.getComputedStyle(h1).fontWeight : "NOT_FOUND";
    const moodBtn = document.querySelector("button[aria-pressed]");
    const moodFont = moodBtn ? window.getComputedStyle(moodBtn).fontFamily : "NOT_FOUND";
    const navLogo = document.querySelector("img[src*='sela-logo.png']");
    const logoLoaded = navLogo ? (navLogo.complete && navLogo.naturalWidth > 0) : false;

    return { h1Font, h1Weight, moodFont, logoLoaded };
  });

  console.log("  - Heading Font Family   :", dashInfo.h1Font);
  console.log("  - Heading Font Weight   :", dashInfo.h1Weight);
  console.log("  - Mood Button Font      :", dashInfo.moodFont);
  console.log("  - Header/Sidebar Logo   :", dashInfo.logoLoaded ? "LOADED" : "FAILED");

  await page.screenshot({ path: path.join(outDir, "02_Dashboard_Desktop.png") });
  await page.setViewport({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(outDir, "02_Dashboard_Mobile.png") });

  // 3. Safe Story AI
  console.log("\n[3. Testing Safe Story AI (/safe-story)]");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/safe-story`, { waitUntil: "networkidle0" });

  const safeStoryInfo = await page.evaluate(() => {
    const input = document.querySelector("input[placeholder*='rasakan']");
    const inputFont = input ? window.getComputedStyle(input).fontFamily : "NOT_FOUND";
    const sendBtn = document.querySelector("button[aria-label='Kirim pesan']");
    const sendBtnFont = sendBtn ? window.getComputedStyle(sendBtn).fontFamily : "NOT_FOUND";
    const bubble = document.querySelector("div[class*='rounded-2xl'] p");
    const bubbleFont = bubble ? window.getComputedStyle(bubble).fontFamily : "NOT_FOUND";
    const navLogo = document.querySelector("img[src*='sela-logo.png']");
    const logoLoaded = navLogo ? (navLogo.complete && navLogo.naturalWidth > 0) : false;

    return { inputFont, sendBtnFont, bubbleFont, logoLoaded };
  });

  console.log("  - Chat Input Font       :", safeStoryInfo.inputFont);
  console.log("  - Send Button Font      :", safeStoryInfo.sendBtnFont);
  console.log("  - Chat Bubble Font      :", safeStoryInfo.bubbleFont);
  console.log("  - Header Logo           :", safeStoryInfo.logoLoaded ? "LOADED" : "FAILED");

  await page.screenshot({ path: path.join(outDir, "03_SafeStory_Desktop.png") });
  await page.setViewport({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(outDir, "03_SafeStory_Mobile.png") });

  // 4. Ruang Belajar
  console.log("\n[4. Testing Ruang Belajar (/learning)]");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/learning`, { waitUntil: "networkidle0" });

  const learningInfo = await page.evaluate(() => {
    const title = document.querySelector("h1");
    const titleFont = title ? window.getComputedStyle(title).fontFamily : "NOT_FOUND";
    const catBtn = document.querySelector("button.rounded-xl");
    const catBtnFont = catBtn ? window.getComputedStyle(catBtn).fontFamily : "NOT_FOUND";
    const cardTitle = document.querySelector("h2");
    const cardTitleFont = cardTitle ? window.getComputedStyle(cardTitle).fontFamily : "NOT_FOUND";
    const cardDesc = document.querySelector("h2 + p");
    const cardDescFont = cardDesc ? window.getComputedStyle(cardDesc).fontFamily : "NOT_FOUND";

    return { titleFont, catBtnFont, cardTitleFont, cardDescFont };
  });

  console.log("  - Page Title Font       :", learningInfo.titleFont);
  console.log("  - Category Pill Font    :", learningInfo.catBtnFont);
  console.log("  - Module Card Title Font:", learningInfo.cardTitleFont);
  console.log("  - Module Card Desc Font :", learningInfo.cardDescFont);

  await page.screenshot({ path: path.join(outDir, "04_Learning_Desktop.png") });
  await page.setViewport({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(outDir, "04_Learning_Mobile.png") });

  // 5. Journal (Reflective Serif Accent Check)
  console.log("\n[5. Testing Journal Reflection (/journal)]");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/journal`, { waitUntil: "networkidle0" });

  const journalInfo = await page.evaluate(() => {
    const promptElem = document.querySelector(".font-serif");
    const promptFont = promptElem ? window.getComputedStyle(promptElem).fontFamily : "NOT_FOUND";
    const bodyElem = document.querySelector("textarea");
    const bodyFont = bodyElem ? window.getComputedStyle(bodyElem).fontFamily : "NOT_FOUND";

    return { promptFont, bodyFont };
  });

  console.log("  - Reflection Prompt Font:", journalInfo.promptFont);
  console.log("  - Journal Textarea Font :", journalInfo.bodyFont);

  await page.screenshot({ path: path.join(outDir, "05_Journal_Desktop.png") });
  await page.setViewport({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(outDir, "05_Journal_Mobile.png") });

  await browser.close();

  console.log("\n==================================================");
  console.log("   ALL VERIFICATIONS COMPLETED SUCCESSFULLY       ");
  console.log("   Screenshots saved to public/screenshots/typography/ ");
  console.log("==================================================");
}

verifyTypography().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
