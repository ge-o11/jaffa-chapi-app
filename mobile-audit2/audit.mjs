import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join } from 'path';

const OUT = 'C:/Users/jorj/jaffa-chapi-app/mobile-audit2';
mkdirSync(OUT, { recursive: true });

const iPhone = {
  viewport: { width: 375, height: 812 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 2,
};

async function ss(page, name) {
  const path = join(OUT, `${name}.png`);
  await page.screenshot({ path, fullPage: false });
  console.log(`✓ ${name}.png`);
  return path;
}

async function goToCard(page, targetIndex) {
  // Use evaluate to set React state via a custom event or click the progress dots
  // Click the dot at index targetIndex
  const dots = await page.locator('[aria-label^="קלף"]');
  await dots.nth(targetIndex).click();
  await page.waitForTimeout(700);
}

async function closeModal(page) {
  // Try clicking close button (X)
  try {
    const closeBtn = page.locator('button').filter({ hasText: /^[×✕✗]$/ }).first();
    if (await closeBtn.isVisible({ timeout: 1000 })) {
      await closeBtn.click();
      await page.waitForTimeout(400);
      return;
    }
  } catch {}
  // Try any close button
  try {
    const closeBtn = page.locator('[aria-label="סגור"], [aria-label="close"]').first();
    if (await closeBtn.isVisible({ timeout: 500 })) {
      await closeBtn.click();
      await page.waitForTimeout(400);
      return;
    }
  } catch {}
  // Fallback: press Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext(iPhone);
  const page = await ctx.newPage();

  await page.goto('http://localhost:5174', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // ── Card 0: Hero/Welcome ──────────────────────────────────────────
  await ss(page, '00-card0-hero');

  // ── Card 1: Games ────────────────────────────────────────────────
  await goToCard(page, 1);
  await ss(page, '01-card1-games');

  // ── Card 2: Places ───────────────────────────────────────────────
  await goToCard(page, 2);
  await ss(page, '02-card2-places');

  // ── Card 3: Community ────────────────────────────────────────────
  await goToCard(page, 3);
  await ss(page, '03-card3-community');

  // ── Card 4: Info ─────────────────────────────────────────────────
  await goToCard(page, 4);
  await ss(page, '04-card4-info');

  // ── Modals from Card 1 (Games) ───────────────────────────────────
  await goToCard(page, 1);
  await page.waitForTimeout(400);

  // Click "מצאו את המטמון" (QR hunt)
  try {
    await page.getByRole('button', { name: /מצאו את המטמון/ }).click();
    await page.waitForTimeout(800);
    await ss(page, '05-modal-qr-hunt');
    await closeModal(page);
    await page.waitForTimeout(500);
  } catch (e) { console.error('QR modal failed:', e.message); }

  // Click "הגרלת היום" (spin wheel)
  try {
    await page.getByRole('button', { name: /הגרלת היום/ }).click();
    await page.waitForTimeout(800);
    await ss(page, '06-modal-spin-wheel');
    await closeModal(page);
    await page.waitForTimeout(500);
  } catch (e) { console.error('Spin modal failed:', e.message); }

  // Click "חידון יפו"
  try {
    await page.getByRole('button', { name: /חידון יפו/ }).click();
    await page.waitForTimeout(800);
    await ss(page, '07-modal-quiz');
    await closeModal(page);
    await page.waitForTimeout(500);
  } catch (e) { console.error('Quiz modal failed:', e.message); }

  // Click "ציד הסלפי"
  try {
    await page.getByRole('button', { name: /ציד הסלפי/ }).click();
    await page.waitForTimeout(800);
    await ss(page, '08-modal-selfie');
    await closeModal(page);
    await page.waitForTimeout(500);
  } catch (e) { console.error('Selfie modal failed:', e.message); }

  // ── Modals from Card 2 (Places) ──────────────────────────────────
  await goToCard(page, 2);
  await page.waitForTimeout(400);

  // Click "מפת המתחם"
  try {
    await page.getByRole('button', { name: /מפת המתחם/ }).click();
    await page.waitForTimeout(1000);
    await ss(page, '09-modal-map');
    await closeModal(page);
    await page.waitForTimeout(500);
  } catch (e) { console.error('Map modal failed:', e.message); }

  // Click "סיורים אינטראקטיביים"
  try {
    await page.getByRole('button', { name: /סיורים אינטראקטיביים/ }).click();
    await page.waitForTimeout(800);
    await ss(page, '10-modal-tours');
    await closeModal(page);
    await page.waitForTimeout(500);
  } catch (e) { console.error('Tours modal failed:', e.message); }

  // ── Modals from Card 3 (Community) ───────────────────────────────
  await goToCard(page, 3);
  await page.waitForTimeout(400);

  // Click "חנות מוצרי השבוע"
  try {
    await page.getByRole('button', { name: /חנות מוצרי השבוע/ }).click();
    await page.waitForTimeout(800);
    await ss(page, '11-modal-store');
    await closeModal(page);
    await page.waitForTimeout(500);
  } catch (e) { console.error('Store modal failed:', e.message); }

  // ── Modals from Card 4 (Info) ─────────────────────────────────────
  await goToCard(page, 4);
  await page.waitForTimeout(400);

  // Click 'על חפ"י'
  try {
    await page.getByRole('button', { name: /על חפ"י/ }).click();
    await page.waitForTimeout(800);
    await ss(page, '12-modal-about');
    await closeModal(page);
    await page.waitForTimeout(500);
  } catch (e) { console.error('About modal failed:', e.message); }

  // Click "שאלות נפוצות"
  try {
    await page.getByRole('button', { name: /שאלות נפוצות/ }).click();
    await page.waitForTimeout(800);
    await ss(page, '13-modal-faq');
    await closeModal(page);
    await page.waitForTimeout(500);
  } catch (e) { console.error('FAQ modal failed:', e.message); }

  await browser.close();
  console.log('\nAll screenshots saved to', OUT);
})();
