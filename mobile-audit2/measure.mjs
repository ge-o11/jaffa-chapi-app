import { chromium } from 'playwright';

const iPhone = {
  viewport: { width: 375, height: 812 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 2,
};

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext(iPhone);
  const page = await ctx.newPage();

  await page.goto('http://localhost:5174', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // ── Card 0 measurements ─────────────────────────────────────────
  console.log('\n=== CARD 0 (Hero) ===');

  const heroBtn = await page.evaluate(() => {
    // "בואו נתחיל!" button
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent.includes('בואו נתחיל'));
    if (!btn) return null;
    const r = btn.getBoundingClientRect();
    const s = window.getComputedStyle(btn);
    return { w: r.width, h: r.height, fontSize: s.fontSize, text: btn.textContent.trim() };
  });
  console.log('Hero CTA button:', heroBtn);

  const statsBoxes = await page.evaluate(() => {
    const divs = Array.from(document.querySelectorAll('div'));
    // The 3 stat boxes with numbers
    return divs.filter(d => ['12', '4', '10'].includes(d.textContent.trim())).map(d => {
      const r = d.getBoundingClientRect();
      const s = window.getComputedStyle(d);
      return { text: d.textContent.trim(), w: r.width, h: r.height, fontSize: s.fontSize };
    });
  });
  console.log('Stat number divs:', statsBoxes);

  const heroParagraph = await page.evaluate(() => {
    const ps = Array.from(document.querySelectorAll('p'));
    const p = ps.find(el => el.textContent.includes('להפוך את יפו'));
    if (!p) return null;
    const s = window.getComputedStyle(p);
    const r = p.getBoundingClientRect();
    return { fontSize: s.fontSize, lineHeight: s.lineHeight, w: r.width, overflow: p.scrollWidth > p.clientWidth };
  });
  console.log('Hero paragraph:', heroParagraph);

  const progressDots = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('[aria-label^="קלף"]'));
    return btns.map(b => {
      const r = b.getBoundingClientRect();
      return { label: b.getAttribute('aria-label'), w: r.width, h: r.height };
    });
  });
  console.log('Progress dots:', progressDots);

  const bottomNavBtns = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.filter(b => b.textContent.includes('המשך') || b.textContent.includes('הקודם')).map(b => {
      const r = b.getBoundingClientRect();
      const s = window.getComputedStyle(b);
      return { text: b.textContent.trim(), w: r.width, h: r.height, fontSize: s.fontSize, visible: r.width > 0 && r.height > 0 };
    });
  });
  console.log('Bottom nav buttons:', bottomNavBtns);

  const swipeHint = await page.evaluate(() => {
    const divs = Array.from(document.querySelectorAll('div'));
    const d = divs.find(el => el.textContent.includes('החלק ימינה'));
    if (!d) return null;
    const r = d.getBoundingClientRect();
    const s = window.getComputedStyle(d);
    return { text: d.textContent.trim(), fontSize: s.fontSize, y: r.top, bottom: r.bottom };
  });
  console.log('Swipe hint:', swipeHint);

  const phoneLogo = await page.evaluate(() => {
    // The PhoneLogo div (120x180px)
    const divs = Array.from(document.querySelectorAll('div'));
    const d = divs.find(el => {
      const s = window.getComputedStyle(el);
      return el.textContent.includes('יפו העתיקה') && s.borderRadius !== '0px' && el.offsetWidth < 150;
    });
    if (!d) return null;
    const r = d.getBoundingClientRect();
    return { w: r.width, h: r.height, top: r.top };
  });
  console.log('Phone logo:', phoneLogo);

  // ── Navigate to Card 1 ─────────────────────────────────────────
  const dots = page.locator('[aria-label^="קלף"]');
  await dots.nth(1).click();
  await page.waitForTimeout(700);

  console.log('\n=== CARD 1 (Games) ===');
  const gameTiles = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.filter(b => ['מצאו את המטמון','הגרלת היום','חידון יפו','ציד הסלפי'].some(t => b.textContent.includes(t))).map(b => {
      const r = b.getBoundingClientRect();
      const s = window.getComputedStyle(b);
      const titleEl = b.querySelector('div:nth-child(2)');
      const subEl = b.querySelector('div:nth-child(3)');
      return {
        text: b.textContent.trim().slice(0, 30),
        w: r.width, h: r.height,
        fontSize: s.fontSize,
        titleFontSize: titleEl ? window.getComputedStyle(titleEl).fontSize : null,
        subFontSize: subEl ? window.getComputedStyle(subEl).fontSize : null,
        clipRight: r.right > window.innerWidth,
        clipLeft: r.left < 0,
      };
    });
  });
  console.log('Game tiles:', gameTiles);

  // Card 1 CardFrame overflow check
  const cardFrame = await page.evaluate(() => {
    // The glassmorphism card
    const divs = Array.from(document.querySelectorAll('div'));
    const d = divs.find(el => {
      const s = window.getComputedStyle(el);
      return s.backdropFilter && s.backdropFilter.includes('blur') && el.textContent.includes('משחקים');
    });
    if (!d) return null;
    const r = d.getBoundingClientRect();
    const s = window.getComputedStyle(d);
    return {
      w: r.width, h: r.height, top: r.top, bottom: r.bottom,
      scrollable: d.scrollHeight > d.clientHeight,
      overflow: s.overflow,
      maxHeight: s.maxHeight,
    };
  });
  console.log('Card frame (games):', cardFrame);

  // ── Navigate to Card 2 ─────────────────────────────────────────
  await dots.nth(2).click();
  await page.waitForTimeout(700);

  console.log('\n=== CARD 2 (Places) ===');
  const placeTiles = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.filter(b => ['מפת המתחם','סיורים אינטראקטיביים','הגעה ליפו'].some(t => b.textContent.includes(t))).map(b => {
      const r = b.getBoundingClientRect();
      const s = window.getComputedStyle(b);
      const titleEl = b.querySelector('div:nth-child(2)');
      const subEl = b.querySelector('div:nth-child(3)');
      return {
        text: b.textContent.trim().slice(0, 40),
        w: r.width, h: r.height,
        titleFontSize: titleEl ? window.getComputedStyle(titleEl).fontSize : null,
        subFontSize: subEl ? window.getComputedStyle(subEl).fontSize : null,
        clipRight: r.right > window.innerWidth,
        clipLeft: r.left < 0,
      };
    });
  });
  console.log('Place tiles:', placeTiles);

  // ── Navigate to Card 3 ─────────────────────────────────────────
  await dots.nth(3).click();
  await page.waitForTimeout(700);

  console.log('\n=== CARD 3 (Community) ===');
  const waCTA = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    const a = links.find(el => el.textContent.includes('הצטרפו לקהילת'));
    if (!a) return null;
    const r = a.getBoundingClientRect();
    const titleEl = a.querySelector('div');
    const s = window.getComputedStyle(a);
    return {
      w: r.width, h: r.height,
      titleFontSize: titleEl ? window.getComputedStyle(titleEl).fontSize : null,
      padding: s.padding,
    };
  });
  console.log('WhatsApp CTA:', waCTA);

  const communityTiles = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.filter(b => ['הקהילה שלנו','קופונים וקרדיטים','השבוע ביפו','חנות מוצרי השבוע'].some(t => b.textContent.includes(t))).map(b => {
      const r = b.getBoundingClientRect();
      return {
        text: b.textContent.trim().slice(0, 30),
        w: r.width, h: r.height,
        clipRight: r.right > window.innerWidth,
        clipLeft: r.left < 0,
      };
    });
  });
  console.log('Community tiles:', communityTiles);

  // ── Navigate to Card 4 ─────────────────────────────────────────
  await dots.nth(4).click();
  await page.waitForTimeout(700);

  console.log('\n=== CARD 4 (Info) ===');
  const infoTiles = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.filter(b => ['על חפ"י','שאלות נפוצות','צור קשר','תנו לנו משוב'].some(t => b.textContent.includes(t))).map(b => {
      const r = b.getBoundingClientRect();
      return {
        text: b.textContent.trim().slice(0, 30),
        w: r.width, h: r.height,
        clipRight: r.right > window.innerWidth,
        clipLeft: r.left < 0,
      };
    });
  });
  console.log('Info tiles:', infoTiles);

  // ── Open QR modal and measure ───────────────────────────────────
  await dots.nth(1).click();
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: /מצאו את המטמון/ }).click();
  await page.waitForTimeout(800);

  console.log('\n=== MODAL measurements ===');
  const modalPanel = await page.evaluate(() => {
    const dialogs = document.querySelectorAll('[role="dialog"]');
    if (!dialogs.length) return null;
    const d = dialogs[0];
    const r = d.getBoundingClientRect();
    const s = window.getComputedStyle(d);
    return {
      w: r.width, h: r.height, top: r.top, bottom: r.bottom,
      maxHeight: s.maxHeight,
      borderRadius: s.borderRadius,
      overflow: s.overflow,
    };
  });
  console.log('Modal panel:', modalPanel);

  const closeBtn = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const b = btns.find(el => el.getAttribute('aria-label') === 'סגור');
    if (!b) return null;
    const r = b.getBoundingClientRect();
    return { w: r.width, h: r.height, top: r.top, right: r.right };
  });
  console.log('Close button:', closeBtn);

  const modalTitle = await page.evaluate(() => {
    const h2s = Array.from(document.querySelectorAll('h2'));
    const h = h2s.find(el => el.textContent.includes('מסע 10'));
    if (!h) return null;
    const r = h.getBoundingClientRect();
    const s = window.getComputedStyle(h);
    return { text: h.textContent.trim(), fontSize: s.fontSize, w: r.width, clipRight: r.right > window.innerWidth };
  });
  console.log('Modal title:', modalTitle);

  await browser.close();
  console.log('\nDone.');
})();
