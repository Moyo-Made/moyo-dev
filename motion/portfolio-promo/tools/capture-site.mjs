// node tools/capture-site.mjs http://localhost:3100
// Real pieces of the portfolio for the film: the hero in both themes, the bare
// navbar plus where each section link sits, and each featured project plate.
// Writes assets/screens/*.png and assets/site.json (rects in CSS px).
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const url = process.argv[2] || 'http://localhost:3100';
mkdirSync('assets/screens', { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const out = { url, viewport: { width: 1440, height: 900 }, scale: 2 };

for (const theme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: out.viewport, deviceScaleFactor: 2, colorScheme: theme, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `assets/screens/hero_${theme}.png` });

  if (theme === 'light') {
    // Where the hero's badge, proof screenshot and theme toggle sit, so the film
    // can land on them exactly.
    out.hero = await page.evaluate(() => {
      const box = (el) => { const r = el.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; };
      const hero = document.querySelector('section[aria-labelledby="hero-name"]');
      return {
        badge: box(hero.querySelector('p.bg-mark')),
        proof: box(hero.querySelector('figure img')),
        toggle: box(document.querySelector('header button')),
      };
    });

    // At the top nothing is highlighted yet: the bare bar, and where each link is.
    const header = page.locator('header').first();
    await header.screenshot({ path: 'assets/screens/nav_light.png' });
    out.nav = await page.evaluate(() => {
      const h = document.querySelector('header').getBoundingClientRect();
      const ol = [...document.querySelectorAll('nav[aria-label="Sections"] ol')].find((o) => o.offsetParent);
      return {
        header: { w: h.width, h: h.height },
        items: [...ol.querySelectorAll('li')].map((li) => {
          const r = li.getBoundingClientRect();
          return { label: li.textContent.trim(), x: r.left - h.left, y: r.top - h.top, w: r.width, h: r.height };
        }),
        toggle: (() => { const r = document.querySelector('header button').getBoundingClientRect(); return { x: r.left - h.left, y: r.top - h.top, w: r.width, h: r.height }; })(),
      };
    });

    // Each featured plate, scrolled into place so lazy images have loaded.
    const plates = page.locator('#work article');
    out.plates = [];
    for (let i = 0; i < await plates.count(); i++) {
      const p = plates.nth(i);
      await p.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      const f = `assets/screens/plate_${i}.png`;
      await p.screenshot({ path: f });
      const box = await p.boundingBox();
      out.plates.push({ file: f, title: await p.locator('h3').innerText(), w: box.width, h: box.height });
    }
  }
  await ctx.close();
}

// The phone hero, for the vertical cut.
for (const theme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, colorScheme: theme, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `assets/screens/hero_mobile_${theme}.png` });
  await ctx.close();
}

await browser.close();
writeFileSync('assets/site.json', JSON.stringify(out, null, 1));
console.log(JSON.stringify({ nav: out.nav?.items.map((i) => i.label), plates: out.plates?.map((p) => `${p.title} ${Math.round(p.w)}x${Math.round(p.h)}`) }, null, 1));
