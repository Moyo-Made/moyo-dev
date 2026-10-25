// Promo film for the portfolio (moyomade.dev). 20 s at 120 bpm: a bar every
// 2 s, and every scene starts on one. docs/scenes.md is the beat sheet.
//
// Two objects live for the whole film. The plate is a screenshot frame in the
// site's crop marks that changes size and content but never cuts. The mark is
// the site's yellow highlighter: it underlines the hook, lands on the hero's
// badge, becomes the nav highlight and ends as the badge in the lockup.
//
// The whole frame is drawn by frame(g, T, L, theme). The theme-toggle beat
// draws it once in light and once in dark inside a growing circle, so the
// film flips from paper to blueprint the same way the site does.
import { spring, track, track2, clamp, lerp, smooth, SPRING } from './lib/motion.js';
import { loadImage } from './lib/draw.js';

/** Where the end card sends people. Change it and re-render. */
export const CTA = 'moyomade.dev';

export const META = { dur: 20, fps: 30, w: 1080, h: 1080, bg: '#f5f6f3' };

// The site's own tokens, from src/app/globals.css.
const LIGHT = { name: 'light', paper: '#f5f6f3', paper2: '#eceee9', ink: '#121418', line: '#d3d7dc', grid: 'rgba(18,20,24,0.06)', muted: '#586070', annot: '#2443e6' };
const DARK = { name: 'dark', paper: '#0c1320', paper2: '#131c2c', ink: '#e6eaf2', line: '#263248', grid: 'rgba(142,162,255,0.08)', muted: '#94a0b8', annot: '#8ea2ff' };
const MARK = '#f2b705';
const ON_MARK = '#121418';
const FONT = { display: '"Plex Condensed"', mono: '"Geist Mono"' };

// The hero screenshot is 2880x1800 at 2x: positions below are in its CSS px.
const HERO = { w: 1440, h: 900 };
const IMG = {};
let SITE;

export async function init() {
  SITE = await (await fetch('./assets/site.json')).json();
  const files = {
    heroLight: 'hero_light.png', heroDark: 'hero_dark.png',
    shake: 'social-shake-brief-types.png', gixel: 'gixel-one-photo-campaign.jpg', devfest: 'devfest-2024.png',
  };
  await Promise.all(Object.entries(files).map(async ([k, f]) => { IMG[k] = await loadImage(`./assets/screens/${f}`); }));
  await Promise.all([`500 40px ${FONT.display}`, `600 40px ${FONT.display}`, `400 40px ${FONT.mono}`, `500 40px ${FONT.mono}`].map((f) => document.fonts.load(f)));
}

// ---------------------------------------------------------------------------
// Layout per format. One timeline; each format places things for its shape.

