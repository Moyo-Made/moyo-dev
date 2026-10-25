// node render.mjs [--w 1080 --h 1920 --fps 30 --sub 1 --from 0 --to DUR --out out/silent.mp4 --rm]
// node render.mjs --stills auto|1.2,3.4 [--tile 390 --cols 5 --name contact]
// node render.mjs --verify        node render.mjs --serve
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, dirname } from 'node:path';

const argv = process.argv.slice(2);
const has = (k) => argv.includes('--' + k);
const str = (k, d) => { const i = argv.indexOf('--' + k); return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : d; };
const num = (k, d) => { const v = str(k); return v === undefined ? d : Number(v); };

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.otf': 'font/otf' };
const root = process.cwd();
const server = createServer((req, res) => {
  const p = normalize(join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
  if (!p.startsWith(root) || !existsSync(p) || statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream', 'cache-control': 'no-store' });
  res.end(readFileSync(p));
});
await new Promise((r) => server.listen(num('port', 0), '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

if (has('serve')) {
  console.log(`preview: ${base}/index.html  (add ?w=1920&h=1080 for other formats)`);
  await new Promise(() => {});
}

const W = num('w', 1080), H = num('h', 1920), RM = has('rm');
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });

async function open() {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  page.on('pageerror', (e) => { console.error('page error:', e.message); process.exitCode = 1; });
  await page.goto(`${base}/index.html?w=${W}&h=${H}${RM ? '&rm=1' : ''}`);
  await page.waitForFunction(() => window.READY === true, null, { timeout: 30000 });
  return page;
}
const shot = async (page, t) => { await page.evaluate((x) => window.seek(x), t); return page.screenshot({ type: 'png' }); };
const done = async (code = 0) => { await browser.close(); server.close(); process.exit(process.exitCode || code); };

let page = await open();
const film = await page.evaluate(() => window.FILM);

if (has('verify')) {
  const times = [0.37, film.dur / 2, film.dur - 0.05];
  const a = []; for (const t of times) a.push(createHash('sha256').update(await shot(page, t)).digest('hex'));
  await page.close(); page = await open();
  const b = []; for (const t of [...times].reverse()) b.unshift(createHash('sha256').update(await shot(page, t)).digest('hex'));
  const ok = a.every((h, i) => h === b[i]);
  times.forEach((t, i) => console.log(`t=${t.toFixed(2)}  ${a[i].slice(0, 12)}  ${b[i].slice(0, 12)}  ${a[i] === b[i] ? 'same' : 'DIFFERENT'}`));
  console.log(ok ? 'deterministic: yes' : 'deterministic: NO, something depends on a timer, Math.random or carried state');
  await done(ok ? 0 : 1);
}

if (has('stills')) {
  const spec = str('stills', 'auto');
  const list = spec === 'auto'
    ? film.scenes.flatMap((s) => [{ t: s.from + Math.min(0.25, (s.to - s.from) / 4), label: `${s.id} in` }, { t: s.from + (s.to - s.from) * 0.6, label: `${s.id} key` }])
    : spec.split(',').map(Number).map((t) => ({ t, label: (film.scenes.find((s) => t >= s.from && t < s.to) || {}).id || '' }));
  const name = str('name', 'contact'), tile = num('tile', 390), cols = num('cols', Math.min(6, list.length));
  mkdirSync('out/stills', { recursive: true });
  const cells = [];
  for (const [i, s] of list.entries()) {
    const png = await shot(page, s.t);
    const f = `out/stills/${name}_${String(i).padStart(2, '0')}.png`;
    writeFileSync(f, png);
    cells.push(`<figure><img src="${base}/${f}"><figcaption>${s.t.toFixed(2)}s  ${s.label}</figcaption></figure>`);
  }
  const sheet = await browser.newPage({ viewport: { width: cols * (tile + 12) + 12, height: 100 } });
  await sheet.setContent(`<style>body{margin:12px;background:#222;display:grid;grid-template-columns:repeat(${cols},${tile}px);gap:12px;font:14px monospace;color:#eee}figure{margin:0}img{width:${tile}px;display:block}figcaption{padding:4px 0}</style>${cells.join('')}`, { waitUntil: 'load' });
  await sheet.screenshot({ path: `out/${name}.png`, fullPage: true });
  console.log(`wrote out/${name}.png (${list.length} frames at ${tile}px wide) and out/stills/${name}_*.png`);
  await done();
}

const FPS = num('fps', film.fps), SUB = num('sub', 1);
const FROM = num('from', 0), TO = num('to', num('dur', film.dur));
const OUT = str('out', 'out/silent.mp4');
mkdirSync(dirname(OUT), { recursive: true });
const args = ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS * SUB), '-i', '-'];
if (SUB > 1) args.push('-vf', `tmix=frames=${SUB},select='eq(mod(n\\,${SUB})\\,${SUB - 1})',setpts=N/${FPS}/TB`);
args.push('-r', String(FPS), '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', OUT);
const ff = spawn('ffmpeg', args, { stdio: ['pipe', 'inherit', 'inherit'] });
ff.stdin.on('error', () => {});

const total = Math.round((TO - FROM) * FPS * SUB);
const started = Date.now();
for (let i = 0; i < total; i++) {
  const png = await shot(page, FROM + i / (FPS * SUB));
  if (!ff.stdin.write(png)) await new Promise((r) => ff.stdin.once('drain', r));
  if (i % (FPS * SUB * 5) === 0) console.log(`${(FROM + i / (FPS * SUB)).toFixed(0)}s / ${TO}s`);
}
ff.stdin.end();
const code = await new Promise((r) => ff.on('close', r));
console.log(code === 0 ? `wrote ${OUT}  ${W}x${H} ${FPS}fps ${(TO - FROM).toFixed(2)}s in ${((Date.now() - started) / 1000).toFixed(0)}s` : 'ffmpeg failed');
await done(code);
