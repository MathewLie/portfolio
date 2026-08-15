# Brand partnership videos

Drop your video files here with these exact names — the "Partnerships & Ads"
section on `/triathlon` already points at these paths:

| Filename | Notes |
|---|---|
| `brand-1.mp4` | First brand slot. Vertical video (9:16, like a Reel) works best — that's the shape the card is built for. |
| `brand-2.mp4` | Second brand slot. |
| `brand-3.mp4` | Third brand slot. |

How it works: each card shows a play button over the video's first frame.
Clicking plays it in place (looped, muted by default like the rest of the
site's videos). If a file is missing, that card falls back to a plain
placeholder automatically — safe to add these one at a time.

**Getting the file off your phone/Instagram and onto your laptop, then here:**
1. If it's an Instagram Reel you posted, download it from the app (⋯ menu →
   Save video/Download), or AirDrop the original clip from your phone.
2. Drop the file into this folder (`public/videos/brands/`) and rename it to
   `brand-1.mp4` (or 2/3).
3. If your file isn't already `.mp4`, tell me the format it's in and I'll
   update the matching path in `src/pages/Triathlon.jsx`.
4. Before dropping it in, run it through `scripts/compress-video.sh` (see
   `public/videos/README.md`) — phone video is often 50-70MB uncompressed,
   which is heavy for a website and can hit GitHub's file size limits.

Only have one or two brand videos ready instead of three? Tell me and I'll
drop the extra card rather than leave it empty.