const GEO = {
  '1x1': {
    header: { x: 80, y: 90, w: 920 },
    main: { x: 80, y: 170, w: 920, h: 575 },
    wide: { x: 80, y: 170, w: 920, h: 497 },
    proof: { x: 80, y: 170, w: 400, h: 216 },
    nav: { x: 80, y: 420, w: 920, h: 160 },
    navCamW: 520,
    title: { x: 80, y: 836, size: 64, maxW: 920, subY: 892, sub: 30 },
    hook: { x: 80, y1: 470, y2: 630, size: 150, maxW: 920 },
    num: { x: 80, y: 600, size: 200, labelY: 690 },
    markBox: { x: 80, y: 300, w: 150, h: 150 },
    lock: { beside: true, nameSize: 70, roleSize: 26, badgeY: 528, ctaY: 740, ctaSize: 132 },
  },
  '16x9': {
    header: { x: 120, y: 90, w: 1680 },
    main: { x: 780, y: 200, w: 1020, h: 638 },
    wide: { x: 780, y: 230, w: 1020, h: 551 },
    proof: { x: 1180, y: 200, w: 620, h: 335 },
    nav: { x: 780, y: 430, w: 1020, h: 178 },
    navCamW: 575,
    title: { x: 120, y: 540, size: 80, maxW: 600, subY: 606, sub: 30 },
    hook: { x: 120, y1: 480, y2: 660, size: 190, maxW: 1680 },
    num: { x: 120, y: 700, size: 230, labelY: 800 },
    markBox: { x: 120, y: 290, w: 170, h: 170 },
    lock: { beside: true, nameSize: 84, roleSize: 30, badgeY: 548, ctaY: 800, ctaSize: 160 },
  },
  '9x16': {
    header: { x: 72, y: 220, w: 936 },
    main: { x: 72, y: 440, w: 936, h: 585 },
    wide: { x: 72, y: 440, w: 936, h: 506 },
    proof: { x: 72, y: 440, w: 520, h: 281 },
    nav: { x: 72, y: 720, w: 936, h: 164 },
    navCamW: 530,
    title: { x: 72, y: 1170, size: 76, maxW: 936, subY: 1234, sub: 30 },
    hook: { x: 72, y1: 880, y2: 1040, size: 150, maxW: 936 },
    num: { x: 72, y: 1000, size: 210, labelY: 1100 },
    markBox: { x: 72, y: 600, w: 180, h: 180 },
    lock: { beside: false, nameSize: 84, roleSize: 30, badgeY: 1080, ctaY: 1300, ctaSize: 150 },
  },
};

const cache = new Map();
function geo(L) {
  const key = `${L.format}:${L.u}`;
  if (!cache.has(key)) {
    const scale = (v) => (typeof v === 'number' ? v * L.u : typeof v === 'boolean' ? v : Object.fromEntries(Object.entries(v).map(([k, x]) => [k, scale(x)])));
    cache.set(key, scale(GEO[L.format]));
  }
  return cache.get(key);
}

// ---------------------------------------------------------------------------
// Small helpers.

const font = (g, family, weight, size) => { g.font = `${weight} ${size}px ${family}`; };

function fitSize(g, str, family, weight, size, maxW) {
  font(g, family, weight, size);
  const w = g.measureText(str).width;
  return w > maxW ? size * (maxW / w) : size;
}

function textW(g, str, family, weight, size, spacing = 0) {
  font(g, family, weight, size); g.letterSpacing = `${spacing}px`;
  const w = g.measureText(str).width;
  g.letterSpacing = '0px';
  return w;
}

/** Text that rises into its line from below and leaves upward, clipped to the line. */
function rise(g, T, tin, tout, size, y, paint) {
  if (T < tin || T > tout + 0.25) return;
  const pin = spring(T - tin, ...SPRING.default), pout = smooth((T - tout) / 0.22);
  g.save();
  g.beginPath(); g.rect(-1e4, y - size * 1.08, 3e4, size * 1.45); g.clip();
  g.translate(0, (1 - pin) * size * 1.15 - pout * size * 1.15);
  paint();
  g.restore();
}

function display(g, str, x, y, size, color, { weight = 600, align = 'left' } = {}) {
  font(g, FONT.display, weight, size);
  g.fillStyle = color; g.textAlign = align; g.textBaseline = 'alphabetic';
  g.fillText(str, x, y);
}

function mono(g, str, x, y, size, color, { align = 'left', weight = 500 } = {}) {
  font(g, FONT.mono, weight, size);
  g.letterSpacing = `${size * 0.12}px`;
  g.fillStyle = color; g.textAlign = align; g.textBaseline = 'alphabetic';
  g.fillText(str.toUpperCase(), x, y);
  g.letterSpacing = '0px';
}

const trackRect = (T, keys, k = SPRING.default) => {
  const f = (p) => track(T, keys.map(([t, r]) => [t, r[p]]), ...k);
  return { x: f('x'), y: f('y'), w: f('w'), h: f('h') };
};

