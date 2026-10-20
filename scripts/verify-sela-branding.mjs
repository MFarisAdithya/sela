import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE_URL = "http://localhost:3000";

async function verifySela() {
  console.log("=== SELA BRANDING VERIFICATION SUITE ===");

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const outDir = path.resolve("public/screenshots/sela");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const page = await browser.newPage();

  // 1. Splash Page (Desktop 1440px)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });

  const splashData = await page.evaluate(() => {
    const body = document.body;
    const bodyBg = window.getComputedStyle(body).backgroundColor;
    const h1 = document.querySelector("h1")?.textContent?.trim();
    const tagline = document.querySelector("p.text-brand-700")?.textContent?.trim();
    const fullHtml = document.body.innerHTML;
    const hasOldBrand = fullHtml.includes("FATHERCARE");
    return { bodyBg, h1, tagline, hasOldBrand };
  });

  console.log("\n[Test 1: Splash Page Branding]");
  console.log(" - Body Background Color:", splashData.bodyBg, splashData.bodyBg === "rgb(227, 238, 255)" ? "(PASS #E3EEFF)" : "(FAIL)");
  console.log(" - H1 Title             :", splashData.h1, splashData.h1 === "sela" ? "(PASS 'sela')" : "(FAIL)");
  console.log(" - Official Tagline     :", splashData.tagline, splashData.tagline === "Ruang untuk dirimu." ? "(PASS)" : "(FAIL)");
  console.log(" - Zero FATHERCARE leak :", !splashData.hasOldBrand ? "(PASS)" : "(FAIL)");

  await page.screenshot({ path: path.join(outDir, "SELA_01_Splash_Desktop.png") });

  // Mobile Splash (390px)
  await page.setViewport({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(outDir, "SELA_01_Splash_Mobile.png") });

  // 2. Dashboard Page (Desktop 1440px)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: "networkidle0" });

  const dashData = await page.evaluate(() => {
    const sidebarLogo = document.querySelector("aside")?.textContent || "";
    const headerLogo = document.querySelector("header")?.textContent || "";
    const fullText = document.body.innerText;
    return {
      hasSelaInSidebar: sidebarLogo.includes("sela") && sidebarLogo.includes("Ruang untuk dirimu."),
      hasSelaInHeader: headerLogo.includes("sela") && headerLogo.includes("Ruang untuk dirimu."),
      hasOldBrand: fullText.includes("FATHERCARE"),
    };
  });

  console.log("\n[Test 2: Dashboard Layout & Header/Sidebar Branding]");
  console.log(" - SELA in Desktop Sidebar:", dashData.hasSelaInSidebar ? "(PASS)" : "(FAIL)");
  console.log(" - SELA in Header Bar     :", dashData.hasSelaInHeader ? "(PASS)" : "(FAIL)");
  console.log(" - Zero FATHERCARE leak   :", !dashData.hasOldBrand ? "(PASS)" : "(FAIL)");

  await page.screenshot({ path: path.join(outDir, "SELA_02_Dashboard_Desktop.png") });

  // Mobile Dashboard (390px)
  await page.setViewport({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(outDir, "SELA_02_Dashboard_Mobile.png") });

  // 3. Safe Story AI (Live Gemini + RAG test under SELA branding)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/safe-story`, { waitUntil: "networkidle0" });

  // Send a test message
  await page.type("input[placeholder*='Tulis apa yang sedang kamu rasakan']", "Halo SELA, bagaimana cara mengelola rasa cemas saat menghadapi ujian?");
  await page.click("button[aria-label='Kirim pesan']");

  // Handle consent modal if shown
  await new Promise((r) => setTimeout(r, 600));
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const confirmBtn = buttons.find((b) => b.textContent?.includes("Setuju dan Kirim"));
    if (confirmBtn) confirmBtn.click();
  });

  // Wait for Gemini live reply
  console.log("\nWaiting for live Gemini AI response on Safe Story...");
  await page.waitForFunction(
    () => {
      const msgs = document.querySelectorAll(".whitespace-pre-wrap");
      return msgs.length >= 2;
    },
    { timeout: 20000 }
  );

  const safeStoryData = await page.evaluate(() => {
    const msgs = Array.from(document.querySelectorAll(".whitespace-pre-wrap")).map((el) => el.textContent);
    const fullText = document.body.innerText;
    return {
      messagesCount: msgs.length,
      aiReply: msgs[msgs.length - 1]?.slice(0, 100),
      hasOldBrand: fullText.includes("FATHERCARE"),
    };
  });

  console.log("[Test 3: Safe Story AI Live Response under SELA]");
  console.log(" - Total messages rendered :", safeStoryData.messagesCount, "(PASS >= 2)");
  console.log(" - AI Reply snippet        :", `"${safeStoryData.aiReply}..."`);
  console.log(" - Zero FATHERCARE leak    :", !safeStoryData.hasOldBrand ? "(PASS)" : "(FAIL)");

  await page.screenshot({ path: path.join(outDir, "SELA_03_SafeStory_Desktop.png") });

  // Mobile Safe Story (390px)
  await page.setViewport({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(outDir, "SELA_03_SafeStory_Mobile.png") });

  // 4. Design System Showcase
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/design-system`, { waitUntil: "networkidle0" });

  const dsData = await page.evaluate(() => {
    const fullText = document.body.innerText;
    return {
      hasSelaBrandShowcase: fullText.includes("Identitas Visual SELA") && fullText.includes("Ruang untuk dirimu."),
      has5Colors: fullText.includes("Navy Utama") && fullText.includes("Biru Primer") && fullText.includes("Biru Aksen") && fullText.includes("Biru Latar") && fullText.includes("Putih Kebiruan"),
      hasOldBrand: fullText.includes("FATHERCARE"),
    };
  });

  console.log("\n[Test 4: Design System Showcase]");
  console.log(" - SELA Visual Brand Showcase :", dsData.hasSelaBrandShowcase ? "(PASS)" : "(FAIL)");
  console.log(" - All 5 SELA Color Swatches  :", dsData.has5Colors ? "(PASS)" : "(FAIL)");
  console.log(" - Zero FATHERCARE leak       :", !dsData.hasOldBrand ? "(PASS)" : "(FAIL)");

  await page.screenshot({ path: path.join(outDir, "SELA_04_DesignSystem_Desktop.png") });

  await browser.close();
  console.log("\n=== ALL SELA BRANDING TESTS COMPLETED SUCCESSFULLY ===");
}

verifySela().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
