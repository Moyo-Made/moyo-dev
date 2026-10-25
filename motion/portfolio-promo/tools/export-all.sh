#!/usr/bin/env bash
# Final renders and mixes for every format. Run from the film folder: bash tools/export-all.sh
set -euo pipefail
for spec in "1x1 1080 1080" "16x9 1920 1080" "9x16 1080 1920"; do
  read -r name w h <<< "$spec"
  node render.mjs --w "$w" --h "$h" --fps 60 --out "out/silent_$name.mp4" | grep -v "s / " || true
  node tools/mix.mjs --video "out/silent_$name.mp4" --music audio/bed.wav --sfx audio/sfx.wav --lufs -14 --out "out/final_$name.mp4"
done
node render.mjs --rm --w 1080 --h 1080 --fps 30 --out out/silent_reduced_1x1.mp4 | grep -v "s / " || true
node tools/mix.mjs --video out/silent_reduced_1x1.mp4 --music audio/bed.wav --sfx audio/sfx.wav --lufs -14 --out out/final_reduced_1x1.mp4
echo "all exports done"