/** The part of an image a camera shows in a rect: cover-fit, top-aligned. */
function view(cam, r) {
  const s = Math.max(r.w / cam.w, r.h / cam.h);
  const w = r.w / s, h = r.h / s;
  return { x: cam.x + (cam.w - w) / 2, y: cam.y, w, h, s };
}
const mapPt = (v, r, p) => ({ x: r.x + (p.x - v.x) * v.s, y: r.y + (p.y - v.y) * v.s });

function drawCam(g, img, unit, cam, r, th) {
  const v = view(cam, r), k = img.width / unit.w;
  g.fillStyle = th.paper; g.fillRect(r.x, r.y, r.w, r.h);
  const x0 = Math.max(v.x, 0), y0 = Math.max(v.y, 0), x1 = Math.min(v.x + v.w, unit.w), y1 = Math.min(v.y + v.h, unit.h);
  if (x1 <= x0 || y1 <= y0) return;
  g.drawImage(img, x0 * k, y0 * k, (x1 - x0) * k, (y1 - y0) * k, r.x + (x0 - v.x) * v.s, r.y + (y0 - v.y) * v.s, (x1 - x0) * v.s, (y1 - y0) * v.s);
}

// ---------------------------------------------------------------------------
// The plate: where it is, and what its camera sees.

const plateRect = (T, G) => trackRect(T, [[0, G.main], [8.0, G.wide], [10.0, G.proof], [11.75, G.nav], [13.4, G.main], [16.0, G.markBox]]);

const FULL = { x: 0, y: 0, ...HERO };

/** Reveal: the full hero, then a push into its own Social Shake screenshot. */
const heroCamA = (T) => trackRect(T, [[0, FULL], [4.0, SITE.hero.proof]]);

/** Detail beats: a still close-up on nav items 02 to 04 while the highlight
 *  slides, then a pull back to the full hero. */
function heroCamE(T, G) {
  const it = SITE.nav.items, cw = G.navCamW / G.u0, ch = cw * (G.nav.h / G.nav.w);
  const cx = (it[1].x + it[3].x + it[3].w) / 2;
  return trackRect(T, [[0, { x: cx - cw / 2, y: 24 - ch / 2, w: cw, h: ch }], [13.4, FULL]]);
}

const wipeP = (t) => clamp(spring(t, ...SPRING.default));

