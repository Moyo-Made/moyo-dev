import { clamp } from './motion.js';

export const FONT = { display: '"Inter", "Helvetica Neue", Arial, sans-serif', ui: '"Inter", "Helvetica Neue", Arial, sans-serif' };

export function rrect(g, x, y, w, h, r) {
  r = Math.max(0, Math.min(r, w / 2, h / 2));
  g.beginPath();
  g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
}

export function wrap(g, text, maxW) {
  const out = []; let line = '';
  for (const word of String(text).split(/\s+/)) {
    const next = line ? line + ' ' + word : word;
    if (line && g.measureText(next).width > maxW) { out.push(line); line = word; } else line = next;
  }
  if (line) out.push(line);
  return out;
}

export function text(g, str, x, y, { size = 64, weight = 700, color = '#111', align = 'center', family = FONT.display, maxW = Infinity, lineH = 1.15, alpha = 1 } = {}) {
  g.save();
  g.globalAlpha *= clamp(alpha);
  g.font = `${weight} ${size}px ${family}`;
  g.fillStyle = color; g.textAlign = align; g.textBaseline = 'middle';
  const lines = wrap(g, str, maxW);
  const y0 = y - ((lines.length - 1) * size * lineH) / 2;
  lines.forEach((l, i) => g.fillText(l, x, y0 + i * size * lineH));
  g.restore();
  return lines.length;
}

export function cover(g, img, x, y, w, h, r = 0) {
  const s = Math.max(w / img.width, h / img.height);
  const sw = w / s, sh = h / s;
  g.save(); rrect(g, x, y, w, h, r); g.clip();
  g.drawImage(img, (img.width - sw) / 2, 0, sw, sh, x, y, w, h);
  g.restore();
}

export function loadImage(src) {
  return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('image failed: ' + src)); i.src = src; });
}

// Burned-in captions from data/vo.json. On-screen words are anchors, so chunks stay short.
export function captions(g, t, L, caps, { color = '#1F2440', plate = '#FFFFFF', size = 46 } = {}) {
  if (!caps) return;
  const c = caps.find((q) => t >= q.start && t < q.end);
  if (!c) return;
  const px = size * L.u;
  g.save();
  g.font = `700 ${px}px ${FONT.ui}`;
  const lines = wrap(g, c.text, L.safe.w * 0.9).slice(0, 2);
  const w = Math.max(...lines.map((l) => g.measureText(l).width)) + px * 1.1;
  const h = lines.length * px * 1.25 + px * 0.6;
  g.fillStyle = plate; rrect(g, L.cx - w / 2, L.captionY - h / 2, w, h, px * 0.4); g.fill();
  g.fillStyle = color; g.textAlign = 'center'; g.textBaseline = 'middle';
  lines.forEach((l, i) => g.fillText(l, L.cx, L.captionY + (i - (lines.length - 1) / 2) * px * 1.25));
  g.restore();
}
