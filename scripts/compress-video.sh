#!/usr/bin/env bash
# Re-encode a video for the web: H.264 (universal browser support), CRF 23
# (visually excellent, not "lossless" but no one will see the difference at
# normal viewing size), AAC audio, and faststart so playback can begin before
# the whole file downloads. Cuts phone-shot video down significantly (often
# 50-80%) with no visible quality loss.
#
# Usage:
#   scripts/compress-video.sh input.mp4              # writes input.compressed.mp4
#   scripts/compress-video.sh input.mp4 output.mp4    # writes to a specific path
#
# Review the output, then replace the original if it looks right:
#   mv output.mp4 input.mp4

set -euo pipefail

if [ -z "${1:-}" ]; then
  echo "Usage: $0 <input-video> [output-video]"
  exit 1
fi

INPUT="$1"
OUTPUT="${2:-${INPUT%.*}.compressed.mp4}"

ffmpeg -y -i "$INPUT" \
  -c:v libx264 -preset slow -crf 23 \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  -pix_fmt yuv420p \
  "$OUTPUT"

echo ""
echo "Done: $OUTPUT"
ls -lh "$INPUT" "$OUTPUT" | awk '{print $5, $NF}'