function plate(g, T, L, G, th) {
  if (T < 2.0) return;
  const r = plateRect(T, G);
  const hero = th.name === 'dark' ? IMG.heroDark : IMG.heroLight;
  const close = smooth((T - 16.0) / 0.25);

  // Content, clipped to the plate and, on the way in, drawn top to bottom.
  const reveal = smooth((T - 2.0) / 0.6);
  g.save();
  g.beginPath(); g.rect(r.x, r.y, r.w, r.h * reveal); g.clip();
  g.globalAlpha = 1 - close;
  if (T < 4.75) drawCam(g, hero, HERO, heroCamA(T), r, th);
  if (T >= 4.6 && T < 6.6) { g.globalAlpha = (1 - close) * clamp((T - 4.6) / 0.12); drawCam(g, IMG.shake, { w: 1598, h: 1000 }, { x: 0, y: 0, w: 1598, h: 1000 }, r, th); g.globalAlpha = 1 - close; }
  const wipes = [
    [6.0, 8.6, () => drawCam(g, IMG.gixel, { w: 1920, h: 1200 }, { x: 0, y: 0, w: 1920, h: 1200 }, r, th)],
    [8.0, 12.5, () => drawCam(g, IMG.devfest, { w: 2870, h: 1552 }, { x: 0, y: 0, w: 2870, h: 1552 }, r, th)],
    [11.7, 99, () => drawCam(g, hero, HERO, heroCamE(T, G), r, th), true],
  ];
  for (const [t0, t1, paint, fast] of wipes) {
    if (T < t0 || T >= t1) continue;
    const p = fast ? clamp(spring(T - t0, ...SPRING.snappy)) : wipeP(T - t0);
    g.save(); g.beginPath(); g.rect(r.x, r.y, r.w * p, r.h); g.clip(); paint(); g.restore();
    if (p > 0.01 && p < 0.99) { g.fillStyle = th.annot; g.fillRect(r.x + r.w * p - L.u, r.y, 2 * L.u, r.h); }
  }
  g.restore();
  if (reveal > 0 && reveal < 1) { g.fillStyle = th.annot; g.fillRect(r.x, r.y + r.h * reveal - L.u, r.w, 2 * L.u); }

  // The close: the plate becomes the M mark.
  if (close > 0) {
    g.globalAlpha = smooth((T - 16.05) / 0.25);
    g.fillStyle = th.ink; g.fillRect(r.x, r.y, r.w, r.h);
    g.globalAlpha = 1;
    rise(g, T, 16.3, 99, r.h * 0.7, r.y + r.h * 0.76, () => display(g, 'M', r.x + r.w * 0.47, r.y + r.h * 0.76, r.h * 0.7, th.paper, { align: 'center' }));
    const d = r.w * 0.11 * spring(T - 16.5, ...SPRING.snappy), inset = r.w * 0.035;
    g.fillStyle = MARK; g.fillRect(r.x + r.w - inset - d, r.y + r.h - inset - d, d, d);
  }

  // Crop marks, drawn out from each corner; they step aside for the lockup.
  const len = 18 * L.u * spring(T - 2.0, ...SPRING.default), o = 10 * L.u;
  g.globalAlpha = 1 - smooth((T - 16.1) / 0.3);
  g.fillStyle = th.ink;
  const lw = 1.5 * L.u;
  for (const [cx, cy, sx, sy] of [[r.x - o, r.y - o, 1, 1], [r.x + r.w + o, r.y - o, -1, 1], [r.x - o, r.y + r.h + o, 1, -1], [r.x + r.w + o, r.y + r.h + o, -1, -1]]) {
    g.fillRect(sx > 0 ? cx : cx - len, sy > 0 ? cy : cy - lw, len, lw);
    g.fillRect(sx > 0 ? cx : cx - lw, sy > 0 ? cy : cy - len, lw, len);
  }
  g.globalAlpha = 1;
}

// ---------------------------------------------------------------------------
// Ground and the section header, numbered like the site.

function ground(g, L, th) {
  g.fillStyle = th.paper; g.fillRect(0, 0, L.w, L.h);
  g.fillStyle = th.grid;
  const minor = 27 * L.u, major = 135 * L.u;
  for (const step of [minor, major]) {
    for (let x = 0; x <= L.w; x += step) g.fillRect(Math.round(x), 0, 1, L.h);
    for (let y = 0; y <= L.h; y += step) g.fillRect(0, Math.round(y), L.w, 1);
  }
}

const LABELS = [
  [2.1, 3.85, '01', 'Moyomade Adegbite'],
  [4.05, 11.85, '02', 'Selected work'],
  [12.05, 15.85, '04', 'How I build'],
  [16.05, 99, '06', 'Contact'],
];
const CAPTIONS = [
  [4.1, 5.85, 'No. 01'], [6.1, 7.85, 'No. 02'], [8.1, 11.85, 'No. 03'], [16.25, 99, 'Open to frontend roles'],
];

function header(g, T, L, G, th) {
  if (T < 2.0) return;
  const h = G.header, size = 24 * L.u, y = h.y + 36 * L.u;
  g.fillStyle = th.ink;
  g.fillRect(h.x, h.y, h.w * clamp(spring(T - 2.0, ...SPRING.default)), 2 * L.u);
  for (const [tin, tout, num, title] of LABELS) {
    rise(g, T, tin, tout, size, y, () => {
      const nw = textW(g, num, FONT.mono, 500, size, size * 0.12), dash = ' — ', dw = textW(g, dash, FONT.mono, 500, size, size * 0.12);
      mono(g, num, h.x, y, size, th.annot);
      mono(g, dash, h.x + nw, y, size, th.muted);
      mono(g, title, h.x + nw + dw, y, size, th.ink);
    });
  }
  for (const [tin, tout, cap] of CAPTIONS) rise(g, T, tin, tout, size, y, () => mono(g, cap, h.x + h.w, y, size, th.muted, { align: 'right' }));
}

