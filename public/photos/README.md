# Photos needed

Drop files into this folder using the base name below **in any of these
formats: `.jpg`, `.jpeg`, `.png`, or `.webp`** — the site tries all four
automatically and uses whichever one it finds, so you don't need to convert
everything to the same format first. If a file is missing (or none of the
four formats exist for it), that section falls back to the striped
placeholder automatically, so it's safe to add these one at a time.

**HEIC doesn't work** — that's an iPhone-only format and no web browser can
display it on a page, no matter what it's named. If your photos came straight
off an iPhone, convert them first. Easiest way on a Mac, one photo:

```bash
sips -s format jpeg IMG_1234.HEIC --out hero.jpg
```

Or convert every HEIC file in a folder at once:

```bash
cd ~/Desktop/wherever-your-photos-are
mkdir -p converted
for f in *.HEIC *.heic; do
  [ -e "$f" ] && sips -s format jpeg "$f" --out "converted/${f%.*}.jpg"
done
```

That drops JPG copies into a `converted` folder, keeping your originals
untouched — then rename and move the ones you want into this folder.

## `/triathlon`

| Base name | Used in | Aspect ratio | Notes |
|---|---|---|---|
| `hero` | Under your name | 16:9 (wide) | Action shot works best — first image people see on that page, with a headline overlaid on the bottom third. |
| `swim` | Scrolling swim section | 3:2 (landscape) | Rides in from the right as you scroll. Open water or pool, whatever you actually raced in. |
| `bike` | Scrolling bike section | 3:2 (landscape) | Already added ✅ (as `bike.webp`). Rides in from the left as you scroll. |
| `run` | Scrolling run section, right before the closing statement | 3:2 (landscape) | Rides in from the right as you scroll. A running shot works well, or just a close-up of shoes mid-stride. |
| `closing` | Full-bleed statement near the bottom | 21:9 (ultra-wide) | "Keep Failing Forward." is overlaid on the bottom third — pick something with open space low in the frame so the text stays legible. |

The three "Partnerships & Ads" slots on `/triathlon` are real video, not
photos — see `public/videos/brands/README.md` for those instead of here.

## `/product`

| Base name | Used in | Aspect ratio | Notes |
|---|---|---|---|
| `work` | Scrolling section between Experience and Projects | 3:2 (landscape) | A work/product photo — at your desk, presenting, whiteboarding, whatever represents the day-to-day. |

## `/linkedin`

| Base name | Used in | Aspect ratio | Notes |
|---|---|---|---|
| `content` | Scrolling section between the video portfolio and Process | 3:2 (landscape) | Behind-the-scenes of you filming/editing, or a still from a shoot. |

---

Every scrolling photo above uses the same component (`ScrollPhoto` in
`src/components.jsx`), so the pattern is identical everywhere: the photo
glides across the screen as its section scrolls through view, reversing
naturally if you scroll back up.

One thing to watch for: filenames are case-sensitive once this is live on
Netlify, even though your Mac usually doesn't care. `Hero.JPG` won't match
`hero` — keep names lowercase.

Want more (or fewer) scrolling photo sections on any page? Tell me where and
I'll add or remove the slot.
