// node tools/capture.mjs https://example.com [/pricing /features]
// Saves real screenshots and brand facts to ./assets. Product mode animates these, never a redrawn UI.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const [url, ...paths] = process.argv.slice(2);
if (!url) { console.error('usage: capture.mjs <url> [extra paths]'); process.exit(1); }
mkdirSync('assets/screens', { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const slug = (p) => (p.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home').toLowerCase();
const found = [];

for (const [name, vp, scale] of [['desktop', { width: 1440, height: 900 }, 2], ['mobile', { width: 390, height: 844 }, 3]]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: scale });
  const page = await ctx.newPage();
  for (const p of ['', ...paths]) {
    const target = new URL(p, url).href;
    try {
      await page.goto(target, { waitUntil: 'networkidle', timeout: 45000 });
    } catch (e) { console.error(`could not load ${target}: ${e.message.split('\n')[0]}`); continue; }
    await page.waitForTimeout(800);
    const f = `assets/screens/${name}_${slug(new URL(target).pathname)}`;
    await page.screenshot({ path: f + '.png' });
    await page.screenshot({ path: f + '_full.png', fullPage: true });
    found.push(f + '.png', f + '_full.png');
    if (name === 'desktop' && p === '') {
      const brand = await page.evaluate(() => {
        const cs = (el) => getComputedStyle(el);
        const count = (arr) => Object.entries(arr.reduce((m, v) => (m[v] = (m[v] || 0) + 1, m), {})).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([v, n]) => ({ value: v, count: n }));
        const els = [...document.querySelectorAll('body *')].slice(0, 3000);
        const clear = (c) => c === 'rgba(0, 0, 0, 0)' || c === 'transparent';
        return {
          title: document.title,
          description: document.querySelector('meta[name=description]')?.content || null,
          ogImage: document.querySelector('meta[property="og:image"]')?.content || null,
          icons: [...document.querySelectorAll('link[rel~=icon], link[rel=apple-touch-icon]')].map((l) => l.href),
          logos: [...document.querySelectorAll('img[alt*=logo i], img[src*=logo i], header svg, nav svg')].slice(0, 5).map((e) => e.src || 'inline svg in ' + e.parentElement.tagName.toLowerCase()),
          bodyBackground: cs(document.body).backgroundColor,
          bodyColor: cs(document.body).color,
          backgrounds: count(els.map((e) => cs(e).backgroundColor).filter((c) => !clear(c))),
          textColors: count(els.map((e) => cs(e).color)),
          buttonColors: count([...document.querySelectorAll('button, a[class*=btn i], a[class*=button i], [role=button]')].map((e) => cs(e).backgroundColor).filter((c) => !clear(c))),
          fonts: count(els.map((e) => cs(e).fontFamily.split(',')[0].replace(/["']/g, '').trim())),
          headings: [...document.querySelectorAll('h1, h2')].slice(0, 12).map((h) => h.innerText.trim()).filter(Boolean),
        };
      });
      writeFileSync('assets/brand.json', JSON.stringify({ url, ...brand }, null, 1));
      found.push('assets/brand.json');
    }
  }
  await ctx.close();
}
await browser.close();
console.log(found.length ? found.join('\n') : 'nothing captured');
if (!found.length) process.exit(1);