// ---------------------------------------------------------------------------
// Scene copy. Each line rises in after its plate move starts and leaves
// before the next one.

const TITLES = [
  [2.5, 3.9, 'Complicated flows, simple interfaces.', null],
  [4.3, 5.9, 'Social Shake', '500+ creators'],
  [6.3, 7.9, 'Gixel', 'One photo → a campaign'],
  [8.3, 9.9, 'DevFest Lagos 2024', 'Frontend engineer'],
  [12.3, 13.9, 'Built down to the details.', null],
  [14.05, 15.9, 'Paper, or blueprint.', null],
];

/** Words into at most two lines that fit maxW, shrinking only if they must. */
function lines2(g, str, size, maxW) {
  font(g, FONT.display, 600, size);
  if (g.measureText(str).width <= maxW) return { size, lines: [str] };
  const words = str.split(' ');
  let best = null;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(' '), b = words.slice(i).join(' ');
    const w = Math.max(g.measureText(a).width, g.measureText(b).width);
    if (!best || w < best.w) best = { w, lines: [a, b] };
  }
  return { size: best.w > maxW ? size * (maxW / best.w) : size, lines: best.lines };
}

function titles(g, T, L, G, th) {
  const t = G.title;
  for (const [tin, tout, main, sub] of TITLES) {
    if (T < tin || T > tout + 0.3) continue;
    const { size, lines } = lines2(g, main, t.size, t.maxW), lh = size * 1.04;
    lines.forEach((line, i) => rise(g, T, tin + i * 0.06, tout, size, t.y + i * lh, () => display(g, line, t.x, t.y + i * lh, size, th.ink)));
    const sy = t.subY + (lines.length - 1) * lh;
    if (sub) rise(g, T, tin + 0.12, tout, t.sub, sy, () => mono(g, sub, t.x, sy, t.sub, th.muted));
  }
}

function hookLayout(g, G) {
  const h = G.hook;
  const size = Math.min(fitSize(g, 'Building something', FONT.display, 600, h.size, h.maxW), fitSize(g, 'complicated?', FONT.display, 600, h.size, h.maxW));
  const w2 = textW(g, 'complicated?', FONT.display, 600, size);
  return { size, w2, mark: { x: h.x - 0.06 * size, y: h.y2 - 0.74 * size, w: w2 + 0.12 * size, h: 0.92 * size } };
}

function hook(g, T, L, G, th) {
  if (T > 2.2) return;
  const h = G.hook, { size } = hookLayout(g, G);
  rise(g, T, 0.05, 1.7, size, h.y1, () => display(g, 'Building something', h.x, h.y1, size, th.ink));
  rise(g, T, 0.2, 1.78, size, h.y2, () => display(g, 'complicated?', h.x, h.y2, size, th.ink));
}

// Proof: the one sourced number (SOURCES.md).
function numLayout(g, G) {
  // Sized so "82% → 96%" fits the column.
  const n = G.num, unit = (s) => textW(g, '82%', FONT.display, 600, s) + textW(g, '96%', FONT.display, 600, s) + s * 0.94;
  const size = Math.min(n.size, n.size * (G.header.w / unit(n.size)));
  const a = textW(g, '82%', FONT.display, 600, size), b = textW(g, '96%', FONT.display, 600, size);
  const gap = size * 0.16, arrow = size * 0.62;
  const bx = n.x + a + gap * 2 + arrow;
  return { size, a, b, gap, arrow, bx, mark: { x: bx - 0.05 * size, y: n.y - 0.74 * size, w: b + 0.1 * size, h: 0.9 * size } };
}

