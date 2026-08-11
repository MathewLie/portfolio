# Photos needed

Drop files into this folder with these exact names. The site already points at
these paths — nothing else needs to change once the files are here.

| Filename | Used in | Aspect ratio | Notes |
|---|---|---|---|
| `hero.jpg` | `/triathlon`, under your name | 16:9 (wide) | Action shot works best — first image people see on that page, with a headline overlaid on the bottom third. |
| `closing.jpg` | `/triathlon`, full-bleed statement near the bottom | 21:9 (ultra-wide) | "Keep Failing Forward." is overlaid on the bottom third — pick something with open space low in the frame so the text stays legible. |
| `brand-1.jpg` | `/triathlon`, "Partnerships & Ads" | 9:16 (tall, reel-shaped) | Cover frame or still from an Instagram brand reel/post. |
| `brand-2.jpg` | `/triathlon`, "Partnerships & Ads" | 9:16 (tall, reel-shaped) | Same as above — second brand slot. |
| `brand-3.jpg` | `/triathlon`, "Partnerships & Ads" | 9:16 (tall, reel-shaped) | Same as above — third brand slot. |

Save each as `.jpg` with that exact name. If you'd rather use `.png` or
`.webp`, just tell me and I'll update the matching `src` path — they're all
in `src/pages/Triathlon.jsx` (search for `/photos/`).

If a file is missing or fails to load, that section falls back to the
striped placeholder automatically, so it's safe to add these one at a time
rather than all at once.

Only need one or two brand slots for now instead of three? Tell me and I'll
drop the extra card rather than leave it empty.
