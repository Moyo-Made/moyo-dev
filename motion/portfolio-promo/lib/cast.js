import { wobble } from './motion.js';

export const INK = '#1F2440';
export const PAPER = '#FFF8EC';
export const CAST = {
  tobi: { body: '#FFD25A', flap: '#EDB435', role: 'the curious one, stands in for the viewer' },
  ada: { body: '#FF9E8A', flap: '#EE7B66', role: 'the skeptic, wants proof' },
  sola: { body: '#7FD1C7', flap: '#55B5AA', role: 'the explainer, shows how it works' },
};
export const EXPRESSIONS = ['neutral', 'happy', 'shocked', 'skeptic', 'thinking'];
export const POSES = ['idle', 'wave', 'point', 'crossed', 'cheeks'];

const S = 100;

function body(g, c) {
  const f = 46;
  g.beginPath();
  g.moveTo(-S + 10, -S); g.lineTo(S - 10, -S); g.quadraticCurveTo(S, -S, S, -S + 10);
  g.lineTo(S, S - f); g.lineTo(S - f, S); g.lineTo(-S + 10, S);
  g.quadraticCurveTo(-S, S, -S, S - 10); g.lineTo(-S, -S + 10); g.quadraticCurveTo(-S, -S, -S + 10, -S);
  g.closePath(); g.fillStyle = c.body; g.fill(); g.stroke();
  g.beginPath(); g.moveTo(S, S - f); g.lineTo(S - f, S - f); g.lineTo(S - f, S); g.closePath();
  g.fillStyle = c.flap; g.fill(); g.stroke();
}

function face(g, who, expr, look) {
  const ex = 34, ey = -18 + (expr === 'thinking' ? -6 : 0), lx = look * 8;
  g.fillStyle = INK;
  if (expr === 'happy') {
    for (const sx of [-1, 1]) { g.beginPath(); g.arc(sx * ex + lx, ey + 6, 12, Math.PI, 0); g.stroke(); }
  } else {
    const r = expr === 'shocked' ? 13 : 9;
    for (const sx of [-1, 1]) { g.beginPath(); g.arc(sx * ex + lx, ey, r, 0, Math.PI * 2); g.fill(); }
  }
  if (expr === 'skeptic') {
    g.beginPath(); g.moveTo(ex - 16, ey - 34); g.lineTo(ex + 18, ey - 26); g.stroke();
    g.beginPath(); g.moveTo(-ex - 16, ey - 22); g.lineTo(-ex + 16, ey - 22); g.stroke();
  }
  if (who === 'ada') {
    for (const sx of [-1, 1]) { g.beginPath(); g.arc(sx * ex + lx, ey, 24, 0, Math.PI * 2); g.stroke(); }
    g.beginPath(); g.moveTo(-ex + 24 + lx, ey); g.lineTo(ex - 24 + lx, ey); g.stroke();
  }
  const my = 34;
  g.beginPath();
  if (expr === 'happy') g.arc(lx, my - 8, 24, 0.15 * Math.PI, 0.85 * Math.PI);
  else if (expr === 'shocked') g.ellipse(lx, my + 2, 11, 15, 0, 0, Math.PI * 2);
  else if (expr === 'skeptic') { g.moveTo(-18 + lx, my + 4); g.lineTo(20 + lx, my - 4); }
  else if (expr === 'thinking') { g.moveTo(-8 + lx, my); g.lineTo(12 + lx, my); }
  else g.arc(lx, my - 14, 22, 0.25 * Math.PI, 0.75 * Math.PI);
  g.stroke();
}

function limb(g, pts) {
  g.beginPath(); g.moveTo(pts[0], pts[1]); g.quadraticCurveTo(pts[2], pts[3], pts[4], pts[5]); g.stroke();
  g.beginPath(); g.arc(pts[4], pts[5], 9, 0, Math.PI * 2); g.fillStyle = INK; g.fill();
}

function arms(g, pose, t) {
  const w = wobble(t, 2.2) * 10;
  const A = {
    idle: [[-S, 30, -S - 34, 52, -S - 30, 84], [S, 30, S + 34, 52, S + 30, 84]],
    wave: [[-S, 30, -S - 34, 52, -S - 30, 84], [S, 10, S + 40, -20, S + 44 + w, -78]],
    point: [[-S, 30, -S - 34, 52, -S - 30, 84], [S, 16, S + 44, 6, S + 86, -10]],
    crossed: [[-S, 34, -70, 92, 44, 58], [S, 34, 70, 92, -44, 58]],
    cheeks: [[-S, 44, -S - 30, 20, -S + 18, 6], [S, 44, S + 30, 20, S - 18, 6]],
  }[pose] || [];
  A.forEach((p) => limb(g, p));
}

function props(g, who, held) {
  if (who === 'tobi' && held) {
    g.save(); g.translate(-S - 30, 84); g.rotate(-0.35);
    g.fillStyle = '#4CAF6E'; g.fillRect(-9, -92, 18, 80); g.strokeRect(-9, -92, 18, 80);
    g.beginPath(); g.moveTo(-9, -92); g.lineTo(0, -116); g.lineTo(9, -92); g.closePath(); g.fillStyle = PAPER; g.fill(); g.stroke();
    g.restore();
  }
  if (who === 'ada') {
    g.fillStyle = INK; g.fillRect(-26, -S - 18, 52, 30);
    g.beginPath(); g.arc(-14, -S - 26, 12, Math.PI, 0); g.stroke();
    g.beginPath(); g.arc(14, -S - 26, 12, Math.PI, 0); g.stroke();
  }
  if (who === 'sola') {
    g.save(); g.translate(-52, -S); g.lineWidth = 5; g.strokeStyle = '#8A93A6';
    g.beginPath(); g.moveTo(-10, 34); g.lineTo(-10, -22); g.arc(0, -22, 10, Math.PI, 0); g.lineTo(10, 22); g.arc(4, 22, 6, 0, Math.PI); g.lineTo(-2, -10); g.stroke();
    g.restore();
  }
  if (who === 'sola' && held) {
    g.save(); g.translate(-S - 30, 84); g.rotate(-0.3);
    g.fillStyle = '#FF8A3D'; g.fillRect(-10, -84, 20, 72); g.strokeRect(-10, -84, 20, 72);
    g.fillStyle = INK; g.fillRect(-6, -100, 12, 16);
    g.restore();
  }
}

// x, y is the centre of the note. scale 1 is a 200px note.
export function drawCharacter(g, who, x, y, { scale = 1, expr = 'neutral', pose = 'idle', look = 0, t = 0, alpha = 1 } = {}) {
  const c = CAST[who];
  if (!c) throw new Error('unknown cast member: ' + who);
  g.save();
  g.globalAlpha *= alpha;
  g.translate(x, y + wobble(t, 0.45, who.length * 0.21) * 4 * scale);
  g.scale(scale, scale);
  g.lineWidth = 6; g.lineJoin = 'round'; g.lineCap = 'round'; g.strokeStyle = INK;
  for (const sx of [-1, 1]) { g.beginPath(); g.moveTo(sx * 38, S); g.lineTo(sx * 38, S + 38); g.lineTo(sx * 38 + 18, S + 38); g.stroke(); }
  body(g, c);
  face(g, who, expr, look);
  arms(g, pose, t);
  props(g, who, pose !== 'crossed' && pose !== 'cheeks');
  g.restore();
}