function proof(g, T, L, G, th) {
  if (T < 10.1 || T > 12.2) return;
  const n = G.num, k = numLayout(g, G), out = 11.55;
  rise(g, T, 10.15, out, k.size, n.y, () => display(g, '82%', n.x, n.y, k.size, th.ink));
  // The arrow draws from 82 toward 96, in the site's annotation blue.
  const p = clamp(spring(T - 10.4, ...SPRING.default)) * (1 - smooth((T - out) / 0.22));
  if (p > 0) {
    const x0 = n.x + k.a + k.gap, y = n.y - k.size * 0.33, x1 = x0 + k.arrow * p, lw = Math.max(3, k.size * 0.035);
    g.fillStyle = th.annot; g.fillRect(x0, y - lw / 2, x1 - x0, lw);
    g.beginPath(); g.moveTo(x1, y); g.lineTo(x1 - lw * 4, y - lw * 3); g.lineTo(x1 - lw * 4, y + lw * 3); g.closePath(); g.fill();
  }
  const count = Math.round(lerp(82, 96, smooth((T - 10.5) / 0.45)));
  rise(g, T, 10.5, out, k.size, n.y, () => display(g, `${count}%`, k.bx, n.y, k.size, th.ink));
  rise(g, T, 10.3, out, G.title.sub, n.labelY, () => mono(g, 'Accessibility · WCAG 2.1 AA', n.x, n.labelY, G.title.sub, th.muted));
}

// The close: the lockup and where to go.
function lockup(g, T, L, G, th) {
  if (T < 16.3) return;
  const m = G.markBox, k = G.lock, gap = 40 * L.u;
  const nx = k.beside ? m.x + m.w + gap : m.x;
  const ny = k.beside ? m.y + m.h * 0.42 : m.y + m.h + k.nameSize * 1.25;
  const ry = k.beside ? m.y + m.h * 0.78 : ny + k.roleSize * 2;
  rise(g, T, 16.45, 99, k.nameSize, ny, () => display(g, 'Moyomade Adegbite', nx, ny, k.nameSize, th.ink));
  rise(g, T, 16.6, 99, k.roleSize, ry, () => mono(g, 'Frontend developer', nx, ry, k.roleSize, th.muted));

  rise(g, T, 17.0, 99, k.ctaSize, k.ctaY, () => display(g, CTA, m.x, k.ctaY, k.ctaSize, th.ink));
  const uw = textW(g, CTA, FONT.display, 600, k.ctaSize) * clamp(spring(T - 17.35, ...SPRING.default));
  g.fillStyle = th.annot; g.fillRect(m.x, k.ctaY + k.ctaSize * 0.3, uw, Math.max(3, k.ctaSize * 0.035));
}

function badgeLayout(g, G, L) {
  const k = G.lock, size = 22 * L.u * (k.roleSize / (26 * L.u)), padX = size * 0.6;
  const w = textW(g, '● Available for roles'.toUpperCase(), FONT.mono, 500, size, size * 0.12) + padX * 2;
  return { size, padX, rect: { x: G.markBox.x, y: k.badgeY - size * 1.35, w, h: size * 2.1 } };
}

// ---------------------------------------------------------------------------
// The mark: one highlighter for the whole film.

function navRect(T, G, r) {
  const it = SITE.nav.items, L0 = (i) => it[i].x, R0 = (i) => it[i].x + it[i].w;
  const stops = [[0, 1], [12.5, 3], [13.0, 2]];
  // Leading edge first, trailing edge after: the highlight stretches as it slides.
  const lead = (f) => track(T, stops.map(([t, i]) => [t, f(i)]), 320, 30);
  const trail = (f) => track(T, stops.map(([t, i]) => [t, f(i)]), 140, 22);
  const left = Math.min(lead(L0), trail(L0)), right = Math.max(lead(R0), trail(R0));
  const v = view(heroCamE(T, G), r);
  const a = mapPt(v, r, { x: left, y: 10 }), b = mapPt(v, r, { x: right, y: 38 });
  return { x: a.x, y: a.y, w: b.x - a.x, h: b.y - a.y };
}

