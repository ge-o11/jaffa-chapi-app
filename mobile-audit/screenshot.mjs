// Mobile audit screenshot script — Hebrew RTL app at localhost:5174
// Uses playwright-core with explicit chromium executable path
import { chromium } from 'playwright-core';
import path from 'path';
import fs from 'fs';

const CHROMIUM_PATH =
  process.env.LOCALAPPDATA
    ? path.join(process.env.LOCALAPPDATA, 'ms-playwright', 'chromium-1223', 'chrome-win64', 'chrome.exe')
    : '/root/.cache/ms-playwright/chromium-1223/chrome-linux/chrome';

const OUT_DIR = 'C:\\Users\\jorj\\jaffa-chapi-app\\mobile-audit';
const VIEWPORT = { width: 375, height: 812 };
const URL = 'http://localhost:5174';

async function shot(page, name) {
  const file = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`Saved: ${file}`);
}

(async () => {
  const browser = await chromium.launch({
    executablePath: CHROMIUM_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    locale: 'he-IL',
    // RTL
    extraHTTPHeaders: { 'Accept-Language': 'he-IL,he;q=0.9' },
  });

  const page = await context.newPage();

  console.log('Navigating to', URL);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });

  // Brief wait for any animations to settle
  await page.waitForTimeout(1500);

  // 1. Hero section — very top of page
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await shot(page, '01-hero');

  // Helper: scroll to a selector or a pixel offset, wait, screenshot
  async function scrollAndShot(selectorOrOffset, name, extraWait = 600) {
    if (typeof selectorOrOffset === 'number') {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), selectorOrOffset);
    } else {
      try {
        await page.locator(selectorOrOffset).first().scrollIntoViewIfNeeded({ timeout: 5000 });
      } catch {
        // fallback: scroll by a chunk
        await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      }
    }
    await page.waitForTimeout(extraWait);
    await shot(page, name);
  }

  // Get the full page height so we can estimate positions
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log('Total page height:', totalHeight);

  // 2. Menu grid section
  // Try common selectors; fall back to a fraction of total height
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  // Find element that likely is the menu grid
  const menuSel = [
    '[id*="menu" i]',
    '[class*="menu" i]',
    '[id*="grid" i]',
    'section:nth-of-type(2)',
  ];
  let scrolled = false;
  for (const sel of menuSel) {
    try {
      const el = page.locator(sel).first();
      const cnt = await el.count();
      if (cnt > 0) {
        await el.scrollIntoViewIfNeeded({ timeout: 3000 });
        scrolled = true;
        break;
      }
    } catch {}
  }
  if (!scrolled) await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(700);
  await shot(page, '02-menu-grid');

  // 3. Journey / cards section
  const journeySel = [
    '[id*="journey" i]',
    '[id*="card" i]',
    '[class*="journey" i]',
    '[class*="card" i]',
    'section:nth-of-type(3)',
  ];
  scrolled = false;
  for (const sel of journeySel) {
    try {
      const el = page.locator(sel).first();
      const cnt = await el.count();
      if (cnt > 0) {
        await el.scrollIntoViewIfNeeded({ timeout: 3000 });
        scrolled = true;
        break;
      }
    } catch {}
  }
  if (!scrolled) await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(700);
  await shot(page, '03-journey-cards');

  // 4. Spin wheel section
  const spinSel = [
    '[id*="spin" i]',
    '[id*="wheel" i]',
    '[class*="spin" i]',
    '[class*="wheel" i]',
    'section:nth-of-type(4)',
  ];
  scrolled = false;
  for (const sel of spinSel) {
    try {
      const el = page.locator(sel).first();
      const cnt = await el.count();
      if (cnt > 0) {
        await el.scrollIntoViewIfNeeded({ timeout: 3000 });
        scrolled = true;
        break;
      }
    } catch {}
  }
  if (!scrolled) await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(700);
  await shot(page, '04-spin-wheel');

  // 5. Store section
  const storeSel = [
    '[id*="store" i]',
    '[id*="shop" i]',
    '[class*="store" i]',
    'section:nth-of-type(5)',
  ];
  scrolled = false;
  for (const sel of storeSel) {
    try {
      const el = page.locator(sel).first();
      const cnt = await el.count();
      if (cnt > 0) {
        await el.scrollIntoViewIfNeeded({ timeout: 3000 });
        scrolled = true;
        break;
      }
    } catch {}
  }
  if (!scrolled) await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(700);
  await shot(page, '05-store');

  // 6. About section
  const aboutSel = [
    '[id*="about" i]',
    '[class*="about" i]',
    'section:nth-of-type(6)',
  ];
  scrolled = false;
  for (const sel of aboutSel) {
    try {
      const el = page.locator(sel).first();
      const cnt = await el.count();
      if (cnt > 0) {
        await el.scrollIntoViewIfNeeded({ timeout: 3000 });
        scrolled = true;
        break;
      }
    } catch {}
  }
  if (!scrolled) await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(700);
  await shot(page, '06-about');

  // 7. Tours section
  const toursSel = [
    '[id*="tour" i]',
    '[class*="tour" i]',
    'section:nth-of-type(7)',
  ];
  scrolled = false;
  for (const sel of toursSel) {
    try {
      const el = page.locator(sel).first();
      const cnt = await el.count();
      if (cnt > 0) {
        await el.scrollIntoViewIfNeeded({ timeout: 3000 });
        scrolled = true;
        break;
      }
    } catch {}
  }
  if (!scrolled) await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(700);
  await shot(page, '07-tours');

  // 8. Community section
  const communitySel = [
    '[id*="community" i]',
    '[id*="contact" i]',
    '[class*="community" i]',
    'section:nth-of-type(8)',
    'footer',
  ];
  scrolled = false;
  for (const sel of communitySel) {
    try {
      const el = page.locator(sel).first();
      const cnt = await el.count();
      if (cnt > 0) {
        await el.scrollIntoViewIfNeeded({ timeout: 3000 });
        scrolled = true;
        break;
      }
    } catch {}
  }
  if (!scrolled) await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(700);
  await shot(page, '08-community');

  await browser.close();
  console.log('All screenshots done.');
})();
