import { chromium } from 'playwright';

const iPhone = {
  viewport: { width: 375, height: 812 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
  hasTouch: true, isMobile: true, deviceScaleFactor: 2,
};

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext(iPhone);
  const page = await ctx.newPage();
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // ── Swipe hint (card 0) — proper measurement ─────────────────────
  const swipeHint = await page.evaluate(() => {
    const spans = Array.from(document.querySelectorAll('span'));
    const s = spans.find(el => el.textContent.includes('החלק ימינה'));
    if (!s) return null;
    const r = s.getBoundingClientRect();
    const cs = window.getComputedStyle(s);
    return { text: s.textContent.trim(), fontSize: cs.fontSize, y: r.top, bottom: r.bottom, h: r.height, visible: r.bottom < 812 };
  });
  console.log('Swipe hint span:', swipeHint);

  // ── Welcome badge ─────────────────────────────────────────────────
  const badge = await page.evaluate(() => {
    const divs = Array.from(document.querySelectorAll('div'));
    const d = divs.find(el => el.textContent.trim() === '🏛️ ברוכים הבאים לחפ"י');
    if (!d) return null;
    const r = d.getBoundingClientRect();
    const s = window.getComputedStyle(d);
    return { text: d.textContent.trim(), fontSize: s.fontSize, h: r.height, w: r.width };
  });
  console.log('Welcome badge:', badge);

  // ── h1 hero title ─────────────────────────────────────────────────
  const h1 = await page.evaluate(() => {
    const h = document.querySelector('h1');
    if (!h) return null;
    const r = h.getBoundingClientRect();
    const s = window.getComputedStyle(h);
    return { text: h.textContent.trim(), fontSize: s.fontSize, w: r.width, h: r.height, lineHeight: s.lineHeight };
  });
  console.log('H1 hero title:', h1);

  // ── Header bar ────────────────────────────────────────────────────
  const header = await page.evaluate(() => {
    const header = document.querySelector('header') || document.querySelector('[class*="header"]');
    if (!header) {
      // Try to find by nav/buttons at top
      const divs = Array.from(document.querySelectorAll('div'));
      const d = divs.find(el => el.textContent.includes('כניסה') && el.getBoundingClientRect().top < 80);
      if (!d) return null;
      const r = d.getBoundingClientRect();
      const s = window.getComputedStyle(d);
      return { w: r.width, h: r.height, top: r.top, fontSize: s.fontSize };
    }
    const r = header.getBoundingClientRect();
    return { w: r.width, h: r.height, top: r.top };
  });
  console.log('Header:', header);

  // Navigate to card 2 and check 3-col tile text truncation
  const dots = page.locator('[aria-label^="קלף"]');
  await dots.nth(2).click();
  await page.waitForTimeout(700);

  const placeTileTitle = await page.evaluate(() => {
    // "סיורים אינטראקטיביים" — check if title overflows
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent.includes('סיורים אינטראקטיביים'));
    if (!btn) return null;
    const titleEl = btn.querySelectorAll('div')[1]; // second div = title
    if (!titleEl) return null;
    const r = titleEl.getBoundingClientRect();
    const s = window.getComputedStyle(titleEl);
    return {
      text: titleEl.textContent.trim(),
      fontSize: s.fontSize,
      lineHeight: s.lineHeight,
      w: r.width,
      scrollW: titleEl.scrollWidth,
      clientW: titleEl.clientWidth,
      overflow: s.overflow,
      overflowWrap: s.overflowWrap,
      whiteSpace: s.whiteSpace,
      h: r.height,
    };
  });
  console.log('Place tile "סיורים" title div:', placeTileTitle);

  // Community card — WA CTA detailed
  await dots.nth(3).click();
  await page.waitForTimeout(700);

  const waCTADetail = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    const a = links.find(el => el.textContent.includes('הצטרפו לקהילת'));
    if (!a) return null;
    const r = a.getBoundingClientRect();
    const titleDiv = a.querySelector('div > div:first-child');
    const subDiv = a.querySelector('div > div:last-child');
    return {
      h: r.height,
      w: r.width,
      titleText: titleDiv?.textContent?.trim(),
      titleFontSize: titleDiv ? window.getComputedStyle(titleDiv).fontSize : null,
      subFontSize: subDiv ? window.getComputedStyle(subDiv).fontSize : null,
      subText: subDiv?.textContent?.trim(),
    };
  });
  console.log('WA CTA detail:', waCTADetail);

  // Info card — check if last card shows "הקודם" only (no המשך)
  await dots.nth(4).click();
  await page.waitForTimeout(500);
  const infoNavBtns = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.filter(b => b.textContent.includes('הקודם') || b.textContent.includes('המשך')).map(b => {
      const r = b.getBoundingClientRect();
      const s = window.getComputedStyle(b);
      return { text: b.textContent.trim(), visible: r.width > 0 && r.height > 0, h: r.height, w: r.width, display: s.display };
    });
  });
  console.log('Info card nav buttons:', infoNavBtns);

  // About modal — check text sizes
  const aboutBtn = page.getByRole('button', { name: /על חפ"י/ });
  await aboutBtn.click();
  await page.waitForTimeout(800);

  const aboutTextSizes = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]');
    if (!dialog) return null;
    const content = dialog.querySelector('[style*="overflow"]');
    // Find text elements
    const els = content ? Array.from(content.querySelectorAll('p, h2, h3, span, div')).filter(el => {
      const t = el.textContent.trim();
      const s = window.getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return t.length > 5 && t.length < 100 && r.height > 0 && parseFloat(s.fontSize) > 0 && el.children.length === 0;
    }) : [];

    return els.slice(0, 20).map(el => {
      const s = window.getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return { tag: el.tagName, text: el.textContent.trim().slice(0, 40), fontSize: s.fontSize, color: s.color, w: r.width };
    });
  });
  console.log('About modal text sizes (sample):', aboutTextSizes);

  // Check if "The new era..." english text size
  const aboutEnglish = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]');
    if (!dialog) return null;
    const ps = Array.from(dialog.querySelectorAll('p'));
    return ps.filter(p => p.textContent.includes('The new era') || p.textContent.includes('Old Jaffa')).map(p => {
      const s = window.getComputedStyle(p);
      return { text: p.textContent.trim(), fontSize: s.fontSize };
    });
  });
  console.log('About English text:', aboutEnglish);

  await browser.close();
  console.log('\nDone.');
})();