function markState(g, T, L, G) {
  const hk = hookLayout(g, G).mark;
  if (T < 2.05) return { ...hk, w: hk.w * clamp(spring(T - 0.72, ...SPRING.snappy)), a: 1 };
  if (T < 2.9) {
    const v = view(FULL, G.main), b = SITE.hero.badge;
    const p0 = mapPt(v, G.main, b), p1 = mapPt(v, G.main, { x: b.x + b.w, y: b.y + b.h });
    const badge = { x: p0.x, y: p0.y, w: p1.x - p0.x, h: p1.y - p0.y };
    return { ...trackRect(T, [[0, hk], [2.05, badge]]), a: 1 - smooth((T - 2.55) / 0.3) };
  }
  if (T < 10.9) return null;
  const nm = numLayout(g, G).mark;
  // As the number leaves, the highlighter flies off it into the nav.
  if (T < 11.6) return { ...nm, w: nm.w * clamp(spring(T - 10.95, ...SPRING.snappy)), a: 1 };
  if (T < 14.0) {
    const r = plateRect(T, G), nav = navRect(T, G, r), p = spring(T - 11.6, ...SPRING.default);
    const q = (k) => lerp(nm[k], nav[k], p);
    return { x: q('x'), y: q('y'), w: q('w'), h: q('h'), a: 1 - smooth((T - 13.6) / 0.3) };
  }
  if (T < 16.85) return null;
  const b = badgeLayout(g, G, L).rect;
  return { ...b, w: b.w * clamp(spring(T - 16.9, ...SPRING.snappy)), a: 1 };
}

function mark(g, T, L, G, th) {
  const m = markState(g, T, L, G);
  if (!m || m.a <= 0 || m.w <= 0) return;
  g.save();
  // On paper the highlighter multiplies, so the ink under it stays readable.
  g.globalCompositeOperation = th.name === 'light' ? 'multiply' : 'source-over';
  g.globalAlpha = clamp(m.a);
  g.fillStyle = MARK; g.fillRect(m.x, m.y, m.w, m.h);
  g.restore();
  if (T >= 16.85) {
    const b = badgeLayout(g, G, L), y = b.rect.y + b.rect.h * 0.66;
    g.save(); g.beginPath(); g.rect(b.rect.x, b.rect.y, m.w, b.rect.h); g.clip();
    rise(g, T, 17.0, 99, b.size, y, () => mono(g, '● Available for roles', b.rect.x + b.padX, y, b.size, ON_MARK));
    g.restore();
  }
}

// ---------------------------------------------------------------------------
// The cursor: it makes every change in the detail beats.

const CLICKS = [12.5, 13.0, 14.5];

function cursorCss() {
  const it = SITE.nav.items, c = (i) => it[i].x + it[i].w / 2, tg = SITE.hero.toggle;
  return [[0, c(1) + 220, 150], [12.05, c(3), 25], [12.6, c(2), 25], [13.55, tg.x + tg.w / 2, tg.y + tg.h / 2]];
}

