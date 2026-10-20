import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function verifySafeStoryFix() {
  console.log('Testing Safe Story AI live response for "siapa kamu"...');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000/safe-story', { waitUntil: 'networkidle0' });

  // Type "siapa kamu"
  const inputSelector = "input[placeholder*='rasakan']";
  await page.waitForSelector(inputSelector);
  await page.type(inputSelector, 'siapa kamu');

  // Click submit
  const sendBtnSelector = "button[aria-label='Kirim pesan']";
  await page.click(sendBtnSelector);

  console.log('Clicked send. Checking for consent modal...');
  await page.waitForTimeout ? page.waitForTimeout(1000) : new Promise(r => setTimeout(r, 1000));

  // Check if consent modal is open and click "Setuju dan Kirim"
  const consentBtn = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent.includes('Setuju dan Kirim'));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });

  if (consentBtn) {
    console.log('Consent modal detected and confirmed: "Setuju dan Kirim" clicked!');
  } else {
    console.log('Consent already granted or not needed.');
  }

  console.log('Waiting for AI response from Google Gemini...');

  // Wait for the new AI message to arrive (up to 60s)
  await page.waitForFunction(() => {
    const messages = Array.from(document.querySelectorAll("div[class*='rounded-2xl'] p.whitespace-pre-wrap, p.whitespace-pre-wrap"));
    return messages.some(m => {
      const txt = m.textContent.trim();
      return !txt.includes('Halo Alex') && !txt.includes('siapa kamu') && txt.length > 20;
    });
  }, { timeout: 60000 });

  console.log('AI response successfully arrived in the UI!');

  // Extract messages and status badges
  const chatData = await page.evaluate(() => {
    const bubbles = Array.from(document.querySelectorAll("div[class*='rounded-2xl'] p.whitespace-pre-wrap"));
    const badges = Array.from(document.querySelectorAll("span.inline-flex, .badge")).map(b => b.textContent.trim());
    return {
      messages: bubbles.map(b => b.textContent.trim()),
      badges,
    };
  });

  console.log('\n--- CHAT VERIFICATION RESULT ---');
  console.log('Total chat messages:', chatData.messages.length);
  chatData.messages.forEach((msg, idx) => {
    console.log(`[Msg ${idx + 1}]:`, msg.substring(0, 120) + '...');
  });
  console.log('Badges found in chat:', chatData.badges);

  // Take screenshot of the resolved live chat
  const screenshotPath = path.resolve('public/screenshots/typography/SafeStory_Fixed_Live.png');
  await page.screenshot({ path: screenshotPath });
  console.log('\nScreenshot saved to:', screenshotPath);

  // Copy to artifact directory
  const artifactScreenshot = 'C:/Users/acer/.gemini/antigravity/brain/0bb96566-b8c2-4336-b95f-c0a62309be5d/screenshots/SafeStory_Fixed_Live.png';
  fs.copyFileSync(screenshotPath, artifactScreenshot);

  await browser.close();
}

verifySafeStoryFix().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
