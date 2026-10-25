# Decisions

**What the film says:** Moyo is a frontend developer who makes complicated products feel simple, and the portfolio itself is the proof.
**What the viewer can do afterwards:** name two things Moyo built (Social Shake, Gixel), and go to moyomade.dev.

- Mode: `product`. The subject is a real site (the portfolio), shown only through real screenshots of it.
- Formats: 1:1 first (LinkedIn / X feeds, the user's pick), then 16:9 and 9:16 from the same timeline.
- Length: 20 s (user's pick). Ten 2-second bars at 120 bpm; every scene starts on a downbeat.
- Music: synthesized bed, `audio.mjs bed --bpm 120 --dur 20 --seed 2 --drums` (user's pick: compose one).
- CTA: moyomade.dev (user supplied). Not deployed yet; it is one constant, `CTA`, in film.js.
- Look: the site's own tokens, drafting paper (light) turning to blueprint (dark) at the theme-toggle beat. Fonts are the site's: IBM Plex Sans Condensed (display), Geist Mono (labels).
- Accent: the site's yellow highlighter `#f2b705` is the one recurring object. It underlines the hook, lands on the hero's "Available for roles" badge, becomes the nav highlight, marks the proof number and ends as the badge in the lockup. Blue `#2443e6` is used only as the site uses it: numbers and annotation lines.
- Chapter labels reuse the site's section headers (`02 — SELECTED WORK`), so the film is numbered like the site.
- Screenshots come from a production build (`next start`), not `next dev`, so the dev badge is not in frame. Captured with reduced motion so the hero has fully settled.
- Hook copy is the site's own footer line ("Building something complicated?"). The hero caption shortens the site's tagline to "Complicated flows, simple interfaces."
- Three projects: Social Shake and Gixel (the two the hero and README lead with), then DevFest Lagos 2024 for the one sourced number.
- Proof: 82% → 96% accessibility on DevFest Lagos 2024, from the site's own project data.
- The nav-highlight and theme-toggle beats show the site's real behaviour: one highlight that slides between sections, and light ↔ blueprint.
- No voice, so no captions. The film reads with the sound off.
- Final renders are 60 fps with no frame blending (`--sub 1`). At `--sub 4` fast moves showed four stacked copies instead of blur; see docs/review_log.md round 4.