function cursor(g, T, L, G, th) {
  if (T < 12.0 || T > 15.7) return;
  const r = plateRect(T, G), v = view(heroCamE(T, G), r);
  const [cx, cy] = track2(T, cursorCss(), ...SPRING.default);
  const p = mapPt(v, r, { x: cx, y: cy });
  const alpha = smooth((T - 12.0) / 0.15) * (1 - smooth((T - 15.3) / 0.3));
  g.save(); g.globalAlpha = alpha;
  // Each click ring stays on what was clicked, even as the camera moves.
  for (const tc of CLICKS) {
    const d = T - tc;
    if (d < 0 || d > 0.45) continue;
    const [kx, ky] = track2(tc, cursorCss(), ...SPRING.default), q = mapPt(v, r, { x: kx, y: ky });
    g.strokeStyle = th.annot; g.lineWidth = 2 * L.u; g.globalAlpha = alpha * (1 - d / 0.45);
    g.beginPath(); g.arc(q.x, q.y, (8 + 40 * smooth(d / 0.45)) * L.u, 0, Math.PI * 2); g.stroke();
  }
  g.globalAlpha = alpha;
  const press = CLICKS.reduce((s, tc) => s * (1 - 0.14 * clamp(1 - Math.abs(T - tc) / 0.1)), 1);
  const k = 1.5 * L.u * press;
  g.translate(p.x, p.y); g.scale(k, k);
  g.beginPath();
  [[0, 0], [0, 17], [4.5, 13], [7.6, 20], [10.4, 18.8], [7.4, 12], [13, 12]].forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
  g.closePath();
  g.fillStyle = '#121418'; g.fill();
  g.lineWidth = 1.4; g.strokeStyle = '#ffffff'; g.lineJoin = 'round'; g.stroke();
  g.restore();
}

// ---------------------------------------------------------------------------
// One frame, in one theme.

function frame(g, T, L, th) {
  const G = geo(L);
  G.u0 = L.u;
  ground(g, L, th);
  header(g, T, L, G, th);
  plate(g, T, L, G, th);
  hook(g, T, L, G, th);
  titles(g, T, L, G, th);
  proof(g, T, L, G, th);
  lockup(g, T, L, G, th);
  mark(g, T, L, G, th);
  cursor(g, T, L, G, th);
}

// The theme toggle at 14.5: blueprint spreads from the toggle across everything.
function themeWipe(L) {
  const G = geo(L); G.u0 = L.u;
  const r = plateRect(14.55, G), tg = SITE.hero.toggle;
  const c = mapPt(view(heroCamE(14.55, G), r), r, { x: tg.x + tg.w / 2, y: tg.y + tg.h / 2 });
  const far = Math.max(...[[0, 0], [L.w, 0], [0, L.h], [L.w, L.h]].map(([x, y]) => Math.hypot(x - c.x, y - c.y)));
  return { c, far };
}

export function under(g, T, L) {
  const p = T < 14.55 ? 0 : smooth((T - 14.55) / 0.8);
  if (p < 1) frame(g, T, L, LIGHT);
  if (p <= 0) return;
  const { c, far } = themeWipe(L);
  g.save();
  g.beginPath(); g.arc(c.x, c.y, far * p, 0, Math.PI * 2); g.clip();
  frame(g, T, L, DARK);
  g.restore();
  if (p < 1) {
    g.strokeStyle = DARK.annot; g.lineWidth = 2 * L.u;
    g.beginPath(); g.arc(c.x, c.y, far * p, 0, Math.PI * 2); g.stroke();
  }
}

// Scenes are drawn by under() as one composited frame; these entries name
// them for stills, the beat sheet and re-renders.
const noop = () => {};
export const TIMELINE = [
  { id: 'S1-hook', from: 0, to: 2, teaches: 'the question, with the highlighter', draw: noop },
  { id: 'S2-reveal', from: 2, to: 4, teaches: 'the portfolio, drawn in', draw: noop },
  { id: 'S3-social-shake', from: 4, to: 6, teaches: 'push into the hero proof: Social Shake', draw: noop },
  { id: 'S4-gixel', from: 6, to: 8, teaches: 'Gixel', draw: noop },
  { id: 'S5-devfest', from: 8, to: 10, teaches: 'DevFest Lagos 2024', draw: noop },
  { id: 'S6-proof', from: 10, to: 12, teaches: '82% to 96% accessibility', draw: noop },
  { id: 'S7-nav', from: 12, to: 14, teaches: 'the nav highlight slides', draw: noop },
  { id: 'S8-theme', from: 14, to: 16, teaches: 'paper to blueprint', draw: noop },
  { id: 'S9-close', from: 16, to: 20, teaches: 'lockup and moyomade.dev', draw: noop },
];
