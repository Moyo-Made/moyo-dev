# Review log

Round 1 (stills, 1:1, 16:9, 9:16)  scores: hook 8, readability 6, clarity 8, motion 7, composition 6, consistency 9, sync n/a
1. 11.4 "82% → 96%" ran past the right margin in 1:1 -> the number is now sized to fit the column.
2. 12.8 click ring followed the cursor away from what it clicked -> ring is anchored to the clicked item.
3. 18.5 the CTA underline cut through the "y" of moyomade.dev -> moved below the descender.
4. 12.25 a strip of the DevFest screenshot lingered at the end of the nav close-up -> that reveal now uses the snappy spring and starts earlier.

Round 2  scores: hook 8, readability 7, clarity 8, motion 8, composition 7, consistency 9, sync n/a
1. 16:9 titles were shrunk to fit a 600 px column and read small -> titles wrap to two lines at full size.
2. 9:16 was top-heavy with ~400 px empty at the bottom -> everything under the header moved down 110 px.
3. 11.95 the plate set off for the nav while "82%" was still leaving, overlapping it -> number leaves earlier, plate moves later.

Round 3 (draft video, frame every 0.5 s, plus strips of each fast move)  scores: hook 8, readability 8, clarity 8, motion 8, composition 8, consistency 9, sync 8
1. 11.5 the highlighter sat alone where 96% had been for ~0.4 s -> it now leaves with the number and flies straight into the nav; its whoosh moved to 11.6.
2. 1:1 secondary labels (header, project lines) were 8 px at 390 px wide -> header labels 22 → 24 px, project lines 28 → 30 px.

Accessibility: text contrast uses the site's checked tokens (muted on paper 5.8:1, annot on paper 6.4:1, on-mark on mark 10.1:1, dark muted 7.1:1). No flashes; the fastest repeated change is the count, which has no luminance flash. The highlighter is never the only signal: what it marks is also named in text. A reduced-motion cut renders (`--rm`).

Round 4 (final 60 fps file, motion blur --sub 4)  scores: hook 8, readability 6, clarity 8, motion 6, composition 8, consistency 9, sync 9
1. 12.6 the nav close-up panned fast while the highlight slid; four blur samples showed the labels as four ghosted copies -> the camera now holds still on items 02 to 04, and the highlight slides 02 → 04 → 03 so it stretches both ways.
2. 2.1, 4.2, 13.6, 16.15 every fast move ghosted the same way at --sub 4 -> final renders are 60 fps without frame blending; crisp frames read better than four-sample blur here.
3. Sound: all 19 cue onsets measured in audio/sfx.wav within 0.02 s of their cue times.
