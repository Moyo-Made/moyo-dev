let REDUCED = false;
export const setReducedMotion = (v) => { REDUCED = !!v; };
export const isReducedMotion = () => REDUCED;

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, p) => a + (b - a) * p;
export const invlerp = (a, b, x) => clamp((x - a) / (b - a));
export const smooth = (p) => { p = clamp(p); return p * p * (3 - 2 * p); };

// Closed-form damped spring 0 -> 1, a pure function of time since it started.
export function spring(t, k = 170, d = 26) {
  if (t <= 0) return 0;
  if (REDUCED) return smooth(t / 0.18);
  const w0 = Math.sqrt(k), z = d / (2 * w0);
  if (z < 1) {
    const wd = w0 * Math.sqrt(1 - z * z);
    return 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + (z * w0 / wd) * Math.sin(wd * t));
  }
  return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
}

export const SPRING = {
  snappy: [320, 30],
  default: [170, 26],
  heavy: [90, 22],
  playful: [220, 14],
};

// keys: [[time, value], ...] sorted by time. One spring per change, summed.
export function track(t, keys, k = 170, d = 26) {
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++) v += (keys[i][1] - keys[i - 1][1]) * spring(t - keys[i][0], k, d);
  return v;
}

export function track2(t, keys, k, d) {
  return [track(t, keys.map((q) => [q[0], q[1]]), k, d), track(t, keys.map((q) => [q[0], q[2]]), k, d)];
}

export function indicator(t, stops, width = 120) {
  const lead = track(t, stops, 320, 30), trail = track(t, stops, 140, 22);
  return { left: Math.min(lead, trail), right: Math.max(lead, trail) + width };
}

export function swapAlpha(t, tIn, tOut) {
  return Math.min(clamp((t - tIn - 0.08) / 0.12), clamp((tOut - 0.1 - t) / 0.1));
}

// Fade in at a, hold, fade out before b.
export const window01 = (t, a, b, fin = 0.2, fout = 0.2) => Math.min(clamp((t - a) / fin), clamp((b - t) / fout));

export const loopT = (t, dur) => ((t % dur) + dur) % dur;

export function rng(seed) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// Deterministic idle motion (breathing, drift). Never use timers for this.
export const wobble = (t, hz = 0.5, phase = 0) => REDUCED ? 0 : Math.sin((t * hz + phase) * Math.PI * 2);

// Layout: write scenes against these, never against fixed pixels.
export function layout(w, h) {
  const ar = w / h;
  const format = ar > 1.3 ? '16x9' : ar < 0.8 ? '9x16' : '1x1';
  const u = Math.min(w, h) / 1080;
  const safe = format === '9x16'
    ? { x: 72 * u, y: 220 * u, w: w - 144 * u, h: h - 620 * u }
    : format === '16x9'
      ? { x: 120 * u, y: 90 * u, w: w - 240 * u, h: h - 240 * u }
      : { x: 80 * u, y: 90 * u, w: w - 160 * u, h: h - 260 * u };
  return {
    w, h, u, format, safe,
    cx: w / 2, cy: safe.y + safe.h / 2,
    captionY: format === '9x16' ? h - 330 * u : h - 110 * u,
    pick: (o) => o[format] ?? o.default,
  };
}
