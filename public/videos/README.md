# Videos — keep them compressed

Phone-shot video (especially vertical, 1080×1920) often comes straight off the
camera at 9-10 Mbps, which turns into 50-70MB files for less than a minute of
footage. That's heavy for a website (slow to load, especially on mobile) and
can bump into GitHub's per-file size limits.

There's a script that fixes this without a visible quality hit:

```bash
scripts/compress-video.sh path/to/your-video.mp4
```

That writes a compressed copy next to the original (e.g. `your-video.compressed.mp4`)
using H.264 (plays everywhere — unlike HEVC/H.265, which Chrome and Firefox
on non-Apple platforms can't play at all) at a quality setting that's
visually indistinguishable from the source at normal viewing size. Typical
result: 50-70% smaller. Check the output looks right, then replace the
original:

```bash
mv your-video.compressed.mp4 your-video.mp4
```

Or give it a specific output path directly:

```bash
scripts/compress-video.sh your-video.mp4 videos/brands/brand-2.mp4
```

**One exception**: if a video is already small (a few MB, already compressed
by whatever exported it), running it through the script again can actually
make it *bigger* — the script targets a quality level, not a file size, so
re-encoding an already-efficient file can overshoot. If a video's already
under ~10MB for its length, it's probably fine as-is; only worth compressing
if it's noticeably large for how long the clip is.

Whenever you drop a new video anywhere in this folder, run it through the
script first. If you'd rather just hand it to me as-is, I'll compress it
before it goes in.
