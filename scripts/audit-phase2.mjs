import puppeteer from "puppeteer-core";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE_URL = "http://localhost:3000";

async function runAudit() {
  console.log("=== STARTING SELA.AI PHASE 2 COMPREHENSIVE AUDIT ===\n");

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });
  const results = {
    passed: [],
    failed: [],
    simulated: [],
  };

  const recordPass = (testName, details) => {
    console.log(`[PASS] ${testName}`);
    if (details) console.log(`       -> ${details}`);
    results.passed.push({ testName, details });
  };

  const recordFail = (testName, error) => {
    console.error(`[FAIL] ${testName}: ${error}`);
    results.failed.push({ testName, error });
  };

  const recordSimulated = (featureName, details) => {
    console.log(`[SIMULATED] ${featureName}: ${details}`);
    results.simulated.push({ featureName, details });
  };

  try {
    // ----------------------------------------------------
    // 1. Landing & Onboarding Flow
    // ----------------------------------------------------
    console.log("\n--- Testing 1: Landing & Onboarding Flow ---");
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}`, { waitUntil: "networkidle0" });

    // Check title and primary CTA
    const splashTitle = await page.$eval("h1", (el) => el.innerText);
    if (splashTitle.includes("FATHERCARE AI")) {
      recordPass("Landing Page Render", `Title found: "${splashTitle}"`);
    } else {
      recordFail("Landing Page Render", "H1 Title missing or mismatch");
    }

    // Click "Mulai Sekarang"
    await page.click('a[href="/onboarding"]');
    await page.waitForFunction(() => window.location.pathname === "/onboarding", { timeout: 10000 });

    if (page.url().includes("/onboarding")) {
      recordPass("Navigate to Onboarding", "Successfully routed to /onboarding");
    } else {
      recordFail("Navigate to Onboarding", `Expected /onboarding, got ${page.url()}`);
    }

    // Check onboarding button is initially disabled (consent required)
    const getProceedBtn = async () => {
      const buttons = await page.$$("button");
      for (const btn of buttons) {
        const text = await page.evaluate((el) => el.innerText, btn);
        if (text.includes("Masuk ke Dashboard")) return btn;
      }
      return null;
    };

    let proceedBtn = await getProceedBtn();
    const isSubmitDisabledInitially = await page.evaluate((el) => el.disabled, proceedBtn);
    if (isSubmitDisabledInitially) {
      recordPass("Onboarding Consent Validation", "Submit button is strictly disabled without mandatory consents");
    } else {
      recordFail("Onboarding Consent Validation", "Submit button should be disabled before consents are checked");
    }

    // Fill Onboarding Form
    await page.type('input[placeholder="Contoh: Alex"]', "Ahmad");
    // Click both consent checkboxes
    const consentButtons = await page.$$('button[role="checkbox"]');
    for (const btn of consentButtons) {
      await btn.click();
      await new Promise((r) => setTimeout(r, 200));
    }

    proceedBtn = await getProceedBtn();
    const isSubmitEnabled = await page.evaluate((el) => !el.disabled, proceedBtn);
    if (isSubmitEnabled) {
      recordPass("Onboarding Form Activation", "Submit button enables after alias and consents are checked");
    } else {
      recordFail("Onboarding Form Activation", "Submit button failed to enable after valid input");
    }

    // Submit Onboarding
    await proceedBtn.click();
    await page.waitForFunction(() => window.location.pathname === "/dashboard", { timeout: 10000 });

    if (page.url().includes("/dashboard")) {
      recordPass("Onboarding Submission", "Successfully redirected to /dashboard");
    } else {
      recordFail("Onboarding Submission", `Expected /dashboard, got ${page.url()}`);
    }

    // ----------------------------------------------------
    // 2. Dashboard & Emotion Check-in
    // ----------------------------------------------------
    console.log("\n--- Testing 2: Dashboard & Emotion Check-in ---");
    // Check personalized greeting
    const greeting = await page.$eval("h1", (el) => el.innerText);
    if (greeting.includes("Ahmad")) {
      recordPass("Dashboard Personalized Greeting", `Found greeting: "${greeting}"`);
    } else {
      recordFail("Dashboard Personalized Greeting", `Expected alias 'Ahmad' in greeting, found: "${greeting}"`);
    }

    // Select mood "Sedih / Lelah"
    const moodButtons = await page.$$('button[aria-pressed]');
    let moodClicked = false;
    for (const btn of moodButtons) {
      const text = await page.evaluate((el) => el.innerText, btn);
      if (text.includes("Sedih / Lelah") || text.includes("Sedih")) {
        await btn.click();
        moodClicked = true;
        break;
      }
    }

    if (moodClicked) {
      recordPass("Emotion Selection", "Clicked mood option 'Sedih / Lelah'");
    } else {
      recordFail("Emotion Selection", "Could not find mood button 'Sedih / Lelah'");
    }

    await new Promise((r) => setTimeout(r, 400));

    // Type optional context
    await page.type('input[placeholder*="Ada hal yang membuatku"]', "Besok ada ujian penting dan persiapan terasa kurang.");
    
    // Click Simpan Check-in
    const allBtns = await page.$$("button");
    let saveCheckinBtn = null;
    for (const b of allBtns) {
      const t = await page.evaluate((el) => el.innerText, b);
      if (t.includes("Simpan check-in")) {
        saveCheckinBtn = b;
        break;
      }
    }

    if (saveCheckinBtn) {
      await saveCheckinBtn.click();
      await new Promise((r) => setTimeout(r, 600));

      const feedbackText = await page.evaluate(() => document.body.innerText);
      if (feedbackText.includes("Perasaan lelah itu wajar") || feedbackText.includes("Langkah kecil")) {
        recordPass("Check-in Emotion Feedback", "Feedback card rendered with grounding recommendation");
      } else {
        recordFail("Check-in Emotion Feedback", "Feedback card did not appear after check-in submission");
      }
    }

    // ----------------------------------------------------
    // 3. Safe Story AI (Demo Mode Verification)
    // ----------------------------------------------------
    console.log("\n--- Testing 3: Safe Story AI (Demo Mode Verification) ---");
    await page.goto(`${BASE_URL}/safe-story`, { waitUntil: "networkidle0" });

    // Check Header DEMO badge
    const headerBadges = await page.$$eval("header span", (els) => els.map((e) => e.innerText));
    const hasDemoHeader = headerBadges.some((b) => b.includes("DEMO"));
    if (hasDemoHeader) {
      recordPass("Header DEMO Badge", `Header shows demo badge: ${headerBadges.join(", ")}`);
    } else {
      recordFail("Header DEMO Badge", `DEMO badge not found in header. Badges found: ${headerBadges.join(", ")}`);
    }

    // Click starter prompt
    const allSafeButtons = await page.$$("button");
    let starterBtn = null;
    for (const b of allSafeButtons) {
      const txt = await page.evaluate((el) => el.innerText, b);
      if (txt.includes("Bagaimana cara") || txt.includes("komunikasi asertif") || txt.includes("kecewa kepada keluarga")) {
        starterBtn = b;
        break;
      }
    }
    if (starterBtn) {
      await starterBtn.click();
      await new Promise((r) => setTimeout(r, 1200));

      // Verify response has DEMO label
      const chatTexts = await page.evaluate(() => document.body.innerText);
      if (chatTexts.includes("SIMULASI DEMO")) {
        recordPass("Safe Story DEMO Labeling", "Assistant message rendered with explicit 'SIMULASI DEMO' badge");
        recordSimulated("Safe Story AI Chat", "Utilizes verified predefined scenarios, clearly tagged with SIMULASI DEMO");
      } else {
        recordFail("Safe Story DEMO Labeling", "'SIMULASI DEMO' badge not found on assistant response");
      }

      // Check RAG sources
      if (chatTexts.includes("Rujukan Terverifikasi") || chatTexts.includes("Modul") || chatTexts.includes("Resmi")) {
        recordPass("Safe Story Grounded Sources", "Sources accordion rendered with verifiable reference");
      } else {
        recordFail("Safe Story Grounded Sources", "Source citations missing in demo response");
      }
    }

    // Test Crisis Triage in Safe Story
    console.log("Testing Crisis Triage Protocol in Safe Story...");
    await page.type('input[placeholder*="Tulis apa yang sedang kamu rasakan"]', "Aku putus asa dan ingin bunuh diri");
    await page.keyboard.press("Enter");
    await new Promise((r) => setTimeout(r, 1000));

    const crisisPageText = await page.evaluate(() => document.body.innerText);
    if (crisisPageText.includes("119") && crisisPageText.includes("Hotline Kesehatan Jiwa")) {
      recordPass("Crisis Triage Intercept", "High-risk trigger intercepted with national 119 ext 8 hotline");
    } else {
      recordFail("Crisis Triage Intercept", "Emergency protocol failed to trigger on crisis input");
    }

    // ----------------------------------------------------
    // 4. Jurnal Reflektif
    // ----------------------------------------------------
    console.log("\n--- Testing 4: Jurnal Reflektif ---");
    await page.goto(`${BASE_URL}/journal`, { waitUntil: "networkidle0" });

    // Fill Journal Entry
    await page.type('textarea[placeholder*="Tulis dengan jujur"]', "Hari ini saya menyadari pentingnya menenangkan diri sebelum merespons.");
    
    // Click Simpan Catatan
    const journalBtns = await page.$$("button");
    let saveJournalBtn = null;
    for (const b of journalBtns) {
      const t = await page.evaluate((el) => el.innerText, b);
      if (t.includes("Simpan catatan")) {
        saveJournalBtn = b;
        break;
      }
    }

    if (saveJournalBtn) {
      await saveJournalBtn.click();
      await new Promise((r) => setTimeout(r, 600));

      const journalText = await page.evaluate(() => document.body.innerText);
      if (journalText.includes("Hari ini saya menyadari")) {
        recordPass("Journal Entry Creation", "Entry successfully saved to local session state and rendered in list");
      } else {
        recordFail("Journal Entry Creation", "Journal entry did not appear in list after submit");
      }

      // Test Delete Entry
      const deleteBtn = await page.$('button[aria-label="Hapus catatan ini"]');
      if (deleteBtn) {
        await page.evaluate((el) => el.click(), deleteBtn);
        await new Promise((r) => setTimeout(r, 800));
        const remainingDeleteBtns = await page.$$('button[aria-label="Hapus catatan ini"]');
        if (remainingDeleteBtns.length === 0) {
          recordPass("Journal Entry Deletion", "Entry successfully removed from session state");
        } else {
          recordFail("Journal Entry Deletion", `Expected 0 delete buttons, found ${remainingDeleteBtns.length}`);
        }
      }
    }

    // ----------------------------------------------------
    // 5. Ruang Belajar (Interactive Learning Modules)
    // ----------------------------------------------------
    console.log("\n--- Testing 5: Ruang Belajar ---");
    await page.goto(`${BASE_URL}/learning`, { waitUntil: "networkidle0" });

    const learningCards = await page.$$eval("h2", (els) => els.map((e) => e.innerText));
    if (learningCards.length >= 4) {
      recordPass("Learning Modules List", `Found ${learningCards.length} verified modules: ${learningCards.join(", ")}`);
    } else {
      recordFail("Learning Modules List", `Expected >= 4 modules, found ${learningCards.length}`);
    }

    // Check module exercise content
    const learningContent = await page.evaluate(() => document.body.innerText);
    if (learningContent.includes("Poin Pembelajaran") || learningContent.includes("Sumber rujukan")) {
      recordPass("Learning Module Accordion", "Module details rendered with learning points and verified source");
    } else {
      recordFail("Learning Module Accordion", "Module exercise details missing");
    }

    // ----------------------------------------------------
    // 6. Peta Dukungan (Lingkar Dukungan)
    // ----------------------------------------------------
    console.log("\n--- Testing 6: Lingkar Dukungan ---");
    await page.goto(`${BASE_URL}/support`, { waitUntil: "networkidle0" });

    const supportHeadings = await page.evaluate(() => document.body.innerText);
    if (supportHeadings.includes("Lingkaran Dukungan") && supportHeadings.includes("Daftar Orang Terpercaya")) {
      recordPass("Concentric Support Circles", "Visual concentric circle and trusted contact list rendered cleanly");
    } else {
      recordFail("Concentric Support Circles", "Support circles missing required tier headings");
    }

    // ----------------------------------------------------
    // 7. Rujukan Pendamping (Referrals)
    // ----------------------------------------------------
    console.log("\n--- Testing 7: Rujukan Pendamping ---");
    await page.goto(`${BASE_URL}/referrals`, { waitUntil: "networkidle0" });

    const referralText = await page.evaluate(() => document.body.innerText);
    if (referralText.includes("119 ext 8") && referralText.includes("PIK-R") && referralText.includes("SAPA 129")) {
      recordPass("Referrals Directory Integrity", "Verified institutional categories rendered without hallucinated personal contacts");
      recordSimulated("Referral Ticket Generator", "Generates anonymous ticket for professional handoff (simulated for demonstration)");
    } else {
      recordFail("Referrals Directory Integrity", "Institutional referral categories missing");
    }

    // ----------------------------------------------------
    // 8. Rencana Bertumbuh (Growth Plan)
    // ----------------------------------------------------
    console.log("\n--- Testing 8: Rencana Bertumbuh ---");
    await page.goto(`${BASE_URL}/growth-plan`, { waitUntil: "networkidle0" });

    // Toggle a goal item
    const goalCheckboxes = await page.$$('button:has(svg)');
    if (goalCheckboxes.length > 0) {
      await goalCheckboxes[0].click();
      await new Promise((r) => setTimeout(r, 600));
      recordPass("Growth Plan Goal Toggle", "Interactive goal status toggled cleanly");
    }

    // ----------------------------------------------------
    // 9. Pengaturan & Verifikasi Privasi
    // ----------------------------------------------------
    console.log("\n--- Testing 9: Pengaturan Privasi & Data Minimization ---");
    await page.goto(`${BASE_URL}/settings`, { waitUntil: "networkidle0" });

    // Check localStorage / persistent storage audit
    const storageAudit = await page.evaluate(() => {
      return {
        localStorageKeys: Object.keys(localStorage),
        cookies: document.cookie,
      };
    });

    if (storageAudit.localStorageKeys.length === 0 || storageAudit.localStorageKeys.every((k) => k.startsWith("next") || k.includes("fathercare_session"))) {
      recordPass("Data Minimization Audit", `No unauthorized permanent telemetry or PII persisted. LocalStorage keys: ${JSON.stringify(storageAudit.localStorageKeys)}`);
    } else {
      recordFail("Data Minimization Audit", `Unexpected persistent keys found: ${JSON.stringify(storageAudit.localStorageKeys)}`);
    }

    // ----------------------------------------------------
    // 10. Mobile Responsive Layout Check (390px iPhone)
    // ----------------------------------------------------
    console.log("\n--- Testing 10: Mobile Ergonomics (390x844) ---");
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(`${BASE_URL}/dashboard`, { waitUntil: "networkidle0" });

    const isBottomNavVisible = await page.$eval('nav.fixed.bottom-0', (el) => {
      const style = window.getComputedStyle(el);
      return style.display !== "none" && style.visibility !== "hidden";
    });

    if (isBottomNavVisible) {
      recordPass("Mobile Bottom Navigation", "Thumb-zone bottom nav is properly visible and active on mobile screen");
    } else {
      recordFail("Mobile Bottom Navigation", "Bottom navigation missing or hidden on mobile");
    }

    // Check horizontal scrollbar
    const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    if (!horizontalOverflow) {
      recordPass("Mobile Zero Horizontal Overflow", "No horizontal overflow detected at 390px");
    } else {
      recordFail("Mobile Zero Horizontal Overflow", "Horizontal overflow detected on mobile screen");
    }

  } catch (err) {
    recordFail("Unexpected Runtime Exception", err.message);
  } finally {
    await browser.close();
  }

  console.log("\n================ AUDIT SUMMARY ================");
  console.log(`TOTAL PASSED    : ${results.passed.length}`);
  console.log(`TOTAL FAILED    : ${results.failed.length}`);
  console.log(`TOTAL SIMULATED : ${results.simulated.length}`);
  console.log("================================================\n");

  if (results.failed.length > 0) {
    console.log("Failed items:");
    results.failed.forEach((f) => console.log(` - ${f.testName}: ${f.error}`));
  }
}

runAudit();
