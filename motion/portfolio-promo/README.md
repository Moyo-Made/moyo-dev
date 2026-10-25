# Portfolio promo film

A 20-second film for moyomade.dev, built from real screenshots of the portfolio. Every frame is drawn by `film.js` as a pure function of time, so it re-renders identically.

## Files

| File | What it is |
|---|---|
| `out/final_1x1.mp4` | 1080×1080, 60 fps, with sound. For LinkedIn and X feeds. |
| `out/final_16x9.mp4` | 1920×1080, 60 fps, with sound. For the site, YouTube, slides. |
| `out/final_9x16.mp4` | 1080×1920, 60 fps, with sound. For Reels, TikTok, Shorts. |
| `out/final_reduced_1x1.mp4` | 1:1 reduced-motion cut, 30 fps. |
| `out/silent_*.mp4` | the same films without sound |
| `out/contact.png` | two frames per scene |

## What was run, and the results

- `node render.mjs --verify`: `deterministic: yes`, on the final film.
- Renders: all three formats at 60 fps, 20.00 s each, plus the reduced-motion cut at 30 fps.
- Mix, each file: −14.53 LUFS integrated (target −14) and −2.86 dBTP true peak (limit −1.5). In spec.
- Sound sync: all 19 sound-effect onsets measured within 0.02 s of their cue times in `data/cues.json`.
- Checked by eye: stills in all three formats, frame strips of every fast move, and frames from every final file. The audio was checked by measurement, not by listening.
- Not used: motion blur (`--sub 4`). With four samples, fast moves showed stacked copies instead of blur, so the finals are crisp 60 fps (see `docs/review_log.md`, round 4).

## Changing it

- **The domain on the end card** is the `CTA` constant at the top of `film.js`.
- **Re-rendering everything** (about 10 minutes): `bash tools/export-all.sh`
- **Updated screenshots:** run the site with `npm run build && npx next start -p 3100`, then `node tools/capture-site.mjs http://localhost:3100`.
- If Playwright can't find a browser, point `CHROMIUM_PATH` at an installed Chromium headless shell, for example `~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-x64/chrome-headless-shell`.

## Where things are

- `DECISIONS.md`: every choice made, and why
- `SOURCES.md`: where each claim on screen comes from
- `docs/scenes.md`: the beat sheet
- `docs/review_log.md`: the critique rounds
