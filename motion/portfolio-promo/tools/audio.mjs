// node tools/audio.mjs bed --bpm 96 --dur 60 --seed 3 [--root 57 --drums] --out audio/bed.wav   (also writes data/beats.json)
// node tools/audio.mjs sfx data/cues.json audio/sfx.wav       cues: [{"t":0.5,"type":"click"}, ...]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const SR = 48000;
const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf('--' + k); return i >= 0 ? argv[i + 1] : d; };
const TAU = Math.PI * 2;
const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);

function rng(seed) {
  return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}

function writeWav(path, buf) {
  let peak = 0; for (const v of buf) peak = Math.max(peak, Math.abs(v));
  const gain = peak > 0.89 ? 0.89 / peak : 1;
  const n = buf.length, b = Buffer.alloc(44 + n * 2);
  b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVEfmt ', 8);
  b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
  b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34);
  b.write('data', 36); b.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) b.writeInt16LE(Math.round(Math.max(-1, Math.min(1, buf[i] * gain)) * 32767), 44 + i * 2);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, b);
}

function add(buf, t0, len, fn) {
  const start = Math.floor(t0 * SR), n = Math.floor(len * SR);
  for (let i = 0; i < n && start + i < buf.length; i++) if (start + i >= 0) buf[start + i] += fn(i / SR);
}

if (argv[0] === 'bed') {
  const bpm = Number(opt('bpm', 96)), dur = Number(opt('dur', 30)), root = Number(opt('root', 57));
  const r = rng(Number(opt('seed', 1))), out = opt('out', 'audio/bed.wav');
  const beat = 60 / bpm, bar = beat * 4, buf = new Float32Array(Math.ceil(dur * SR));
  const prog = [[0, 4, 7, 11], [-3, 0, 4, 7], [-7, -3, 0, 4], [-5, -1, 2, 7]];
  const scale = [0, 2, 4, 7, 9, 12, 14];
  const motif = Array.from({ length: 8 }, () => (r() < 0.3 ? null : scale[Math.floor(r() * scale.length)]));
  const bars = Math.ceil(dur / bar);
  for (let b = 0; b < bars; b++) {
    const chord = prog[b % prog.length];
    for (const note of chord) {
      const f = hz(root - 12 + note), det = 1 + (r() - 0.5) * 0.004;
      add(buf, b * bar, bar + 0.6, (t) => {
        const env = Math.min(1, t / 0.5) * Math.min(1, (bar + 0.6 - t) / 0.6);
        return (Math.sin(TAU * f * t) + 0.5 * Math.sin(TAU * f * det * 2 * t)) * env * 0.06;
      });
    }
    for (let s = 0; s < 8; s++) {
      if (motif[s] === null) continue;
      const f = hz(root + 12 + motif[s] + (b % 4 === 3 && s > 5 ? 2 : 0));
      add(buf, b * bar + s * beat / 2, 0.9, (t) => (Math.sin(TAU * f * t) + 0.3 * Math.sin(TAU * f * 3 * t) * Math.exp(-t * 14)) * Math.exp(-t * 5) * Math.min(1, t / 0.004) * 0.11);
    }
    if (argv.includes('--drums')) for (let k = 0; k < 4; k++) add(buf, b * bar + k * beat, 0.35, (t) => Math.sin(TAU * (95 - 55 * Math.min(1, t * 6)) * t) * Math.exp(-t * 11) * (k % 2 ? 0.2 : 0.42));
  }
  const fade = Math.min(1.5, dur / 4) * SR;
  for (let i = 0; i < fade; i++) { buf[i] *= i / fade; buf[buf.length - 1 - i] *= i / fade; }
  writeWav(out, buf);
  const beats = Array.from({ length: Math.floor(dur / beat) }, (_, i) => +(i * beat).toFixed(3));
  mkdirSync('data', { recursive: true });
  writeFileSync('data/beats.json', JSON.stringify({ bpm, beats, downbeats: beats.filter((_, i) => i % 4 === 0), hits: [] }, null, 1));
  console.log(`wrote ${out} (${dur}s, ${bpm} bpm) and data/beats.json`);
} else if (argv[0] === 'sfx') {
  const cues = JSON.parse(readFileSync(argv[1], 'utf8')), out = argv[2] || 'audio/sfx.wav';
  const buf = new Float32Array(Math.ceil((Math.max(...cues.map((c) => c.t)) + 2) * SR));
  let s = 42; const noise = () => (s = (s * 1664525 + 1013904223) >>> 0) / 2147483648 - 1;
  const VOICES = {
    click: [0.05, (t) => Math.sin(TAU * 1800 * t) * Math.exp(-t * 90) * 0.5],
    pop: [0.15, (t) => Math.sin(TAU * (600 + 900 * t) * t) * Math.exp(-t * 30) * 0.4],
    tick: [0.04, (t) => Math.sin(TAU * 2600 * t) * Math.exp(-t * 140) * 0.3],
    thump: [0.5, (t) => Math.sin(TAU * (90 - 60 * t) * t) * Math.exp(-t * 9) * 0.9],
    whoosh: [0.35, (t) => noise() * Math.sin(Math.PI * Math.min(1, t / 0.35)) * 0.25],
    chime: [1.2, (t) => (Math.sin(TAU * 880 * t) + 0.5 * Math.sin(TAU * 1320 * t)) * Math.exp(-t * 4) * 0.25],
  };
  for (const c of cues) {
    const v = VOICES[c.type];
    if (!v) throw new Error(`unknown sfx type "${c.type}", use: ${Object.keys(VOICES).join(', ')}`);
    add(buf, c.t, v[0], (t) => v[1](t) * (c.gain ?? 1));
  }
  writeWav(out, buf);
  console.log(`wrote ${out} (${cues.length} cues)`);
} else {
  console.log('usage: audio.mjs bed --bpm 96 --dur 60 --seed 3 --out audio/bed.wav | audio.mjs sfx data/cues.json audio/sfx.wav');
  process.exit(1);
}
