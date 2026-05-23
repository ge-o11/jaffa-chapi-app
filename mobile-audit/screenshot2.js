// Comprehensive mobile audit — Hebrew RTL Jaffa CHAPI app
// App is a 5-card swipe carousel; sections open as modals
// Captures: 5 carousel cards + 6 modal screens

const { chromium } = require('playwright-core');
const path = require('path');

const OUT_DIR = 'C:\\Users\\jorj\\jaffa-chapi-app\\mobile-audit';
const VIEWPORT = { width: 375, height: 812 };
const URL = 'http://localhost:5174';

async function shot(page, name, desc) {
  const file = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`[${name}] ${desc} — saved`);
}

(async () => {
  const executablePath = require('playwright-core').chromium.executablePath();

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

  console.log('Loading', URL);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // ── CARD 0: Hero / Welcome ────────────────────────────────────────────────
  await shot(page, '01-card-hero', 'Card 0 – Welcome/Hero');

  // Navigate carousel via clicking the dot navigation pills
  // The progress dots are buttons with aria-label="קלף N: label"
  // We'll use the "המשך" (next) button at the bottom on mobile

  // ── CARD 1: Games (QR, Spin, Quiz, Selfie) ───────────────────────────────
  await page.locator('button:has-text("המשך")').first().click();
  await page.waitForTimeout(800);
  await shot(page, '02-card-games', 'Card 1 – Games grid');

  // ── CARD 2: Places & Tours ────────────────────────────────────────────────
  await page.locator('button:has-text("המשך")').first().click();
  await page.waitForTimeout(800);
  await shot(page, '03-card-places', 'Card 2 – Places & Tours');

  // ── CARD 3: Community ─────────────────────────────────────────────────────
  await page.locator('button:has-text("המשך")').first().click();
  await page.waitForTimeout(800);
  await shot(page, '04-card-community', 'Card 3 – Community & Store');

  // ── CARD 4: Info / About / FAQ / Contact ─────────────────────────────────
  await page.locator('button:has-text("המשך")').first().click();
  await page.waitForTimeout(800);
  await shot(page, '05-card-info', 'Card 4 – Info & About');

  // ── MODALS ────────────────────────────────────────────────────────────────
  // Return to card 1 (Games) to open Spin Wheel
  // Navigate back using the dot progress pills
  await page.locator('[aria-label="קלף 2: משחקים"]').click();
  await page.waitForTimeout(700);

  // Click the Spin Wheel button (🎡 גלגל המזל / הגרלת היום)
  await page.locator('button:has-text("הגרלת היום")').first().click();
  await page.waitForTimeout(1200);
  await shot(page, '06-modal-spin-wheel', 'Modal – Spin Wheel (גלגל המזל)');

  // Close modal (click X button or backdrop)
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);

  // Navigate to Card 2 (Places) to open Tours
  await page.locator('[aria-label="קלף 3: מקומות"]').click();
  await page.waitForTimeout(700);
  await page.locator('button:has-text("סיורים אינטראקטיביים")').first().click();
  await page.waitForTimeout(1200);
  await shot(page, '07-modal-tours', 'Modal – Tours (סיורים)');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);

  // Navigate to Card 3 (Community) to open Store
  await page.locator('[aria-label="קלף 4: קהילה"]').click();
  await page.waitForTimeout(700);
  await page.locator('button:has-text("חנות מוצרי השבוע")').first().click();
  await page.waitForTimeout(1200);
  await shot(page, '08-modal-store', 'Modal – Store (חנות)');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);

  // Open Community modal from Card 3
  await page.locator('button:has-text("הקהילה שלנו")').first().click();
  await page.waitForTimeout(1200);
  await shot(page, '09-modal-community', 'Modal – Community (קהילה)');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);

  // Navigate to Card 4 (Info) to open About
  await page.locator('[aria-label="קלף 5: מידע"]').click();
  await page.waitForTimeout(700);
  await page.locator('button:has-text("על חפ")').first().click();
  await page.waitForTimeout(1200);
  await shot(page, '10-modal-about', 'Modal – About (על חפ"י)');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);

  // Open FAQ modal from Card 4
  await page.locator('button:has-text("שאלות נפוצות")').first().click();
  await page.waitForTimeout(1200);
  await shot(page, '11-modal-faq', 'Modal – FAQ (שאלות נפוצות)');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);

  await browser.close();
  console.log('\nAll screenshots saved to', OUT_DIR);
})().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
