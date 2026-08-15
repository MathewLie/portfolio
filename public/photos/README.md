# Photos needed

Drop files into this folder with these exact names. The site already points at
these paths — nothing else needs to change once the files are here. If a file
is missing or fails to load, that section falls back to the striped
placeholder automatically, so it's safe to add these one at a time.

## `/triathlon`

| Filename | Used in | Aspect ratio | Notes |
|---|---|---|---|
| `hero.jpg` | Under your name | 16:9 (wide) | Action shot works best — first image people see on that page, with a headline overlaid on the bottom third. |
| `swim.jpg` | Scrolling swim section | 3:2 (landscape) | Rides in from the right as you scroll. Open water or pool, whatever you actually raced in. |
| `bike.webp` | Scrolling bike section | 3:2 (landscape) | Already added ✅. Rides in from the left as you scroll. |
| `run.jpg` | Scrolling run section, right before the closing statement | 3:2 (landscape) | Rides in from the right as you scroll. A running shot works well, or just a close-up of shoes mid-stride. |
| `closing.jpg` | Full-bleed statement near the bottom | 21:9 (ultra-wide) | "Keep Failing Forward." is overlaid on the bottom third — pick something with open space low in the frame so the text stays legible. |

The three "Partnerships & Ads" slots on `/triathlon` moved to actual video —
see `public/videos/brands/README.md` for those instead of here.

## `/product`

| Filename | Used in | Aspect ratio | Notes |
|---|---|---|---|
| `work.jpg` | Scrolling section between Experience and Projects | 3:2 (landscape) | A work/product photo — at your desk, presenting, whiteboarding, whatever represents the day-to-day. |

## `/linkedin`

| Filename | Used in | Aspect ratio | Notes |
|---|---|---|---|
| `content.jpg` | Scrolling section between the video portfolio and Process | 3:2 (landscape) | Behind-the-scenes of you filming/editing, or a still from a shoot. |

---

Every scrolling photo above uses the same component (`ScrollPhoto` in
`src/components.jsx`), so the pattern is identical everywhere: the photo
glides across the screen as its section scrolls through view, reversing
naturally if you scroll back up.

Save each as `.jpg` unless noted otherwise. If you'd rather use `.png` or a
different `.webp`, just tell me and I'll update the matching `src` path —
search for `/photos/` in `src/pages/Triathlon.jsx`, `Product.jsx`, or
`LinkedIn.jsx`.

Want more (or fewer) scrolling photo sections on any page? Tell me where and
I'll add or remove the slot.
