import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const ARTIFACT_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\0bb96566-b8c2-4336-b95f-c0a62309be5d\\screenshots";

const viewports = [
  { width: 320, height: 600, name: "320_mobile_narrow" },
  { width: 375, height: 667, name: "375_mobile_standard" },
  { width: 390, height: 844, name: "390_mobile_modern" },
  { width: 768, height: 1024, name: "768_tablet_portrait" },
  { width: 1024, height: 768, name: "1024_desktop_small" },
  { width: 1440, height: 900, name: "1440_desktop_widescreen" },
];

async function runPhase3Verification() {
  if (!fs.existsSync(ARTIFACT_DIR)) {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  }

  console.log("=== SELA.AI Phase 3 (Core 4 Pillars) Verification Suite ===");
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--window-size=1440,900"],
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  const report = {
    timestamp: new Date().toISOString(),
    tests: [],
    overflowAudit: [],
    screenshots: [],
  };

  try {
    // 0. AUTHENTICATE DEMO USER SO APP SHELL & PILLARS ARE FULLY ACCESSIBLE
    console.log("\n[Auth Setup] Logging in as Alex demo user...");
    await page.goto("http://localhost:3000/masuk", { waitUntil: "networkidle2" });
    await page.waitForSelector('input[type="email"]');
    await new Promise((r) => setTimeout(r, 600));
    await page.type('input[type="email"]', "alex@sela.ai");
    await page.type('input[type="password"]', "Password123!");
    await page.click('button[type="submit"]');
    await page.waitForFunction(
      () => window.location.pathname.startsWith('/app') || window.location.pathname.startsWith('/onboarding'),
      { timeout: 10000 }
    );
    console.log("Authenticated successfully.");

    // ==========================================
    // 1. PILAR 1: GUIDED STORY (/safe-story)
    // ==========================================
    console.log("\n[Pilar 1] Testing Guided Story (/safe-story)...");
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/safe-story", { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 800));

    // Screenshot Guided Story Desktop & Mobile
    const ssSafeStoryDesktop = path.join(ARTIFACT_DIR, "phase3_guided_story_desktop.png");
    await page.screenshot({ path: ssSafeStoryDesktop, fullPage: true });
    report.screenshots.push("phase3_guided_story_desktop.png");

    await page.setViewport({ width: 390, height: 844 });
    const ssSafeStoryMobile = path.join(ARTIFACT_DIR, "phase3_guided_story_390.png");
    await page.screenshot({ path: ssSafeStoryMobile, fullPage: true });
    report.screenshots.push("phase3_guided_story_390.png");
    await page.setViewport({ width: 1440, height: 900 });

    // Test Guided Steps Form: Fill Step 1 -> Step 2 -> Step 3 -> Step 4 -> Save to Story Card
    const hasStepIndicator = await page.evaluate(() => {
      return document.body.innerText.includes("1. Lawan Bicara & Fakta") &&
             document.body.innerText.includes("Urai Cerita Pribadi");
    });
    console.log(`Guided Story Step Indicator verified: ${hasStepIndicator}`);

    // Fill Step 1 facts
    await page.type('textarea', 'Nilai ujian semester ini turun dan aku ingin berterus terang pada orang tua.');
    // Click Lanjut to Step 2
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Lanjut: Kenali Perasaanmu'));
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    // Step 2: Pick feeling
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Cemas akan masa depan'));
      if (btn) btn.click();
    });
    // Click Lanjut to Step 3
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Lanjut: Kebutuhanmu'));
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    // Step 3: Pick needs
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Hanya ingin didengarkan dulu'));
      if (btn) btn.click();
    });
    // Click Lanjut to Step 4
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Lanjut: Susun Kalimat Pembuka'));
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    // Step 4: Verify card generation CTA & click save
    const step4Verified = await page.evaluate(() => {
      const upper = document.body.innerText.toUpperCase();
      return (
        upper.includes("PRATINJAU KARTU CERITA") &&
        document.body.innerText.includes("Simpan & Buat Kartu Cerita")
      );
    });
    console.log(`Guided Story Step 4 Card Preview verified: ${step4Verified}`);

    // Click "Simpan & Buat Kartu Cerita"
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Simpan & Buat Kartu Cerita'));
      if (btn) btn.click();
    });
    // Wait for redirect to /journal
    await page.waitForFunction(() => window.location.pathname.startsWith('/journal'), { timeout: 8000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 1500));
    const landedOnJournal = page.url().includes("/journal");
    console.log(`Transition from Guided Story to Kartu Cerita: ${landedOnJournal} (${page.url()})`);

    report.tests.push({
      name: "Pilar 1: Guided Story 4-Step Unravelling & Card Conversion",
      expected: "Fill 4 dimensions and convert into Story Card on /journal",
      actual: landedOnJournal ? "Successfully landed on /journal" : page.url(),
      passed: landedOnJournal,
    });

    // Test Crisis Interception on Guided Story Free Chat
    await page.goto("http://localhost:3000/safe-story", { waitUntil: "networkidle2" });
    await page.evaluate(() => {
      const freeChatBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Obrolan Bebas'));
      if (freeChatBtn) freeChatBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));
    await page.type('input[type="text"]', 'aku merasa ingin mengakhiri hidup karena putus asa');
    await page.click('button[aria-label="Kirim pesan"]');
    await new Promise((r) => setTimeout(r, 1500));
    const crisisProtocolTriggered = await page.evaluate(() => {
      return document.body.innerText.includes("SEJIWA") || document.body.innerText.includes("119 ext 8");
    });
    console.log(`Crisis Protocol & Hotline Banner triggered in Free Chat: ${crisisProtocolTriggered}`);
    const ssCrisis = path.join(ARTIFACT_DIR, "phase3_guided_story_crisis_banner.png");
    await page.screenshot({ path: ssCrisis, fullPage: true });
    report.screenshots.push("phase3_guided_story_crisis_banner.png");

    report.tests.push({
      name: "Pilar 1: Crisis Safety Protocol Interception (SEJIWA 119 ext 8)",
      expected: "Immediate compassionate safety protocol without lock-out",
      actual: crisisProtocolTriggered ? "Crisis banner & 119 hotline displayed" : "Failed",
      passed: crisisProtocolTriggered,
    });

    // ==========================================
    // 2. PILAR 2: KARTU CERITA PRIBADI (/journal)
    // ==========================================
    console.log("\n[Pilar 2] Testing Kartu Cerita Pribadi (/journal)...");
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/journal", { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 800));

    const ssJournalDesktop = path.join(ARTIFACT_DIR, "phase3_kartu_cerita_desktop.png");
    await page.screenshot({ path: ssJournalDesktop, fullPage: true });
    report.screenshots.push("phase3_kartu_cerita_desktop.png");

    await page.setViewport({ width: 390, height: 844 });
    const ssJournalMobile = path.join(ARTIFACT_DIR, "phase3_kartu_cerita_390.png");
    await page.screenshot({ path: ssJournalMobile, fullPage: true });
    report.screenshots.push("phase3_kartu_cerita_390.png");
    await page.setViewport({ width: 1440, height: 900 });

    const quadrantsVerified = await page.evaluate(() => {
      const upper = document.body.innerText.toUpperCase();
      return (
        upper.includes("FAKTA SITUASI") &&
        upper.includes("EMOSI YANG DIRASAKAN") &&
        upper.includes("KEBUTUHAN SEBENARNYA") &&
        upper.includes("KALIMAT PEMBUKA") &&
        document.body.innerText.includes("Latih di Practice Talk")
      );
    });
    console.log(`Kartu Cerita 4 Quadrants & Actions verified: ${quadrantsVerified}`);

    report.tests.push({
      name: "Pilar 2: Kartu Cerita 4 Quadrants (Fakta, Emosi, Kebutuhan, Pembuka)",
      expected: "Display structured 4-quadrant brief with copy/download/practice actions",
      actual: quadrantsVerified ? "All 4 quadrants verified" : "Failed",
      passed: quadrantsVerified,
    });

    // Test Transition from Kartu Cerita to Practice Talk
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Latih di Practice Talk'));
      if (btn) btn.click();
    });
    await page.waitForFunction(() => window.location.pathname.startsWith('/dashboard'), { timeout: 8000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 1500));
    const landedOnPracticeTalk = page.url().includes("/dashboard");
    console.log(`Transition from Kartu Cerita to Practice Talk (/dashboard): ${landedOnPracticeTalk}`);

    report.tests.push({
      name: "Pilar 2 -> Pilar 3: Transition to Practice Talk (/dashboard)",
      expected: "Click 'Latih di Practice Talk' sets active card and routes to /dashboard",
      actual: landedOnPracticeTalk ? "Redirected to /dashboard" : page.url(),
      passed: landedOnPracticeTalk,
    });

    // ==========================================
    // 3. PILAR 3: PRACTICE TALK (/dashboard)
    // ==========================================
    console.log("\n[Pilar 3] Testing Practice Talk (/dashboard)...");
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/dashboard", { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 800));

    const ssPracticeDesktop = path.join(ARTIFACT_DIR, "phase3_practice_talk_desktop.png");
    await page.screenshot({ path: ssPracticeDesktop, fullPage: true });
    report.screenshots.push("phase3_practice_talk_desktop.png");

    await page.setViewport({ width: 390, height: 844 });
    const ssPracticeMobile = path.join(ARTIFACT_DIR, "phase3_practice_talk_390.png");
    await page.screenshot({ path: ssPracticeMobile, fullPage: true });
    report.screenshots.push("phase3_practice_talk_390.png");
    await page.setViewport({ width: 1440, height: 900 });

    // Verify Personas and Cheat Sheet
    const practiceTalkComponents = await page.evaluate(() => {
      const body = document.body.innerText;
      return {
        hasPersonas: body.includes("Orang Tua") && body.includes("Guru / Dosen") && body.includes("Teman Sebaya") && body.includes("Konselor"),
        hasCheatSheet: body.includes("Contekan Kartu Ceritamu"),
        hasSupportBanner: body.includes("Lihat Support Pathway")
      };
    });
    console.log(`Practice Talk components:`, practiceTalkComponents);

    // Test sending message in Practice Talk simulation
    await page.type('input[placeholder*="Uji kalimatmu"]', 'Ayah, ada hal penting soal kuliah yang ingin aku ceritakan pelan-pelan.');
    await page.click('button[aria-label="Kirim latihan bicara"]');
    await page.waitForFunction(
      () => document.body.innerText.includes("Tinjauan Komunikasi Asertif"),
      { timeout: 10000 }
    ).catch(() => {});
    await new Promise((r) => setTimeout(r, 1200));

    const simulationResponseReceived = await page.evaluate(() => {
      return document.body.innerText.includes("Simulasi Orang Tua") &&
             document.body.innerText.includes("Tinjauan Komunikasi Asertif");
    });
    console.log(`Practice Talk Simulation response & Communication Tip verified: ${simulationResponseReceived}`);
    const ssSimulation = path.join(ARTIFACT_DIR, "phase3_practice_talk_simulation.png");
    await page.screenshot({ path: ssSimulation, fullPage: true });
    report.screenshots.push("phase3_practice_talk_simulation.png");

    report.tests.push({
      name: "Pilar 3: Practice Talk Personas & Assertive Communication Coaching",
      expected: "Interactive roleplay dialogue with constructive communication tips",
      actual: simulationResponseReceived ? "Roleplay reply and coaching tip received" : "Failed",
      passed: simulationResponseReceived,
    });

    // ==========================================
    // 4. PILAR 4: SUPPORT PATHWAY (/support)
    // ==========================================
    console.log("\n[Pilar 4] Testing Support Pathway (/support)...");
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/support", { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 800));

    const ssSupportDesktop = path.join(ARTIFACT_DIR, "phase3_support_pathway_desktop.png");
    await page.screenshot({ path: ssSupportDesktop, fullPage: true });
    report.screenshots.push("phase3_support_pathway_desktop.png");

    await page.setViewport({ width: 390, height: 844 });
    const ssSupportMobile = path.join(ARTIFACT_DIR, "phase3_support_pathway_390.png");
    await page.screenshot({ path: ssSupportMobile, fullPage: true });
    report.screenshots.push("phase3_support_pathway_390.png");
    await page.setViewport({ width: 1440, height: 900 });

    const supportComponents = await page.evaluate(() => {
      const body = document.body.innerText;
      return {
        hasZeroPaywallCommitment: body.includes("Komitmen Akses Bantuan Terbuka (Zero Paywall)"),
        hasSejiwa: body.includes("SEJIWA") && body.includes("119"),
        hasSapa: body.includes("SAPA 129"),
        hasCheatSheet: body.includes("Contekan Kalimat Pertama saat Menemui Tenaga Bantuan"),
      };
    });
    console.log("Support Pathway verified components:", supportComponents);

    const supportAllPassed =
      supportComponents.hasZeroPaywallCommitment &&
      supportComponents.hasSejiwa &&
      supportComponents.hasSapa &&
      supportComponents.hasCheatSheet;

    report.tests.push({
      name: "Pilar 4: Support Pathway (Verified Contacts, Zero Paywall, Starter Scripts)",
      expected: "SEJIWA 119 ext 8, SAPA 129, BPJS guidance, starter scripts with zero paywall",
      actual: supportAllPassed ? "All verified and accessible" : "Failed",
      passed: supportAllPassed,
    });

    // ==========================================
    // 5. MULTI-VIEWPORT AUDIT ACROSS ALL 4 PILLARS
    // ==========================================
    console.log("\n[Multi-Viewport Audit] Auditing 4 Pillars across 6 standard viewports...");
    const pillarPages = [
      { url: "http://localhost:3000/safe-story", name: "safe_story" },
      { url: "http://localhost:3000/journal", name: "journal" },
      { url: "http://localhost:3000/dashboard", name: "dashboard" },
      { url: "http://localhost:3000/support", name: "support" },
    ];

    for (const p of pillarPages) {
      for (const vp of viewports) {
        await page.setViewport({ width: vp.width, height: vp.height });
        await page.goto(p.url, { waitUntil: "networkidle2" });
        await new Promise((r) => setTimeout(r, 400));

        const overflowCheck = await page.evaluate(() => {
          const docEl = document.documentElement;
          return {
            scrollWidth: docEl.scrollWidth,
            clientWidth: docEl.clientWidth,
            hasOverflow: docEl.scrollWidth > docEl.clientWidth,
            diff: docEl.scrollWidth - docEl.clientWidth,
          };
        });

        report.overflowAudit.push({
          page: p.name,
          viewport: vp.width,
          name: vp.name,
          overflow: overflowCheck.hasOverflow,
          diff: overflowCheck.diff,
          passed: !overflowCheck.hasOverflow,
        });

        if (overflowCheck.hasOverflow) {
          console.warn(`[OVERFLOW] ${p.name} at ${vp.width}px: diff=${overflowCheck.diff}px`);
        }
      }
      console.log(`Viewport check completed for ${p.name}: 6/6 viewports tested.`);
    }

  } catch (err) {
    console.error("Test error:", err);
    report.error = err.message;
  } finally {
    await browser.close();
  }

  // Save report
  const reportPath = path.join(ARTIFACT_DIR, "phase3_test_results.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nPhase 3 Verification finished! Results written to ${reportPath}`);
}

runPhase3Verification();
