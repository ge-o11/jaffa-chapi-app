// Mobile audit screenshot script — Hebrew RTL app at localhost:5174
// Uses playwright-core with the already-cached chromium browser

const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const OUT_DIR = 'C:\\Users\\jorj\\jaffa-chapi-app\\mobile-audit';
const VIEWPORT = { width: 375, height: 812 };
const URL = 'http://localhost:5174';

async function shot(page, name) {
  const file = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`Saved: ${file}`);
}

async function tryScrollToSelector(page, selectors) {
  for (const sel of selectors) {
    try {
      const el = page.locator(sel).first();
      const cnt = await el.count();
      if (cnt > 0) {
        await el.scrollIntoViewIfNeeded({ timeout: 3000 });
        return true;
      }
    } catch {}
  }
  return false;
}

(async () => {
  const executablePath = require('playwright-core').chromium.executablePath();
  console.log('Using chromium:', executablePath);

  const browser = await chromium.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    locale: 'he-IL',
    extraHTTPHeaders: { 'Accept-Language': 'he-IL,he;q=0.9' },
  });

  const page = await context.newPage();

  console.log('Navigating to', URL);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Log all section IDs and sections visible on the page for debugging
  const sections = await page.evaluate(() => {
    const els = document.querySelectorAll('section, [id], [class*="section"]');
    return Array.from(els).slice(0, 30).map(el => ({
      tag: el.tagName,
      id: el.id,
      cls: el.className.slice(0, 80),
      top: el.getBoundingClientRect().top + window.scrollY,
    }));
  });
  console.log('Page sections/elements:');
  sections.forEach(s => console.log(` [${s.tag}] id="${s.id}" cls="${s.cls}" top=${Math.round(s.top)}`));

  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log('Total page height:', totalHeight);

  // 1. Hero — top of page
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  await shot(page, '01-hero');

  // 2. Menu grid section
  let found = await tryScrollToSelector(page, [
    '#menu', '#grid', '#categories', '#services',
    '[id*="menu" i]', '[id*="grid" i]', '[id*="categor" i]',
    '[class*="MenuGrid" i]', '[class*="menu-grid" i]',
    'section:nth-of-type(2)',
  ]);
  if (!found) await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(700);
  await shot(page, '02-menu-grid');

  // 3. Journey / cards section
  found = await tryScrollToSelector(page, [
    '#journey', '#cards', '#steps', '#how',
    '[id*="journey" i]', '[id*="card" i]', '[id*="step" i]',
    '[class*="Journey" i]', '[class*="Cards" i]',
    'section:nth-of-type(3)',
  ]);
  if (!found) await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(700);
  await shot(page, '03-journey-cards');

  // 4. Spin wheel section
  found = await tryScrollToSelector(page, [
    '#spin', '#wheel', '#spinner', '#prize',
    '[id*="spin" i]', '[id*="wheel" i]', '[id*="prize" i]',
    '[class*="Spin" i]', '[class*="Wheel" i]',
    'section:nth-of-type(4)',
  ]);
  if (!found) await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(700);
  await shot(page, '04-spin-wheel');

  // 5. Store section
  found = await tryScrollToSelector(page, [
    '#store', '#shop', '#products', '#marketplace',
    '[id*="store" i]', '[id*="shop" i]', '[id*="product" i]',
    '[class*="Store" i]', '[class*="Shop" i]',
    'section:nth-of-type(5)',
  ]);
  if (!found) await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(700);
  await shot(page, '05-store');

  // 6. About section
  found = await tryScrollToSelector(page, [
    '#about', '#about-us', '#story',
    '[id*="about" i]', '[class*="About" i]',
    'section:nth-of-type(6)',
  ]);
  if (!found) await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(700);
  await shot(page, '06-about');

  // 7. Tours section
  found = await tryScrollToSelector(page, [
    '#tours', '#tour', '#experiences',
    '[id*="tour" i]', '[class*="Tour" i]',
    'section:nth-of-type(7)',
  ]);
  if (!found) await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(700);
  await shot(page, '07-tours');

  // 8. Community section (last section / near bottom)
  found = await tryScrollToSelector(page, [
    '#community', '#contact', '#join', '#social',
    '[id*="community" i]', '[id*="contact" i]',
    '[class*="Community" i]', '[class*="Contact" i]',
    'section:nth-of-type(8)',
    'footer',
  ]);
  if (!found) await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(700);
  await shot(page, '08-community');

  await browser.close();
  console.log('\nAll screenshots complete.');
})().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
