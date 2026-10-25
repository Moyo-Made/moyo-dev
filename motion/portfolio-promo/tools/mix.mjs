// node tools/mix.mjs --video out/silent.mp4 [--voice audio/voice.wav] [--music audio/bed.wav] [--sfx audio/sfx.wav]
//                    [--lufs -16] [--music-db -19] [--sfx-db -8] [--denoise] --out out/final.mp4
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf('--' + k); return i >= 0 ? argv[i + 1] : d; };
const video = opt('video', 'out/silent.mp4'), out = opt('out', 'out/final.mp4');
const voice = opt('voice'), music = opt('music'), sfx = opt('sfx');
const lufs = Number(opt('lufs', voice ? -16 : -14));
const musicDb = Number(opt('music-db', voice ? -19 : -6)), sfxDb = Number(opt('sfx-db', voice ? -8 : -3));
for (const f of [video, voice, music, sfx]) if (f && !existsSync(f)) { console.error('missing file: ' + f); process.exit(1); }
if (!voice && !music && !sfx) { console.error('give at least one of --voice, --music, --sfx'); process.exit(1); }

const inputs = ['-i', video], chains = [], mixIn = [];
let n = 1;
if (voice) {
  inputs.push('-i', voice);
  chains.push(`[${n}:a]aresample=48000,highpass=f=80${argv.includes('--denoise') ? ',afftdn=nr=12:nf=-30' : ''},aformat=channel_layouts=stereo,asplit=2[vo][key]`);
  mixIn.push('[vo]'); n++;
}
if (music) {
  inputs.push('-i', music);
  chains.push(`[${n}:a]aresample=48000,aformat=channel_layouts=stereo,volume=${musicDb}dB[mraw]`);
  if (voice) chains.push('[mraw][key]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[mus]');
  mixIn.push(voice ? '[mus]' : '[mraw]'); n++;
} else if (voice) chains.push('[key]anullsink');
if (sfx) {
  inputs.push('-i', sfx);
  chains.push(`[${n}:a]aresample=48000,aformat=channel_layouts=stereo,volume=${sfxDb}dB[fx]`);
  mixIn.push('[fx]'); n++;
}
const premix = `${mixIn.join('')}amix=inputs=${mixIn.length}:normalize=0:duration=longest`;
const graph = (tail) => [...chains, `${premix},${tail}[a]`].join(';');

const pass1 = spawnSync('ffmpeg', ['-hide_banner', ...inputs, '-filter_complex', graph(`loudnorm=I=${lufs}:TP=-2:LRA=11:print_format=json`), '-map', '[a]', '-f', 'null', '-'], { encoding: 'utf8' });
if (pass1.status !== 0) { console.error(pass1.stderr.split('\n').slice(-6).join('\n')); process.exit(1); }
// loudnorm's JSON is the last {...} block; newer ffmpeg prints stats after it.
const lastJson = (txt) => { const a = txt.lastIndexOf('{'); return JSON.parse(txt.slice(a, txt.indexOf('}', a) + 1)); };
const m1 = lastJson(pass1.stderr);
const gain = (lufs - Number(m1.input_i)).toFixed(2);

const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...inputs, '-filter_complex', graph(`volume=${gain}dB,aresample=192000,alimiter=limit=0.708:attack=5:release=80:level=false,aresample=48000`), '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out], { stdio: 'inherit' });
if (r.status !== 0) process.exit(r.status ?? 1);

const m = spawnSync('ffmpeg', ['-hide_banner', '-i', out, '-af', 'loudnorm=print_format=json', '-f', 'null', '-'], { encoding: 'utf8' }).stderr;
const j = lastJson(m);
console.log(`wrote ${out}`);
console.log(`measured: ${j.input_i} LUFS integrated (target ${lufs}), true peak ${j.input_tp} dBTP (limit -1.5)`);
if (Math.abs(Number(j.input_i) - lufs) > 1 || Number(j.input_tp) > -1.5) console.log('OUT OF SPEC: adjust --music-db / --sfx-db or the source levels and mix again');
