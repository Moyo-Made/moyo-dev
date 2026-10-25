#!/usr/bin/env python3
"""Voice-locked timing. Timing comes from the recording, words come from the script.

python3 tools/vo_timing.py audio/voice.wav --script script.txt
writes data/vo.json (sentences + caption chunks) and out/captions.srt
"""
import argparse, json, os, re, subprocess, sys

ap = argparse.ArgumentParser()
ap.add_argument("audio")
ap.add_argument("--script", required=True)
ap.add_argument("--noise", default="-34dB")
ap.add_argument("--min-silence", type=float, default=0.28)
ap.add_argument("--words", type=int, default=6, help="max words per caption chunk")
ap.add_argument("--snap", type=float, default=0.6)
a = ap.parse_args()

err = subprocess.run(
    ["ffmpeg", "-hide_banner", "-i", a.audio, "-af", f"silencedetect=noise={a.noise}:d={a.min_silence}", "-f", "null", "-"],
    capture_output=True, text=True).stderr
m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", err)
if not m:
    sys.exit("could not read audio: " + a.audio)
dur = int(m[1]) * 3600 + int(m[2]) * 60 + float(m[3])
starts = [float(x) for x in re.findall(r"silence_start: (-?[\d.]+)", err)]
ends = [float(x) for x in re.findall(r"silence_end: (-?[\d.]+)", err)]
if len(ends) < len(starts):
    ends.append(dur)
silences = [(max(0.0, s), e) for s, e in zip(starts, ends)]

voiced, cur = [], 0.0
for s, e in silences:
    if s - cur > 0.05:
        voiced.append((cur, s))
    cur = e
if dur - cur > 0.05:
    voiced.append((cur, dur))
if not voiced:
    sys.exit("no speech found, try a lower --noise such as -40dB")

text = re.sub(r"\s+", " ", open(a.script, encoding="utf-8").read()).strip()
sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", text) if s.strip()]
weight = lambda s: len(re.sub(r"[^\w]", "", s)) + 6 * len(re.findall(r"[,;:]", s))
total_voiced = sum(e - s for s, e in voiced)

def at(voiced_pos):
    acc = 0.0
    for s, e in voiced:
        if voiced_pos <= acc + (e - s):
            return s + (voiced_pos - acc)
        acc += e - s
    return voiced[-1][1]

gaps = [((s + e) / 2, s, e) for s, e in silences if 0 < s and e < dur]
tw, acc, cuts = sum(weight(s) for s in sentences), 0.0, [voiced[0][0]]
for s in sentences[:-1]:
    acc += weight(s)
    est = at(total_voiced * acc / tw)
    near = min(gaps, key=lambda g: abs(g[0] - est), default=None)
    cuts.append(near if near and abs(near[0] - est) <= a.snap else (est, est, est))
out_s, snapped = [], 0
for i, s in enumerate(sentences):
    start = cuts[i] if i == 0 else cuts[i][2]
    if i + 1 < len(sentences):
        end = cuts[i + 1][1]
        snapped += cuts[i + 1][1] != cuts[i + 1][2]
    else:
        end = voiced[-1][1]
    out_s.append({"i": i, "text": s, "start": round(start, 3), "end": round(max(end, start + 0.2), 3)})

caps = []
for s in out_s:
    words = s["text"].split()
    chunks = [words[i:i + a.words] for i in range(0, len(words), a.words)]
    if len(chunks) > 1 and len(chunks[-1]) < 3:
        tail = chunks.pop()
        chunks[-1] += tail
    cw = [sum(len(w) for w in c) for c in chunks]
    t, span = s["start"], s["end"] - s["start"]
    for c, w in zip(chunks, cw):
        d = span * w / sum(cw)
        caps.append({"text": " ".join(c), "start": round(t, 3), "end": round(t + d, 3)})
        t += d
for x, y in zip(caps, caps[1:]):
    x["end"] = max(x["end"], y["start"])

os.makedirs("data", exist_ok=True)
os.makedirs("out", exist_ok=True)
json.dump({"duration": round(dur, 3), "sentences": out_s, "captions": caps, "voiced": [[round(s, 3), round(e, 3)] for s, e in voiced]},
          open("data/vo.json", "w"), indent=1, ensure_ascii=False)

def ts(x):
    ms = int(round(x * 1000))
    return f"{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}"

with open("out/captions.srt", "w", encoding="utf-8") as f:
    for i, c in enumerate(caps, 1):
        f.write(f"{i}\n{ts(c['start'])} --> {ts(c['end'])}\n{c['text']}\n\n")

n = len(sentences) - 1
print(f"{dur:.2f}s audio, {len(sentences)} sentences, {len(caps)} caption chunks")
print(f"{snapped}/{n} sentence boundaries snapped to a real pause; the rest are estimates" if n else "single sentence")
if n and snapped < n:
    print("check the estimated ones by ear, or re-record with a half-second pause between sentences")
for s in out_s:
    print(f"  {s['start']:6.2f} - {s['end']:6.2f}  {s['text'][:70]}")
