import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const ARTIFACT_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\0bb96566-b8c2-4336-b95f-c0a62309be5d\\screenshots";

if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { width: 320, height: 640, label: "320_mobile_narrow" },
  { width: 375, height: 667, label: "375_mobile_standard" },
  { width: 390, height: 844, label: "390_mobile_modern" },
  { width: 768, height: 1024, label: "768_tablet_portrait" },
  { width: 1024, height: 768, label: "1024_desktop_small" },
  { width: 1440, height: 900, label: "1440_desktop_widescreen" },
];

async function runPhase5Verification() {
  console.log("=== SELA.AI Phase 5 (Freemium & Transparent Supporter Model) Verification Suite ===\n");

  const report = {
    timestamp: new Date().toISOString(),
    tests: [],
    screenshots: [],
    viewportAudits: [],
  };

  // ==========================================
  // 1. SERVER-AUTHORITATIVE ENTITLEMENTS & PRICING
  // ==========================================
  console.log("[Test 1] Testing Server-Authoritative Entitlements & Pricing Enforced...");
  const entRes = await fetch("http://localhost:3000/api/payment/entitlements");
  const entData = await entRes.json();

  const isFreeDefault =
    entData.entitlements &&
    entData.entitlements.plan === "free" &&
    entData.entitlements.monthlyAiLimit === 10 &&
    entData.entitlements.monthlyPracticeTalkLimit === 2 &&
    entData.entitlements.maxActiveStoryCards === 1 &&
    entData.entitlements.supportPathwayAlwaysFree === true &&
    entData.entitlements.safetyInterventionsAlwaysFree === true;

  console.log(`Default Public Entitlements: ${JSON.stringify(entData.entitlements)}`);
  console.log(`Free Plan Non-Paywalled Guarantees Verified: ${isFreeDefault}`);

  report.tests.push({
    name: "Server-Authoritative Entitlements & Non-Paywalled Core Access",
    expected: "Free defaults: 10 AI, 2 Practice, 1 Card; Support Pathway & safety strictly free",
    actual: isFreeDefault ? "Verified defaults & guarantees" : "Mismatch",
    passed: isFreeDefault,
  });

  // ==========================================
  // 2. CHECKOUT ORDER CREATION & AUTH PROTECTION
  // ==========================================
  console.log("\n[Test 2] Testing Checkout Order Security & Authorization...");
  // Attempt unauthenticated checkout
  const unauthCheckout = await fetch("http://localhost:3000/api/payment/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId: "premium_30d" }),
  });
  const unauthBlocked = unauthCheckout.status === 401;
  console.log(`Unauthenticated Checkout Blocked: ${unauthBlocked} (Status: ${unauthCheckout.status})`);

  // Login Alex to get valid session cookie
  const loginRes = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "alex@sela.ai", password: "Password123!" }),
  });
  const cookieHeader = loginRes.headers.get("set-cookie") || "";
  const authSessionCookie = cookieHeader.split(";")[0];

  // Perform authenticated checkout
  const authCheckout = await fetch("http://localhost:3000/api/payment/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: authSessionCookie,
    },
    body: JSON.stringify({ planId: "premium_30d", paymentMethod: "qris" }),
  });
  const checkoutData = await authCheckout.json();
  const orderCreated =
    checkoutData.success &&
    checkoutData.transaction &&
    checkoutData.transaction.id.startsWith("ORD-") &&
    checkoutData.transaction.amount === 19000 &&
    checkoutData.transaction.status === "pending";

  console.log(`Authenticated Checkout Created: Order ID ${checkoutData.transaction?.id}, Amount: ${checkoutData.transaction?.amount}`);

  report.tests.push({
    name: "Checkout API Security & Order Generation",
    expected: "HTTP 401 unauthenticated; creates Rp19.000 pending order when authenticated",
    actual: unauthBlocked && orderCreated ? "Order created securely" : "Failed",
    passed: unauthBlocked && orderCreated,
  });

  // ==========================================
  // 3. WEBHOOK PROCESSING & IDEMPOTENCY
  // ==========================================
  console.log("\n[Test 3] Testing Webhook Verification, Idempotency, & Subscription Activation...");
  const orderId = checkoutData.transaction.id;

  // Webhook settlement call 1
  const webhookRes1 = await fetch("http://localhost:3000/api/payment/webhook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      order_id: orderId,
      transaction_status: "settlement",
      gross_amount: 19000,
    }),
  });
  const whData1 = await webhookRes1.json();
  const firstActivation = whData1.internalStatus === "paid" && whData1.updatedEntitlement === true;

  // Duplicate webhook call 2 (idempotency test)
  const webhookRes2 = await fetch("http://localhost:3000/api/payment/webhook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      order_id: orderId,
      transaction_status: "settlement",
      gross_amount: 19000,
    }),
  });
  const whData2 = await webhookRes2.json();
  const duplicateIgnored = whData2.internalStatus === "paid" && whData2.updatedEntitlement === false;

  console.log(`Webhook Call 1 Activation: ${firstActivation}`);
  console.log(`Webhook Call 2 Idempotency (Duplicate ignored): ${duplicateIgnored}`);

  report.tests.push({
    name: "Webhook Idempotency & Entitlement Activation",
    expected: "First webhook activates entitlement; duplicate webhook ignored safely",
    actual: firstActivation && duplicateIgnored ? "Idempotent processing verified" : "Failed",
    passed: firstActivation && duplicateIgnored,
  });

  // ==========================================
  // 4. BROWSER UI VERIFICATION & 6-VIEWPORT AUDIT
  // ==========================================
  console.log("\n[Test 4] Executing Browser UI Verification across 6 Standard Viewports...");
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);

  try {
    // Audit /harga (Public Pricing) across all 6 viewports
    console.log("Auditing /harga across 6 viewports...");
    for (const vp of VIEWPORTS) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto("http://localhost:3000/harga", { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 600));

      const overflow = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          diff: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
      });

      const ssPath = path.join(ARTIFACT_DIR, `phase5_harga_${vp.label}.png`);
      await page.screenshot({ path: ssPath, fullPage: true });
      report.screenshots.push(`phase5_harga_${vp.label}.png`);

      const passed = overflow.diff === 0;
      report.viewportAudits.push({
        page: "/harga",
        viewport: vp.label,
        width: vp.width,
        overflowDiff: overflow.diff,
        passed,
      });

      console.log(`  [${vp.width}px /harga] Diff: ${overflow.diff}px -> ${passed ? "PASS" : "FAIL"}`);
    }

    // Login Alex in browser
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/masuk", { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 600));
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', "alex@sela.ai");
    await page.type('input[type="password"]', "Password123!");
    await page.click('button[type="submit"]');
    await page.waitForFunction(
      () => window.location.pathname.startsWith('/app') || window.location.pathname.startsWith('/onboarding'),
      { timeout: 10000 }
    );

    // Audit /app/paket across 6 viewports
    console.log("\nAuditing /app/paket across 6 viewports...");
    for (const vp of VIEWPORTS) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto("http://localhost:3000/app/paket", { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 600));

      const overflow = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          diff: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
      });

      const ssPath = path.join(ARTIFACT_DIR, `phase5_paket_${vp.label}.png`);
      await page.screenshot({ path: ssPath, fullPage: true });
      report.screenshots.push(`phase5_paket_${vp.label}.png`);

      const passed = overflow.diff === 0;
      report.viewportAudits.push({
        page: "/app/paket",
        viewport: vp.label,
        width: vp.width,
        overflowDiff: overflow.diff,
        passed,
      });

      console.log(`  [${vp.width}px /app/paket] Diff: ${overflow.diff}px -> ${passed ? "PASS" : "FAIL"}`);
    }

    // Audit /app/pembayaran across 6 viewports
    console.log("\nAuditing /app/pembayaran across 6 viewports...");
    for (const vp of VIEWPORTS) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto("http://localhost:3000/app/pembayaran", { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 600));

      const overflow = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          diff: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
      });

      const ssPath = path.join(ARTIFACT_DIR, `phase5_pembayaran_${vp.label}.png`);
      await page.screenshot({ path: ssPath, fullPage: true });
      report.screenshots.push(`phase5_pembayaran_${vp.label}.png`);

      const passed = overflow.diff === 0;
      report.viewportAudits.push({
        page: "/app/pembayaran",
        viewport: vp.label,
        width: vp.width,
        overflowDiff: overflow.diff,
        passed,
      });

      console.log(`  [${vp.width}px /app/pembayaran] Diff: ${overflow.diff}px -> ${passed ? "PASS" : "FAIL"}`);
    }

    // ==========================================
    // 5. INTERACTIVE CHECKOUT MODAL FLOW
    // ==========================================
    console.log("\n[Test 5] Testing Interactive Checkout Modal Flow in Browser...");
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/harga", { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 800));

    // Click "Pilih Premium" or "Perpanjang Masa Aktif"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const premBtn = btns.find(b => b.textContent.includes('Pilih Premium') || b.textContent.includes('Perpanjang Masa Aktif'));
      if (premBtn) premBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    // Verify modal is open
    const modalVisible = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      return !!modal && modal.innerText.includes("SELA Supporter");
    });
    console.log(`Checkout Modal Rendered: ${modalVisible}`);

    // Capture screenshot of Checkout Modal
    const ssModal = path.join(ARTIFACT_DIR, "phase5_checkout_modal.png");
    await page.screenshot({ path: ssModal });
    report.screenshots.push("phase5_checkout_modal.png");

    // Agree to terms checkbox
    await page.evaluate(() => {
      const cb = document.querySelector('input[type="checkbox"]');
      if (cb && !cb.checked) cb.click();
    });
    await new Promise((r) => setTimeout(r, 300));

    // Click "Lanjut ke Pembayaran"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const lanjutBtn = btns.find(b => b.textContent.includes('Lanjut ke Pembayaran'));
      if (lanjutBtn) lanjutBtn.click();
    });
    await new Promise((r) => setTimeout(r, 1200));

    // Verify Sandbox Simulator screen
    const sandboxScreen = await page.evaluate(() => {
      return document.body.innerText.includes("Mode Sandbox") && document.body.innerText.includes("Simulasikan Bayar Berhasil");
    });
    console.log(`Sandbox Payment Simulator Screen Active: ${sandboxScreen}`);

    // Click "Simulasikan Bayar Berhasil (Sandbox)"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const simBtn = btns.find(b => b.textContent.includes('Simulasikan Bayar Berhasil'));
      if (simBtn) simBtn.click();
    });
    await new Promise((r) => setTimeout(r, 1500));

    // Verify Success Screen
    const successScreen = await page.evaluate(() => {
      return document.body.innerText.includes("Dukunganmu Diterima") || document.body.innerText.includes("SELA Supporter Premium");
    });
    console.log(`Payment Success Screen Verified: ${successScreen}`);

    const ssSuccess = path.join(ARTIFACT_DIR, "phase5_payment_success_modal.png");
    await page.screenshot({ path: ssSuccess });
    report.screenshots.push("phase5_payment_success_modal.png");

    report.tests.push({
      name: "Interactive Checkout & Sandbox Payment Simulator",
      expected: "Modal opens, displays server price, allows terms confirmation, and updates plan",
      actual: modalVisible && sandboxScreen && successScreen ? "Full checkout flow verified" : "Failed",
      passed: modalVisible && sandboxScreen && successScreen,
    });

  } catch (err) {
    console.error("Browser UI verification error:", err);
    report.error = err.message;
  } finally {
    await browser.close();
  }

  // Summary
  const allViewportsPassed = report.viewportAudits.every((v) => v.passed);
  report.tests.push({
    name: "Multi-Viewport Layout Integrity (3 Pages x 6 Viewports = 18 Audits)",
    expected: "0px horizontal overflow on 320, 375, 390, 768, 1024, 1440 px for /harga, /app/paket, /app/pembayaran",
    actual: allViewportsPassed ? "18/18 Viewport checks passed with 0px diff" : "Overflow flagged",
    passed: allViewportsPassed,
  });

  const reportPath = path.join(ARTIFACT_DIR, "phase5_test_results.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nPhase 5 Verification finished! Results written to ${reportPath}`);
}

runPhase5Verification();
